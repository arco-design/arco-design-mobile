import React from 'react';
import Layout from '../layout';
import ReadMePage from '../../pages/guide/README';
import EnReadMePage from '../../pages/guide/README-en-US';
import { LanguageSupport } from '../../../utils/language';
import useMode from '../../../utils/useMode';

interface IHomeProps {
    language?: LanguageSupport;
}
export default function Home({ language }: IHomeProps) {
    const { mode, setMode } = useMode();
    return (
        <Layout
            name="readme"
            type="readme"
            language={language || LanguageSupport.CH}
            mode={mode}
            setMode={setMode}
        >
            {language === LanguageSupport.EN ? <EnReadMePage /> : <ReadMePage />}
        </Layout>
    );
}
