import React, {
    useRef,
    forwardRef,
    Ref,
    useImperativeHandle,
    useMemo,
    ReactNode,
    useContext,
} from 'react';
import { cls } from '@arco-design/mobile-utils';
import { GlobalContext } from '../context-provider';
import { useSystem } from '../_helpers';
import Arrow from './arrow';

export interface IPaginationDataParams {
    /**
     * 当前页
     * @en Current page
     */
    current: number;
    /**
     * 每页条数
     * @en Number of items per page
     */
    pageSize: number;
    /**
     * 总页数
     * @en Total number of pages
     */
    pageNum: number;
}

export interface PaginationProps {
    /**
     * 自定义类名
     * @en Custom classname
     */
    className?: string;
    /**
     * 自定义样式
     * @en Custom style
     */
    style?: React.CSSProperties;
    /**
     * 分页器翻页区域样式类型，button表示按钮式分页器，text表示文本式分页器，none表示仅保留页码不含翻页区域
     * @en The style type of the page turning area of the pagination, and none means that only the page number is kept without the page turning area
     * @default "button"
     */
    type?: 'button' | 'text' | 'none';
    /**
     * 是否需要展示图标
     * @en Whether to show the icon
     * @default false
     */
    icon?: boolean | ReactNode | [ReactNode, ReactNode];
    /**
     * 翻页按钮水平位置，side表示两端对齐，center表示居中对齐
     * @en The horizontal position of the page turning button, side means both ends are aligned, center means center alignment
     * @default "side"
     */
    justify?: 'center' | 'side';
    /**
     * 当前页码
     * @en Current page
     * @default 1
     */
    current?: number;
    /**
     * 每页条数
     * @en Number of items per page
     * @default 10
     */
    pageSize?: number;
    /**
     * 数据总条数
     * @en Total number of data source
     * @default 0
     */
    total?: number;
    /**
     * 只有一页时是否隐藏分页器
     * @en Whether to hide the pager when there is only one page
     * @default false
     */
    hideOnOnePage?: boolean;
    /**
     * 下一页样式，primary表示高亮
     * @en Style of next page button, primary means highlight
     * @default "default"
     */
    nextFieldType?: 'default' | 'primary';
    /**
     * 上一页文本
     * @en Previous page text
     * @default "上一页"
     */
    prevFieldText?: string;
    /**
     * 下一页文本
     * @en Next page text
     * @default "下一页"
     */
    nextFieldText?: string;
    /**
     * 渲染前翻页按钮
     * @en Custom render previous page button
     */
    renderPrevField?: (data: IPaginationDataParams) => ReactNode;
    /**
     * 渲染后翻页按钮
     * @en Custom render next page button
     */
    renderNextField?: (data: IPaginationDataParams) => ReactNode;
    /**
     * 点击前/后翻页按钮时调用
     * @en Callback called when the previous/next page button is clicked
     */
    onChange?: (data: IPaginationDataParams) => void;
}

export interface PaginationRef {
    /**
     * 最外层元素 DOM
     * @en The outermost element DOM
     */
    dom: HTMLDivElement | null;
}

/**
 * 用于数据分页，为完全受控组件
 * @en The pagination component is used for data paging and is a fully controlled component.
 * @type 导航
 * @type_en Navigation
 * @name 分页器
 * @name_en Pagination
 */
const Pagination = forwardRef((props: PaginationProps, ref: Ref<PaginationRef>) => {
    const { prefixCls, locale } = useContext(GlobalContext);
    const {
        className = '',
        style,
        current = 1,
        pageSize = 10,
        total = 5,
        icon = false,
        justify = 'side',
        hideOnOnePage = false,
        nextFieldType = 'default',
        renderPrevField,
        renderNextField,
        type = 'default',
        prevFieldText = locale?.Pagination.previousPage,
        nextFieldText = locale?.Pagination.nextPage,
        onChange,
    } = props;
    const system = useSystem();
    const pageNum = useMemo(() => Math.ceil(total / pageSize), [total, pageSize]);
    const domRef = useRef<HTMLDivElement | null>(null);

    useImperativeHandle(ref, () => ({
        dom: domRef.current,
    }));

    const iconRender = (iconType: 'prev' | 'next') => {
        if (iconType === 'prev') {
            if (Array.isArray(icon) && Boolean(icon.length)) {
                return <span className="btn-icon">{icon[0]}</span>;
            } else if (Object.prototype.toString.call(icon) === '[object Object]') {
                return <span className="btn-icon">{icon}</span>;
            } else {
                return icon ? (
                    <span className="btn-icon">
                        <Arrow />
                    </span>
                ) : null;
            }
        } else {
            if (Array.isArray(icon) && Boolean(icon.length)) {
                return <span className="btn-icon">{icon.length >= 2 ? icon[1] : icon[0]}</span>;
            } else if (Object.prototype.toString.call(icon) === '[object Object]') {
                return <span className="btn-icon next">{icon}</span>;
            } else {
                return icon ? (
                    <span className="btn-icon next">
                        <Arrow />
                    </span>
                ) : null;
            }
        }
    };

    const prevRender = (prefix: string) => {
        if (type === 'none') {
            return null;
        }
        const prevFieldCls = cls(`${prefix}-prev-field`, { [`flex-${justify}`]: true });
        if (typeof renderPrevField === 'undefined') {
            return (
                <div className={prevFieldCls}>
                    <div
                        className={cls(`${prefix}-field`, 'prev', {
                            text: type === 'text',
                            button: type !== 'text',
                            disabled: current === 1,
                        })}
                        onClick={() => {
                            if (current <= 1) {
                                return;
                            }
                            onChange?.({ pageSize, pageNum, current: Math.max(1, current - 1) });
                        }}
                    >
                        {iconRender('prev')}
                        {Boolean(prevFieldText) && (
                            <span className="btn-text">{prevFieldText}</span>
                        )}
                    </div>
                </div>
            );
        } else {
            return (
                <div className={prevFieldCls}>
                    {renderPrevField ? renderPrevField({ current, pageSize, pageNum }) : null}
                </div>
            );
        }
    };
    const nextRender = (prefix: string) => {
        if (type === 'none') {
            return null;
        }

        const nextFieldCls = cls(`${prefix}-next-field`, { [`flex-${justify}`]: true });
        if (typeof renderNextField === 'undefined') {
            return (
                <div className={nextFieldCls}>
                    <div
                        className={cls(`${prefix}-field`, 'next', {
                            text: type === 'text',
                            button: type !== 'text',
                            [nextFieldType === 'default' ? type : 'primary']: current < pageNum,
                            disabled: current >= pageNum,
                        })}
                        onClick={() => {
                            if (current >= pageNum) {
                                return;
                            }
                            onChange?.({
                                pageSize,
                                pageNum,
                                current: Math.min(current + 1, pageNum),
                            });
                        }}
                    >
                        {Boolean(nextFieldText) && (
                            <span className="btn-text">{nextFieldText}</span>
                        )}
                        {iconRender('next')}
                    </div>
                </div>
            );
        } else {
            const nextItem = renderNextField && renderNextField({ current, pageSize, pageNum });
            return <div className={nextFieldCls}>{nextItem}</div>;
        }
    };

    const prefix = `${prefixCls}-pagination`;
    return !(hideOnOnePage && pageNum === 1) ? (
        <div
            ref={domRef}
            className={cls(
                prefix,
                system,
                {
                    [`${prefix}-simple`]: type === 'none',
                },
                className,
            )}
            style={style}
        >
            {prevRender(prefix)}
            <div className={`${prefix}-item`}>
                <span className={`${prefix}-item-active`}>{current}</span> / {pageNum}
            </div>
            {nextRender(prefix)}
        </div>
    ) : (
        <div className={cls(prefix, className)} />
    );
});

export default Pagination;
