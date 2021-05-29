import React, {useEffect, useState} from 'react';
import { Grid, Loader } from 'semantic-ui-react';
import EventsList from './EventsList';
import { useDispatch, useSelector } from 'react-redux';
import EventListItemPlaceholder from './EventsListItemPlaceHolder';
import EventsFilters from './EventsFilter';
import { fetchEvents } from '../eventsAction';
import EventsFeed from './EventsFeed';
import { RETAIN_STATE } from '../eventsConstants';

export default function EventsDashboard() {
    const limit = 2;
    const dispatch = useDispatch();
    const {events, moreEvents, filter, startDate, lastVisible, retainState} = useSelector(state => state.event);
    const {loading} = useSelector(state => state.async);
    const [loadingInitial, setLoadingInitial] = useState(false);
    const {authenticated} = useSelector((state) => state.auth);



    useEffect(() => {
        if (retainState) return;
        setLoadingInitial(true);
        dispatch(fetchEvents(filter, startDate, limit)).then(() => {
            setLoadingInitial(false);
        });
        return() => {
            dispatch({type: RETAIN_STATE})
        }
    }, [dispatch, filter, startDate, retainState])   

    function handleFetchNextEvents() {
        dispatch(fetchEvents(filter, startDate, limit, lastVisible))
    }

    // if (loading) return <LoadingComponent />
    return (
        <Grid>
            <Grid.Column width={10}>
                {loadingInitial &&
                
                <>
                    <EventListItemPlaceholder/>
                    <EventListItemPlaceholder/>
                </>
                }
                <EventsList
                    events={events}
                    getNextEvents= {handleFetchNextEvents}
                    loading={loading}
                    moreEvents={moreEvents}
                />
                
            </Grid.Column>
            <Grid.Column width={6}>
                {authenticated && 
                <EventsFeed />
                }
                <EventsFilters  loading={loading} />
            </Grid.Column>
            <Grid.Column>
                <Loader active={loading} />
            </Grid.Column>
        </Grid>   
    )
}
