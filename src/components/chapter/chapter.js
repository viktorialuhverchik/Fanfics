import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Button, Input, Row, Form } from 'reactstrap';
import MarkdownInput from '../markdown/markdown';

export default class Chapter extends Component {
    constructor(props) {
        super(props);

        this.state={
            chapter: "", 
            description: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleClick() {
        console.log('Click');
    }

    render() {
        const [markdownDescription, setMarkdownDescription] = this.state.description;
        return (
            <Form className="form-chapter">
                <div id="list-chapter" className="list-group">
                    <Input 
                    type="text"
                    name="chapter"
                    placeholder="Chapter"
                    value={this.state.chapter}
                    onChange={this.handleChange}
                    required
                    className="list-group-item list-group-item-action" 
                    href="#list-item-1" />
                </div>
                <div data-spy="scroll" data-target="#list-chapter" data-offset="0" className="scrollspy-example">
                    <h4 id="list-item-1">{this.state.chapter}</h4>
                    <MarkdownInput input={markdownDescription} onInputChanged={value => setMarkdownDescription(value)} />
                </div>
                <Button 
                    className="form-btn-add-chapter"
                    type="button"
                    onClick={this.handleClick}
                    style={{
                        backgroundColor: '#88d498',
                        border: 'none'
                    }}>
                        <FormattedMessage id="button-add-chapter" />
                </Button>
            </Form>
        );
    }
}