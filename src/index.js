import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './components/app/app';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { IntlProvider } from 'react-intl';
// import en from './components/locales/en.json';
// import ru from './components/locales/ru.json';
// import locales from './components/locales';


// const messages = {
//   en,
//   ru
// }

ReactDOM.render(
  <BrowserRouter>
      {/* <IntlProvider locales={locales.EN} messages={messages[locales.EN]}> */}
          <App />
      {/* </IntlProvider> */}
  </BrowserRouter>,
  document.getElementById('root')
);