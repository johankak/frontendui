import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { GroupLargeFragment } from "./GroupFragments";

const GroupInsertMutation = createQueryStrLazy(
`
mutation GroupInsertMutation($id: UUID, $name: String, $name_en: String) {
  result: groupInsert(
    group: {id: $id, name: $name, nameEn: $name_en}
  ) {
    ... on InsertError {
      failed
      msg
      input
    }
    ...GroupLarge
  }
}
`,
    GroupLargeFragment)


export const GroupInsertAsyncAction = createAsyncGraphQLAction(GroupInsertMutation)