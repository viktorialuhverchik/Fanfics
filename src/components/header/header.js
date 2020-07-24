import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Row, Col } from 'reactstrap';
import { Link } from "react-router-dom";
import SearchPanel from '../search.panel/search.panel';
import './header.css';

export default class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.handleClickNew = this.handleClickNew.bind(this);
        this.handleClickRating = this.handleClickRating.bind(this);
    }

    handleClickNew() {
    }

    handleClickRating() {
    }
    
    render() {
        const id = this.props.userId;
        let userIcon = null;
        if(id) {
            userIcon =  <Link to={`/users/${id}/stories`} className="user-icon-wrapper">
                            <button className="user-icon"></button>
                        </Link>;
        }
        return (
            <Row className="app-header">
                <Col xs={12} md={6} className="header-nav-bar">
                    <Link to="/" className="logo">Fanfics</Link>
                    <Link
                    to="/new"
                    className="sorted-by-new"
                    onClick={this.handleClickNew}>
                        <FormattedMessage id="sorted-by-new" />
                    </Link>
                    <Link
                    to="/popular"
                    className="sorted-by-rating"
                    onClick={this.handleClickRating}>
                        <FormattedMessage id="sorted-by-rating" />
                    </Link>
                </Col>
                <Col xs={6} md={4} className="search-panel">
                    <SearchPanel />
                </Col>
                <Col>
                    {userIcon}
                </Col>
            </Row>
        );
    }
}