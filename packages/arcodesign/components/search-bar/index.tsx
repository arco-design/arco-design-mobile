import { cls } from '@arco-design/mobile-utils';
import React, {
    useRef,
    forwardRef,
    Ref,
    useImperativeHandle,
    useContext,
    ReactNode,
    useState,
} from 'react';
import { ContextLayout, GlobalContext } from '../context-provider';
import { IconSearch } from '../icon';
import { useInputLogic } from '../input/hooks';
import { SearchBarAssociation } from './association';
import { SEARCH_BAR_DEFAULT_BTN_TEXT, SEARCH_BAR_DEFAULT_PLACEHOLDER } from './constant';
import { SearchBarProps, SearchBarRef } from './type';

/**
 * 搜索框组件
 * @en SearchBar component
 * @type 导航
 * @type_en Navigation
 * @name 搜索框
 * @name_en SearchBar
 */
const SearchBar = forwardRef((props: SearchBarProps, ref: Ref<SearchBarRef>) => {
    const { prefixCls } = useContext(GlobalContext);
    const searchBarPrefixCls = `${prefixCls}-search-bar`;

    const {
        inputClass,
        inputStyle,
        type = 'text',
        nativeProps,
        id,
        name,
        maxLength,
        placeholder = SEARCH_BAR_DEFAULT_PLACEHOLDER,
        readOnly,
        onKeyUp,
        onKeyPress,
        disabled,
        pattern,
        prefix = <IconSearch className={`${searchBarPrefixCls}-search-icon`} />,
        append,
        actionBtnText = SEARCH_BAR_DEFAULT_BTN_TEXT,
        actionBtnShowType = 'default',
        clearable = true,
        shape = 'square',
        className,
        showSearchAssociation = false,
        searchAssociationVisible,
        searchAssociationShowType = 'default',
        searchAssociationItems,
        highlightClassName,
        highlightMode,
        highlightStyle,
        onActionBtnClick,
        onAssociationClick,
        onAssociationItemClick,
        renderSearchAssociation,
        renderSearchAssociationItem,
        ...inputProps
    } = props;
    const inputRef = useRef<HTMLInputElement | null>(null);

    /**
     * 格式化搜索输入框尾部要插入的内容
     *
     */
    const formatAppendProp = (focusing: boolean, keyword: string) => {
        // 默认情况下，在激活时插入一个actionBtn
        let appendNode: ReactNode = null;
        if (typeof append === 'undefined') {
            const shouldInsertActionBtn =
                actionBtnShowType === 'always' ||
                (actionBtnShowType === 'default' && (focusing || Boolean(keyword))) ||
                (actionBtnShowType === 'focus' && focusing) ||
                (actionBtnShowType === 'value' && Boolean(keyword));
            if (shouldInsertActionBtn)
                appendNode = (
                    <span
                        className={`${searchBarPrefixCls}-action-btn`}
                        onClick={() => onActionBtnClick?.(keyword)}
                    >
                        {actionBtnText}
                    </span>
                );
        } else if (typeof append === 'function') {
            appendNode = append(focusing);
        } else {
            appendNode = append;
        }

        // 开启搜索联想框的话，再额外插入一个搜索联想框到append中
        return showSearchAssociation ? (
            <>
                {appendNode}
                <SearchBarAssociation
                    prefixCls={searchBarPrefixCls}
                    keyword={keyword}
                    // eslint-disable-next-line @typescript-eslint/no-use-before-define
                    visible={actualVisible}
                    searchAssociationItems={searchAssociationItems}
                    highlightClassName={highlightClassName}
                    highlightMode={highlightMode}
                    highlightStyle={highlightStyle}
                    onAssociationClick={onAssociationClick}
                    onAssociationItemClick={onAssociationItemClick}
                    renderSearchAssociation={renderSearchAssociation}
                    renderSearchAssociationItem={renderSearchAssociationItem}
                />
            </>
        ) : (
            appendNode
        );
    };

    const {
        inputValue,
        handleChange,
        handleInput,
        handleKeyDown,
        handleFocus,
        handleBlur,
        handleClick,
        renderWrapper,
        wrapRef,
    } = useInputLogic(
        {
            className: cls(className, `${searchBarPrefixCls}-${shape}`),
            prefix,
            clearable,
            append: formatAppendProp,
            ...inputProps,
        },
        inputRef,
    );

    const [visible, setVisible] = useState(
        searchAssociationShowType === 'always' ||
            (searchAssociationShowType === 'value' && Boolean(inputValue)),
    );
    // 真实的控制搜索联想框显隐，受控模式优先生效
    const actualVisible = searchAssociationVisible ?? visible;

    useImperativeHandle(ref, () => ({
        dom: wrapRef.current,
        input: inputRef.current,
        toggleAssociation(newVisible) {
            setVisible(newVisible ?? !visible);
        },
    }));

    /**
     * 处理非受控逻辑下，搜索联想框的显隐状态
     *
     * @param {boolean} newVisible 新的visible
     * @param {string} newValue 新的输入框值
     */
    const formatSetAssociationVisible = (newVisible: boolean, newValue: string) => {
        if (searchAssociationShowType === 'always') {
            setVisible(true);
            // 聚焦模式下，直接把visible和newVisible对齐即可
        } else if (searchAssociationShowType === 'focus') {
            setVisible(newVisible);
            // 聚焦 + 有值模式下，需要newVisible为true和newValue.length > 0同时满足
        } else if (searchAssociationShowType === 'default') {
            setVisible(newVisible && Boolean(newValue));
            // 仅有值模式下，visible需要newValue.length > 0
        } else if (searchAssociationShowType === 'value') {
            setVisible(Boolean(newValue));
        }
    };

    const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        formatSetAssociationVisible(true, e.target.value);
        handleFocus(e);
    };

    const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        formatSetAssociationVisible(false, e.target.value);
        handleBlur(e);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        formatSetAssociationVisible(Boolean(newValue), newValue);
        handleChange(e);
    };

    const renderSearchBar = () => {
        return renderWrapper(
            searchBarPrefixCls,
            type,
            <input
                {...nativeProps}
                id={id}
                name={name}
                maxLength={maxLength}
                placeholder={placeholder}
                readOnly={readOnly}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                onKeyUp={onKeyUp}
                onKeyPress={onKeyPress}
                ref={inputRef}
                className={cls(`${searchBarPrefixCls}-input`, inputClass)}
                style={inputStyle}
                value={inputValue}
                type={type}
                disabled={disabled}
                pattern={pattern}
                onChange={handleInputChange}
                onInput={handleInput}
                onKeyDown={handleKeyDown}
                onClick={handleClick}
            />,
        );
    };

    return <ContextLayout>{renderSearchBar}</ContextLayout>;
});

// 支持forwardRef的泛型
export default SearchBar as <Data>(
    props: SearchBarProps<Data> & { ref?: Ref<SearchBarRef> },
) => ReturnType<typeof SearchBar>;
