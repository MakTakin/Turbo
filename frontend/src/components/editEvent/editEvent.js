import React from 'react'
import styled from 'styled-components'
import Form from '../form/form';


const ModalWindow = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.7);
     > div {
        background:#fff;
       margin: 50px auto;
       max-width: 80%;
       max-height: 100%;
       box-shadow: 3px 5px 7px rgba(0,0,0,0.5);
    }
    
    // @media screen and (max-width: 1200px) {
    //     div {
    //         max-width:80%;
    //     }
    // }
    // @media screen and (max-width: 1020px) {
    //     div {
    //         margin:90px auto;
    //         > button {
    //             padding:0;
    //         }
    //     }
    // }
    //
    // @media screen and (max-width: 760px) {
    //     div {
    //         max-width:90%;
    //         margin:120px auto;
    //     }
    // }
    //
    // @media screen and (max-width: 470px) {
    //     div {
    //         max-width:100%;
    //         > img {
    //             max-width: 70%;    
    //         }
    //     }
    // }
`
const EditEvent = (props) => {
    const closeModal = (event) => {
        console.log(event)
        if (event.target.id == 'close') {
            props.setChangeEvent(null)
        }
    }

    return (
        <ModalWindow id='close' onClick={closeModal}>
            <Form
                event={props.changeEvent}
                onChange={props.onChange}
                saveEvent={props.updateEvent}
                textButton='Изменить'
                heading='Изменить событие'
            />
        </ModalWindow>
    )
}
export default EditEvent