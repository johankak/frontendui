// RemoveUserForm.jsx - Komponenta pro odebrání uživatele pomocí rozbalovacího seznamu
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared";
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared";
import { GroupMembershipDeleteAsyncAction } from "C:/Users/mates/frontendui/packages/moje_knihovna/src/Group/Queries/GroupMembershipDeleteAsyncAction";

export const RemoveUserForm = ({ group }) => {
  const [selectedMembership, setSelectedMembership] = useState("");

  const {
    error: deleteError,
    loading: deleteLoading,
    fetch: deleteMembership,
  } = useAsyncAction(GroupMembershipDeleteAsyncAction, {}, { deferred: true });

  const handleRemoveSelectedUser = async () => {
    if (!selectedMembership) {
      alert("Prosím vyberte uživatele, kterého chcete odebrat ze skupiny.");
      return;
    }
    
    // Najít vybrané členství podle ID
    const membershipToDelete = group.memberships.find(m => m.id === selectedMembership);
    
    if (!membershipToDelete) {
      alert("Vybrané členství nebylo nalezeno.");
      return;
    }
    
    const userName = `${membershipToDelete.user.name} ${membershipToDelete.user.surname}`;
    
    if (!window.confirm(`Opravdu chcete odebrat uživatele ${userName} ze skupiny?`)) {
      return;
    }
    
    try {
      const params = {
        id: membershipToDelete.id,
        lastchange: membershipToDelete.lastchange
      };
      
      const result = await deleteMembership(params);
      
      // Zjednodušená kontrola odpovědi - null znamená úspěch
      if (result && result.data && result.data.membershipDelete === null) {
        alert("Uživatel byl úspěšně odebrán ze skupiny.");
        setSelectedMembership("");
        window.location.reload();
      } else {
        console.warn("Neočekávaná odpověď:", result);
        alert("Nepodařilo se odebrat uživatele ze skupiny. Zkontrolujte konzoli pro více informací.");
      }
    } catch (error) {
      console.error("Chyba při odebírání uživatele ze skupiny:", error);
      alert("Došlo k chybě při odebírání uživatele ze skupiny.");
    }
  };

  return (
    <div className="mt-6 space-y-2">
      <h4 className="text-lg font-semibold">Odebrat uživatele ze skupiny</h4>
      
      {deleteError && <ErrorHandler errors={deleteError} />}
      {deleteLoading && <LoadingSpinner text="Odebírám uživatele ze skupiny..." />}
      
      <Form.Group>
        <Form.Label>Vyberte uživatele k odebrání</Form.Label>
        <Form.Control
          as="select"
          value={selectedMembership}
          onChange={(e) => setSelectedMembership(e.target.value)}
        >
          <option value="">Vyberte uživatele...</option>
          {group.memberships && group.memberships.map((membership) => (
            <option key={membership.id} value={membership.id}>
              {`${membership.user.name} ${membership.user.surname} (${membership.user.email})`}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      
      <Button 
        variant="danger" 
        onClick={handleRemoveSelectedUser} 
        disabled={deleteLoading || !selectedMembership}
      >
        Odebrat uživatele ze skupiny
      </Button>
    </div>
  );
};