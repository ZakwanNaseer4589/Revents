import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import { listenToEventFromFirestore } from '../../../app/firestore/firestoreService';
import useFirestoreDoc from '../../../app/hooks/useFirestoreDoc';
import EventsDetailedChat from './EventsDetailedChat';
import EventsDetailedHeader from './EventsDetailedHeader';
import EventsDetailedInfo from './EventsDetailedInfo';
import EventsDetailedSidebar from './EventsDetailedSidebar';
import {listenToSelectedEvent} from '../eventsAction';
import LoadingComponent from '../../../app/layout/LoadingComponent'
import { Redirect } from 'react-router';

export default function EventsDetailed({match}) {

    const dispatch = useDispatch();
    const {currentUser} = useSelector((state) => state.auth);
    const event = useSelector(state => state.event.selectedEvent);
    const {loading, error} = useSelector((state) => state.async);
    const isHost = event?.hostUid === currentUser?.uid;
    const isGoing = event?.attendees?.some(a => a.id === currentUser?.uid);


    useFirestoreDoc({
        query: () => listenToEventFromFirestore(match.params.id),
        data: (event) => dispatch(listenToSelectedEvent(event)),
        deps: [match.params.id, dispatch]
    });

    if (loading || (!event && !error))
     return <LoadingComponent content='Loading event ......' />;

    if(error) return <Redirect to='/error' />;


    return(
        <Grid>
            <Grid.Column width={10}>
                <EventsDetailedHeader event={event} isGoing={isGoing} isHost={isHost} />
                <EventsDetailedInfo event={event} />
                <EventsDetailedChat eventId={event.id} />
            </Grid.Column>
            <Grid.Column width={6}>
                <EventsDetailedSidebar attendees={event?.attendees} hostUid={event.hostUid} />
            </Grid.Column>
        </Grid>
    )
}