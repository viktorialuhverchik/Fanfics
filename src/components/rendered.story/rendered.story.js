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
                    <Col xs={4} md={2}></Col>
                    <Col xs={4} md={2} className="tools">
                        <Row>
                            <Col>
                                <i className="fa fa-trash" aria-hidden="true"></i>
                            </Col>
                            <Col>
                                <Link to={"/markdownpage"}>
                                    <i className="fa fa-pencil" aria-hidden="true"></i>
                                </Link>
                            </Col>
                        </Row>
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
                        <Link to={`/pagestory/${story.id}/#comments`}>
                            <i className="fa fa-comments" aria-hidden="true"></i>
                        </Link>
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
                        <Col xs={6} md={4} className="user-icon-wrapper">
                            <Link to={`/users/${story.user.id}/stories`}>
                                <button className="user-icon"></button>
                            </Link>
                        </Col>
                    </Col>
                </Row>
            </Container>
        );
    }
}