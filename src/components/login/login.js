import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'; 
import { Form, Button, Input } from 'reactstrap';
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
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    async handleSubmit(event) {
        event.preventDefault();

        try {
            const result = await authService.login(this.state.email, this.state.password);
            console.log(result);
            localStorage.setItem('email', this.state.email);
            this.setState({redirect: '/user'});
        } catch(error) {
            console.log(error);;
        }
    }
 
    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return(
            <div>
                <Form 
                className="form float-right"
                onSubmit={this.handleSubmit}>
                    <p>Login</p>
                    <Input
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
                    outline color="primary">
                    Log in
                    </Button>
                    
                    <Link className="form-link"
                    to={"/signup"}>Sign up</Link>
                </Form>
            </div>
        );
    }
}