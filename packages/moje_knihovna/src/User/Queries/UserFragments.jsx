import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared"

export const UserLinkFragment = createQueryStrLazy(
`
fragment UserLink on UserGQLModel {
  __typename
  id
  lastchange
  name
  nameEn
}
`)


export const UserMediumFragment = createQueryStrLazy(
`
fragment UserMedium on UserGQLModel {
  ...UserLink
}
`, UserLinkFragment)

export const UserLargeFragment = createQueryStrLazy(
`
fragment UserLarge on UserGQLModel {
  ...UserMedium
}
`, UserMediumFragment)
  