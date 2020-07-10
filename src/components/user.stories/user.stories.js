import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import RenderedStory from '../rendered.story/rendered.story';
import storyService from '../../services/story.service';

export default class UserStories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stories: []
        };
    }

    async getStories(sortBy) {
        const stories = await storyService.getStories({ sortBy });

        this.setState(() => { 
            return { stories };
        });
    }

    componentDidMount() {
        this.getStories();
    }

    render() {
        return (
            <>
                { this.state.stories.map(item => <RenderedStory key={item.id} story={item} />) }
            </>
        );
    }
}