import React from 'react';
import { Route } from 'react-router-dom';
import './app.css';
import Header from '../header/header';
import Signup from '../signup/signup';
import Login from '../login/login';
import User from '../user/user';
import Story from '../story/story';
import NewStory from '../add.story/add.story';
// import locales from '../locales';
// import { IntlProvider } from 'react-intl';
// import { FormattedMessage } from 'react-intl';

// const messages = {
//   [locales.EN]: en,
//   [locales.RU]: ru
// }

// const localStorageKey;

function App() {
//   const [selectedState, setSelectedState] = useState(localStorage.getItem(localStorageKey.SELECTED_LOCALE) || locales.en);
//   const onLocaleChange = value => {
//     setSelectedState(value);
//     localStorage.setItem(localStorageKey.SELECTED_LOCALE, value);
//   }

  return (
    <div className="app">
        {/* <IntlProvider locale={selectedState} messages={messages[selectedState]}> */}
              {/* <LocaleSelector onLocaleChange={onLocaleChange} /> */}
                <Header />
                {/* <FormattedMessage id="messages.locale-selector"/> */}
                <Route path={"/signup"} component={Signup}></Route>
                <Route path={"/login"} component={Login}></Route>
                <Route path={"/user"} component={User}></Route>
                <Route path={"/newstory"} component={NewStory}></Route>
                <Story />
        {/* </IntlProvider> */}
    </div>
  );
}

export default App;