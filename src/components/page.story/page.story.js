import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Input } from 'reactstrap';
import { FormattedMessage, FormattedDate } from 'react-intl';
import storyService from '../../services/story.service';
import chapterService from '../../services/chapter.service';
import './page.story.css';

export default class PageStory extends Component {
    constructor(props) {
        super(props);

        this.state = {
            storyId: props.match.params.storyId,
            story: null,
            comment: "",
            rating: [
                { value: 1, selected: false },
                { value: 2, selected: false },
                { value: 3, selected: false },
                { value: 4, selected: false },
                { value: 5, selected: false }
            ]
        };


        this.handleClickLike = this.handleClickLike.bind(this);
        this.handleClickRating = this.handleClickRating.bind(this);
        this.renderChapters = this.renderChapters.bind(this);
        this.deleteChapter = this.deleteChapter.bind(this);
        this.renderRating = this.renderRating.bind(this);
        this.renderTools = this.renderTools.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.toggleLike= this.toggleLike.bind(this);
    }

    async componentDidMount() {
        const story = await storyService.getStoryById(this.state.storyId, this.props.userId);
        this.setState({ story });

        if (this.props.location.search.indexOf('comments') !== -1) {
            window.location.href += '#comments';
        }
    }

    toggleLike(chapterIndex) {
        let story = this.state.story;
        if (story.chapters[chapterIndex].liked) {
            story.chapters[chapterIndex].liked = false;
            story.chapters[chapterIndex].likesAmount--;
        } else {
            story.chapters[chapterIndex].liked = true;
            story.chapters[chapterIndex].likesAmount++;
        }

        this.setState({ story });

        return story.chapters[chapterIndex];
    }

    async handleClickLike(index) {
        if (!this.props.userId) return;

        const chapter = this.toggleLike(index);

        try {
            await chapterService.toggleLike(chapter);
        } catch(error) {
            this.toggleLike(index);
        }
    }

    async handleClickRating(rating, index) {
        const formattedRating = this.state.rating.map((_rating, i) => {
            _rating.selected = i <= index;
            return _rating;
        });
        await storyService.changeRating(this.state.storyId, rating.value);
        this.setState({ rating: formattedRating });
    }

    renderTools(story, chapter) {
        const id = +this.props.userId;
        let tools = null;

        if (id === story.user.id) {
            tools = <Row>
                        <Col>
                            <i className="fa fa-trash" onClick={() => this.deleteChapter(chapter.id)} aria-hidden="true"></i>
                        </Col>
                        <Col>
                            <Link to={"/markdownpage"}>
                                <i className="fa fa-pencil" aria-hidden="true"></i>
                            </Link>
                        </Col>
                    </Row>;
        }

        return tools;
    }

    renderChapters() {
        const story = this.state.story;
        
        return story.chapters.map((chapter, i) => {
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
                        <Col xs={4} md={2}></Col>
                        <Col xs={4} md={2} className="tools">
                            { this.renderTools(story, chapter) }
                        </Col>
                    </Row>
                    <Row>
                        <span className="chapter-text">{chapter.text}</span>
                    </Row>
                    <Row>
                        <Col>
                            {this.renderLike(chapter, i)}
                            <span className="like-number">{chapter.likesAmount === 0 ? "Like" : chapter.likesAmount}</span>
                        </Col>
                    </Row>
                </Container>
            );
        });
    }

    async deleteChapter(chapterId) {
        try {
            await chapterService.deleteChapter(chapterId);
            let story = this.state.story;
            let index = story.chapters.findIndex(chapter => chapter.id === chapterId);
            story.chapters.splice(index, 1);
            this.setState({ story });
        } catch(error) {
            console.dir(error);
        }
    }

    renderContents() {
        const story = this.state.story;
        return story.chapters.map((chapter, i) => {
            return (
                <h4 key={i} className="chapter-heading-contents">
                    <a href={`#chapter_${chapter.id}`} className="chapter-heading-link">
                        <FormattedMessage id="chapter" /> {i+1}: {chapter.heading}
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

    renderRating() {
        return this.state.rating.map((item, i) => {
                return (
                    <i
                        key={i}
                        className={`fa fa-star pointer ${item.selected ? "selected-stars" : ""}`}
                        onClick={() => { this.handleClickRating(item, i) }}>
                    </i>
                );
        });
    }

    renderLike(chapter, index) {
        return <i className={`fa fa-heart pointer ${chapter.liked ? "active" : ""}`}
                onClick={() => { this.handleClickLike(index) }}>
               </i>;
    }

    render() {
        const story = this.state.story;

        if (!story) {
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
                    <Container className="container-page-story">
                        <h1>{story.heading}</h1>
                        <p>
                            <FormattedMessage id="genre" />: {story.genre.name}
                        </p>
                        <Col xs={12} md={6} className="form-contents">
                            {this.renderContents()}
                        </Col>
                            {this.renderChapters()}
                        <div>
                            {story.tags.map(tag => <span className="tag-name" key={tag.id}>{tag.name}</span>)}
                        </div>
                        <Row className="tool-bar">
                            <Col className="rating">
                                <div>
                                    {this.renderRating()}
                                </div>
                            </Col>
                            <Col className="user-info">
                                <div>
                                    <p className="user-name">{story.user.name}</p>
                                    <p className="update-date">
                                        <FormattedDate value={new Date(`${story.updatedAt}`)} />
                                    </p>
                                </div>
                                <Link to={`/users/${story.user.id}/stories`} className="user-icon-wrapper">
                                    <button className="user-icon"></button>
                                </Link>
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
                                            <Col xs={1}>
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
                                <FormattedMessage id="comment">
                                    {placeholder => 
                                        <Input
                                        type="text"
                                        name="text"
                                        placeholder={placeholder}
                                        className="form-input-comment"
                                        onChange={this.handleChange}
                                        value={this.state.comment}
                                        />}
                                </FormattedMessage>
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