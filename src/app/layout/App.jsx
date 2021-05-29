import React from 'react';
import { Route, useLocation } from 'react-router';
import { Container } from 'semantic-ui-react';
import EventsDashboard from '../../features/events/eventsDashboard/EventsDashboard';
import NavBar from '../../features/nav/NavBar';
import HomePage from '../../features/home/HomePage';
import EventsDetailed from '../../features/events/eventsDetailed/EventsDetailed';
import EventsForm from '../../features/events/eventsform/EventsForm';
import Sandbox from '../../features/sandbox/Sandbox';
import ModalManager from '../common/modal/ModalManager';
import { ToastContainer } from 'react-toastify';
import ErrorComponent from '../common/errors/ErrorComponent';
import AccountPage from '../../features/auth/AccountPage';
import { useSelector } from 'react-redux';
import LoadingComponent from './LoadingComponent';
import ProfilePage from '../../features/profile/profilePage/ProfilePage';
import PrivateRoute from './PrivateRoute';



function App() {

    const {key} = useLocation();
    const {initialized} = useSelector((state) => state.async);

    if (!initialized) return <LoadingComponent content='Loading app .....' />

    return (
        <>

            <ModalManager />
            <ToastContainer position='bottom-right' />
            <Route exact path='/' component={HomePage} />

            <Route 
            path={'/(.+)'} 
            render={() => (
                <>
                    <NavBar />
                    <Container className='main'>
                    <Route exact path='/events' component={EventsDashboard} />
                    <Route exact path='/sandbox' component={Sandbox} />
                    <Route path='/events/:id' component={EventsDetailed} />
                    <PrivateRoute path={['/createEvent', '/manage/:id']} component={EventsForm} key={key} />
                    <PrivateRoute path='/account' component={AccountPage} />
                    <PrivateRoute path='/profile/:id' component={ProfilePage} />
                    <Route path='/error' component={ErrorComponent} />

                    </Container>
                </>

            )} />
            
        </>
        
    );
}
export default App;