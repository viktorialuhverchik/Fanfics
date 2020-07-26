import axios from "axios";
import api from "../constants";

export default {
    createStory(heading, description, genre, chapters, tags) {
        const token = localStorage.getItem('token');
        return axios({
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            url: `${api}/stories/create`,
            data: {
                heading, 
                description, 
                genre, 
                chapters,
                tags
            }
        })
        .then(response => response.data);
    },

    getStories(sortBy) {
        return axios({
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            url: `${api}/stories/all`,
            params: {
                sortBy
            }
        })
        .then(response => response.data);
    },

    getStoryById(storyId, userId) {
        return axios({
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            url: `${api}/stories/${storyId}`,
            params: {
                userId
            }
        })
        .then(response => response.data);
    },

    getTags() {
        return axios({
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            url: `${api}/tags/all`
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
            url: `${api}/genres/all`
        })
        .then(response => response.data);
    },

    addComment(text, storyId) {
        const token = localStorage.getItem('token');
        return axios({
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            url: `${api}/stories/${storyId}/comment`,
            data: {
                text,
                storyId
            }
        })
        .then(response => {
            return response.data;
        });
    },

    changeRating(storyId, rating) {
        const token = localStorage.getItem('token');
        return axios({
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            url: `${api}/stories/${storyId}/rating`,
            data: {
                storyId,
                rating
            }
        })
        .then(response => {
            return response.data;
        });
    },

    deleteStory(story) {
        const token = localStorage.getItem('token');

        return axios({
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            url: `${api}/stories/${story.id}`
        })
        .then(response => response.data)
    }
}