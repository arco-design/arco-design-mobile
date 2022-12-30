import { cls } from '@arco-design/mobile-utils';
import React, { useRef, forwardRef, Ref, useImperativeHandle, useMemo } from 'react';
import { ContextLayout } from '../context-provider';
import Popup from '../popup';
import { KeyboardProps, KeyboardRef } from './type';

const makeArrayRandom = (targetArray: Array<Array<any>>) => {
    const randomFn = () => {
        return Math.random() - 0.5;
    };
    targetArray.forEach(item => item.sort(randomFn));
    return targetArray.sort(randomFn);
};

const contentArray: Array<any> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '.', '+', '-', '×', '÷'];

/**
 * 数字键盘组件
 * @type 数据录入
 * @name 数字键盘
 */
const Keyboard = forwardRef((props: KeyboardProps, ref: Ref<KeyboardRef>) => {
    const {
        numberKeyClass,
        numberKeyStyle,
        className = '',
        style,
        type = 'number',
        randomOrder = false,
        title,
        columns,
        confirmClosable,
        confirmButton,
        deleteButton,
        close,
        onConfirm,
        onDelete,
        onChange,
        ...resetProps
    } = props;
    const domRef = useRef<HTMLTableElement | null>(null);
    const deleteIcon = deleteButton || (
        <div
            onClick={() => {
                onDelete?.();
            }}
        >
            删除
        </div>
    );
    const displayData = useMemo(() => {
        const keyboardIcon = <div onClick={close}>键盘</div>;
        let finalData: Array<Array<any>> = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
        ];
        switch (type) {
            case 'number':
                finalData.push([keyboardIcon, 0, deleteIcon]);
                break;
            case 'confirm':
                finalData.push([0, '.']);
                break;
            case 'tool':
                finalData.push(['.', 0, deleteIcon]);
                break;
            default:
                finalData = [];
                break;
        }
        return randomOrder ? makeArrayRandom(finalData) : finalData;
    }, [type]);

    const rightColumn = useMemo(() => {
        switch (type) {
            case 'number':
                return [];
            case 'confirm': {
                const column = [deleteIcon];
                if (!confirmButton) {
                    const finish = (
                        <div
                            onClick={() => {
                                confirmClosable && close();
                                onConfirm?.();
                            }}
                        >
                            完成
                        </div>
                    );
                    column.push(finish);
                }
                return column;
            }
            case 'tool':
                return ['+', '-', '×', '÷'];
            default:
                return [];
        }
    }, [type]);

    useImperativeHandle(ref, () => ({
        dom: domRef.current,
    }));

    const renderKeyboard = ({ prefixCls }) => {
        const prefix = `${prefixCls}-keyboard`;
        const renderKeyboardRightColumns = () => {
            if (columns) {
                return columns;
            }
            return rightColumn.length > 0 ? (
                <div className={`${prefix}-col`}>
                    {rightColumn.map((item, index) => {
                        return (
                            <button
                                className={cls(`${prefix}-key`, {
                                    special: type === 'confirm' && index === 1,
                                })}
                                key={index}
                                onClick={() => {
                                    contentArray.includes(item) && onChange?.(String(item));
                                }}
                            >
                                {item}
                            </button>
                        );
                    })}
                    {confirmButton}
                </div>
            ) : null;
        };
        return (
            <Popup maskClass={`${prefix}-popup`} close={close} {...resetProps}>
                <div className={cls(prefix, `${className}`)} style={style} ref={domRef}>
                    {title}
                    <div className={`${prefix}-wrapper`}>
                        <div className={`${prefix}-key-wrapper`}>
                            {displayData.map((item, index) => {
                                return (
                                    <div className={`${prefix}-row`} key={index}>
                                        {item.map((ele, idx) => {
                                            return (
                                                <button
                                                    onClick={() => {
                                                        contentArray.includes(ele) &&
                                                            onChange?.(String(ele));
                                                    }}
                                                    className={cls(
                                                        `${prefix}-key`,
                                                        numberKeyClass,
                                                        {
                                                            special:
                                                                type === 'confirm' && ele === 0,
                                                        },
                                                    )}
                                                    key={idx}
                                                    style={numberKeyStyle}
                                                >
                                                    {ele}
                                                </button>
                                            );
                                        })}
                                    </div>
                                );
                            })}
                        </div>
                        {renderKeyboardRightColumns()}
                    </div>
                </div>
            </Popup>
        );
    };

    return <ContextLayout>{renderKeyboard}</ContextLayout>;
});

export default Keyboard;
