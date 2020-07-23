import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'reactstrap';
import storyService from '../../services/story.service';
import './tags.css';

export default class Tags extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tags: []
        }
    }

    async componentDidMount() {
        const tags = await storyService.getTags();
        this.setState({ tags });
    }

    render() {
        let tags = this.state.tags;
        return (
            <Container className="container-tags">
                {tags.map(tag => { return (
                    <Link key={tag.id} className="tag-link">{tag.name}</Link>
                );})}
            </Container>
        );
    }
}