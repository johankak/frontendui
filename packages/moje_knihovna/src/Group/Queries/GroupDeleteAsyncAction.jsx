import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { GroupLargeFragment } from "./GroupFragments";

const GroupDeleteMutation = createQueryStrLazy(
`
mutation GroupDeleteMutation($id: UUID!, $lastchange: DateTime!) {
  result: groupDelete(
    group: {id: $id, lastchange: $lastchange}
  ) {
    ... on GroupGQLModelDeleteError {
      failed
      msg
      input
      Entity {
        ...GroupLarge
      }
    }
  }
}
`,
    GroupLargeFragment)

export const GroupDeleteAsyncAction = createAsyncGraphQLAction(GroupDeleteMutation)