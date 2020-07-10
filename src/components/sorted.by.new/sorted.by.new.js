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
                <Row>
                    <Col>
                        {/* <Button 
                            className="form-btn-add-story"
                            type="button"
                            outline
                            color="primary"
                            onClick={() => {
                                this.getStories('rating');
                            }}>
                                <FormattedMessage id="sorted-by-new" />
                        </Button> */}
                            { this.state.stories.map(item => <RenderedStory key={item.id} story={item} />) }
                    </Col>
                </Row>
        );
    }
}