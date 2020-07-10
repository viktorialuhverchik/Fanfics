import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import ReactMde from "react-mde";
import Showdown from "showdown";

import 'react-mde/lib/styles/css/react-mde-all.css';

const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true
  });

export default function MarkdownInput({ input, onInputChanged }) {
    const [selectedTab, setSelectedTab] = useState("write");
    return (
        <>
            <div>
                <ReactMarkdown source={input} />
            </div>
            <div>
                <ReactMde
                    value={input}
                    onChange={onInputChanged}
                    selectedTab={selectedTab}
                    onTabChange={setSelectedTab}
                    generateMarkdownPreview={markdown =>
                        Promise.resolve(converter.makeHtml(markdown))
                    }
                />
            </div>
        </>
    )
}
