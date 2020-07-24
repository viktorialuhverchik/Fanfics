import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Input } from 'reactstrap';
import { FormattedMessage, FormattedDate } from 'react-intl';
import storyService from '../../services/story.service';
import './page.story.css';

export default class PageStory extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            storyId: props.match.params.storyId,
            story: null,
            comment: ""
        };


        this.handleClickLike = this.handleClickLike.bind(this);
        this.handleClickRating = this.handleClickRating.bind(this);
        this.renderChapters = this.renderChapters.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async componentWillMount() {
        const story = await storyService.getStoryById(this.state.storyId);
        this.setState({ story });
    }

    handleClickLike() {
        console.log('Click Like');
    }

    handleClickRating() {
        console.log('Click Rating');
    }

    renderChapters() {
        const story = this.state.story;
        return story.chapters.map(chapter => {
            return (
                <Container className="container-chapter-story" key={chapter.id}>
                    <Row>
                        <Col xs={12} md={8} className="chapter">
                            <h4
                            id={`chapter_${chapter.id}`}
                            className="chapter-heading">
                                {chapter.heading}
                            </h4>
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
                    <Row>
                        <span className="chapter-text">{chapter.text}</span>
                    </Row>
                    <Row>
                        <Col>
                            <button 
                            type="button" 
                            className="btn btn-lg btn-heart"
                            onClick={this.handleClickLike}>
                                <i className="fa fa-heart"></i>
                            </button>
                            <div>{chapter.likes}</div>
                        </Col>
                    </Row>
                </Container>
            );
        });
    }

    renderContents() {
        const story = this.state.story;
        return story.chapters.map((chapter, i) => {
            return (
                <h4 key={i} className="chapter-heading-contents">
                    <a href={`#chapter_${chapter.id}`} className="chapter-heading-link">
                        Chapter {i+1}: {chapter.heading}
                    </a>
                </h4>
            );
        });
    }

    async handleSubmit(event) {
        event.preventDefault();

        try {
            await storyService.addComment(this.state.comment, this.state.storyId);
            this.setState({
                comment: ""
            });
        } catch(error) {
            console.log(error);
        }
    }

    handleChange(event) {
        this.setState({
            comment: event.target.value
        });
    }

    render() {
        const story = this.state.story;

        if (!story) {
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
                    <Container className="container-page-story">
                        <h1 className="heading">{story.heading}</h1>
                        <div>
                        <p key={story.genre.id}>
                            <FormattedMessage id="genre" />: {story.genre.name}
                        </p>

                        <Col xs={12} md={6} className="form-contents">
                            {this.renderContents()}
                        </Col>
                        
                        </div>
                            {this.renderChapters()}
                        <div>
                            {story.tags.map(tag => <span className="tag-name" key={tag.id}>{tag.name}</span>)}
                        </div>
                        <Row className="tool-bar">
                            <Col className="rating">
                                <div>
                                    <i
                                    id="star_1"
                                    className="fa fa-star"
                                    onClick={this.handleClickRating}>
                                    </i>
                                    <i
                                    id="star_2"
                                    className="fa fa-star"
                                    onClick={this.handleClickRating}>
                                    </i>
                                    <i
                                    id="star_3"
                                    className="fa fa-star"
                                    onClick={this.handleClickRating}>
                                    </i>
                                    <i
                                    id="star_4"
                                    className="fa fa-star"
                                    onClick={this.handleClickRating}>
                                    </i>
                                    <i
                                    id="star_5"
                                    className="fa fa-star"
                                    onClick={this.handleClickRating}>
                                    </i>
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
                                <Col xs={4} md={2}>
                                    <Link to={`/users/${story.user.id}/stories`} className="user-icon-wrapper">
                                        <button className="user-icon"></button>
                                    </Link>
                                </Col>
                            </Col>
                        </Row>
                    </Container>
                    <Row>
                        <Col>
                            <Form
                            onSubmit={this.handleSubmit}
                            className="form-comments"
                            id="comments">
                                
                                {story.comments.map(comment => {
                                    return (
                                        <div className="comment" key={comment.id}>
                                            <Col xs={2} md={1}>
                                                <Link to={`/users/${comment.user.id}/stories`} className="user-icon-wrapper">
                                                    <button className="user-icon"></button>
                                                </Link>
                                            </Col>
                                            <Col>
                                                <h4 className="user-name">{comment.user.name}</h4>
                                                <span className="comment-text">
                                                    {comment.text}
                                                </span>
                                                <p className="comment-add-date">
                                                    <FormattedDate value={new Date(`${comment.createdAt}`)} />
                                                </p>
                                            </Col>
                                        </div>
                                    );
                                })}

                                <Input
                                type="text"
                                name="text"
                                placeholder="What are you thinking about this story?"
                                className="form-input-comment"
                                onChange={this.handleChange}
                                value={this.state.comment}
                                />
                                <div className="form-btns">
                                    <Button
                                    className="form-btn-comments"
                                    type="submit"
                                    style={{
                                        backgroundColor: '#1a936f',
                                        border: 'none'
                                    }}
                                    >
                                        <FormattedMessage id="button-add-comment" />
                                    </Button>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}