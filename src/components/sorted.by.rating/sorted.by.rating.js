import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Row, Col, Button } from 'reactstrap';
import RenderedStory from '../rendered.story/rendered.story';
import storyService from '../../services/story.service';

export default class SortedByRating extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stories: []
        };
    }

    async getStories() {
        const stories = await storyService.getStories();

        this.setState({ stories });
    }

    componentDidMount() {
        this.getStories();
    }

    render() {
        return (
            <Row>
                <Col>
                    { this.state.stories.map(item => <RenderedStory key={item.id} story={item} />) }
                </Col>
            </Row>
        );
    }
}