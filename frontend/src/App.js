import AddUser from './components/addEvent/addEvent';
import styled from 'styled-components'
import TableEvents from './components/tableEvents/tableEvents';
import { useCallback, useEffect, useState } from 'react';
import EditEvent from './components/editEvent/editEvent';
import { SERVER_URL } from './settings/constants';
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


    const onSelect = (eventId) => {
        const allEvents = [...events]
        console.log(allEvents)
        const eventSelect = allEvents.map((event) => {
            return event.logs.map((log) => log.id == eventId ? log.selected = true : log.selected = false)})
        setEvents(allEvents)

        console.log(eventId)
        setSelectEvent(eventId)
    }

    const onChangeEvent = () => {
        const editEvent = events.find(item => item.id == selectEvent)
        setChangeEvent(editEvent)
    }

    const doFetch = useCallback(() => {
        setLoading(true)
        fetch(`${SERVER_URL}/events`)
            .then(require => require.json())
            .then(events => {
                setEvents(events)
                setLoading(false)
            })
    }, [])

    const onChange = (e) => {
        const editEvent = { ...changeEvent }
        editEvent[e.target.name] = e.target.value
        setChangeEvent(editEvent)
    }

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
                console.log('ooo')
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
    useEffect(() => {
        doFetch()
    }, [doFetch, submit])


    if (loading) {
        return <Loader>...loading</Loader>
    }

    console.log(events)
    return (
        <Container>
            <AddUser
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
                /> :
                null
            }
            {changeEvent ?
                <EditEvent
                    changeEvent={changeEvent}
                    setChangeEvent={setChangeEvent}
                    onChange={onChange}
                    updateEvent={updateEvent}
                /> :
                null
            }
        </Container>
    );
}

export default App;
