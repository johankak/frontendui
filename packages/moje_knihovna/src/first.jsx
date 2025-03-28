import 'bootstrap/dist/css/bootstrap.min.css';

import { createAsyncGraphQLAction, useAsyncAction } from '@hrbolek/uoisfrontend-gql-shared'
// import { AppRouter } from './AppRouter';

const readUserPageAsyncAction = createAsyncGraphQLAction(`{
    userPage {
        __typename
        id
        name
        surname
    }
}`)

export const FirstEntity = () => {
    const { loading, error, entity, dispatchResult } = useAsyncAction(readUserPageAsyncAction, { });

    if (loading) return <p>Loading...</p>
    return <div>User: <div>{JSON.stringify(dispatchResult)}</div></div>
}


