import React from 'react';
import { Radio } from 'arco';
import { getUrlsByLanguage } from '../../../utils/url';
import { LanguageSupport } from '../../../utils/language';

const isVue = window.location.pathname.includes('vue');

const RadioBox: React.FC = function () {
    function onChange(value) {
        window.open(getUrlsByLanguage(LanguageSupport.CH, value === 'Vue').DOC_SITE);
    }

    return (
        <div className="arcodesign-pc-menu-header">
            <Radio.Group
                onChange={onChange}
                size="large"
                value={isVue ? 'Vue' : 'React'}
                type="button"
                options={['React', 'Vue']}
            />
        </div>
    );
};

export default RadioBox;
