import React, { CSSProperties, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'arco';
import { IMenu, ResChildren } from '../layout';
import { LanguageSupport } from '../../../utils/language';
import RadioBox from './radio';
import './index.less';

const MenuItemGroup = Menu.ItemGroup;
const MenuItem = Menu.Item;
export interface INavProps {
    menu: IMenu;
    name: string;
    language: LanguageSupport;
    style?: CSSProperties;
}

export default function Nav(props: INavProps) {
    const { menu, name, language, style } = props;
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
        <div className="arcodesign-pc-menu-inner" style={style}>
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
                        const itemRoute =
                            _group.key === 'compositeComp' ? 'composite-components' : 'doc';
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
                                                <Link to={`${langPath}/${itemRoute}/${item.key}`}>
                                                    {item.name}
                                                </Link>
                                            </MenuItem>
                                        );
                                    })}
                                </MenuItemGroup>
                            );
                        }
                        if (_group.key === 'resource') {
                            const resourceChildren = _group.children as ResChildren;
                            return Object.keys(resourceChildren).map((category, i) => (
                                <MenuItemGroup key={i} title={category} className="title-1">
                                    {Object.keys(resourceChildren[category]).map(type => {
                                        const item = resourceChildren[category][type];
                                        return (
                                            <MenuItemGroup className="title-2" key={i} title={type}>
                                                {item.map(ele => (
                                                    <MenuItem key={ele.key}>
                                                        <Link
                                                            to={`${langPath}/${_group.key}/${ele.key}`}
                                                        >
                                                            {ele.name}
                                                        </Link>
                                                    </MenuItem>
                                                ))}
                                            </MenuItemGroup>
                                        );
                                    })}
                                </MenuItemGroup>
                            ));
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
