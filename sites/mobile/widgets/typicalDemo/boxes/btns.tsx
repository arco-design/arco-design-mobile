import React, { useContext } from 'react';
import { Button } from '../../../../../packages/arcodesign/components';
import { localeMap } from '../../locale';
import { GlobalContext } from '../setting';

export default function BtnsDemo() {
    const { language } = useContext(GlobalContext);
    return (
        <div className="typical-demo-card typical-demo-btns-box">
            <div className="first-row">
                <Button needActive>{localeMap.BtnsPrimary[language]}</Button>
                <Button type="default" needActive>
                    {localeMap.BtnsDefault[language]}
                </Button>
                <Button type="ghost">{localeMap.BtnsGhost[language]}</Button>
            </div>
            <div className="second-row">
                <Button shape="round" needActive>
                    {localeMap.BtnsPrimaryRound[language]}
                </Button>
                <Button shape="round" type="default" needActive>
                    {localeMap.BtnsDefaultRound[language]}
                </Button>
                <Button shape="round" type="ghost">
                    {localeMap.BtnsGhostRound[language]}
                </Button>
            </div>
        </div>
    );
}
