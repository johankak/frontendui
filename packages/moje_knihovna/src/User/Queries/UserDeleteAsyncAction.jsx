import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { UserLargeFragment } from "./UserFragments";

const UserDeleteMutation = createQueryStrLazy(
`
mutation UserDeleteMutation($id: UUID!, $lastchange: DateTime!) {
  result: userDelete(
    user: {id: $id, lastchange: $lastchange}
  ) {
    ... on UserGQLModelDeleteError {
      failed
      msg
      input
      Entity {
        ...UserLarge
      }
    }
  }
}
`,
    UserLargeFragment)

export const UserDeleteAsyncAction = createAsyncGraphQLAction(UserDeleteMutation)