import React from 'react';
import { LanguageSupport } from '../../../utils/language';
import { localeMap } from '../../../utils/locale';
import './index.less';

export interface IIconProps {
    iconList?: {
        type: string;
        icons: {
            name: string;
            code: string;
        }[];
    }[];
    children?: React.ReactNode;
    language?: LanguageSupport;
}

export default function IconContainer(props: IIconProps) {
    const { children, language = LanguageSupport.CH } = props;
    return (
        <div className="iconlist-wrapper">
            <div className="iconlist-title">{localeMap.Icon[language]}</div>
            <ul className="iconlist">{children}</ul>
        </div>
    );
}
