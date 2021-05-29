import React from 'react';
import EventsListItem from './EventsListItem';
import InfiniteScroll from 'react-infinite-scroller';


export default function EventsList({events, getNextEvents, loading, moreEvents}) {
    return (
        <>
        {events.length !== 0 && (
            <InfiniteScroll
            pageStart={0}
            loadMore={getNextEvents}
            hasMore={!loading && moreEvents}
            initialLoad={false}
            >
                {events.map(event => (
                <EventsListItem
                    event={event}
                    key={event.id}
                />
            ))}
            </InfiniteScroll>
        )}
        </>
    )
}