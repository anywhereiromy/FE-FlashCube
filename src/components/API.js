import axios from 'axios';

const domain = 'https://flashcube-back-end.herokuapp.com'

//added in this function?
export function createUserinNeo4jWithFirebaseID(userId, name) {
    return axios
    .post(`${domain}/api/users`, {
        uid: userId,
        name: name,
        photoURL: "https://secure.img2-fg.wfcdn.com/im/44896032/resize-h600-w600%5Ecompr-r85/1902/1902870/Stainless+Steel+Cube+End+Table.jpg"
    })
    .then(res => {
        console.log(res);
    })
    .catch(console.log);
}

export function getUserById(userId) {

    console.log(userId)

    console.log(`${domain}/api/users/${userId}`)

    return axios
        .get(`${domain}/api/users/${userId}`, )
        .then(res => {
            console.log(res); //this is returning an empty array as the response data has an empty array de
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
            console.log(res)
        })
        .catch(console.log)
}

export function removeFavourite(userId, topicTitle) {

    return axios
        .delete(`${domain}/api/topics/fave/${userId}/${topicTitle}`)
        .then(res => {
            console.log(res)
        })
        .catch(console.log)
}
