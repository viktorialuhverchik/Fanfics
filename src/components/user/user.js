import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'; 
import { Row, Col, Container, Button } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import EditableLabel from 'react-inline-editing';
import UserStories from '../user.stories/user.stories';
import './user.css';

export default class User extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {}
        };

    this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({redirect: '/'});
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <Row>
                <Col>
                    <Container className="form-user">
                        <Row>
                            <Col xs={6} md={4}>
                                <div className="icon"></div>
                            </Col>
                            <Col xs={12} md={8}>
                                <Row className="inline-edit-name">
                                    <p>Name:</p>
                                    <EditableLabel
                                    text="Name"
                                    inputPlaceHolder="Name"
                                    labelClassName="inline-edit-label"
                                    inputClassName="inline-edit-input" />
                                </Row>
                                <Row className="inline-edit-email">
                                    <p>E-mail:</p>
                                    <EditableLabel
                                    text="E-mail"
                                    inputPlaceHolder="E-mail"
                                    labelClassName="inline-edit-label"
                                    inputClassName="inline-edit-input" />
                                </Row>
                                <Row>
                                    <Button onClick={this.handleClick}>
                                        <FormattedMessage id="button-logout"/>
                                    </Button>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                    <Row>
                        <Col>
                            <UserStories />
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}