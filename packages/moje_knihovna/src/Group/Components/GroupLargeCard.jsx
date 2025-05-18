// GroupLargeCard.jsx - Hlavní komponenta
import Row from "react-bootstrap/Row";
import { LeftColumn, MiddleColumn } from "@hrbolek/uoisfrontend-shared";
import { GroupCardCapsule } from "./GroupCardCapsule";
import { GroupMediumCard } from "./GroupMediumCard";
import { MembersList } from "./MembersList";
import { AddUserForm } from "./AddUserForm";
import { RemoveUserForm } from "./RemoveUserForm";
import { GroupNameForm } from "./GroupNameForm";

export const GroupLargeCard = ({ group, children }) => {
  return (
    <GroupCardCapsule group={group}>
      <Row>
        <LeftColumn>
          <GroupMediumCard group={group} />
        </LeftColumn>
        <MiddleColumn>
          {/* Seznam členů skupiny */}
          <MembersList group={group} />

          {/* Formulář pro přidání uživatele */}
          <AddUserForm group={group} />
          
          {/* Formulář pro odebrání uživatele */}
          <RemoveUserForm group={group} />

          {/* Formulář pro změnu názvu skupiny */}
          <GroupNameForm group={group} />

          {/* Další obsah */}
          <pre>{JSON.stringify(group, null, 2)}</pre>
          {children}
        </MiddleColumn>
      </Row>
    </GroupCardCapsule>
  );
};