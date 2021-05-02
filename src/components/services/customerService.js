const getCustomers = () => {
    return fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
};

const editCustomer = (link, customer) => {
    return fetch(link, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(customer)
    })
}

const deleteCustomer = customer => {
    if (window.confirm('Are you sure you want to delete?')) {
        return fetch(customer.links[0].href, {
            method: 'DELETE'
        })
    }
}

const addTraining = (newTraining, link) => {
    return fetch('https://customerrest.herokuapp.com/api/trainings', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
            "date": newTraining.date,
            "activity": newTraining.activity,
            "duration": newTraining.duration,
            "customer": link
        })
    })
}

const addCustomer = newCustomer => {
    return fetch('https://customerrest.herokuapp.com/api/customers', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(newCustomer)
    })
}

const customerService = {
    getCustomers,
    editCustomer,
    deleteCustomer,
    addTraining,
    addCustomer
}


export default customerService;
