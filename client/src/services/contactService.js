import axios from 'axios';
const API_URL = 'http://localhost:8080/api';

export async function getAllContacts() {
    const response = await axios
        .get(API_URL + '/contacts/all')
    return response.data.sort((a, b) => {
        let nameA = a.name.toUpperCase();
        let nameB = b.name.toUpperCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });
}

export async function addContact(client) {
    const response = await axios
        .post(API_URL + '/contacts/add', client)
    return response.data;
}

export async function linkClient(contactId, clientId) {
    const response = await axios
        .put(API_URL + '/contacts/linkClient', { clientId, contactId })
    return response.data;
}

export async function unlinkClient(contactId, clientId) {
    const response = await axios
        .put(API_URL + '/contacts/unlinkClient', { clientId, contactId })
    return response.data;
}