import React, {type FunctionComponent} from 'react';
import {useTranslation} from 'react-i18next';
import logo from './logo.svg';
import './App.css';
import './i18n/config';

export const App: FunctionComponent = () => {
    const {t} = useTranslation('home');

    return (
        <div className="App">
            <header className="App-header">
                <img
                    src={logo}
                    className="App-logo"
                    alt="logo"
                />
                <p>
                    {t('title')}
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                  Learn React
                </a>
            </header>
        </div>
    );
};
