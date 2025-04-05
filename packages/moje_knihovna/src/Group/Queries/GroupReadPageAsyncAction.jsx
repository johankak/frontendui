import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { GroupLargeFragment } from "./GroupFragments";

const GroupReadPageQuery = createQueryStrLazy(
`
query GroupReadPageQuery($skip: Int, $limit: Int, $where: GroupWhereInputFilter) {
  result: groupPage(skip: $skip, limit: $limit, where: $where) {
    ...GroupLarge
  }
}
`, 
    GroupLargeFragment)

export const GroupReadPageAsyncAction = createAsyncGraphQLAction(GroupReadPageQuery)