import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import trainingService from './services/trainingService';

function Calender() {
    const [trainings, setTrainings] = useState([{
        activity: '',
        name: '',
        date: ''
    }]);

    useEffect(() => getTrainings(), []);

    const getTrainings = () => {
        trainingService
            .getTrainings()
            .then(datas => setTrainings(
                datas.map(data => ({
                    activity: data.activity,
                    name: data.customer.firstname + ' ' + data.customer.lastname,
                    date: data.date
                }))
            ))
            .catch(err => console.error(err))
    }

    return (
        <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={trainings.map(training => ({
                title: training.activity + ' / ' + training.name,
                date: training.date
            }))}
        />
    )
}


export default Calender;