import axios from "axios";

// let stories = [
//     {
//         id: 1,
//         heading: 'Test heading',
//         genre: 'Test genre',
//         description: 'Blablabla',
//         chapter: 'Chapter1',
//         descriptionChapter: 'Description1',
//         image: 1,
//         likes: 5,
//         tags: 'test',
//         rating: 3
//     },
//     {
//         id: 2,
//         heading: 'Shadows',
//         genre: 'Horror',
//         description: 'HELL O',
//         chapter: 'Chapter1',
//         descriptionChapter: 'Description1',
//         image: 2,
//         likes: 3,
//         tags: '666',
//         rating: 5
//     }
// ];

export default {
    // getStories(filters) {
    //     let _stories = stories;

    //     if (filters.sortBy) {
    //         _stories = stories.sort((a, b) => b.rating - a.rating);
    //     }

    //     return Promise.resolve(_stories);
    // },

    // createStory(story) {
    //     story.id = stories[stories.length-1].id + 1;
    //     stories.push(story);

    //     return Promise.resolve();
    // },

    createStory(heading, description, genre, chapters, tags) {
        const token = localStorage.getItem('token');
        return axios({
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            url: 'http://192.168.0.12:3000/api/stories/create',
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
        const token = localStorage.getItem('token');
        return axios({
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        url: 'http://192.168.0.12:3000/api/stories/all'
    })
    .then(response => response.data);
    },

    getStoryById(storyId) {
        const token = localStorage.getItem('token');

        return axios({
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        url: `http://192.168.0.12:3000/api/stories/${storyId}`
    })
    .then(response => response.data);
    },

    getTags() {
        const token = localStorage.getItem('token');
        return axios({
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            url: 'http://192.168.0.12:3000/api/tags/all'
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
            url: 'http://192.168.0.12:3000/api/genres/all'
        })
        .then(response => response.data);
    }
}