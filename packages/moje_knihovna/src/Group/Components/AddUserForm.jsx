// AddUserForm.jsx - Komponenta pro přidání uživatele do skupiny
import { useState } from "react";
import Button from "react-bootstrap/Button";
import { Input, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared";
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared";
import { GroupMembershipInsertAsyncAction } from "C:/Users/mates/frontendui/packages/moje_knihovna/src/Group/Queries/GroupMembershipInsertAsyncAction";

export const AddUserForm = ({ group }) => {
  const [userId, setUserId] = useState("");

  const {
    error: insertError,
    loading: insertLoading,
    fetch: insertUser,
  } = useAsyncAction(GroupMembershipInsertAsyncAction, {}, { deferred: true });

  const handleAddUserToGroup = async () => {
    if (!userId) {
      alert("Prosím zadejte UUID uživatele");
      return;
    }

    try {
      const params = {
        groupId: group.id,
        userId: userId,
      };

      const result = await insertUser(params);

      if (result && !result.failed) {
        alert("Uživatel byl úspěšně přidán do skupiny");
        setUserId("");
        window.location.reload();
      } else if (result && result.failed) {
        alert(`Chyba: ${result.msg || "Nepodařilo se přidat uživatele do skupiny"}`);
      }
    } catch (error) {
      console.error("Chyba při přidávání uživatele:", error);
      alert("Došlo k chybě při přidávání uživatele do skupiny");
    }
  };

  return (
    <div className="mt-6 space-y-2">
      <h4 className="text-lg font-semibold">Přidat existujícího uživatele do skupiny</h4>

      {insertError && <ErrorHandler errors={insertError} />}
      {insertLoading && <LoadingSpinner text="Přidávám uživatele do skupiny..." />}

      <Input
        placeholder="UUID uživatele"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />

      <Button onClick={handleAddUserToGroup} disabled={insertLoading}>
        Přidat uživatele do skupiny
      </Button>
    </div>
  );
};