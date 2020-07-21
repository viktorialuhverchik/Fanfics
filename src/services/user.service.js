import axios from "axios";

export default {
    async getUsers() {
        const token = localStorage.getItem('token');
        return axios({
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            url: 'http://192.168.0.12:3000/api/users/all'
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
            url: 'http://192.168.0.12:3000/api/users/delete',
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
            url: 'http://192.168.0.12:3000/api/users/update-status',
            data: {
                users,
                command
            }
        })
        .then(response => response.data)
    },
}