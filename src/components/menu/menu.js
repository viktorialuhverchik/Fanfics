import React, { Component } from 'react';
import userService from '../../services/user.service';
import Login from '../login/login';
import Signup from '../signup/signup';
import AddStoryButton from '../add.story.button/add.story.button';
import Tags from '../tags/tags';

export default class Menu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: []
        };
    }

    async componentDidMount() {
        
    }

    render() {
        return (
        <div>
            {/* <Login />
            <Signup /> */}
            <AddStoryButton />
            <Tags />
        </div>
        );
    }
}