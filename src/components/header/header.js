import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Row, Col, Button } from 'reactstrap';
import { Link } from "react-router-dom";
import SearchPanel from '../search.panel/search.panel';
import RenderedStory from '../rendered.story/rendered.story';
import storyService from '../../services/story.service';
import './header.css';

export default class Header extends Component {
    
    render() {
        return (
            <Row className="app-header">
                <Col>
                    <Link to="/" className="logo">Fanfics</Link>
                    <Link to="/sortedbynew" className="sorted-by-new">New</Link>
                    <Link to="/sortedbyrating" className="sorted-by-rating">Popular</Link>
                </Col>
                <Col className="search-panel">
                    <SearchPanel />
                </Col>
                <Col>
                <Link to="/user"className="btn btn-lg active">
                        <button className="user-icon"></button>
                </Link>
                </Col>
            </Row>
        );
    }
}