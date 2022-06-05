import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'arco';
import { IMenu } from '../layout';
import { LanguageSupport } from '../../../utils/language';
import RadioBox from './radio';
import './index.less';

const MenuItemGroup = Menu.ItemGroup;
const MenuItem = Menu.Item;
export interface INavProps {
    menu: IMenu;
    name: string;
    language: LanguageSupport;
}

export default function Nav(props: INavProps) {
    const { menu, name, language } = props;
    const matches = location.hash.match(/#\/(.*)\/(.*)/);
    const [defaultSelectedKeys, setDefaultSelectedKeys] = useState(
        (matches && matches[2]) || 'readme',
    );

    useEffect(() => {
        setDefaultSelectedKeys(name || 'readme');
        window.scrollTo(0, 0);
    }, [name]);

    const langPath = language === LanguageSupport.EN ? '/en-US' : '';

    return (
        <div className="arcodesign-pc-menu-inner">
            <RadioBox />
            <div className="arcodesign-pc-menu-list">
                <Menu
                    autoScrollIntoView
                    style={{ width: 260 }}
                    defaultSelectedKeys={[defaultSelectedKeys]}
                    selectedKeys={[defaultSelectedKeys]}
                >
                    {Object.keys(menu).map(group => {
                        const _group = menu[group];
                        if (_group.items) {
                            return (
                                <MenuItemGroup
                                    key={_group.key}
                                    title={_group.name}
                                    className="title-1"
                                >
                                    {_group.items.map(item => {
                                        return (
                                            <MenuItem key={item.key}>
                                                <Link to={`${langPath}/doc/${item.key}`}>
                                                    {item.name}
                                                </Link>
                                            </MenuItem>
                                        );
                                    })}
                                </MenuItemGroup>
                            );
                        }
                        return (
                            <MenuItemGroup key={_group.key} title={_group.name} className="title-1">
                                {Object.keys(_group.children).map((key, i) => (
                                    <MenuItemGroup key={i} title={key}>
                                        {_group.children[key].map(_ => {
                                            return (
                                                <MenuItem key={_.key}>
                                                    <Link to={`${langPath}/${_group.key}/${_.key}`}>
                                                        {_.name}
                                                    </Link>
                                                </MenuItem>
                                            );
                                        })}
                                    </MenuItemGroup>
                                ))}
                            </MenuItemGroup>
                        );
                    })}
                </Menu>
            </div>
        </div>
    );
}
