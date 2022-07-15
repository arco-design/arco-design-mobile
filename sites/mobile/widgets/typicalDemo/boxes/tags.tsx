import React, { useContext } from 'react';
import { Tag } from '../../../../../packages/arcodesign/components';
import { localeMap } from '../../locale';
import { GlobalContext } from '../setting';

export default function TagDemo() {
    const list = [1, 1, 1];
    const { language } = useContext(GlobalContext);
    const colors = [
        { color: '#165DFF', bgColor: '#E8F3FF' },
        { color: '#00B42A', bgColor: '#E8FFEA' },
        { color: '#4E5969', bgColor: '#F2F3F5' },
    ];

    return (
        <div className="typical-demo-card typical-demo-tags-box">
            <Tag.List
                list={list.map((_, index) => ({
                    closeable: true,
                    borderStyle: 'none',
                    children: localeMap.TagsTag[language],
                    ...colors[index % 3],
                }))}
                showAddButton={false}
                verticalPadding={10}
            />
        </div>
    );
}
