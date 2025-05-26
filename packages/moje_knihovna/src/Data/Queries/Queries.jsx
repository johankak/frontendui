import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";

// GraphQL query pro načtení typů skupin
export const groupTypePageQuery = createQueryStrLazy(`
query {
  groupTypePage {
    id
    name
  }
}
`);

// GraphQL query s použitím variables
export const groupInsertQuery = createQueryStrLazy(`
mutation GroupInsert($name: String!, $grouptypeId: UUID!) {
  groupInsert(
    group: {name: $name, grouptypeId: $grouptypeId}
  ) {
    __typename
    ... on GroupGQLModel {
      id
      name
      nameEn
      lastchange
      mastergroup {
        id
        name
      }
      grouptype {
        id
        name
      }
    }
    ... on InsertError {
      input
      failed
      msg
    }
  }
}
`);