import { GroupMediumCard } from "./GroupMediumCard"

/**
 * A component that displays medium-level content for an group entity.
 *
 * This component renders a label "GroupMediumContent" followed by a serialized representation of the `group` object
 * and any additional child content. It is designed to handle and display information about an group entity object.
 *
 * @component
 * @param {Object} props - The properties for the GroupMediumContent component.
 * @param {Object} props.group - The object representing the group entity.
 * @param {string|number} props.group.id - The unique identifier for the group entity.
 * @param {string} props.group.name - The name or label of the group entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render after the serialized `group` object.
 *
 * @returns {JSX.Element} A JSX element displaying the entity's details and optional content.
 *
 * @example
 * // Example usage:
 * const groupEntity = { id: 123, name: "Sample Entity" };
 * 
 * <GroupMediumContent group={groupEntity}>
 *   <p>Additional information about the entity.</p>
 * </GroupMediumContent>
 */
export const GroupMediumContent = ({group, children}) => {
    return (
        <>
            <h2>Stránka (studijní) skupiny</h2>
            <p><strong>Skupina:</strong> {group.name}</p>



            <h3>Zobrazení nadřízených skupin</h3>
            <ul>
                {group.parentGroups && group.parentGroups.length > 0 ? (
                    group.parentGroups.map((parentGroup, index) => (
                        <li key={index}>{parentGroup.name}</li>
                    ))
                ) : (
                    <p>Žádné nadřízené skupiny</p>
                )}
                {group?.mastergroup && <GroupMediumCard group={group.mastergroup} />}
            </ul>

            <h3>Zobrazení vedoucích (rolí)</h3>
            <ul>
                {group.roles && group.roles.length > 0 ? (
                    group.roles.map((role, index) => (
                        <li key={index}>{role.name}</li>
                    ))
                ) : (
                    <p>Žádní vedoucí (rolí)</p>
                )}
            </ul>

            <h3>Správa členů</h3>
            <p>Možnost správy členů této skupiny.</p>

            <h3>Správa rolí</h3>
            <p>Možnost správy rolí této skupiny.</p>

            {/* Zobrazení rolí */}
            <h3>Role</h3>
            <ul>
                {group.roles && group.roles.length > 0 ? (
                    group.roles.map((role, index) => (
                        <li key={index}>{role.name}</li>
                    ))
                ) : (
                    <p>Žádné role</p>
                )}
            </ul>


            <br />
            {children}
        </>
    )
}
