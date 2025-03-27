import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { GroupLargeFragment } from "./GroupFragments";

const GroupUpdateMutation = createQueryStrLazy(
`
mutation GroupUpdateMutation($id: UUID!, $lastchange: DateTime!, $name: String, $name_en: String) {
  result: groupUpdate(
    group: {id: $id, lastchange: $lastchange, name: $name, nameEn: $name_en}
  ) {
    ... on GroupGQLModelUpdateError {
      failed
      msg
      input
      Entity {
        ...GroupLarge
      }      
    }
    ...GroupLarge
  }
}
`, GroupLargeFragment)

export const GroupUpdateAsyncAction = createAsyncGraphQLAction(GroupUpdateMutation)