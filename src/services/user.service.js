import axios from "axios";
import api from "../constants";

export default {
    async getUsers() {
        const token = localStorage.getItem('token');
        return axios({
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            url: `${api}/users/all`
        })
        .then(response => response.data);
    },

    getUserById(id) {
        const token = localStorage.getItem('token');
        return axios({
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            url: `${api}/users/${id}`
        })
        .then(response => response.data);
    },

    getStoriesByUserId(id) {
        const token = localStorage.getItem('token');
        return axios({
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        url: `${api}/users/${id}/stories`
    })
    .then(response => response.data);
    },

    deleteUsers(users) {
        const token = localStorage.getItem('token');

        return axios({
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            url: `${api}/users/delete`,
            data: {
                users
            }
        })
        .then(response => response.data)
    },
    blockAndUnblockUsers(users, command) {
        const token = localStorage.getItem('token');
        return axios({
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            url: `${api}/users/update-status`,
            data: {
                users,
                command
            }
        })
        .then(response => response.data)
    },
}