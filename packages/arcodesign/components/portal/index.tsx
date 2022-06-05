import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

export interface PortalProps {
    /**
     * 被挂载的内容
     * @en Content to be mounted
     */
    children?: React.ReactNode;
    /**
     * 容器获取函数
     * @en Container getter function
     * @default () => document.body
     */
    getContainer?: () => HTMLElement;
}

/**
 * React.createPortal的简单封装。
 * @en Simple wrapper for React.createPortal
 * @type 其他
 * @type_en Others
 * @name 自定义挂载
 * @name_en Portal
 */
export default function Portal(props: PortalProps) {
    const [container, setContainer] = useState<HTMLElement>();
    const { children, getContainer } = props;

    useEffect(() => {
        setContainer(getContainer ? getContainer() : document.body);
    }, [getContainer]);

    return container ? ReactDOM.createPortal(children, container) : null;
}
