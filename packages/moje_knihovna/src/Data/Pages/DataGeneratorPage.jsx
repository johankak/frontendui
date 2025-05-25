import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared";
import { useAsyncAction, createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";

// Fallback typy skupin natvrdo
const groupTypes = [
  { id: "cd49e152-610c-11ed-9f29-001a7dda7110", name: "univerzita" },
  { id: "cd49e153-610c-11ed-bf19-001a7dda7110", name: "fakulta" },
  { id: "cd49e154-610c-11ed-bdbf-001a7dda7110", name: "ústav" },
  { id: "cd49e155-610c-11ed-bdbf-001a7dda7110", name: "centrum" },
  { id: "cd49e155-610c-11ed-844e-001a7dda7110", name: "katedra" },
  { id: "cd49e156-610c-11ed-87ef-001a7dda7110", name: "oddělení" },
  { id: "cd49e157-610c-11ed-9312-001a7dda7110", name: "studijní skupina" },
  { id: "cd49e157-610c-11ed-9f29-001a7dda7110", name: "stalý stav" },
  { id: "0eb35718-615b-11ed-b753-0242ac120003", name: "studenti" },
  { id: "b1bedec8-931f-11ed-9b95-0242ac110002", name: "garance programu" },
];

// GraphQL query s použitím variables
const groupInsertQuery = createQueryStrLazy(`
mutation GroupInsert($name: String!, $grouptypeId: UUID!) {
  groupInsert(
    group: {name: $name, grouptypeId: $grouptypeId}
  ) {
    __typename
    ... on GroupGQLModel {
      id
      name
      nameEn
      lastchange
      mastergroup {
        id
        name
      }
      grouptype {
        id
        name
      }
    }
    ... on InsertError {
      input
      failed
      msg
    }
  }
}
`);

export const DataGeneratorPage = () => {
  const [name, setName] = useState("");
  const [groupTypeId, setGroupTypeId] = useState(groupTypes[0].id);
  const [createdGroup, setCreatedGroup] = useState(null);

  const {
    fetch: insertGroup,
    loading: inserting,
    error: insertError,
  } = useAsyncAction(
    createAsyncGraphQLAction(groupInsertQuery),
    {
      onSuccess: (data) => {
        console.log("onSuccess spuštěn!");
        console.log("Celá odpověď:", data);
        const result = data?.data?.groupInsert;
        console.log("Výsledek groupInsert:", result);
        if (result && result.id) {
          console.log("Nastavujem createdGroup:", result);
          setCreatedGroup(result);
          setName("");
        } else {
          console.log("Podmínka result && result.id selhala");
          alert("Vytvoření skupiny selhalo.");
          console.warn("Neočekávaná odpověď:", data);
        }
      },
      onError: (error) => {
        console.log("onError spuštěn:", error);
      },
      onSettled: (data, error) => {
        console.log("onSettled spuštěn - data:", data, "error:", error);
      }
    },
    { deferred: true }
  );

  const handleSubmit = async () => {
    console.log("handleSubmit spuštěn");
    if (!name || !groupTypeId) {
      alert("Zadejte název skupiny a vyberte typ.");
      return;
    }
    
    console.log("Odesílám data:", { name, grouptypeId: groupTypeId });
    
    // Vymazat předchozí výsledek
    setCreatedGroup(null);
    
    try {
      // Volání s GraphQL variables objektem
      const result = await insertGroup({ 
        name: name, 
        grouptypeId: groupTypeId 
      });
      
      console.log("Výsledek await insertGroup:", result);
      
      const groupResult = result?.data?.groupInsert;
      console.log("groupInsert data:", groupResult);
      
      if (groupResult && groupResult.id) {
        console.log("Nastavujem createdGroup:", groupResult);
        setCreatedGroup(groupResult);
        setName("");
      } else {
        alert("Vytvoření skupiny selhalo.");
        console.warn("Neočekávaná odpověď:", result);
      }
    } catch (error) {
      console.error("Chyba při vytváření skupiny:", error);
      alert("Došlo k chybě při vytváření skupiny.");
    }
  };

  const handleCreateNew = () => {
    setCreatedGroup(null);
    setName("");
  };

  return (
    <div className="container mt-4">
      <h3>Vytvoření nové skupiny</h3>
      
      <div className="mb-3">
        <small>Debug: createdGroup = {createdGroup ? "má hodnotu" : "null"}</small>
        {createdGroup && <small><br/>ID: {createdGroup.id}</small>}
      </div>

      {insertError && <ErrorHandler errors={insertError} />}
      {inserting && <LoadingSpinner text="Vytvářím skupinu..." />}

      {createdGroup && (
        <Alert variant="success" className="mb-4">
          <Alert.Heading>Skupina byla úspěšně vytvořena!</Alert.Heading>
          <div className="mb-3">
            <pre style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '5px', fontSize: '14px' }}>
              {JSON.stringify(createdGroup, null, 2)}
            </pre>
          </div>
          <Button 
            variant="outline-success" 
            size="sm" 
            onClick={handleCreateNew}
          >
            Vytvořit další skupinu
          </Button>
        </Alert>
      )}

      <Form.Group className="mb-3">
        <Form.Label>Název skupiny</Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Zadejte název..."
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Typ skupiny</Form.Label>
        <Form.Control
          as="select"
          value={groupTypeId}
          onChange={(e) => setGroupTypeId(e.target.value)}
        >
          {groupTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Button onClick={handleSubmit} disabled={inserting}>
        Vytvořit skupinu
      </Button>
    </div>
  );
};