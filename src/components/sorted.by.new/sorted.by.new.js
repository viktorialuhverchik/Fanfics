import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import RenderedStory from '../rendered.story/rendered.story';
import storyService from '../../services/story.service';
import { FormattedMessage } from 'react-intl';

export default class SortedByNew extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stories: null
        };

        this.onDeleteStory = this.onDeleteStory.bind(this);
    }

    async getStories() {
        const stories = await storyService.getStories("date");

        this.setState(() => { 
            return { stories };
        });
    }

    componentDidMount() {
        this.getStories();
    }

    onDeleteStory(storyId) {
        let allStories = this.state.stories;
        let index = allStories.findIndex(story => story.id === storyId);
        allStories.splice(index, 1);
        this.setState({ stories: allStories });
    }

    render() {
        const stories = this.state.stories;
        const userId = this.props.userId;
        
        if (!stories) {
            return (
                <Row>
                    <Col>
                        <Container className="container-page-story">
                            <h4><FormattedMessage id="loading" /></h4>
                        </Container>
                    </Col>
                </Row>
            );
        }
        return (
            <Row>
                <Col>
                    { this.state.stories.map(item => <RenderedStory key={item.id} story={item} userId={userId} onDeleteStory={this.onDeleteStory} />) }
                </Col>
            </Row>
        );
    }
}