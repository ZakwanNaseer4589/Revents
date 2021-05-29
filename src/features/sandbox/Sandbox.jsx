import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'semantic-ui-react';
import { openModal } from '../../app/common/modal/modalReducer';
import TestMap from './TestMap';
import TestPlaceInput from './TestPlaceInput';
import { decrement, increment } from './testReducer';


export default function Sandbox(){

    const dispatch = useDispatch();
    const [target, setTarget] =  useState(null);
    const data = useSelector(state => state.test.data)
    const {loading} = useSelector((state) => state.async)

    const defaultProps = {
        center: {
          lat: 59.95,
          lng: 30.33
        },
        zoom: 11
      };


      const [location, setLoacation] = useState(defaultProps);

      function handleSetLocation(latLng){
          setLoacation({...location, center: {lat: latLng.lat, lng: latLng.lng}})
      }


    return(
        <>
        
        <h1>testing 123</h1>
        <h2>the data is: {data} </h2>
        
        <Button
        name= 'increment' 
        loading ={loading && target === 'increment'} 
        onClick={(e) => {
          dispatch(increment(20));
          setTarget(e.target.name)
        }} 
        content='increment' 
        color='green' 
        
        />
        <Button
        name= 'decrement' 
        loading ={loading && target === 'decrement'} 
        onClick={(e) => {
          dispatch(decrement(10));
          setTarget(e.target.name)
        }} 
        content='decrement' 
        color='red' 
        
        />
        <Button onClick={() => dispatch(openModal({modalType: 'TestModal', modalProps: { data }}))} 
        content='open Modal' color='teal' />

        <div style={{marginTop: 15}}>
        <TestPlaceInput setLoacation={handleSetLocation} />
        <TestMap location={location} />
        </div>

        </>
    )
}