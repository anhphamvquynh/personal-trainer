import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Text } from 'recharts';
import trainingService from './services/trainingService';

const _ = require('lodash');

const CustomizedLabel = () => {
    return (
        <Text
            x={100}
            y={-20}
            dx={-300}
            dy={40}
            transform="rotate(-90)"
        >
            Duration(min)
        </Text>
    );
};

function Statistic() {
    const [trainings, setTrainings] = useState([]);

    useEffect(() => getTrainings(), []);

    const getTrainings = () => {
        trainingService
            .getTrainings()
            .then(datas => setTrainings(
                datas.map(data => ({
                    training: data.activity,
                    duration: data.duration
                }))
            ))
            .catch(err => console.error(err))
    }

    const result = _(trainings)
        .groupBy(x => x.training)
        .map((value, key) => ({
            training: key,
            total: _.sumBy(value, 'duration')
        }))
        .value()

    return (
        <BarChart width={600} height={300} data={result}>
            <XAxis dataKey='training' />
            <YAxis label={<CustomizedLabel />} />
            <Bar
                dataKey="total" fill='#aca9cf'
            />
        </BarChart>
    )
}

export default Statistic;