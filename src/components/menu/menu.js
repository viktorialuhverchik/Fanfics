import React, { Component } from 'react';
import Login from '../login/login';
import Signup from '../signup/signup';
import AddStoryButton from '../add.story.button/add.story.button';
import Tags from '../tags/tags';

export default class Menu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            shownAuthBlock: 'login'
        };

        this.toggleAuthBlock = this.toggleAuthBlock.bind(this);
    }

    async componentDidMount() {
        const token = localStorage.getItem('token');
        if (token) {
            this.setState({ shownAuthBlock: null });
        }
    }

    toggleAuthBlock(shownAuthBlock) {
        this.setState({ shownAuthBlock });
    }

    render() {
        const shownAuthBlock = this.state.shownAuthBlock;
        let authBlock;

        if (shownAuthBlock === 'login') {
            authBlock = <Login onBlockHide={this.toggleAuthBlock} />;
        }

        if (shownAuthBlock === 'signup') {
            authBlock = <Signup onBlockHide={this.toggleAuthBlock} />;
        }

        return (
            <div>
                { authBlock }
                <AddStoryButton />
                <Tags />
            </div>
        );
    }
}