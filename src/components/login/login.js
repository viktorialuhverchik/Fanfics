import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'; 
import { Form, Button, Input } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import './login.css';
import authService from '../../services/auth.service';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            loginError: '',
            redirect: null
        };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.onBlockHide = props.onBlockHide;
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleClick() {
        this.onBlockHide('signup');
    }

    async handleSubmit(event) {
        event.preventDefault();

        try {
            const result = await authService.login(this.state.email, this.state.password);
            console.log(result);
            localStorage.setItem('email', this.state.email);
            this.setState({redirect: '/'});
        } catch(error) {
            console.log(error);;
        }
    }
 
    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return(
            <Form 
            className="form-login"
            onSubmit={this.handleSubmit}>
                <p>
                    <FormattedMessage id="login" />
                </p>
                <Input id="input-email"
                className="form-input"
                type="email"
                name="email"
                placeholder="E-mail"
                value={this.state.email}
                onChange={this.handleChange}
                required
                />

                <Input
                className="form-input"
                type="password"
                name="password"
                placeholder="Password" 
                value={this.state.password}
                onChange={this.handleChange}
                required
                />
                
                <Button 
                className="form-btn"
                type="submit" 
                style={{
                    backgroundColor: '#1a936f',
                    border: 'none'
                }}>
                    <FormattedMessage id="button-login" />
                </Button>
                
                <button
                className="form-toggle-block"
                onClick={this.handleClick}>
                    <FormattedMessage id="signup" />
                </button>
            </Form>
        );
    }
}