/* global google */
import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button, Header, Segment, Confirm } from 'semantic-ui-react';
import {useDispatch, useSelector} from 'react-redux'
import { clearSelectedEvent, listenToEvents, listenToSelectedEvent } from '../eventsAction'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { categoryData } from '../../../app/api/categoryOption';
import MyDateInput from '../../../app/common/form/MyDateInput';
import MyPlaceInput from '../../../app/common/form/MyPlaceInput';
import useFirestoreDoc from '../../../app/hooks/useFirestoreDoc';
import { addEventToFirestore, cancelEventToggle, listenToEventFromFirestore, updateEventInFirestore } from '../../../app/firestore/firestoreService';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { toast } from 'react-toastify';


export default function EventsForm({ match, history, location }) {
    
    const dispatch = useDispatch();
    const [loadingCancel, setLoadingCancel] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const {selectedEvent} = useSelector(state => state.event);
    const {loading, error} = useSelector(state => state.async);

    useEffect(() => {
        if (location.pathname !== '/createEvent') return;
        dispatch(clearSelectedEvent());
    },[dispatch, location.pathname] )


    const initialValues = selectedEvent ?? {
        title: '',
        category: '',
        description: '',
        city: {
            address: '',
            latLng: null
        },
        venue: {
            address: '',
            latLng: null
        },
        date: ''
    }

    const validationSchema = Yup.object({
        title: Yup.string().required('you must provide a title'),
        category: Yup.string().required('you must provide a category'),
        description: Yup.string().required(),
        city: Yup.object().shape({
            address: Yup.string().required('city is required')
        }),
        venue:  Yup.object().shape({
            address: Yup.string().required('venue is required')
        }),
        date: Yup.string().required()
    });


    async function handleCancelToggle(event) {
        setConfirmOpen(false);
        setLoadingCancel(true);
        try{
            await cancelEventToggle(event);
            setLoadingCancel(false);
        }catch(error){
            setLoadingCancel(true);
            toast.error(error.message);
        }
    }

    useFirestoreDoc({
        shouldExecute: match.params.id !== selectedEvent?.id && location.pathname !== '/createEvent' ,
        query: () => listenToEventFromFirestore(match.params.id),
        data: (event) => dispatch(listenToSelectedEvent(event)),
        deps: [match.params.id, dispatch],
    });

    if (loading) 
    return <LoadingComponent content='Loading event ......' />

    if(error) return <Redirect to='/error' />

    return (
        <Segment clearing>

        <Formik
        enableReinitialize
        initialValues = {initialValues}
        validationSchema={validationSchema}

        onSubmit = {async (values, {setSubmitting}) => {
            try{
                selectedEvent
            ? await updateEventInFirestore(values)
            : await addEventToFirestore(values);
            setSubmitting(false);
            history.push('/events')
            }catch (error){
                toast.error(error.message);
                setSubmitting(false);
            }  
        }}
        >

            {({isSubmitting, dirty, isValid, values}) =>
            
            <Form className='ui form'>
            <Header sub color='teal' content='Event Details'/>
            <MyTextInput name='title' placeholder='Event Title' />
            <MySelectInput name='category' placeholder='Event category' options={categoryData} />
            <MyTextArea name='description' placeholder='Event description' />
            <Header sub color='teal' content='Event Location Details'/>
            <MyPlaceInput name='city' placeholder='Event city' />
            <MyPlaceInput 
            name='venue'
            // disabled={!values.city.latLng} 
            placeholder='Event venue'
            options= {{
                location: new google.maps.LatLng(values.city.latLng),
                radius: 1000,
                types:['establishment']
            }}
            />
            <MyDateInput 
                name='date'
                placeholderText='Event date'
                timeFormat='HH:mm'
                showTimeSelect
                timeCaption='time'
                dateFormat='MMMM d, yyyy h:mm a'
                />

            {selectedEvent &&
            <Button 
                loading={loadingCancel}
                type='button' 
                floated='left' 
                color={selectedEvent.isCancelled ? 'green' : 'red'}
                content={selectedEvent.isCancelled ? 'Reactivate event' : 'Cancel Event'}
                onClick={() => setConfirmOpen(true)} />}


            <Button
                loading={isSubmitting}
                disabled={!isValid || !dirty || isSubmitting} 
                type='submit' 
                floated='right' 
                positive 
                content='Submit' />
            <Button 
            disabled={isSubmitting}
            as={Link} to={'/events'}
            // onClick={() => setFormOpen(false)} 
            type='submit' 
            floated='right' 
            content='cancel' />

            </Form>


            }
          

        </Formik>
        
            <Confirm
            content={selectedEvent?.isCancelled ? 'this will reactivate the event are you sure' : 
            'this will cancel the event are you sure'}
            open={confirmOpen}
            onCancel={() => setConfirmOpen(false)}
            onConfirm={() => handleCancelToggle(selectedEvent)}
            />

            

        </Segment>
    )
}