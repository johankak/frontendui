import 'bootstrap/dist/css/bootstrap.min.css';

import { AppCanvas } from '@hrbolek/uoisfrontend-gql-shared'
// import { FirstEntity } from '../../../packages/moje_knihovna/src/first';
// import { FirstEntity } from '@matejtresnak/provizorni_nazev_1';
import { AppRouter } from './AppRouter';
// import { AppRouter } from './AppRouter';


export const App = () => {
    return (
        <AppCanvas>
            <AppRouter />
        </AppCanvas>    
    )
}