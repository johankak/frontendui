import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { GroupMediumCard } from "./GroupMediumCard";
import { GroupRolesReadAsyncAction } from "C:/Users/mates/frontendui/packages/moje_knihovna/src/Group/Queries/GroupRolesReadAsyncAction.jsx";

/**
 * A component that displays medium-level content for a group entity.
 *
 * This component renders information about a group entity including its name,
 * master group (if any), and roles with associated users. It fetches role data
 * using the GroupRolesReadAsyncAction.
 *
 * @component
 * @param {Object} props - The properties for the GroupMediumContent component.
 * @param {Object} props.group - The object representing the group entity.
 * @param {string|number} props.group.id - The unique identifier for the group entity.
 * @param {string} props.group.name - The name or label of the group entity.
 * @param {Object} [props.group.mastergroup] - The parent/master group if exists.
 * @param {React.ReactNode} [props.children=null] - Additional content to render after the group information.
 *
 * @returns {JSX.Element} A JSX element displaying the group's details and optional content.
 *
 * @example
 * // Example usage:
 * const groupEntity = { id: "0d0810f7-b61b-43c2-a746-26800052b7d7", name: "Sample Group" };
 * 
 * <GroupMediumContent group={groupEntity}>
 *   <p>Additional information about the group.</p>
 * </GroupMediumContent>
 */
export const GroupMediumContent = ({ group, children }) => {
    const dispatch = useDispatch();
    const [roleUsers, setRoleUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch roles and associated users when component mounts or group ID changes
        if (group?.id) {
            setIsLoading(true);
            dispatch(GroupRolesReadAsyncAction({ groupId: group.id }))
                .then((result) => {
                    setRoleUsers(result.data?.result || []);
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.error("Error fetching roles:", err);
                    setError("Nepodařilo se načíst role a uživatele");
                    setIsLoading(false);
                });
        }
    }, [group?.id, dispatch]);

    // Group roles by role type
    const groupedRoles = {};
    roleUsers.forEach(roleUser => {
        const roleName = roleUser?.roletype?.name || "Neznámá role";
        if (!groupedRoles[roleName]) {
            groupedRoles[roleName] = [];
        }
        if (roleUser?.user) {
            groupedRoles[roleName].push(roleUser.user);
        }
    });

    return (
        <>
            <h2>Stránka (studijní) skupiny</h2>
            <p><strong>Skupina:</strong> {group.name}</p>

            {group?.mastergroup && (
                <>
                    <h3>Nadřízená skupina</h3>
                    <GroupMediumCard group={group.mastergroup} />
                </>
            )}

            <h3>Role a členové</h3>
            {isLoading ? (
                <p>Načítání rolí a uživatelů...</p>
            ) : error ? (
                <p className="error">{error}</p>
            ) : Object.keys(groupedRoles).length > 0 ? (
                <div className="roles-container">
                    {Object.entries(groupedRoles).map(([roleName, users], index) => (
                        <div key={index} className="role-group">
                            <h4>{roleName}</h4>
                            <ul>
                                {users.map((user, userIndex) => (
                                    <li key={userIndex}>{user.fullname}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Žádné role a uživatelé</p>
            )}

            {/* Display original roles from group object if they exist */}
            {group.roles && group.roles.length > 0 && (
                <>
                    <h3>Dostupné role</h3>
                    <ul>
                        {group.roles.map((role, index) => (
                            <li key={index}>{role.name}</li>
                        ))}
                    </ul>
                </>
            )}

            {children}
        </>
    );
};