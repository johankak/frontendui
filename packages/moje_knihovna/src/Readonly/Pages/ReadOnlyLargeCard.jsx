// GroupLargeCard.jsx - Hlavní komponenta
import Row from "react-bootstrap/Row";
import { LeftColumn, MiddleColumn } from "@hrbolek/uoisfrontend-shared";
import { GroupCardCapsule } from "C:/Users/mates/frontendui/packages/moje_knihovna/src/Group/Components/GroupCardCapsule";
import { GroupMediumCard } from "C:/Users/mates/frontendui/packages/moje_knihovna/src/Group/Components/GroupMediumCard";
import { MembersList } from "C:/Users/mates/frontendui/packages/moje_knihovna/src/Group/Components/MembersList";

export const ReadOnlyLargeCard = ({ group, children }) => {
  return (
    <GroupCardCapsule group={group}>
      <Row>
        <LeftColumn>
          <GroupMediumCard group={group} />
        </LeftColumn>
        <MiddleColumn>
          {/* Další obsah */}
          <pre>{JSON.stringify(group, null, 2)}</pre>
          {children}
        </MiddleColumn>
      </Row>
    </GroupCardCapsule>
  );
};