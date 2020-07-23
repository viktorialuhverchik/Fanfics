import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { Container, Button } from 'reactstrap';
import './add.story.button.css';

const AddStoryButton = (props) => {    
    if (!props.blocked) {
        return (
            <Container className="container-add-story-btn">
                <Link to="/addnewstory" className="add-story-link">
                    <Button 
                    className="add-story-btn"
                    style={{
                        backgroundColor: '#1a936f',
                        border: 'none'
                    }}>
                        <FormattedMessage id="button-add-story" />
                    </Button>
                </Link>
            </Container>
        );
    } else {
        return (
            <Container className="container-add-story-btn">
                <Button 
                className="add-story-btn-disabled"
                disabled={true}
                style={{
                    backgroundColor: '#1a936f',
                    border: 'none'
                }}>
                    <FormattedMessage id="button-add-story" />
                </Button>
            </Container>
        );
    }
}

export default AddStoryButton;