import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import './rendered.story.css';

export default class RenderedStory extends Component {
    constructor(props) {
        super(props);

        this.state = {
            heading: '',
            genre: '',
            description: '',
            tags: ''
        };

        this.state = {...this.state, ...props.story};

        this.handleClickLike = this.handleClickLike.bind(this);
        this.handleClickComments = this.handleClickComments.bind(this);
        this.handleClickRating = this.handleClickRating.bind(this);
    }

    handleClickLike() {
        console.log('Click Like');
    }

    handleClickComments() {
        console.log('Click Comments');
    }

    handleClickRating() {
        console.log('Click Rating');
    }

    render() {
        return (
            <Container className="form-story">
                <Row>
                    <Col xs={12} md={8}>
                        <h1>{this.state.heading}</h1>
                    </Col>
                    <Col xs={6} md={4}>
                        <Link to={"/markdownpage"} className="btn btn-lg active">
                            <i className="fa fa-pencil" aria-hidden="true"></i>
                        </Link>
                    </Col>
                </Row>
                <div>
                    <img src="..." className="card-img-top" alt="image001"></img>
                </div>
                <div>
                    {this.state.genre}
                </div>
                <div>
                    <p className="description-story">{this.state.description}</p>
                </div>
                <div>
                    {this.state.tags}
                </div>
                <Row className="tools">
                    <Col
                    onClick={this.handleClickLike}>
                        <i className="fa fa-heart"></i>
                    </Col>
                    <Col>
                        <button 
                        type="button" 
                        className="btn btn-comments"
                        onClick={this.handleClickComments}>
                            <i className="fa fa-comments" aria-hidden="true"></i>
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
                </Row>
            </Container>
        );
    }
}