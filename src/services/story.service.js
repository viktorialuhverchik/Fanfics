import axios from "axios";


export default {
    createStory(heading, description, genre, chapters, tags) {
        const token = localStorage.getItem('token');
        return axios({
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            url: 'https://fanfics-backend.herokuapp.com/api/stories/create',
            data: {
                heading, 
                description, 
                genre, 
                chapters,
                tags
            }
        })
        .then(response => {
            return response.data;
        });
    },

    getStories() {
        return axios({
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        url: 'https://fanfics-backend.herokuapp.com/api/stories/all'
    })
    .then(response => response.data);
    },

    getStoryById(storyId) {
        return axios({
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        url: `https://fanfics-backend.herokuapp.com/api/stories/${storyId}`
    })
    .then(response => response.data);
    },

    getTags() {
        return axios({
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            url: 'https://fanfics-backend.herokuapp.com/api/tags/all'
        })
        .then(response => response.data);
    },

    getGenres() {
        const token = localStorage.getItem('token');
        return axios({
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            url: 'https://fanfics-backend.herokuapp.com/api/genres/all'
        })
        .then(response => response.data);
    }
}