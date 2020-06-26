import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import locales from '../locales';

export default function LocaleSelector() {
    const [selectedLocale, setSelectedLocale] = useState();
    return (
        <Form.Group>
            <Form.Label>
                <FormattedMessage id="labels.locale-selector" />
            </Form.Label>
            <Form.Control as="select" onChange={(e) => setSelectedLocale(e.target.value)}>
                <option value={locales.RU}>Русский</option>
                <option value={locales.EN}>English</option>
            </Form.Control>
        </Form.Group>
    )
}
