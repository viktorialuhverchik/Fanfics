import React from 'react';
import { FormGroup, Container } from 'reactstrap';
import locales from '../locales';
import './locale.selector.css';
import Select from 'react-select';

export default function LocaleSelector({onLocaleChange}) {
    const formatLocales = () => {
        let formattedLocales = [];

        for (let key in locales) {
            formattedLocales.push(locales[key]);
        }

        return formattedLocales;
    };

    return (
        <Container className="container-setting">
            <FormGroup className="select-language">
                <Select
                onChange={(language) => onLocaleChange(language.value)}
                placeholder="Choose language"
                options={formatLocales()}>
                </Select>
            </FormGroup>
        </Container>
    );
}
