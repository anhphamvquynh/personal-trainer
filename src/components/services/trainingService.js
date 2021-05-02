const getTrainings = () => {
    return fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
}

const deleteTraining = training => {
    if (window.confirm('Are you sure you want to delete?')) {
        return fetch('https://customerrest.herokuapp.com/api/trainings/' + training.id, {
            method: 'DELETE'
        })
    }
}

const trainingService = {
    getTrainings,
    deleteTraining
}


export default trainingService;