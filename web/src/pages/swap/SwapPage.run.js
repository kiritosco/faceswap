import axios from 'axios';

export const submitRequest = (photoOne, photoTwo, setSubmittedStateMethod) => {
    setSubmittedStateMethod({
        submitted: true
    });

    axios.post(`${process.env.REACT_APP_API_URL}/v1/swap`, {
        photoOne,
        photoTwo
    })
        .then(res => {
            setSubmittedStateMethod({
                result: res.data.msg,
                submitted: false
            })
        })
        .catch(err => {
            setSubmittedStateMethod({
                err: err.response,
                submitted: false
            })
        })
};