import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FormattedMessage, FormattedDate } from 'react-intl';
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
                    <Col className="comments-wrapper">
                        <button 
                        type="button" 
                        className="btn btn-lg btn-comments"
                        onClick={this.handleClickComments}>
                            <Link to={`/pagestory/${story.id}/#comments`}>
                                <i className="fa fa-comments" aria-hidden="true"></i>
                            </Link>
                        </button>
                    </Col>
                    <Col className="rating">
                        <div>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                        </div>
                    </Col>
                    <Col className="user-info">
                        <Col xs={12} md={6}>
                            <div>
                                <p className="user-name">{story.user.name}</p>
                                <p className="update-date">
                                    <FormattedDate value={new Date(`${story.updatedAt}`)} />
                                </p>
                            </div>
                        </Col>
                        <Col xs={6} md={4}>
                            <Link to={`/users/${story.user.id}/stories`} className="user-icon-wrapper">
                                <button className="user-icon"></button>
                            </Link>
                        </Col>
                    </Col>
                </Row>
            </Container>
        );
    }
}