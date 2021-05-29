import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Label, List, Segment} from 'semantic-ui-react';
import EventsListAttende from './EventsListAttende';
import {format} from 'date-fns';
import { deleteEventInFirestore } from '../../../app/firestore/firestoreService';

export default function EventsListItem({event}) {

    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src={event.hostPhotoURL} />
                        <Item.Content>
                            <Item.Header content={event.title} />
                            <Item.Description>
                                Hosted by <Link to={`/profile/${event.hostUid}`}>
                                    {event.hostedBy}
                                    </Link> 
                            </Item.Description>
                            {event.isCancelled && (
                                <Label
                                style={{top: '-40px'}}
                                ribbon='right'
                                color='red'
                                content='this event has been cancelled' />
                            )}
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock' />{format(event.date, 'MMMM d, yyyy h:mm a')}
                    <Icon name='marker' />{event.venue.address}
                </span>
            </Segment>
            <Segment secondary>
                <List horizontal>

                    {event.attendees.map(attendee =>
                    (
                    <EventsListAttende key={attendee.id} attendee={attendee} />    
                        ))}
                </List>
            </Segment>
            <Segment clearing>
                <div>{event.description}</div>

                <Button
                    as={Link} to={`/events/${event.id}`}
                    // onClick={() => selectEvent(event)} 
                    color='teal'
                    floated='right'
                    content='view' />
            </Segment>
        </Segment.Group>
    )
}