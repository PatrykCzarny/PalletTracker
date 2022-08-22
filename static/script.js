const update = async (obj) => {
    return new Promise(async res => {
        const resp = await fetch('http://localhost:3000/grid/ktw1', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
        res(resp.text())
    })
}


const getLocation = () => {
    if ((window.location.href).includes('list')) {
        console.log('List');


    } else if ((window.location.href).includes('delivery')) {
        console.log('Delivery');

    }
}
getLocation();