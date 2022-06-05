import React, { useContext } from 'react';
import { NavBar } from '../../../../../packages/arcodesign/components';
import { localeMap } from '../../locale';
import { GlobalContext } from '../setting';

export default function NavbarDemo() {
    const { language } = useContext(GlobalContext);
    return (
        <div className='typical-demo-card typical-demo-navbar-box'>
            <NavBar
                fixed={false}
                statusBarHeight={10}
                className="immersive-navbar"
                title={localeMap.NavBarMessage[language]}
                hasBottomLine={false}
            />
        </div>
    );
}



