import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
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

// Funkce pro vytvoření dotazu na vytvoření skupiny
const getGroupInsertQuery = (name, groupTypeId) => createQueryStrLazy(`
mutation {
  groupInsert(
    group: {name: "${name}", grouptypeId: "${groupTypeId}"}
  ) {
    ... on GroupGQLModel {
      id
      name
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
  const [groupTypeId, setGroupTypeId] = useState(groupTypes[0].id); // výchozí hodnota

  const {
    fetch: insertGroup,
    loading: inserting,
    error: insertError,
  } = useAsyncAction(
    (params) => createAsyncGraphQLAction(getGroupInsertQuery(params.name, params.groupTypeId))(),
    {
      onSuccess: (data) => {
        const result = data.data.groupInsert;
        if (result && result.id) {
          alert("Skupina byla vytvořena: " + result.name);
          setName("");
        } else {
          alert("Vytvoření skupiny selhalo.");
          console.warn("Neočekávaná odpověď:", data);
        }
      },
    },
    { deferred: true }
  );

  const handleSubmit = () => {
    if (!name || !groupTypeId) {
      alert("Zadejte název skupiny a vyberte typ.");
      return;
    }
    insertGroup({ name, groupTypeId });
  };

  return (
    <div className="container mt-4">
      <h3>Vytvoření nové skupiny</h3>

      {insertError && <ErrorHandler errors={insertError} />}
      {inserting && <LoadingSpinner text="Vytvářím skupinu..." />}

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
