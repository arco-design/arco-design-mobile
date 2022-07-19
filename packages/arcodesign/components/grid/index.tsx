import React, { useRef, forwardRef, Ref, useImperativeHandle, ReactNode } from 'react';
import { cls } from '@arco-design/mobile-utils';
import { ContextLayout } from '../context-provider';

export interface GridProps {
    /**
     * 自定义类名
     * @en Custom classname
     */
    className?: string;
    /**
     * 自定义样式
     * @en Custom stylesheet
     */
    style?: React.CSSProperties;
    /**
     * 传入的数据
     * @en grid data
     *  */
    data: GridData[];
    /**
     * 一行的列数
     * @en number of columns
     * @default 3
     */
    columns?: number;
    /**
     * 是否有边框
     * @en Whether there is a border
     * @default false
     */
    border?: boolean;
    /**
     * 格子间的间距
     * @en spacing between grids
     * @default 0
     */
    gutter?: number | { x: number; y: number };
    /**
     * 格子的形状，可选值为 circle
     * @en The shape of the grid, the optional value are circle and square
     * @default "square"
     */
    shape?: string;
    /**
     * 溢出时是否支持滑动
     * @en Whether to support swipe when overflowing
     * @default false
     */
    isSliding?: boolean;
    /**
     * 格子内容排列的方向，可选值为 horizontal
     * @en The direction in which the grid content is arranged, the optional value are horizontal and vertical
     * @default "vertical"
     */
    direction?: string;
}

export interface GridData {
    /**
     * 传入图标的资源地址
     * @en The resource address of the input icon
     *  */
    img: string | ReactNode;
    /**
     * 传入的标题文字内容
     * @en Title text content
     * */
    title: ReactNode;
    /**
     * 传入的描述文字内容
     * @en Description text
     *  */
    content?: ReactNode;
    /**
     * 自定义样式
     * @en Custom classname
     *  */
    className?: string;
    /**
     * 点击后的回调函数
     * @en Callback when clicking
     *  */
    onClick?: (item: GridData) => void;
    /**
     * 每个格子自定义样式
     * @en Custom style for each grid
     *  */
    itemStyle?: React.CSSProperties;
    /**
     * 自定义单个 grid 的创建函数
     * @en Customize the creation function of a single grid
     *  */
    renderGrid?: (item: GridData, colIndex: number, rowIndex: number) => ReactNode;
    [x: string]: any;
}

export interface GridRef {
    /**
     * 最外层元素 DOM
     * @en The outermost element DOM
     */
    dom: HTMLDivElement | null;
}

/**
 * 宫格可以在水平方向上把页面分隔成等宽度的区块，用于展示内容或进行页面导航。
 * @en The grid can divide the page into equal-width blocks in the horizontal direction for displaying content or for page navigation.
 * @type 布局
 * @type_en Layout
 * @name 宫格
 * @name_en Grid
 */
const Grid = forwardRef((props: GridProps, ref: Ref<GridRef>) => {
    const {
        className = '',
        style,
        data,
        columns = 3,
        border = false,
        gutter = 0,
        shape = 'square',
        direction = 'vertical',
        isSliding = false,
    } = props;

    const domRef = useRef<HTMLDivElement | null>(null);

    useImperativeHandle(ref, () => ({
        dom: domRef.current,
    }));

    const getRows = (prefix: string, rowsData: GridData[], rows: number, row: number) => {
        const placeholders = !isSliding && rowsData.length % columns;
        let renderData = rowsData;
        if (placeholders) {
            const fakeGrids = (new Array(columns - placeholders) as GridData[]).fill({
                img: null,
                title: '',
            });
            renderData = rowsData.concat(fakeGrids);
        }
        return (
            <div className={`${prefix}-rows`} key={row}>
                {renderData.map((item: GridData, index: number) => {
                    const {
                        img,
                        title,
                        content,
                        className: itemClassName,
                        onClick,
                        itemStyle,
                        renderGrid,
                    } = item;
                    if (renderGrid) {
                        return renderGrid(item, index, row);
                    }
                    const marginBottom =
                        row + 1 === rows ? 0 : typeof gutter === 'number' ? gutter : gutter?.y || 0;
                    const rowLen = renderData.length;
                    const marginRight =
                        index + 1 === rowLen
                            ? 0
                            : typeof gutter === 'number'
                            ? gutter
                            : gutter?.x || 0;
                    return (
                        <div
                            key={index}
                            style={{ marginBottom, marginRight, ...itemStyle }}
                            onClick={() => {
                                onClick && onClick(item);
                            }}
                            className={cls(
                                `${prefix}-rows-item`,
                                {
                                    horizontal: direction === 'horizontal',
                                    border: border && gutter === 0,
                                },
                                itemClassName,
                            )}
                        >
                            {typeof img === 'string' ? (
                                <img
                                    src={img}
                                    className={`${prefix}-rows-item-icon ${
                                        shape === 'circle' ? 'circle' : ''
                                    }`}
                                />
                            ) : (
                                img
                            )}
                            {title || content ? (
                                <div className={`${prefix}-rows-item-text`}>
                                    {title ? (
                                        <span className={`${prefix}-rows-item-title`}>{title}</span>
                                    ) : null}
                                    {content ? (
                                        <span className={`${prefix}-rows-item-content`}>
                                            {content}
                                        </span>
                                    ) : null}
                                </div>
                            ) : null}
                            {(index + 1) % columns !== 0 ? <i className="vertical-border" /> : null}
                            {(row + 1) % rows !== 0 ? <i className="horizontal-border" /> : null}
                        </div>
                    );
                })}
            </div>
        );
    };

    const getGrid = (prefix: string, dataArr: Array<Array<GridData>>): React.ReactNode => {
        const rows = dataArr.length || 1;
        return (
            <>
                {dataArr.map((item: GridData[], index: number) => {
                    return getRows(prefix, item, rows, index);
                })}
            </>
        );
    };

    const renderEl = ({ prefixCls }) => {
        const prefix = `${prefixCls}-grid`;
        const dataLength = data?.length || 0;
        if (dataLength === 0) {
            return null;
        }
        let index = 0;
        const newArr: Array<Array<GridData>> = [];
        while (index < dataLength) {
            newArr.push(data.slice(index, isSliding ? (index += dataLength) : (index += columns)));
        }
        return (
            <div
                className={cls(prefix, className, isSliding ? 'sliding' : '')}
                style={style}
                ref={domRef}
            >
                {getGrid(prefix, newArr)}
            </div>
        );
    };
    return <ContextLayout>{renderEl}</ContextLayout>;
});

export default Grid;
