import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'reactstrap';
import './tags.css';

const Tags = () => {
    return (
        <Container className="container-tags">
            <Link className="tag-link">tag1</Link>
            <Link className="tag-link">tag2</Link>
            <Link className="tag-link">tag3</Link>
            <Link className="tag-link">tag4</Link>
        </Container>
    );
}

export default Tags;