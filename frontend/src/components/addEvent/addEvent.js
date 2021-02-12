import React, { useState } from 'react'
import Form from '../form/form';
import { SERVER_URL } from '../../settings/constants';

const AddEvent = (props) => {
    const [event, setEvent] = useState({
        username: '',
        firstname: '',
        lastname: '',
        user_id: '',
        event_name: 'site',
        event: {
            event_time: ''
        }
    })

    const onChange = (e) => {
        const newEvent = { ...event }
        newEvent[e.target.name] = e.target.value
        if (e.target.name == 'event') {
            newEvent[e.target.name].event_time = e.target.value
        }
        setEvent(newEvent)
    }

    const saveEvent = async (e) => {
        e.preventDefault()
        props.setSubmit(true)
        fetch(`${SERVER_URL}/events/add`, {
            method: 'POST',
            body: JSON.stringify(event),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                props.setSubmit(false)
            }
        })
    }
    return (
        <Form
            event={event}
            onChange={onChange}
            saveEvent={saveEvent}
            textButton='Добавить'
            heading='Добавить новое событие'
        />
    )
}
export default AddEvent