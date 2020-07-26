import React from 'react';
import { FormGroup, Container } from 'reactstrap';
import locales from '../locales';
import './locale.selector.css';
import Select from 'react-select';
import { FormattedMessage } from 'react-intl';

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
                <FormattedMessage id="language">
                    {placeholder => 
                    <Select
                    onChange={(language) => onLocaleChange(language.value)}
                    placeholder={placeholder}
                    options={formatLocales()} />}
                </FormattedMessage>
            </FormGroup>
        </Container>
    );
}
