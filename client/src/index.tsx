import React from 'react';
import { unstable_HistoryRouter as BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';

import './index.css';
import App from './App';
import { setupStore } from './store';
import { history } from './services'

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
);

const store = setupStore();

root.render(
    <Provider store={store}>
        <BrowserRouter history={history}>
            <GoogleOAuthProvider clientId="1093681055981-k5fv24djdqssgokejabi9vglqghaqk1l.apps.googleusercontent.com">
                <App/>
            </GoogleOAuthProvider>;
        </BrowserRouter>
    </Provider>,
);
