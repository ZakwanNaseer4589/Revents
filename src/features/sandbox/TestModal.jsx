import React from 'react';
import ModalWrapper from '../../app/common/modal/ModalWrapper';


export default function TestModal ({data}){

    return(
        <ModalWrapper size='mini' header='test modal'>
            <div> the data is :{data} </div>
        </ModalWrapper>
    )
}