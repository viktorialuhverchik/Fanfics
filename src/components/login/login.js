import React, { Component } from 'react';
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
            loginError: ''
        };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleClick() {
        this.props.onBlockHide('signup');
    }

    async handleSubmit(event) {
        event.preventDefault();

        try {
            const user = await authService.login(this.state.email, this.state.password);
            localStorage.setItem('email', this.state.email);
            this.props.onUserIdChange(user.id);
            this.props.onBlockHide(null);
        } catch(error) {
            console.log(error);;
        }
    }
 
    render() {
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
                placeholder="Email"
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