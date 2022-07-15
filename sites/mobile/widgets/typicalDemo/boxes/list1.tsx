import React, { useContext, useState } from 'react';
import { Cell, Tag } from '../../../../../packages/arcodesign/components';
import { localeMap } from '../../locale';
import { GlobalContext } from '../setting';

export default function List1Demo() {
    const [activeIndex, setActiveIndex] = useState(0);
    const { language } = useContext(GlobalContext);
    const defaultStyle = {
        color: '#1D2129',
        bgColor: '#F7F8FA',
    };

    return (
        <div className="typical-demo-card typical-demo-list1-box">
            <div className="tag-group">
                {[1, 1, 1].map((_, index) => (
                    <Tag
                        key={index}
                        size="large"
                        borderStyle="none"
                        filleted
                        {...(activeIndex === index ? {} : defaultStyle)}
                        onClick={() => setActiveIndex(index)}
                    >
                        {localeMap.ListExample[language]}
                    </Tag>
                ))}
            </div>
            <Cell.Group bordered={false}>
                <Cell label={localeMap.ListContent[language]} showArrow />
                <Cell label={localeMap.ListContent[language]} showArrow />
                <Cell label={localeMap.ListContent[language]} showArrow />
            </Cell.Group>
        </div>
    );
}
