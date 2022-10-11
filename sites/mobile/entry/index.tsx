import React, { createContext, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Switch, Route } from 'react-router-dom';
import setRootPixel from '../../../packages/arcodesign/tools/flexible';
import tokens from '../../../packages/arcodesign/tokens/app/arcodesign/default';
import ContextProvider from '../../../packages/arcodesign/components/context-provider';
import { LanguageSupport } from '../../utils/language';
import docs from '../../pages';
import enDocs from '../../pages/index-en-US';
import Demo from '../widgets/demo';
import Home from '../widgets/home';
import TypicalDemo from '../widgets/typicalDemo';
import useTheme from './useTheme';
import '../../../packages/arcodesign/components/style';
import '../../../packages/arcodesign/tools/touch2mouse';
import useLocale from './useLocale';
import './index.less';

setRootPixel();

export const HistoryContext = createContext<any>(null);

function App() {
    const { customTheme } = useTheme();
    const actualTokens = useMemo(() => ({ ...tokens, ...customTheme }), [customTheme]);

    const theme = useMemo(
        () =>
            Object.keys(actualTokens).reduce(
                (acc, key) => ({
                    ...acc,
                    ...(key.startsWith('dark-') ? {} : { [key]: actualTokens[key] }),
                }),
                {},
            ),
        [actualTokens],
    );
    const { locale } = useLocale();

    return (
        <ContextProvider theme={theme} locale={locale}>
            <HashRouter>
                <Switch>
                    <Route
                        path="/"
                        render={props => (
                            <HistoryContext.Provider value={props.history}>
                                <Home language={LanguageSupport.CH} />
                            </HistoryContext.Provider>
                        )}
                        exact
                    />
                    <Route
                        path="/en-US"
                        render={props => (
                            <HistoryContext.Provider value={props.history}>
                                <Home language={LanguageSupport.EN} />
                            </HistoryContext.Provider>
                        )}
                        exact
                    />
                    <Route
                        path="/components/:name"
                        render={props => {
                            const { name } = props.match.params;
                            const Comp = docs[name];
                            return Comp ? <Demo name={name} doc={<Comp />} /> : null;
                        }}
                        exact
                    />
                    <Route
                        path="/en-US/components/:name"
                        render={props => {
                            const { name } = props.match.params;
                            const Comp = enDocs[name];
                            return Comp ? <Demo name={name} doc={<Comp />} /> : null;
                        }}
                        exact
                    />
                    <Route path="/typical-demo" render={() => <TypicalDemo />} exact />
                    <Route
                        path="/en-US/typical-demo"
                        render={() => <TypicalDemo language={LanguageSupport.EN} />}
                        exact
                    />
                    <Route
                        path="*"
                        render={props => (
                            <HistoryContext.Provider value={props.history}>
                                <Home />
                            </HistoryContext.Provider>
                        )}
                    />
                </Switch>
            </HashRouter>
        </ContextProvider>
    );
}
createRoot(document.querySelector('#app')!).render(<App />);
