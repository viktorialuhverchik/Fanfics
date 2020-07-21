import React, { Component } from 'react';
import { Form, Button, Input } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import './comments.css';

export default class Comments extends Component {
    constructor(props) {
        super(props);

        this.state = {
            comments: [],
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
            <Form
            onSubmit={this.handleSubmit}
            className="form-comments">
                <div className="comment">
                    {this.state.comments.map(item => item)}
                </div>
                <Input
                type="text"
                placeholder="What are you thinking about this story?"
                className="form-input-comment"
                onChange={this.handleChange}
                value={this.state.comment}
                />
                <div className="form-btns">
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
                </div>
        </Form>
        );
    }
}