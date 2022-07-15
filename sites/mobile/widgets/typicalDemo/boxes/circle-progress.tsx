import React, { useContext } from 'react';
import { CircleProgress } from '../../../../../packages/arcodesign/components';
import { localeMap } from '../../locale';
import { GlobalContext } from '../setting';

export default function CircleProgressDemo() {
    const { language } = useContext(GlobalContext);
    return (
        <div className="typical-demo-card typical-demo-cp-box">
            <span className="box-title">{localeMap.CircleProgressCurProgress[language]}</span>
            <CircleProgress
                progressColorStart="#"
                progressColorEnd="#"
                percentage={100}
                radius={52.5}
                progressStroke={8}
                trackStroke={8}
            />
            <span className="box-desc">{localeMap.CircleProgressColor[language]}</span>
        </div>
    );
}
