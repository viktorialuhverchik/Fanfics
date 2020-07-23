import React from 'react';
import { Container, Col } from 'reactstrap';
import './page.not.found.css';

const PageNotFound = () => {
    return (
        <div>
            <Container className="page-not-found">
                <Col>
                    <h1>404</h1>
                    <h3>Page not found</h3>
                </Col>
            </Container>
        </div>
    );
}

export default PageNotFound;