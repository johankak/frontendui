// GroupLargeCard.jsx - Hlavní komponenta
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import { LeftColumn, MiddleColumn } from "@hrbolek/uoisfrontend-shared";
import { GroupCardCapsule } from "C:/Users/mates/frontendui/packages/moje_knihovna/src/Group/Components/GroupCardCapsule";
import { GroupMediumCard } from "C:/Users/mates/frontendui/packages/moje_knihovna/src/Group/Components/GroupMediumCard";

export const ReadOnlyLargeCard = ({ group, children }) => {
  if (!group) return <div>Skupina nebyla nalezena.</div>;

  return (
    <GroupCardCapsule group={group}>
      <Row>
        <LeftColumn>
          <GroupMediumCard group={group} />
        </LeftColumn>
        <MiddleColumn>
          <h2>{group.name}</h2>
          <h5>Seznam členů skupiny</h5>
          {group.memberships && group.memberships.length > 0 ? (
            <Table striped bordered hover size="sm">
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
            </Table>
          ) : (
            <p>Tato skupina nemá žádné členy.</p>
          )}
          {process.env.NODE_ENV === "development" && (
            <pre>{JSON.stringify(group, null, 2)}</pre>
          )}
          {children}
        </MiddleColumn>
      </Row>
    </GroupCardCapsule>
  );
};
