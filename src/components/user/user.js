import React from 'react';
import { Row, Col, Container } from 'reactstrap';
import EditableLabel from 'react-inline-editing';
import './user.css';
import UserStories from '../user.stories/user.stories';

const User = () => {
    return (
        <Row>
            <Col>
                <Container className="form-user">
                    <Row>
                        <Col>
                            <div className="icon">
                            </div>
                        </Col>
                        <Col>
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

export default User;