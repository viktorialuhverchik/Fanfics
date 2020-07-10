import React from 'react';
import { FormGroup, Input } from 'reactstrap';
import locales from '../locales';

export default function LocaleSelector({locale, onLocaleChange}) {
    return (
        <div>
            <FormGroup controlId="exampleForm.ControlSelect1" className="select-language">
                <Input type="select" onChange={(event) => onLocaleChange(event.target.value)}>
                    <option value={locales.RU}>Русский</option>
                    <option value={locales.EN}>English</option>
                </Input>
            </FormGroup>
            <div>{locale}</div>
        </div>
    );
}
