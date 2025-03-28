import 'bootstrap/dist/css/bootstrap.min.css';

import { AppCanvas, createAsyncGraphQLAction } from '@hrbolek/uoisfrontend-gql-shared'
// import { AppRouter } from './AppRouter';


const Name = ({name}) => {
    return (
        <span>Name: {name}</span>
    )
}
const User = ({name, surname, children}) => {
    return (
        <div>{name}, {surname} <br/> {children}</div>
    )
}

const Envelope = ({children}) => {
    return (
        <div className='card'>{children}</div>
    )
}

const readUserPageAsyncAction = createAsyncGraphQLAction(`{
    userPage {
        __typename
        id
        name
        surname
    }
}`)

const FirstEntity = () => {
    const { loading, error, entity, dispatchResult } = useAsyncFunction(readUserPageAsyncAction, { });

    if (loading) return <p>Loading...</p>
    return <div>User: <div>{JSON.stringify(dispatchResult)}</div></div>
}
export const App = () => {
    return (
        // <Container fluid>
        <AppCanvas>

            <FirstEntity />
            {/* <Navbar className='bg-light'>
                <Container>
                    <Navbar.Brand href="" className="justify-content-start"><a href='/' className='btn'>UOIS</a></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <LogButton />
                    </Navbar.Collapse>
                </Container>
            </Navbar> */}
            Hello World 
            <Envelope>
                <User name="John" surname="Newbie">
                    <Name name="John" />
                    <Name name="Julia" />
                </User>
            </Envelope>
            
            {/* <AppRouter /> */}
        </AppCanvas>    
        // {/* </Container> */}
    )
}

