import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { UserLargeFragment } from "./UserFragments";

const UserInsertMutation = createQueryStrLazy(
`
mutation UserInsertMutation($id: UUID, $name: String, $name_en: String) {
  result: userInsert(
    user: {id: $id, name: $name, nameEn: $name_en}
  ) {
    ... on InsertError {
      failed
      msg
      input
    }
    ...UserLarge
  }
}
`,
    UserLargeFragment)


export const UserInsertAsyncAction = createAsyncGraphQLAction(UserInsertMutation)