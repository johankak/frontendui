import Row from "react-bootstrap/Row"
import { LeftColumn, MiddleColumn } from "@hrbolek/uoisfrontend-shared"
import { GroupCardCapsule } from "./GroupCardCapsule"
import { GroupMediumCard } from "./GroupMediumCard"

/**
 * A large card component for displaying detailed content and layout for an group entity.
 *
 * This component wraps an `GroupCardCapsule` with a flexible layout that includes multiple
 * columns. It uses a `Row` layout with a `LeftColumn` for displaying an `GroupMediumCard`
 * and a `MiddleColumn` for rendering a list of group members and additional children.
 *
 * @component
 * @param {Object} props - The properties for the GroupLargeCard component.
 * @param {Object} props.group - The object representing the group entity.
 * @param {string|number} props.group.id - The unique identifier for the group entity.
 * @param {string} props.group.name - The name or label of the group entity.
 * @param {Array} [props.group.memberships] - Array of group memberships.
 * @param {React.ReactNode} [props.children=null] - Additional content to render in the middle column.
 *
 * @returns {JSX.Element} A JSX element combining a large card layout with dynamic content.
 */
export const GroupLargeCard = ({group, children}) => {
    return (
        <GroupCardCapsule group={group} >
            <Row>
                <LeftColumn>
                    <GroupMediumCard group={group}/>
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
                                    {group.memberships.map(membership => (
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

                    <pre>{JSON.stringify(group, null, 2)}</pre>

                    {/* Další obsah, pokud něco předáváš jako children */}
                    {children}
                </MiddleColumn>
            </Row>
        </GroupCardCapsule>
    )
}