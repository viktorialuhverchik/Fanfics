import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'; 
import { Row, Col, Container, Button, Input } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import RenderedStory from '../rendered.story/rendered.story';
import userService from '../../services/user.service';
import './user.css';

export default class User extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.match.params.id,
            user: {},
            stories: [],
            redirect: null
        };

    this.handleClickSave = this.handleClickSave.bind(this);
    this.handleClickLogout = this.handleClickLogout.bind(this);
    this.handleChange = this.handleChange.bind(this);
    }

    async componentWillMount() {
        const user = await userService.getUserById(this.state.id);
        const stories = await userService.getStoriesByUserId(this.state.id);
        this.setState({ 
            user,
            stories
        });
    }

    handleClickSave() {
        
    }

    handleClickLogout() {
        this.setState({redirect: '/'});
    }

    handleChange() {

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
                                    type="email"
                                    name="email"
                                    placeholder="Email"
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
                    { this.state.stories.map(story => <RenderedStory key={story.id} story={story} />) }
                </Col>
            </Row>
        );
    }
}