import { cls } from '@arco-design/mobile-utils';
import React, {
    useRef,
    forwardRef,
    Ref,
    useImperativeHandle,
    useMemo,
    useCallback,
    useEffect,
} from 'react';
import { ContextLayout } from '../context-provider';
import Popup, { PopupRef } from '../popup';
import { KeyboardProps, KeyboardRef } from './type';

// 键盘乱序
// @en let keyboard random
const makeArrayRandom = (targetArray: Array<Array<any>>) => {
    const randomFn = () => {
        return Math.random() - 0.5;
    };
    targetArray.forEach(item => item.sort(randomFn));
    return targetArray.sort(randomFn);
};

// 所有onchange事件会返回的字符
// @en Characters that all onchange events will return
const contentArray: Array<any> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '.', '+', '-', '×', '÷'];

/**
 * 数字键盘组件
 * @en Keyboard component
 * @type 数据录入
 * @type_en Data Entry
 * @name 数字键盘
 * @name_en Keyboard
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
    const popupRef = useRef<PopupRef>(null);
    const keyboardRef = useRef<HTMLDivElement | null>(null);
    const deleteIcon = deleteButton || (
        <div
            onClick={() => {
                onDelete?.();
            }}
        >
            删除
        </div>
    );
    // 3x4键盘的按键内容
    // @en 3x4 Keyboard button content
    const displayData = useMemo(() => {
        const keyboardIcon = <div onClick={() => close()}>键盘</div>;
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

    // 右边一列
    // @en Right column
    const rightColumn = useMemo(() => {
        switch (type) {
            case 'number':
                return [];
            case 'confirm': {
                return [deleteIcon];
            }
            case 'tool':
                return ['+', '-', '×', '÷'];
            default:
                return [];
        }
    }, [type]);

    // 确认按钮需要在type为confirm时展示
    // @en Display then confirm button when type is confirm
    const getConfirmButton = useCallback(
        (prefix: string) => {
            if (type !== 'confirm') {
                return null;
            }
            if (confirmButton) {
                return confirmButton;
            }
            return (
                <div
                    onClick={() => {
                        confirmClosable && close();
                        onConfirm?.();
                    }}
                    className={cls(`${prefix}-key`, 'special')}
                >
                    完成
                </div>
            );
        },
        [type],
    );

    // 点击空白处关闭键盘
    // @en Close keyboard when clicked the blank space
    useEffect(() => {
        const handlerDocumentClick = (e: MouseEvent) => {
            if (!keyboardRef.current) {
                return;
            }
            if (
                !keyboardRef.current.contains(e.target as Node) &&
                e.target !== keyboardRef.current
            ) {
                close();
            }
        };
        document.addEventListener('click', handlerDocumentClick);
        return () => {
            document.removeEventListener('click', handlerDocumentClick);
        };
    }, []);

    useImperativeHandle(ref, () => ({
        keyboard: keyboardRef.current,
        ...popupRef.current!,
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
                                className={cls(`${prefix}-key`)}
                                key={index}
                                onClick={() => {
                                    contentArray.includes(item) && onChange?.(String(item));
                                }}
                            >
                                {item}
                            </button>
                        );
                    })}
                    {getConfirmButton(prefix)}
                </div>
            ) : null;
        };

        return (
            <Popup ref={popupRef} maskClass={`${prefix}-popup`} close={close} {...resetProps}>
                <div className={cls(prefix, `${className}`)} style={style} ref={keyboardRef}>
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
