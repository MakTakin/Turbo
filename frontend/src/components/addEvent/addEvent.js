import React, { useState } from 'react'
import { SERVER_URL } from '../../settings/constants';
import Form from '../form/form';

const AddEvent = (props) => {
    const [event, setEvent] = useState({
        username: '',
        firstname: '',
        lastname: '',
        id: '',
        event_name: 'site',
        event_time: '',
        error: ''
    })

    const onChange = (e) => {
        const newEvent = { ...event, error: '' }
        newEvent[e.target.name] = e.target.value
        setEvent(newEvent)
    }

    const validation = (id) => {
        const FormValid = id > 0 && id < 10 ? true : false
        if (!FormValid) {
            const error = 'Введите id от 1 до 10'
            setEvent({ ...event, error })
        }
        return FormValid
    }

    const saveEvent = async (e) => {
        e.preventDefault()
        if (!validation(event.id)) {
            return
        }
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
            error={event.error}
        />
    )
}
export default AddEvent