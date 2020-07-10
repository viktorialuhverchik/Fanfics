import React, {Component} from 'react';
import { Form, Input, Button, Row, Col } from 'reactstrap';
import { Redirect } from 'react-router-dom'; 

export default class SearchPanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: '',
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
            // const result = await searchService.login(this.state.text);
            // console.log(result);
            localStorage.setItem('text', this.state.text);
            this.setState({redirect: '/pagestory'});
        } catch(error) {
            console.log(error);;
        }
    }


    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return(
            <Row>
                <Form 
                onSubmit={this.handleSubmit}
                className="form-search">
                    <Input
                    className="search-input"
                    type="text"
                    name="text"
                    placeholder="Search"
                    value={this.state.text}
                    onChange={this.handleChange}
                    required
                    />
                    <Button
                    type="submit">
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </Button>
                </Form>
            </Row>
        );
    }
}