import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import storyService from '../../services/story.service';
import Comments from '../comments/comments';
import './page.story.css';

export default class PageStory extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            storyId: props.match.params.storyId,
            story: null
        };


        this.handleClickLike = this.handleClickLike.bind(this);
        this.handleClickRating = this.handleClickRating.bind(this);
        this.renderChapters = this.renderChapters.bind(this);
    }

    async componentWillMount() {
        const story = await storyService.getStoryById(this.state.storyId);
        this.setState({story});
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
                <Container className="container-chapter-story">
                    <Row>
                        <Col xs={12} md={8} className="chapter">
                            <h4
                            key={chapter.id}
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

    render() {
        const story = this.state.story;
        const id = localStorage.getItem("id");

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
                            <Col>
                                <button 
                                type="button" 
                                className="btn btn-lg btn-star"
                                onClick={this.handleClickRating}>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                </button>
                            </Col>
                            <Col className="user-info">
                                <Col xs={12} md={6}>
                                    <p className="user-name">{story.user.name}</p>
                                    <p className="update-date">{story.updatedAt}</p>
                                </Col>
                                <Col xs={4} md={2}>
                                    <Link to={`/users/${id}/stories`} className="user-icon-wrapper">
                                        <button className="user-icon"></button>
                                    </Link>
                                </Col>
                            </Col>
                        </Row>
                    </Container>
                    <Row>
                        <Col>
                            <Comments />
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}