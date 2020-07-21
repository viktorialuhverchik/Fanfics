import React, { useState, useEffect } from 'react';
import { FormGroup, Container } from 'reactstrap';
import Select from 'react-select';

const themes = {
    dark: "Dark",
    light: "Light"
};

export default function ThemeSelector() {
    const [selectedTheme, setSelectedTheme] = useState(localStorage.getItem("theme") || themes.light);
    const onSelectTheme = (theme) => {
        setSelectedTheme(theme.value);
    }

    const formatThemes = () => {
        let formattedThemes = [];

        for (let key in themes) {
            formattedThemes.push({ value: themes[key], label: themes[key] });
        }

        return formattedThemes;
    };

    useEffect(() => {
        localStorage.setItem("theme", selectedTheme);

        if (selectedTheme === themes.dark) {
            document.body.classList.add("dark-theme");
        } else {
            document.body.classList.remove("dark-theme");
        }
    });

    return (
        <Container className="container-setting">
            <FormGroup className="select-theme">
                <Select
                className="selected-theme"
                onChange={onSelectTheme}
                placeholder="Choose theme"
                options={formatThemes()}>
                </Select>
            </FormGroup>
        </Container>
    );
}