import React, { Component } from 'react';
import { Form, Button, Input, Row, Col } from 'reactstrap';
import { FormattedMessage } from 'react-intl';

export default class Comments extends Component {
    constructor(props) {
        super(props);

        this.state = {
            comment: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            comment: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onAdd(this.state.comment);
        this.setState({
            comment: ''
        })
    }
    render() {
        return (
            <Row>
                <Col>
                    <Form
                    onSubmit={this.handleSubmit}
                    className="form-comments">
                        <Input
                        type="text"
                        placeholder="What are you thinking about this story?"
                        onChange={this.handleChange}
                        value={this.state.comment}
                        />
                        <Button
                        className="form-btn-comments"
                        type="submit"
                        style={{
                            backgroundColor: '#1a936f',
                            border: 'none'
                        }}
                        >
                            <FormattedMessage id="button-add-comment" />
                        </Button>
                        <Button 
                            className="form-btn-cancel"
                            type="button" 
                            outline color="secondary">
                                <FormattedMessage id="button-cancel" />
                        </Button>
                    </Form>
                </Col>
            </Row>
        );
    }
}