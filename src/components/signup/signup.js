import React, { Component } from 'react';
import { Form, Button, Input } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import './signup.css';
import authService from '../../services/auth.service';

export default class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            singupErrors: ''
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
        this.props.onBlockHide('login');
    }

    async handleSubmit(event) {
        event.preventDefault();

        try {
            const user = await authService.signup(this.state.email, this.state.name, this.state.password);
            localStorage.setItem('email', this.state.email);
            this.props.onUserIdChange(user.id);
            this.props.onBlockHide(null);
        } catch(error) {
            console.log(error);
        }
    }

    render() {
        return(
            <Form 
            className='form-signup'
            onSubmit={this.handleSubmit}>
                <p>
                    <FormattedMessage id="signup" />
                </p>
                <FormattedMessage id="username">
                    {placeholder => 
                    <Input
                    className='form-input'
                    type="name"
                    name="name"
                    placeholder={placeholder}
                    value={this.state.name}
                    onChange={this.handleChange}
                    required
                    />}
                </FormattedMessage>

                <Input
                className='form-input'
                type="email"
                name="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleChange}
                required
                />

                <FormattedMessage id="password">
                    {placeholder => 
                    <Input
                    className='form-input'
                    type="password"
                    name="password"
                    placeholder={placeholder}
                    value={this.state.password}
                    onChange={this.handleChange}
                    required
                    />}
                </FormattedMessage>

                <Button
                className='form-btn'
                type="submit" 
                style={{
                    backgroundColor: '#1a936f',
                    border: 'none'
                }}>
                    <FormattedMessage id="button-signup" />
                </Button>

                <button 
                className='form-toggle-block'
                onClick={this.handleClick}>
                    <FormattedMessage id="login" />
                </button>                  
            </Form>
        );
    }
}