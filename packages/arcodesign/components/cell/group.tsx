import React, { forwardRef, Ref, useRef, useImperativeHandle } from 'react';
import { cls } from '@arco-design/mobile-utils';
import { ContextLayout } from '../context-provider';
import { CellGroupProps, CellGroupRef, CellProps, CellRef } from './type';

export interface GroupContextParams {
    isFromGroup: boolean;
}

export const GroupContext = React.createContext<GroupContextParams>({
    isFromGroup: false,
});

export function componentGenerator<P extends CellProps = CellProps, R extends CellRef = CellRef>(
    Comp: React.ForwardRefExoticComponent<P & React.RefAttributes<R>>,
) {
    return forwardRef((props: CellGroupProps<P>, ref: Ref<CellGroupRef>) => {
        const {
            className = '',
            style,
            header,
            footer,
            bordered = true,
            options,
            children,
            onClick,
        } = props;
        const domRef = useRef<HTMLDivElement | null>(null);

        useImperativeHandle(ref, () => ({
            dom: domRef.current,
        }));

        function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
            onClick && onClick(e);
        }

        return (
            <ContextLayout>
                {({ prefixCls }) => (
                    <div
                        className={cls(`${prefixCls}-cell-group`, 'all-border-box', className)}
                        ref={domRef}
                        onClick={handleClick}
                        style={style}
                    >
                        {header ? <div className="cell-group-header">{header}</div> : null}
                        <div className={cls('cell-group-body', { bordered })}>
                            <GroupContext.Provider value={{ isFromGroup: true }}>
                                {children}
                                {options &&
                                    options.map((option, index) => (
                                        <Comp key={index} {...option} />
                                    ))}
                            </GroupContext.Provider>
                        </div>
                        {footer ? <div className="cell-group-footer">{footer}</div> : null}
                    </div>
                )}
            </ContextLayout>
        );
    });
}
