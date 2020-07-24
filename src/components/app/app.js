import React, {Component} from 'react';
import { Route, Switch } from "react-router-dom";
import { Col } from 'reactstrap';
import Header from '../header/header';
import Menu from '../menu/menu';
import UserVerify from '../user.verify/user.verify';
import SortedByNew from '../sorted.by.new/sorted.by.new';
import SortedByRating from '../sorted.by.rating/sorted.by.rating';
import User from '../user/user';
import Admin from '../admin/admin';
import AddNewStory from '../add.new.story/add.new.story';
import PageStory from '../page.story/page.story';
import SearchResult from '../search.result/search.result';
import MarkdownPageStory from '../markdown.page.story/markdown.page.story';
import PageNotFound from '../page.not.found/page.not.found';
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

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            language: localStorage.getItem(localStorageKey.SELECTED_LOCALE) || locales.EN.value,
            userId: localStorage.getItem('id')
        };

        this.onLocaleChange = this.onLocaleChange.bind(this);
        this.onUserIdChange = this.onUserIdChange.bind(this);
    }

    onLocaleChange(value) {
        this.setState({ language: value });
        localStorage.setItem(localStorageKey.SELECTED_LOCALE, value);
    };

    onUserIdChange(userId) {
        this.setState({ userId });
    }

    render() {
        const language = this.state.language;
        const userId = this.state.userId;

        return (
            <div className="app">
                <IntlProvider locale={language} messages={messages[language]}>
                    <Header userId={userId} />
                    <Col xs={6} md={4} className="menu">
                        <LocaleSelector onLocaleChange={this.onLocaleChange} />
                        <ThemeSelector />
                        <Menu onUserIdChange={this.onUserIdChange} />
                    </Col>
                    <Switch>
                        <Route exact path="/new" component={SortedByNew} />
                        <Route exact path="/popular" component={SortedByRating} />
                        <Route exact path="/users/:id/stories" component={User} />
                        <Route exact path="/user-verify/:token" component={UserVerify} />
                        <Route exact path="/admin" component={Admin} />
                        <Route exact path="/addnewstory" component={AddNewStory} />
                        <Route exact path="/pagestory/:storyId" component={PageStory} />
                        <Route exact path="/searchresult" component={SearchResult} />
                        <Route exact path="/markdownpage" component={MarkdownPageStory} />
                        <Route exact path="/404" component={PageNotFound} />
                        <Route exact path="/" component={SortedByNew} />
                    </Switch>
                </IntlProvider>
            </div>
        );
    }
}