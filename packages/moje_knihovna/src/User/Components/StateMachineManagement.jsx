import { createAsyncGraphQLAction, useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"

const InsertStateMachineAsyncAction = createAsyncGraphQLAction(
    `mutation statemachineinsert($name: String!) {
  statemachineInsert(statemachine: {name: $name}) {
    __typename
    ...on InsertError {
      failed
      msg
      input
    }
  	...StateMachineMedium
  }
}

fragment StateMachineMedium on StateMachineGQLModel {
  id
  name
}`);

export const StateMachineManagement = () => {
    const {loading, error, entity, fetch} = useAsyncAction(InsertStateMachineAsyncAction, {name: "test"}, {deferred: true})
    return (
        <div>
            Tlacitko<br/>
            Tlacitko<br/>
            <button onClick={() => fetch({name: "Test"})}>Insert</button><br/>
            {loading && <div>Loading...</div>}
            {error && <div>Error: {error.message}</div>}
            {entity && <div>Inserted: {JSON.stringify(entity)}</div>}
        </div>
    )
}