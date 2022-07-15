import React, { useContext, useState } from 'react';
import { Button, Checkbox } from '../../../../../packages/arcodesign/components';
import { localeMap } from '../../locale';
import { GlobalContext } from '../setting';

export default function CheckboxDemo() {
    const defaultValue = [2, 4];
    const allValue = [1, 2, 3, 4];
    const [selectedValue, setSelectedValue] = useState<any[]>(defaultValue);
    const { language } = useContext(GlobalContext);
    return (
        <div className="typical-demo-card typical-demo-checkbox-box">
            <Checkbox.Group
                layout="block"
                defaultValue={defaultValue}
                value={selectedValue}
                onChange={value => {
                    setSelectedValue(value);
                }}
            >
                <Checkbox
                    value={1}
                >{`${localeMap.CheckboxOption[language]}${localeMap.One[language]}`}</Checkbox>
                <Checkbox
                    value={2}
                >{`${localeMap.CheckboxOption[language]}${localeMap.Two[language]}`}</Checkbox>
                <Checkbox
                    value={3}
                >{`${localeMap.CheckboxOption[language]}${localeMap.Three[language]}`}</Checkbox>
                <Checkbox
                    value={4}
                >{`${localeMap.CheckboxOption[language]}${localeMap.Four[language]}`}</Checkbox>
            </Checkbox.Group>
            <Button
                inline
                shape="round"
                size="large"
                style={{ margin: '24px 16px 0 0' }}
                onClick={() => {
                    setSelectedValue(allValue);
                }}
            >
                {localeMap.CheckboxSelectAll[language]}
            </Button>
            <Button
                inline
                shape="round"
                size="large"
                type="default"
                onClick={() => {
                    setSelectedValue([]);
                }}
            >
                {localeMap.CheckboxCancelSelect[language]}
            </Button>
        </div>
    );
}
