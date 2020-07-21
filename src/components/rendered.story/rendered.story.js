import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import './rendered.story.css';

export default class RenderedStory extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            story: props.story
        };

        this.handleClickComments = this.handleClickComments.bind(this);
        this.handleClickRating = this.handleClickRating.bind(this);
    }

    async componentDidMount() {}

    handleClickComments() {
        console.log('Click Comments');
    }

    handleClickRating() {
        console.log('Click Rating');
    }

    render() {
        const story = this.state.story;

        return (
            <Container className="container-story">
                <Row>
                    <Col xs={12} md={8}>
                        <Link to={`/pagestory/${story.id}`} className="heading">
                            <h1 key={story.id}>{story.heading}</h1>
                        </Link>
                    </Col>
                    <Col xs={6} md={4} className="tools">
                        <button className="btn btn-lg active">
                            <i className="fa fa-trash" aria-hidden="true"></i>
                        </button>
                        <Link to={"/markdownpage"} className="btn btn-lg active">
                            <i className="fa fa-pencil" aria-hidden="true"></i>
                        </Link>
                    </Col>
                </Row>
                <div>
                    <p key={story.genre.id}>
                        <FormattedMessage id="genre" />: {story.genre.name}
                    </p>
                </div>
                <div>
                    <p className="description-story">{story.description}</p>
                </div>
                <div>
                    {story.tags.map(tag => <span className="tag-name" key={tag.id}>{tag.name}</span>)}
                </div>
                <Row className="tool-bar">
                    <Col>
                        <button 
                        type="button" 
                        className="btn btn-comments"
                        onClick={this.handleClickComments}>
                            <Link to={"/pagestory"}>
                                <i className="fa fa-comments" aria-hidden="true"></i>
                            </Link>
                        </button>
                    </Col>
                    <Col>
                        <button 
                        type="button" 
                        className="btn btn-star"
                        onClick={this.handleClickRating}>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                        </button>
                    </Col>
                    <Col className="user-info">
                        <Col>
                            <p>{story.user.name}</p>
                            <p>{story.updatedAt}</p>
                        </Col>
                        <Col>
                            <Link to="/user"className="user-icon-wrapper">
                                <button className="user-icon"></button>
                            </Link>
                        </Col>
                    </Col>
                </Row>
            </Container>
        );
    }
}