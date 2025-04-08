import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared"

export const GroupLinkFragment = createQueryStrLazy(
`
fragment GroupLink on GroupGQLModel {
  __typename
  id
  lastchange
  name
  nameEn
}
`)


export const GroupMediumFragment = createQueryStrLazy(
`
fragment GroupMedium on GroupGQLModel {
  ...GroupLink
}
`, GroupLinkFragment)

export const GroupLargeFragment = createQueryStrLazy(
`
fragment GroupLarge on GroupGQLModel {
  ...GroupMedium
  memberships(where: {valid: {eq: true}}) {
    __typename
    id
    valid
    startDate
    endDate
    user {
      __typename
      id
      name
      surname
      email
    }
  }
}
`, GroupMediumFragment)
  