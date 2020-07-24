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
        let authBlock;

        if (this.state.shownAuthBlock === 'login') {
            authBlock = <Login onBlockHide={this.toggleAuthBlock} onUserIdChange={this.props.onUserIdChange} />;
        }

        if (this.state.shownAuthBlock === 'signup') {
            authBlock = <Signup onBlockHide={this.toggleAuthBlock} onUserIdChange={this.props.onUserIdChange} />;
        }

        return (
            <div>
                { authBlock }
                <AddStoryButton blocked={!!this.state.shownAuthBlock} />
                <Tags />
            </div>
        );
    }
}