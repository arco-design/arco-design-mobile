import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';
import demoDocs from '../pages/components';
import enDemoDocs from '../pages/components/index-en-US';
import Demo from './demo';
import Home from './home';
import readmeDocs from '../pages/guide';
import { LanguageSupport } from '../../utils/language';
import './index.less';

export const HistoryContext = createContext<any>(null);

function CompGenerator(children, history) {
    return <HistoryContext.Provider value={history}>{children}</HistoryContext.Provider>;
}
ReactDOM.render(
    <div className="arcodesign-pc-site-wrap">
        <HashRouter>
            <Switch>
                <Route
                    path="/doc/:name"
                    render={({ history, match }) => {
                        const { name } = match.params;
                        const Comp = readmeDocs[name];
                        return Comp
                            ? CompGenerator(
                                  <Demo type="readme" name={name} doc={<Comp />} />,
                                  history,
                              )
                            : null;
                    }}
                />
                <Route
                    path="/en-US/doc/:name"
                    render={({ history, match }) => {
                        const { name } = match.params;
                        const Comp = readmeDocs[`${name}-en-US`] || readmeDocs[name];
                        return Comp
                            ? CompGenerator(
                                  <Demo
                                      type="readme"
                                      name={name}
                                      doc={<Comp />}
                                      language={LanguageSupport.EN}
                                  />,
                                  history,
                              )
                            : null;
                    }}
                />
                <Route
                    path="/components/:name"
                    render={({ history, match }) => {
                        const { name } = match.params;
                        const Comp = demoDocs[name];
                        return Comp
                            ? CompGenerator(
                                  <Demo
                                      type="doc"
                                      name={name}
                                      doc={<Comp language={LanguageSupport.CH} />}
                                  />,
                                  history,
                              )
                            : null;
                    }}
                    exact
                />
                <Route
                    path="/en-US/components/:name"
                    render={({ history, match }) => {
                        const { name } = match.params;
                        const Comp = enDemoDocs[name];
                        return Comp
                            ? CompGenerator(
                                  <Demo
                                      type="doc"
                                      name={name}
                                      doc={<Comp language={LanguageSupport.EN} />}
                                      language={LanguageSupport.EN}
                                  />,
                                  history,
                              )
                            : null;
                    }}
                    exact
                />
                <Route
                    path="/en-US"
                    render={({ history }) =>
                        CompGenerator(<Home language={LanguageSupport.EN} />, history)
                    }
                />
                <Route path="*" render={({ history }) => CompGenerator(<Home />, history)} />
            </Switch>
        </HashRouter>
    </div>,
    document.querySelector('#root'),
);
