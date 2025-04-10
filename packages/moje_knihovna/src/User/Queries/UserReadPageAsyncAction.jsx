import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { UserLargeFragment } from "./UserFragments";

const UserReadPageQuery = createQueryStrLazy(
`
query UserReadPageQuery($skip: Int, $limit: Int, $where: UserWhereInputFilter) {
  result: userPage(skip: $skip, limit: $limit, where: $where) {
    ...UserLarge
  }
}
`, 
    UserLargeFragment)

export const UserReadPageAsyncAction = createAsyncGraphQLAction(UserReadPageQuery)