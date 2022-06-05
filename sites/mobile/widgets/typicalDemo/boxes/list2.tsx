import React, { useContext } from 'react';
import { Avatar, Cell, Switch } from '../../../../../packages/arcodesign/components';
import { localeMap } from '../../locale';
import { GlobalContext } from '../setting';

export default function List2Demo() {
    const { language } = useContext(GlobalContext);
    return (
        <div className="typical-demo-card typical-demo-list2-box">
            <Cell.Group bordered={false}>
                <Cell
                    icon={
                        <Avatar
                            className="demo-cell-avatar-medium"
                            src="https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_home_/avatar_t.png"
                        />
                    }
                    label={localeMap.ListContent[language]}
                    desc={localeMap.ListDescription[language]}
                />
                <Cell
                    label={localeMap.ListContent[language]}
                    desc={localeMap.ListDescription[language]}
                    text={localeMap.ListDescription[language]}
                />
                <Cell
                    label={localeMap.ListContent[language]}
                    desc={localeMap.ListDescription[language]}
                >
                    <span className="demo-cell-span">+52.8</span>
                </Cell>
                <Cell
                    label={localeMap.ListContent[language]}
                    desc={localeMap.ListDescription[language]}
                >
                    <Switch defaultChecked />
                </Cell>
                <Cell
                    label={localeMap.ListContent[language]}
                    desc={localeMap.ListDescription[language]}
                    showArrow
                />
            </Cell.Group>
        </div>
    );
}
