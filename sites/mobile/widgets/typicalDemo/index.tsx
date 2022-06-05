import React, { useEffect } from 'react';
import setRootPixel from '../../../../packages/arcodesign/tools/flexible';
import { LanguageSupport } from '../../../utils/language';
import SliderDemo from './boxes/slider';
import List1Demo from './boxes/list1';
import CircleProgressDemo from './boxes/circle-progress';
import CountdownDemo from './boxes/countdown';
import BtnsDemo from './boxes/btns';
import List2Demo from './boxes/list2';
import AvatarDemo from './boxes/avatar';
import TagDemo from './boxes/tags';
import CollapseDemo from './boxes/collapse-list';
import CheckboxDemo from './boxes/checkbox';
import RateDemo from './boxes/rate';
import DialogDemo from './boxes/dialog-box';
import { GlobalContext } from './setting';
import './index.less';

interface ITypicalDemoProps {
    language?: LanguageSupport;
}

export default function TypicalDemo({ language = LanguageSupport.CH }: ITypicalDemoProps) {
    useEffect(() => {
        setRootPixel(50, 912);
    }, []);
    return (
        <GlobalContext.Provider value={{ language }}>
            <div className="typical-demo arcodesign-mobile-demo-wrapper">
                <div className="column-first">
                    <SliderDemo />
                    <div className="column-first-unit">
                        <CircleProgressDemo />
                        <CountdownDemo />
                    </div>
                    <BtnsDemo />
                    <List2Demo />
                    <TagDemo />
                </div>
                <div className="column-second">
                    <CheckboxDemo />
                    <div className="column-second-unit">
                        <RateDemo />
                        <DialogDemo />
                    </div>
                    <List1Demo />
                    <AvatarDemo />
                    <CollapseDemo />
                </div>
            </div>
        </GlobalContext.Provider>
    );
}
