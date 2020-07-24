import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import RenderedStory from '../rendered.story/rendered.story';
import storyService from '../../services/story.service';

export default class SortedByRating extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stories: null
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
        const stories = this.state.stories;

        if (!stories) {
            return (
                <Row>
                    <Col>
                        <Container className="container-page-story">
                            <h4>Loading...</h4>
                        </Container>
                    </Col>
                </Row>
            );
        }
        return (
            <Row>
                <Col>
                    { this.state.stories.map(item => <RenderedStory key={item.id} story={item} />) }
                </Col>
            </Row>
        );
    }
}