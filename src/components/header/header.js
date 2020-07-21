import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Row, Col } from 'reactstrap';
import { Link } from "react-router-dom";
import SearchPanel from '../search.panel/search.panel';
import './header.css';

export default class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isActive: false
        };

        this.handleClickNew = this.handleClickNew.bind(this);
        this.handleClickRating = this.handleClickRating.bind(this);
    }

    handleClickNew() {
        const sortByRating = document.getElementsByClassName("sorted-by-rating");
        const sortByNew = document.getElementsByClassName("sorted-by-new");
        sortByNew.classList.add("active");
        sortByRating.classList.remove("active");
        this.setState({ isActive: true });
    }

    handleClickRating() {
        const sortByRating = document.getElementsByClassName("sorted-by-rating");
        const sortByNew = document.getElementsByClassName("sorted-by-new");
        sortByRating.classList.add("active");
        sortByNew.classList.remove("active");
        this.setState({ isActive: true });
    }
    
    render() {
        return (
            <Row className="app-header">
                <Col xs={12} md={6} className="header-nav-bar">
                    <Link
                    to="/"
                    className="logo">
                        Fanfics
                    </Link>
                    <Link
                    to="/sortedbynew"
                    className="sorted-by-new"
                    onClick={this.handleClickNew}>
                        <FormattedMessage id="sorted-by-new" />
                    </Link>
                    <Link
                    to="/sortedbyrating"
                    className="sorted-by-rating"
                    onClick={this.handleClickRating}>
                        <FormattedMessage id="sorted-by-rating" />
                    </Link>
                </Col>
                <Col xs={6} md={4} className="search-panel">
                    <SearchPanel />
                </Col>
                <Col>
                <Link to="/user"className="user-icon-wrapper">
                        <button className="user-icon"></button>
                </Link>
                </Col>
            </Row>
        );
    }
}