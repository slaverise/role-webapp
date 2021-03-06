import React, {useEffect, useState, useContext} from 'react'
import UpdaterContext from '../../UpdaterContext'

const Event = ({event}) => {
    const {timestamp, type, body} = event

    const formatTimestamp = timestamp => {
        return (new Date(timestamp)).toISOString().slice(11,19)
    }
    return (<div className={`${BASE}-message`}>
        <span className={`${BASE}-message-timestamp`}>{formatTimestamp(timestamp)}</span>
        <span className={`${BASE}-message-type`}>{type}</span>
        <span className={`${BASE}-message-body`}>{JSON.stringify(event.body)}</span>
    </div>)
}

const BASE = 'eventLog'
const EventLog = () => {
    const [events, setEvents] = useState([])
    const {container, TYPES} = useContext(UpdaterContext)

    useEffect(()=> {
        const updateService = container.get(TYPES.UpdateService)
        updateService.on(event => {
            console.log('event recieved', event)
            setEvents(prev => [event, ...prev])
        })
    }, [])

    return (   
        <div className={BASE}>
            { 
                events?.map((event, index) => {
                    return <Event event={event} key={index}/>
                })
            }
        </div>)
}

export default EventLog