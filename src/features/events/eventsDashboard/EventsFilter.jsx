import React from 'react';
import Calendar from 'react-calendar';
import { useDispatch, useSelector } from 'react-redux';
import { Header, Menu } from 'semantic-ui-react';
import { setFilter, setStartDate } from '../eventsAction';


export default function EventsFilters({loading}){
    const dispatch = useDispatch();
    const {authenticated} = useSelector((state) => state.auth)
    const {filter, startDate} = useSelector((state) => state.event);
    return(
        <>
            {authenticated && 
            <Menu vertical size='large' style={{width: '100%'}}>
                <Header icon='filter' attached color='teal' content='filters' />
                <Menu.Item
                active={filter === 'all'}
                onClick={() => dispatch(setFilter('all'))}
                disabled={loading} 
                content='All Events'/>

                <Menu.Item
                active={filter === 'isGoing'}
                onClick={() => dispatch(setFilter('isGoing'))}
                disabled={loading} 
                content='I am going' />

                <Menu.Item
                active={filter === 'isHost'}
                onClick={() => dispatch(setFilter('isHost'))}
                disabled={loading} 
                content='I am hosting' />
            </Menu>}
            <Header icon='calendar' attached color='teal' content='Select Date' />
            <Calendar
            onChange={(date) => dispatch(setStartDate(date))}
            value={startDate || new Date()}
            tileDisabled={() => loading}
            />

        </>
    )

}