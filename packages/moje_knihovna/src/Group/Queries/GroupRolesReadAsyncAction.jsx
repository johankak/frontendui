import { createAsyncGraphQLAction } from "@hrbolek/uoisfrontend-gql-shared";

/**
 * GraphQL query for role data related to groups
 */
const GroupRolesReadQuery = `
query GroupRolesReadQuery($groupId: UUID!) {
  result: rolesOnGroup(groupId: $groupId) {
    id
    roletype {
      id
      name
    }
    user {
      id
      fullname
    }
  }
}
`;

/**
 * An async action for executing a GraphQL query to read roles associated with a group.
 *
 * This action performs a GraphQL query to fetch role and user data related to a specific group.
 *
 * @constant
 * @type {Function}
 *
 * @param {Object} query_variables - The variables for the GraphQL query.
 * @param {string} query_variables.groupId - The unique identifier for the group entity to fetch roles for.
 *
 * @returns {Function} A dispatchable async action that performs the GraphQL query and dispatches the result.
 *
 * @throws {Error} If `query_variables` is not a valid JSON object.
 *
 * @example
 * // Example usage:
 * const queryVariables = { groupId: "0d0810f7-b61b-43c2-a746-26800052b7d7" };
 *
 * dispatch(GroupRolesReadAsyncAction(queryVariables))
 *   .then((result) => {
 *     console.log("Fetched roles data:", result);
 *   })
 *   .catch((error) => {
 *     console.error("Error fetching roles data:", error);
 *   });
 */
export const GroupRolesReadAsyncAction = createAsyncGraphQLAction(GroupRolesReadQuery)