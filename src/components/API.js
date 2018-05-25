import axios from 'axios';

const domain = 'https://flashcube-back-end.herokuapp.com'

//added in this function?
export function createUserinNeo4jWithFirebaseID(userId, name) {
    console.log(userId, name);
    return axios
    .post(`${domain}/api/users`, {
        uid: userId,
        displayName: name,
        photoURL: "https://secure.img2-fg.wfcdn.com/im/44896032/resize-h600-w600%5Ecompr-r85/1902/1902870/Stainless+Steel+Cube+End+Table.jpg"
    })
    .then(res => {
        console.log("API, response from create user :  ", res);
        return res.data.result.records[0]._fields[0].properties;
    })
    .catch(console.log);
}

export function getUserById(userId) {

    console.log("API, getbyuserid userid :  ", userId);

    console.log("API, getbyuserid url :  ", `${domain}/api/users/${userId}`)

    return axios
        .get(`${domain}/api/users/${userId}`, )
        .then(res => {
            console.log("API, response from getuserbyid :  ", res); //this is returning an empty array as the response data has an empty array de
            return res.data.result.records;
        })
        .catch(console.log);

}

export function getAllTopics() {

    return axios
        .get(`${domain}/api/topics`, )
        .then(res => {
            return res.data.result.records;
        })
        .catch(console.log);

}

export function getAllTerms() {

    return axios
        .get(`${domain}/api/terms`, )
        .then(res => {
            return res.data.result.records;
        })
        .catch(console.log);

}

export function createFavourite(userId, topicTitle) {

    return axios
        .put(`${domain}/api/topics/${userId}/${topicTitle}`)
        .then(res => {
            return axios
                .put(`${domain}/api/topics/fave/${userId}/${topicTitle}`)

        })
        .then(res => {
            console.log("API, response from create favourite :  ", res)
        })
        .catch(console.log)
}

export function removeFavourite(userId, topicTitle) {

    return axios
        .delete(`${domain}/api/topics/fave/${userId}/${topicTitle}`)
        .then(res => {
            console.log("API, response from remove favourite :  ", res)
        })
        .catch(console.log)
}
