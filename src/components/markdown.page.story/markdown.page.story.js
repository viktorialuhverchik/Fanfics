import React, {useState} from 'react';
import { Col } from 'reactstrap';
import MarkdownInput from "../markdown/markdown";

export default function MarkdownPageStory() {
    const [markdownValue, setMarkdownValue] = useState("* This is a header *And this is a paragraph");

    return (
        <Col xs={12} md={8}>
            <MarkdownInput input={markdownValue} onInputChanged={value => setMarkdownValue(value)} />
        </Col>
    );
}
