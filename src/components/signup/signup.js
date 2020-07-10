import React, { Component } from 'react';
import {Link, Redirect } from 'react-router-dom'; 
import { Form, Button, Input } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import '../login/login.css';
import authService from '../../services/auth.service';

export default class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            singupErrors: '',
            redirect: null
        };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    async handleSubmit(event) {
        event.preventDefault();

        try {
            const result = await authService.signup(this.state.email, this.state.name, this.state.password);
            console.log(result);
            localStorage.setItem('email', this.state.email);
            this.setState({redirect: '/user'});
        } catch(error) {
            console.log(error);
        }
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return(
            <div>
                <Form 
                className='form'
                onSubmit={this.handleSubmit}>
                    <p>
                        <FormattedMessage id="signup" />
                    </p>
                    <Input
                    className='form-input'
                    type="name"
                    name="name"
                    placeholder="Username"
                    value={this.state.name}
                    onChange={this.handleChange}
                    required
                    />

                    <Input
                    className='form-input'
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    value={this.state.email}
                    onChange={this.handleChange}
                    required
                    />

                    <Input
                    className='form-input'
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    required
                    />

                    <Button
                    className='form-btn'
                    type="submit" 
                    outline color="primary">
                        <FormattedMessage id="button-signup" />
                    </Button>

                    <Link 
                    className='form-link'
                    to={"/login"}>  
                        <FormattedMessage id="login" />
                    </Link>                  
                </Form>
            </div>
        );
    }
}