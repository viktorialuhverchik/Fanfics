import axios from "axios";

let stories = [
    {
        id: 1,
        heading: 'Test heading',
        genre: 'Test genre',
        description: 'Blablabla',
        tags: 'test',
        rating: 3
    },
    {
        id: 2,
        heading: 'Shadows',
        genre: 'Horror',
        description: 'HELL O',
        tags: '666',
        rating: 5
    }
];

export default {
    getStories(filters) {
        let _stories = stories;

        if (filters.sortBy) {
            _stories = stories.sort((a, b) => b.rating - a.rating);
        }

        return Promise.resolve(_stories);
    },

    createStory(story) {
        story.id = stories[stories.length-1].id + 1;
        stories.push(story);

        return Promise.resolve();
    }
}