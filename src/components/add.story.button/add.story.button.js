import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'; 
import { FormattedMessage } from 'react-intl';
import { Container, Button } from 'reactstrap';
import './add.story.button.css';

export default class AddStoryButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: null
        };

    this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({redirect: '/addnewstory'});
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <Container className="container-add-story-btn">
                <Button 
                className="add-story-btn"
                onClick={this.handleClick}
                style={{
                    backgroundColor: '#1a936f',
                    border: 'none'
                }}>
                    <FormattedMessage id="button-add-story" />
                </Button>
            </Container>
        );
    }
}