import React, { forwardRef, Ref, useContext, useImperativeHandle, useMemo, useRef } from 'react';
import { cls } from '@arco-design/mobile-utils';
import { IconCheckBold, IconCloseBold } from '../icon';
import { ContextLayout } from '../context-provider';
import { StepsContext } from './index';
import { StepProps, StepRef } from './type';

const Step = forwardRef((props: StepProps, ref: Ref<StepRef | null>) => {
    const { title, description, icon } = props;

    const {
        iconType,
        current,
        direction,
        index = 0,
        status: contextStatus,
        align: contextAlign,
        changeIndex,
    } = useContext(StepsContext);
    const status = props.status || contextStatus;
    const align = props.align || contextAlign;

    const domRef = useRef<HTMLDivElement | null>(null);
    useImperativeHandle(ref, () => ({
        dom: domRef.current,
    }));

    const currentStatus = useMemo(() => {
        if (status) return status;
        if (current! < index) {
            return 'wait';
        }
        if (current! === index) {
            return 'process';
        }
        return 'finish';
    }, [status, index, current]);

    function renderNumIcon(prefixCls) {
        let content;
        if (currentStatus === 'finish') {
            content = <IconCheckBold />;
        } else if (currentStatus === 'error') {
            content = <IconCloseBold />;
        }
        return (
            content || <span className={cls(`${prefixCls}-steps-item-icon-num`)}>{index + 1}</span>
        );
    }

    return (
        <ContextLayout>
            {({ prefixCls }) => (
                <div
                    ref={domRef}
                    className={cls(
                        `${prefixCls}-steps-item`,
                        `${prefixCls}-steps-item-align-${align}`,
                        currentStatus,
                        direction,
                        iconType,
                    )}
                    onClick={() => changeIndex(index)}
                >
                    <div
                        className={cls(
                            `${prefixCls}-steps-item-tail`,
                            `${prefixCls}-steps-item-tail-status-${currentStatus}`,
                            `${prefixCls}-steps-item-tail-align-${align}`,
                            `${currentStatus}-tail-color-with-config`,
                        )}
                    />
                    {icon ? (
                        <div
                            className={cls(
                                `${prefixCls}-steps-item-custom-icon`,
                                `${currentStatus}-custom-icon-bg-color-with-config`,
                            )}
                        >
                            {icon}
                        </div>
                    ) : (
                        <div
                            className={cls(
                                `${prefixCls}-steps-item-icon`,
                                `${currentStatus}-bg-color-with-config`,
                            )}
                        >
                            {iconType === 'number' ? (
                                renderNumIcon(prefixCls)
                            ) : (
                                <span className={cls(`${prefixCls}-steps-item-icon-dot`)} />
                            )}
                        </div>
                    )}
                    {title || description ? (
                        <div
                            className={cls(
                                `${prefixCls}-steps-item-content`,
                                `${prefixCls}-steps-item-content-align-${align}`,
                            )}
                        >
                            {title ? (
                                <div
                                    className={cls(
                                        `${prefixCls}-steps-item-title`,
                                        `${currentStatus}-title-color-with-config`,
                                    )}
                                >
                                    {title}
                                </div>
                            ) : null}
                            {description ? (
                                <div className={cls(`${prefixCls}-steps-item-description`)}>
                                    {description}
                                </div>
                            ) : null}
                        </div>
                    ) : null}
                </div>
            )}
        </ContextLayout>
    );
});

export default Step;
