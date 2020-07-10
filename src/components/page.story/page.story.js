import React from 'react';
import { Row, Col } from 'reactstrap';
import Comments from '../comments/comments';
import RenderedStory from '../rendered.story/rendered.story';


const PageStory = () => {
    return (
        <Row>
            <Col>
                <RenderedStory />
                <Comments />
            </Col>
        </Row>
    );
}

export default PageStory;