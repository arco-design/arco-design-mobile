import React, { useEffect } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import demoDocs from '../pages/components';
import enDemoDocs from '../pages/components/index-en-US';
import compositeDemoDocs from '../pages/composite-comp';
import enCompositeDemoDocs from '../pages/composite-comp/index-en-US';
import Demo from './demo';
import Home from './home';
import readmeDocs from '../pages/guide';
import { LanguageSupport } from '../../utils/language';
import { render } from '../../../packages/arcodesign/components/_helpers';
import { showGA } from '../../utils/ga';
import { HistoryContext } from './context';
import './index.less';

function CompGenerator(children, history) {
    return <HistoryContext.Provider value={history}>{children}</HistoryContext.Provider>;
}
function App() {
    useEffect(() => {
        const getURLChange = () => {
            showGA();
        };
        window.addEventListener('hashchange', getURLChange);
        return () => {
            window.removeEventListener('hashchange', getURLChange);
        };
    }, []);
    return (
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
                        path="/composite-components/:name"
                        render={({ history, match }) => {
                            const { name } = match.params;
                            const Comp = compositeDemoDocs[name];
                            return Comp
                                ? CompGenerator(
                                      <Demo
                                          type="doc"
                                          name={name}
                                          route="composite-components"
                                          doc={<Comp language={LanguageSupport.CH} />}
                                      />,
                                      history,
                                  )
                                : null;
                        }}
                        exact
                    />
                    <Route
                        path="/en-US/composite-components/:name"
                        render={({ history, match }) => {
                            const { name } = match.params;
                            const Comp = enCompositeDemoDocs[name];
                            return Comp
                                ? CompGenerator(
                                      <Demo
                                          type="doc"
                                          name={name}
                                          route="composite-components"
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
        </div>
    );
}
render(<App />, document.querySelector('#root')!);
