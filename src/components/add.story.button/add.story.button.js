import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import Button from 'react-bootstrap/Button';

const AddStoryButton = () => {
    return (
        <div>
            <Link to={"/addnewstory"}>
            <Button 
            style={{
                backgroundColor: '#1a936f',
                border: 'none'
            }}>
                <FormattedMessage id="button-add-story" />
            </Button>
            </Link>
        </div>
    );
}
export default AddStoryButton;