import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import demoDocs from '../pages-vue/components';
import enDemoDocs from '../pages-vue/components/index-en-US';
import Demo from '../entry/demo';
import Home from '../entry/home';
import ReadMePage from '../pages-vue/guide/README';
import EnReadMePage from '../pages-vue/guide/README-en-US';
import Header from './header';
import readmeDocs from '../pages-vue/guide';
import { LanguageSupport } from '../../utils/language';
import { render } from '../../../packages/arcodesign/components/_helpers';
// import { showGA } from '../../utils/ga';
import { HistoryContext } from '../entry/context';
import { menuItemsMap } from './menu';
import '../entry/index.less';

function CompGenerator(children, history) {
    return <HistoryContext.Provider value={history}>{children}</HistoryContext.Provider>;
}
function App() {
    const commonProps = { menuItemsMap, Header, isVue: true };
    // useEffect(() => {
    //     const getURLChange = () => {
    //         showGA();
    //     };
    //     window.addEventListener('hashchange', getURLChange);
    //     return () => {
    //         window.removeEventListener('hashchange', getURLChange);
    //     };
    // }, []);
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
                                      <Demo
                                          {...commonProps}
                                          type="readme"
                                          name={name}
                                          doc={<Comp />}
                                      />,
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
                                          {...commonProps}
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
                                          {...commonProps}
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
                                          {...commonProps}
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
                            CompGenerator(
                                <Home
                                    {...commonProps}
                                    language={LanguageSupport.EN}
                                    readmePage={<EnReadMePage />}
                                />,
                                history,
                            )
                        }
                    />
                    <Route
                        path="*"
                        render={({ history }) =>
                            CompGenerator(
                                <Home {...commonProps} readmePage={<ReadMePage />} />,
                                history,
                            )
                        }
                    />
                </Switch>
            </HashRouter>
        </div>
    );
}
render(<App />, document.querySelector('#root')!);
