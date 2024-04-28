import React, { ReactNode } from 'react';
import Layout, { IMenuItemMap } from '../layout';
import { LanguageSupport } from '../../../utils/language';
import useMode from '../../../utils/useMode';

interface IHomeProps {
    menuItemsMap: IMenuItemMap;
    Header: any;
    language?: LanguageSupport;
    readmePage?: ReactNode;
}
export default function Home({ language, readmePage, menuItemsMap, Header }: IHomeProps) {
    const { mode, setMode } = useMode();
    return (
        <Layout
            name="readme"
            type="readme"
            menuItemsMap={menuItemsMap}
            Header={Header}
            language={language || LanguageSupport.CH}
            mode={mode}
            setMode={setMode}
        >
            {readmePage}
        </Layout>
    );
}
