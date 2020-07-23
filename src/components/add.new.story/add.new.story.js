import React, { Component} from 'react';
import { Redirect } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import Dropzone from 'react-dropzone';
import { Form, Button, Input, Col, Row } from 'reactstrap';
import Select from 'react-select';
import MarkdownInput from '../markdown/markdown';
import storyService from '../../services/story.service';
import './add.new.story.css';

export default class AddNewStory extends Component {
    constructor(props) {
        super(props);

        this.state = {
            heading: "",
            genres: [],
            selectedGenre: null,
            description: "",
            tags: [],
            selectedTags: [],
            newTag: "",
            chapters: [{ heading: "", text: "", image: "" }], 
            redirect: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelectGenre = this.handleSelectGenre.bind(this);
        this.addNewTag = this.addNewTag.bind(this);
        this.handleDeleteTag = this.handleDeleteTag.bind(this);
        this.addChapter = this.addChapter.bind(this);
        this.renderChapter = this.renderChapter.bind(this);
        this.setMarkdownText = this.setMarkdownText.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    async handleSubmit(event) {
        event.preventDefault();

        try {
            const story = await storyService.createStory(
                this.state.heading, 
                this.state.description, 
                this.state.selectedGenre, 
                this.state.chapters,
                this.state.selectedTags
                );
            this.setState({ 
                story,
                redirect: `/`
            });
        } catch(error) {
            console.log(error);
        }
    }

    async componentDidMount() {
        const genres = await storyService.getGenres();
        this.setState({ genres });

        const tags = await storyService.getTags();
        this.setState({ tags });
    }

    
    handleSelectGenre ({value}) {
        console.log('genre', value);
        this.setState({ selectedGenre: value });
    }

    addNewTag() {
        let selectedTags = this.state.selectedTags;
        selectedTags.push(this.state.newTag);
        this.setState({
            selectedTags: selectedTags,
            newTag: ""
        });
    }

    handleDeleteTag(i) {
        let selectedTags = this.state.selectedTags;
        selectedTags.splice(i, 1);
        this.setState({ selectedTags });
    }

    addChapter() {
        let chapters = this.state.chapters;
        chapters.push({ heading: "", text: "", image: "" });
        this.setState({ chapters });
    }

    setMarkdownText(index, text) {
        let chapters = this.state.chapters;
        chapters[index].text = text;
        this.setState({ chapters });
    }

    handleChapterHeadingChange(index, heading) {
        let chapters = this.state.chapters;
        chapters[index].heading = heading;
        this.setState({ chapters });
    }

    renderChapter(chapter, index) {
        return (
            <div className="form-add-chapter" key={index} id={`chapter_${index}`}>
                <h6>
                    <FormattedMessage id="add-title-chapter" />: 
                </h6>
                <Input 
                type="text"
                name="chapter"
                placeholder="Title of chapter"
                value={chapter.heading}
                onChange={(event) => { this.handleChapterHeadingChange(index, event.target.value); }}
                className="form-input-chapter" />

                <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
                {({getRootProps, getInputProps}) => (
                    <section className="section-dropzone">
                    <div {...getRootProps()}>
                        <Input  {...getInputProps()} />
                        <p>Drag 'n' drop some files here, or click to select files</p>
                    </div>
                    </section>
                )}
                </Dropzone>

                <h6>
                    <FormattedMessage id="add-text-chapter" />: 
                </h6>
                <MarkdownInput input={chapter.text} onInputChanged={(text) => { this.setMarkdownText(index, text); }} />
            </div>
        );
    }

    handleCancel() {
        this.setState({redirect: '/'});
    }

    renderContents() {
        return this.state.chapters.map((chapter, i) => {
            return (
                <h4 key={i} className="chapter-heading-contents">
                    <a href={`#chapter_${chapter.id}`} className="chapter-heading-link">
                        Chapter {i+1}: {chapter.heading}
                    </a>
                </h4>
            );
        });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return(
            <Row>
                <Col>
                    <Form 
                    className="form-add-new-story"
                    onSubmit={this.handleSubmit}>
                        <h6>
                            <FormattedMessage id="input-add-heading" />: 
                        </h6>
                        <Input
                        className="form-input-heading"
                        type="text"
                        name="heading"
                        placeholder="Add title"
                        value={this.state.heading}
                        onChange={this.handleChange}
                        required
                        />

                        <h6>
                            <FormattedMessage id="input-add-description" />: 
                        </h6>
                        <Input
                        className="form-input-description"
                        type="text"
                        name="description"
                        placeholder="Add description of story"
                        value={this.state.description}
                        onChange={this.handleChange}
                        required
                        />

                        <h6>
                            <FormattedMessage id="selected-genre" />: 
                        </h6>
                        <Select
                        className="select-genres"
                        onChange={this.handleSelectGenre}
                        options={
                            this.state.genres.map(genre => {
                                return {
                                    label: genre.name,
                                    value: genre
                                };
                            })
                        }
                        placeholder="Choose genre"
                        />

                        <h6>
                            <FormattedMessage id="add-tags" />: 
                        </h6>
                        <Row className="add-tags">
                            <Col>
                                <Input
                                className="form-input-tag"
                                type="text"
                                name="newTag"
                                placeholder="Enter your tag"
                                value={this.state.newTag}
                                onChange={this.handleChange}
                                />
                            </Col>
                            <Col className="col-add-new-tag">
                                <Button 
                                className="form-btn-add-new-tag"
                                type="button"
                                onClick={this.addNewTag}
                                style={{
                                    backgroundColor: '#57c06e',
                                    border: 'none'
                                }}>
                                    <FormattedMessage id="button-add-new-tag" />
                                </Button>
                            </Col>
                        </Row>
                        <div className="selected-tags">
                            {this.state.selectedTags.map((tag, i) => {
                                return <div key={i} className="tag">
                                    <div>
                                        {tag}
                                    </div>
                                    <div>
                                        <i className="fa fa-close" aria-hidden="true" onClick={() => {
                                            this.handleDeleteTag(i);
                                        }}></i>
                                    </div>
                                </div>;
                            })}
                        </div>

                        <h6>
                            <FormattedMessage id="contents" />: 
                        </h6>
                        <Col xs={12} md={6} className="form-contents">
                            {this.renderContents()}
                        </Col>

                        {this.state.chapters.map((chapter, i) => this.renderChapter(chapter, i))}

                        <Button 
                            className="form-btn-add-chapter"
                            type="button"
                            onClick={this.addChapter}
                            style={{
                                backgroundColor: '#57c06e',
                                border: 'none'
                            }}>
                                <FormattedMessage id="button-add-chapter" />
                        </Button>

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
                            outline color="secondary"
                            onClick={this.handleCancel}>
                                <FormattedMessage id="button-cancel" />
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        );
    }
}