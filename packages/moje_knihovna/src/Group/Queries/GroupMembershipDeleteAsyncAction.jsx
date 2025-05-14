import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";

const GroupMembershipDeleteMutation = createQueryStrLazy(
`
mutation MEMBERSHIP_DELETE($id: UUID!, $lastchange: DateTime!) {
  membershipDelete(
    membership: {
      id: $id,
      lastchange: $lastchange
    }
  ) {
    ... on MembershipGQLModelDeleteError {
      failed
      msg
    }
  }
}
`);

export const GroupMembershipDeleteAsyncAction = createAsyncGraphQLAction(GroupMembershipDeleteMutation);

const MembershipDetailQuery = createQueryStrLazy(
`
query MembershipDetailQuery($membershipId: UUID!) {
  membershipById(id: $membershipId) {
    __typename
    id
    lastchange
    valid
    user {
      __typename
      id
      name
      surname
    }
    group {
      __typename
      id
      name
    }
  }
}
`);

export const MembershipDetailAsyncAction = createAsyncGraphQLAction(MembershipDetailQuery);
