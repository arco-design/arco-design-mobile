import React, { useContext, useState } from 'react';
import { Button, Slider } from '../../../../../packages/arcodesign/components';
import { localeMap } from '../../locale';
import { GlobalContext } from '../setting';

const baseClass = 'typical-demo-slider-box';
export default function List1Demo() {
    const [value, setValue] = useState<[number, number]>([0, 6]);
    const { language } = useContext(GlobalContext);
    return (
        <div className={`typical-demo-card ${baseClass}`}>
            <Slider
                useRange
                prefixLabel
                suffixLabel
                max={10}
                showTooltip="always"
                value={value}
                onChange={val => setValue(val as [number, number])}
                formatTooltip={val => `${val} ${localeMap.SliderUnit[language]}`}
            />
            <div className="bottom-btn">
                <Button type="default" onClick={() => setValue([0, 10])}>
                    {localeMap.SliderCancel[language]}
                </Button>

                <Button needActive>{localeMap.SliderOK[language]}</Button>
            </div>
        </div>
    );
}
