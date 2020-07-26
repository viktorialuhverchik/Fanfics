import React, { Component } from 'react';
import { Row, Col, Container, Button, Input } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import RenderedStory from '../rendered.story/rendered.story';
import userService from '../../services/user.service';
import './user.css';

export default class User extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
            stories: []
        };

    this.handleClickSave = this.handleClickSave.bind(this);
    this.handleClickLogout = this.handleClickLogout.bind(this);
    this.handleChange = this.handleChange.bind(this);
    }

    async componentWillMount() {
        const user = await userService.getUserById(this.props.match.params.id);
        const stories = await userService.getStoriesByUserId(this.props.match.params.id);
        console.log(user, stories);
        this.setState({ 
            user,
            stories
        });
    }

    handleClickSave() {
        
    }

    handleClickLogout() {
    }

    handleChange() {

    }

    render() {
        const user = this.state.user
        const userId = this.props.match.params.id;
        
        if (!user) {
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
                    <Container className="form-user">
                        <Row>
                            <Col xs={8} md={4} className="user-icon-col">
                                <div className="icon"></div>
                                <Button className="button-logout" onClick={this.handleClickLogout}>
                                    <FormattedMessage id="button-logout"/>
                                </Button>
                            </Col>
                            <Col xs={8} md={6}>
                                <h6>
                                    <FormattedMessage id="name" />:
                                </h6>
                                <div className="inline-edit">
                                    <Input
                                    className='form-input'
                                    type="name"
                                    name="name"
                                    placeholder="Name"
                                    value={this.state.user.name}
                                    onChange={this.handleChange}
                                    />
                                </div>

                                <h6>Email:</h6>
                                <div className="inline-edit">
                                    <Input
                                    className='form-input'
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={this.state.user.email}
                                    onChange={this.handleChange}
                                    />
                                </div>
                                
                                <Button className="button-save" onClick={this.handleClickSave}>
                                    <FormattedMessage id="button-save"/>
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                    { this.state.stories.map(story => <RenderedStory key={story.id} story={story} userId={userId} />) }
                </Col>
            </Row>
        );
    }
}