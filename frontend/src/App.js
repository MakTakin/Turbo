import { useCallback, useEffect, useState } from 'react';
import { SERVER_URL } from './settings/constants';
import styled from 'styled-components'
import TableEvents from './components/tableEvents/tableEvents';
import EditEvent from './components/editEvent/editEvent';
import AddEvent from './components/addEvent/addEvent';
import { Loader } from './components/ui/loader';

const Container = styled.div`
    max-width:1200px;
    margin: 0 auto;
`

function App() {
    const [selectEvent, setSelectEvent] = useState(false)
    const [changeEvent, setChangeEvent] = useState(null)
    const [loading, setLoading] = useState(false)
    const [submit, setSubmit] = useState(false)
    const [events, setEvents] = useState([])

    const doFetch = useCallback(() => {
        setLoading(true)
        fetch(`${SERVER_URL}/events`)
            .then(require => require.json())
            .then(events => {
                setEvents(events)
                setLoading(false)
            })
    }, [])

    useEffect(() => {
        doFetch()
    }, [doFetch, submit])

    const updateEvent = async (e) => {
        e.preventDefault()
        setSubmit(true)
        fetch(`${SERVER_URL}/events/update`, {
            method: 'POST',
            body: JSON.stringify(changeEvent),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(response => {
            console.log(response)
            if (response.ok) {
                setChangeEvent(null)
                setSubmit(false)
            }
        })
    }

    const deleteEvent = async () => {
        setSubmit(true)
        fetch(`${SERVER_URL}/events/delete`, {
            method: 'POST',
            body: JSON.stringify({ selectEvent }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                setChangeEvent(null)
                setSubmit(false)
            }
        })
    }

    const onChangeEvent = () => {
        const editEvent = events.find(event => {
            return event.logs.find(log => log.id == selectEvent)
        })
        const event_name = editEvent.logs[0].event.name
        const event_time = editEvent.logs[0].event_time
        setChangeEvent({ ...editEvent, event_name, event_time })
    }

    const onChange = (e) => {
        const editEvent = { ...changeEvent }
        editEvent[e.target.name] = e.target.value
        setChangeEvent(editEvent)
    }

    const onSelect = (eventId) => {
        const allEvents = [...events]
        allEvents.map((event) => {
            return event.logs.map((log) => {
                return log.id == eventId ? log.selected = true : log.selected = false
            })
        })
        setEvents(allEvents)
        setSelectEvent(eventId)
    }

    const dateFormat = (data) => {
        const event_time = new Date(data)
        const time = event_time.toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })
        return time
    }

    if (loading) {
        return <Loader>...loading</Loader>
    }

    return (
        <Container>
            <AddEvent
                submit={submit}
                setSubmit={setSubmit}
                onChange={onChange}
            />
            {events.length > 0 ?
                <TableEvents
                    selectEvent={selectEvent}
                    events={events}
                    onSelect={onSelect}
                    onChangeEvent={onChangeEvent}
                    deleteEvent={deleteEvent}
                    submit={submit}
                    setSubmit={setSubmit}
                    dateFormat={dateFormat}
                /> :
                null
            }
            {changeEvent ?
                <EditEvent
                    changeEvent={changeEvent}
                    setChangeEvent={setChangeEvent}
                    onChange={onChange}
                    updateEvent={updateEvent}
                    selectEvent={selectEvent}
                /> :
                null
            }
        </Container>
    );
}

export default App;
