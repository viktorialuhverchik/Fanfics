import React, {Component} from 'react';
import { Form, Input, Row, Col } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import { Redirect } from 'react-router-dom'; 
import './search.panel.css';

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

    handleSubmit(event) {
        
    }


    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return(
            <Form 
            onSubmit={this.handleSubmit}
            className="form-search">
                <Row>
                    <Col xs={12} md={8}className="search-input">
                        <FormattedMessage id="search">
                            {placeholder => 
                            <Input
                            type="text"
                            name="text"
                            placeholder={placeholder}
                            className="form-input-search"
                            value={this.state.text}
                            onChange={this.handleChange}
                            required
                            />}
                        </FormattedMessage>
                    </Col>
                    <Col xs={6} md={4}>
                        <button
                        className="form-btn-search"
                        type="submit">
                            <i className="fa fa-search" aria-hidden="true"></i>
                        </button>
                    </Col>
                </Row>
            </Form>
        );
    }
}