import React from 'react';
import Layout from '../layout';
import ReadMePage from '../../pages/guide/README';
import EnReadMePage from '../../pages/guide/README-en-US';
import { LanguageSupport } from '../../../utils/language';

interface IHomeProps {
    language?: LanguageSupport;
}
export default function Home({ language }: IHomeProps) {
    return (
        <Layout name="readme" type="readme" language={language || LanguageSupport.CH}>
            {language === LanguageSupport.EN ? <EnReadMePage /> : <ReadMePage />}
        </Layout>
    );
}
