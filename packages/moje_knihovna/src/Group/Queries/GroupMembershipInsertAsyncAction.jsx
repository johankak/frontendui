import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { GroupLargeFragment } from "./GroupFragments";

// 1. FIXED MUTATION FOR ADDING A USER - removing invalid 'valid' field
const GroupMembershipInsertMutation = createQueryStrLazy(
`
mutation MembershipInsertMutation($groupId: UUID!, $userId: UUID!) {
  result: membershipInsert(
    membership: {
      groupId: $groupId,
      userId: $userId
      # 'valid' field is not supported by MembershipInsertGQLModel
    }
  ) {
    ... on MembershipGQLModel {
      id
      valid
      startdate
      enddate
      user {
        id
        name
        surname
        email
      }
      group {
        id
        name
      }
    }
    ... on MembershipGQLModelInsertError {
      ... on InsertError {
        failed
        msg
        input
      }
    }
  }
}
`);

// 2. QUERY TO FETCH GROUP WITH MEMBERSHIPS (for verification)
const GroupWithMembershipsQuery = createQueryStrLazy(
`
query GroupWithMemberships($groupId: UUID!) {
  groupById(id: $groupId) {
    id
    name
    lastchange
    memberships {
      id
      valid
      user {
        id
        name
        surname
        email
      }
    }
  }
}
`);

// Create the async actions
export const GroupMembershipInsertAsyncAction = createAsyncGraphQLAction(GroupMembershipInsertMutation);
export const GroupWithMembershipsAsyncAction = createAsyncGraphQLAction(GroupWithMembershipsQuery);

// 3. COMPLETE IMPLEMENTATION WITH ERROR HANDLING AND VERIFICATION
/*
import { 
  GroupMembershipInsertAsyncAction, 
  GroupWithMembershipsAsyncAction 
} from './path-to-this-file';

// Inside your component
const addUserToGroup = async (groupId, userId) => {
  try {
    // Step 1: Add the user to the group
    const result = await GroupMembershipInsertAsyncAction({
      variables: {
        groupId: groupId,
        userId: userId
      }
    });
    
    // Step 2: Handle possible error responses
    if (result.data?.result?.__typename === "MembershipGQLModelInsertError") {
      console.error("Failed to add user to group:", result.data.result.msg);
      // Display error to user
      return false;
    }
    
    // Step 3: Verify the membership was created by fetching the latest group data
    const verifyResult = await GroupWithMembershipsAsyncAction({
      variables: {
        groupId: groupId
      },
      fetchPolicy: 'network-only' // Force fetch from server, bypass cache
    });
    
    // Step 4: Check if the user now appears in the memberships
    const memberships = verifyResult.data?.groupById?.memberships || [];
    const userAdded = memberships.some(m => m.user.id === userId);
    
    if (userAdded) {
      console.log("User successfully added and verified in group");
      // Refresh your UI with the new data
      return true;
    } else {
      console.warn("User was supposedly added but doesn't appear in group memberships");
      // Consider showing a warning to the user
      return false;
    }
  } catch (error) {
    console.error("Error during user addition process:", error);
    // Display error to user
    return false;
  }
};

// If you need to separately update the validity of a membership after creation,
// you might need a separate mutation like this:
const UpdateMembershipMutation = createQueryStrLazy(
`
mutation UpdateMembership($membershipId: UUID!, $valid: Boolean!) {
  result: membershipUpdate(
    membership: {
      id: $membershipId,
      valid: $valid
    }
  ) {
    ... on MembershipGQLModel {
      id
      valid
    }
    ... on MembershipGQLModelUpdateError {
      ... on UpdateError {
        failed
        msg
      }
    }
  }
}
`);

export const UpdateMembershipAsyncAction = createAsyncGraphQLAction(UpdateMembershipMutation);
*/