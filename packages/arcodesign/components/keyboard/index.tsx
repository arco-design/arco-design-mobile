import { cls, defaultLocale } from '@arco-design/mobile-utils';
import React, {
    useRef,
    forwardRef,
    Ref,
    useImperativeHandle,
    useMemo,
    useCallback,
    useEffect,
    useContext,
} from 'react';
import { GlobalContext } from '../context-provider';
import { IconKeyboard, IconKeyboardDelete } from '../icon';
import Popup, { PopupRef } from '../popup';
import { ColumnData, ColumnObjData, KeyboardProps, KeyboardRef } from './type';

export * from './type';

// 键盘乱序
// @en let keyboard random
const makeArrayRandom = (targetArray: Array<number>) => {
    const randomFn = () => {
        return Math.random() - 0.5;
    };
    return targetArray.sort(randomFn);
};

const splitArray = (target: Array<number>) => {
    return target.reduce<number[][]>((acc, cur) => {
        if (!acc[acc.length - 1] || acc[acc.length - 1].length >= 3) {
            acc.push([]);
        }
        acc[acc.length - 1].push(cur);
        return acc;
    }, []);
};

// 纯数字类字符
// @en Pure numeric characters
const contentArray: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

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
        normalKeyClass,
        normalKeyStyle,
        className = '',
        style,
        type = 'number',
        randomOrder = false,
        title,
        rightColumns,
        confirmClosable,
        confirmButton,
        deleteButton,
        keyboardButton,
        close,
        onConfirm,
        onDelete,
        onChange,
        ...resetProps
    } = props;
    const popupRef = useRef<PopupRef>(null);
    const keyboardRef = useRef<HTMLDivElement | null>(null);
    const { prefixCls, locale = defaultLocale } = useContext(GlobalContext);
    const prefix = `${prefixCls}-keyboard`;
    // 3x4键盘的按键内容
    // @en 3x4 Keyboard button content
    const displayData = useMemo(() => {
        const numberArr = randomOrder ? makeArrayRandom(contentArray) : contentArray;
        const lastNum = numberArr.slice(-1)[0];
        const finalData: ColumnData[][] = splitArray(numberArr.slice(0, -1));
        switch (type) {
            case 'confirm':
                finalData.push([lastNum, '.']);
                break;
            case 'tool':
                finalData.push(['.', lastNum, { type: 'delete' }]);
                break;
            case 'number':
            default:
                finalData.push([{ type: 'keyboard' }, lastNum, { type: 'delete' }]);
                break;
        }
        return finalData;
    }, [type]);

    // 右边一列
    // @en Right column
    const rightColumn = useMemo<ColumnData[]>(() => {
        switch (type) {
            case 'number':
                return [];
            case 'confirm': {
                return [{ type: 'delete' }];
            }
            case 'tool':
                return ['+', '-', '×', '÷'];
            default:
                return [];
        }
    }, [type]);

    // 确认按钮需要在type为confirm时展示
    // @en Display then confirm button when type is confirm
    const getConfirmButton = useCallback(() => {
        if (type !== 'confirm') {
            return null;
        }
        return (
            <div
                onClick={() => {
                    confirmClosable && close();
                    onConfirm?.();
                }}
                className={cls(`${prefix}-key`, `${prefix}-key-confirm`)}
            >
                {confirmButton || locale.Keyboard.confirm}
            </div>
        );
    }, [type]);

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

    const handleButtonClick = (ele: ColumnObjData) => {
        switch (ele.type) {
            case 'delete':
                onDelete?.();
                break;
            case 'keyboard':
                close();
                break;
            default:
                onChange?.(ele.value);
        }
    };

    const renderButtonContent = (ele: ColumnObjData) => {
        switch (ele.type) {
            case 'delete':
                return deleteButton || <IconKeyboardDelete />;
            case 'keyboard':
                return keyboardButton || <IconKeyboard />;
            default:
                return ele.content;
        }
    };

    const renderButton = (data: ColumnData, key: string, extraClass?: Record<string, any>) => {
        const ele: ColumnObjData =
            typeof data === 'string' || typeof data === 'number'
                ? {
                      type: 'content',
                      content: data,
                      value: data,
                  }
                : data;
        return (
            <button
                onClick={() => handleButtonClick(ele)}
                className={cls(`${prefix}-key`, normalKeyClass, extraClass)}
                key={key}
                style={normalKeyStyle}
            >
                {renderButtonContent(ele)}
            </button>
        );
    };

    const renderKeyboardRightColumns = () => {
        if (rightColumns) {
            return rightColumns;
        }
        return rightColumn.length > 0 ? (
            <div className={`${prefix}-col`}>
                {rightColumn.map((item, index) => renderButton(item, String(index)))}
                {getConfirmButton()}
            </div>
        ) : null;
    };

    return (
        <Popup ref={popupRef} maskClass={`${prefix}-popup`} close={close} {...resetProps}>
            <div className={cls(prefix, `${className}`)} style={style} ref={keyboardRef}>
                {title}
                <div className={`${prefix}-wrapper`}>
                    <div className={`${prefix}-key-wrapper`}>
                        {displayData.map((item, index) => (
                            <div className={`${prefix}-row`} key={index}>
                                {item.map((e, idx) =>
                                    renderButton(e, String(idx), {
                                        [`${prefix}-key-special`]:
                                            type === 'confirm' &&
                                            index === displayData.length - 1 &&
                                            idx === 0,
                                    }),
                                )}
                            </div>
                        ))}
                    </div>
                    {renderKeyboardRightColumns()}
                </div>
            </div>
        </Popup>
    );
});

export default Keyboard;
