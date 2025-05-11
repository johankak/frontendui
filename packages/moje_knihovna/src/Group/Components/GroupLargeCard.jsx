import Row from "react-bootstrap/Row";
import { LeftColumn, MiddleColumn } from "@hrbolek/uoisfrontend-shared";
import { GroupCardCapsule } from "./GroupCardCapsule";
import { GroupMediumCard } from "./GroupMediumCard";
import { useState } from "react";
import { Input, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared";
import Button from "react-bootstrap/Button";
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared";
import { GroupMembershipInsertAsyncAction } from "C:/Users/mates/frontendui/packages/moje_knihovna/src/Group/Queries/GroupMembershipInsertAsyncAction";
import { GroupUpdateAsyncAction } from "C:/Users/mates/frontendui/packages/moje_knihovna/src/Group/Queries/GroupUpdateAsyncAction";

export const GroupLargeCard = ({ group, children }) => {
  const [userId, setUserId] = useState("");
  const [newGroupName, setNewGroupName] = useState("");

  const {
    error: insertError,
    loading: insertLoading,
    fetch: insertUser,
  } = useAsyncAction(GroupMembershipInsertAsyncAction, {}, { deferred: true });

  const {
    error: updateError,
    loading: updateLoading,
    fetch: updateGroup,
  } = useAsyncAction(GroupUpdateAsyncAction, {}, { deferred: true });

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

  const handleGroupNameChange = async () => {
    if (!newGroupName) {
      alert("Zadejte nový název skupiny.");
      return;
    }

    try {
      const params = {
        id: group.id,
        lastchange: group.lastchange,
        name: newGroupName,
      };

      const result = await updateGroup(params);

      if (result && !result.failed) {
        alert("Název skupiny byl úspěšně změněn.");
        setNewGroupName("");
        window.location.reload();
      } else {
        alert(`Chyba: ${result?.msg || "Nepodařilo se změnit název skupiny."}`);
      }
    } catch (err) {
      console.error("Chyba při změně názvu skupiny:", err);
      alert("Došlo k chybě při změně názvu skupiny.");
    }
  };

  return (
    <GroupCardCapsule group={group}>
      <Row>
        <LeftColumn>
          <GroupMediumCard group={group} />
        </LeftColumn>
        <MiddleColumn>
          {/* Seznam členů skupiny */}
          <h3>Seznam členů skupiny</h3>
          {group.memberships && group.memberships.length > 0 ? (
            <div className="member-list">
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Jméno</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {group.memberships.map((membership) => (
                    <tr key={membership.id}>
                      <td>{membership.user.id}</td>
                      <td>{`${membership.user.name} ${membership.user.surname}`}</td>
                      <td>{membership.user.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>Tato skupina nemá žádné členy.</p>
          )}

          {/* Formulář pro přidání uživatele */}
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

          {/* Formulář pro změnu názvu skupiny */}
          <div className="mt-6 space-y-2">
            <h4 className="text-lg font-semibold">Změnit název studijní skupiny</h4>

            {updateError && <ErrorHandler errors={updateError} />}
            {updateLoading && <LoadingSpinner text="Aktualizuji název skupiny..." />}

            <Input
              placeholder="Nový název skupiny"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
            />

            <Button onClick={handleGroupNameChange} disabled={updateLoading}>
              Změnit název skupiny
            </Button>
          </div>

          <pre>{JSON.stringify(group, null, 2)}</pre>

          {/* Další obsah */}
          {children}
        </MiddleColumn>
      </Row>
    </GroupCardCapsule>
  );
};
