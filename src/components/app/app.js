import React, {useState} from 'react';
import { Route, Switch } from "react-router-dom";
import { Col } from 'reactstrap';
import Header from '../header/header';
import Menu from '../menu/menu';
import MainPage from '../main.page/main.page';
import UserVerify from '../user.verify/user.verify';
import SortedByNew from '../sorted.by.new/sorted.by.new';
import SortedByRating from '../sorted.by.rating/sorted.by.rating';
import User from '../user/user';
import Admin from '../admin/admin';
import AddNewStory from '../add.new.story/add.new.story';
import PageStory from '../page.story/page.story';
import SearchResult from '../search.result/search.result';
import MarkdownPageStory from '../markdown.page.story/markdown.page.story';
import locales from '../locales';
import LocaleSelector from '../locale.selector/locale.selector';
import ThemeSelector from '../theme.selector/theme.selector';
import { IntlProvider } from 'react-intl';
import en from '../locales/en.json';
import ru from '../locales/ru.json';
import './app.css';

const messages = {
    [locales.EN.value]: en,
    [locales.RU.value]: ru
};

const localStorageKey = {
    SELECTED_LOCALE: "my-app.selected-locale"
};

function App() {
    const [selectedState, setSelectedState] = useState(localStorage.getItem(localStorageKey.SELECTED_LOCALE) || locales.EN.value);
    const onLocaleChange = value => {
        setSelectedState(value);
        localStorage.setItem(localStorageKey.SELECTED_LOCALE, value);
    };
    return (
        <div className="app">
            <IntlProvider locale={selectedState} messages={messages[selectedState]}>
                <Header />
                <Col xs={6} md={4} className="menu">
                    <LocaleSelector onLocaleChange={onLocaleChange} />
                    <ThemeSelector />
                    <Menu />
                </Col>
                <Switch>
                    <Route exact path="/new" component={SortedByNew} />
                    <Route exact path="/popular" component={SortedByRating} />
                    <Route exact path="/user" component={User} />
                    <Route exact path="/user-verify/:token" component={UserVerify} />
                    <Route exact path="/admin" component={Admin} />
                    <Route exact path="/addnewstory" component={AddNewStory} />
                    <Route exact path="/pagestory/:storyId" component={PageStory} />
                    <Route exact path="/searchresult" component={SearchResult} />
                    <Route exact path="/markdownpage" component={MarkdownPageStory} />
                    <Route exact path="/" component={MainPage} />
                </Switch>
            </IntlProvider>
        </div>
    );
}

export default App;