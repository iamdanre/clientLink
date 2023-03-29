import axios from 'axios';
const API_URL = 'http://localhost:8080/api';

export async function getAllClients() {
    const response = await axios
        .get(API_URL + '/clients/all')
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
export async function addClient(client) {
    const response = await axios
        .post(API_URL + '/clients/add', client)
    return response.data;
}
export async function linkContact(clientId, contactId) {
    const response = await axios
        .put(API_URL + '/clients/linkContact', { clientId, contactId })
    return response.data;
}
export async function unlinkContact(clientId, contactId) {
    const response = await axios
        .put(API_URL + '/clients/unlinkContact', { clientId, contactId })
    return response.data;
}