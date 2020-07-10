import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'; 
import { FormattedMessage } from 'react-intl';
import { Form, Button, Input, Col, Row } from 'reactstrap';
import Select from 'react-select';
import MarkdownInput from '../markdown/markdown';
import Chapter from '../chapter/chapter';
import storyService from '../../services/story.service';
import './add.new.story.css';

const genres = [
    { value: 'fantastic', label: 'Fantastic' },
    { value: 'horrors', label: 'Horrors' },
    { value: 'mystic', label: 'Mystic' },
];

const tags = [ 
    { value: 'tag1', label: 'tag1' },
    { value: 'tag2', label: 'tag2' },
    { value: 'tag3', label: 'tag3' }
]

export default class AddNewStory extends Component {
    constructor(props) {
        super(props);

        this.state = {
            heading: '',
            selectedGenre: null,
            description: '',
            tags: '',
            redirect: null
        };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    async handleSubmit(event) {
        event.preventDefault();

        try {
            let story = {
                heading: this.state.heading,
                genre: this.state.selectedGenre.value,
                description: this.state.description,
                tags: this.state.tags,
            };

            await storyService.createStories(story);
           
            this.setState({redirect: '/user'});
        } catch(error) {
            console.log(error);
        }
    }

    handleSelect (selectedGenre) {
        this.setState(
            { selectedGenre }
        );
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        const { selectedGenre } = this.state;
        return(
            <Row>
                <Col>
                    <Form 
                    className="form-add-new-story"
                    onSubmit={this.handleSubmit}>
                        <Input
                        className="form-input-heading"
                        type="text"
                        name="heading"
                        placeholder="Heading of story"
                        value={this.state.heading}
                        onChange={this.handleChange}
                        required
                        />

                        <Select
                        className="select-genres"
                        value={selectedGenre}
                        onChange={this.handleSelect}
                        options={genres}
                        />

                        <Select
                        isMulti
                        name="tags"
                        options={tags}
                        className="basic-multi-select"
                        classNamePrefix="Tags"
                        />

                        <Chapter />

                        <div className="form-btns">
                            <Button 
                            className="form-btn-add-story"
                            type="submit" 
                            style={{
                                backgroundColor: '#1a936f',
                                border: 'none'
                            }}>
                                <FormattedMessage id="button-add-story" />
                            </Button>

                            <Button 
                            className="form-btn-cancel"
                            type="button" 
                            outline color="secondary">
                                <FormattedMessage id="button-cancel" />
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        );
    }
}