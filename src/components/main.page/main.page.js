import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import SortedByRating from '../sorted.by.rating/sorted.by.rating';
import storyService from '../../services/story.service';

export default class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stories: []
        };
    }

    // async getStories(sortBy) {
    //     const stories = await storyService.getStories({ sortBy });

    //     this.setState(() => { 
    //         return { stories };
    //     });
    // }

    // componentDidMount() {
    //     this.getStories();
    // }

    render() {
        return (
            <Row>
                <Col>
                    <SortedByRating />
                </Col>
            </Row>
        );
    }
  }