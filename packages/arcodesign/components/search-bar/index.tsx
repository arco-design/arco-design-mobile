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
import { CancelButton } from './cancel-button';
import { SearchAssociationBaseItem, SearchBarProps, SearchBarRef } from './type';

export type {
    SearchBarProps,
    SearchBarRef,
    SearchAssociationHighlightMode,
    SearchAssociationItem,
    SearchAssociationShowType,
    SearchBarShape,
} from './type';

/**
 * 搜索栏组件
 * @en SearchBar component
 * @type 数据录入
 * @type_en Data Entry
 * @name 搜索栏
 * @name_en SearchBar
 */
const SearchBar = forwardRef(
    <Data extends SearchAssociationBaseItem = SearchAssociationBaseItem>(
        props: SearchBarProps<Data>,
        ref: Ref<SearchBarRef>,
    ) => {
        const { prefixCls, locale } = useContext(GlobalContext);
        const searchBarPrefixCls = `${prefixCls}-search-bar`;

        const {
            inputClass,
            inputStyle,
            type = 'search',
            nativeProps,
            id,
            name,
            maxLength,
            placeholder = locale?.SearchBar.placeholder,
            readOnly,
            onKeyUp,
            onKeyPress,
            disabled,
            pattern,
            prefix = <IconSearch className={`${searchBarPrefixCls}-search-icon`} />,
            append,
            textAlign = 'left',
            actionButton,
            clearable = true,
            clearShowType = 'value',
            shape = 'square',
            className,
            enableAssociation = false,
            associationVisible,
            associationShowType = 'default',
            associationItems,
            highlightClassName,
            highlightMode,
            highlightStyle,
            onCancel,
            onAssociationClick,
            onAssociationItemClick,
            renderAssociation,
            renderAssociationItem,
            ...inputProps
        } = props;
        const inputRef = useRef<HTMLInputElement | null>(null);

        /**
         * 格式化搜索输入框尾部要插入的内容
         * @en Format the content to be inserted at the end of the search input box
         */
        const formatAppendProp = (focusing: boolean, currentInputValue: string) => {
            let appendNode: ReactNode = null;

            if (typeof append === 'function') {
                appendNode = append(focusing, currentInputValue);
            } else {
                appendNode = append;
            }

            // 默认情况下，在激活时或有内容时插入一个cancelBtn
            // @en By default inserts a cancelBtn on activation or when there is content
            const formatActionButton: ReactNode =
                typeof actionButton === 'undefined' ? (
                    <CancelButton
                        focusing={focusing}
                        currentInputValue={currentInputValue}
                        className={`${searchBarPrefixCls}-cancel-btn`}
                        onCancel={onCancel}
                        text={locale?.SearchBar.cancelBtn}
                    />
                ) : (
                    actionButton
                );

            return (
                <>
                    {appendNode}
                    {formatActionButton}
                    {enableAssociation ? (
                        <SearchBarAssociation
                            prefixCls={searchBarPrefixCls}
                            keyword={currentInputValue}
                            // eslint-disable-next-line @typescript-eslint/no-use-before-define
                            visible={actualVisible}
                            associationItems={associationItems}
                            highlightClassName={highlightClassName}
                            highlightMode={highlightMode}
                            highlightStyle={highlightStyle}
                            onAssociationClick={onAssociationClick}
                            onAssociationItemClick={onAssociationItemClick}
                            renderAssociation={renderAssociation}
                            renderAssociationItem={renderAssociationItem}
                        />
                    ) : null}
                </>
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
                clearShowType,
                ...inputProps,
            },
            inputRef,
        );

        const [visible, setVisible] = useState(
            associationShowType === 'always' ||
                ((associationShowType === 'value' || associationShowType === 'default') &&
                    Boolean(inputValue)),
        );
        // 真实的控制搜索联想框显隐，受控模式优先生效
        // @en Control the display and hide of the search association box, and the controlled mode takes effect first
        const actualVisible = associationVisible ?? visible;

        useImperativeHandle(ref, () => ({
            dom: wrapRef.current,
            input: inputRef.current,
            toggleAssociation(newVisible) {
                setVisible(newVisible ?? !visible);
            },
        }));

        /**
         * 处理非受控逻辑下，搜索联想框的显隐状态
         * @en Handle the display state of the search association box under uncontrolled logic
         *
         * @param {boolean} newVisible 新的visible
         * @param {string} newValue 新的输入框值
         */
        const formatSetAssociationVisible = (newVisible: boolean, newValue: string) => {
            if (associationShowType === 'always') {
                setVisible(true);
                // 聚焦模式下，直接把visible和newVisible对齐即可
                // @en In focus mode, just align visible and newVisible directly
            } else if (associationShowType === 'focus') {
                setVisible(newVisible);
                // 聚焦 + 有值模式下，需要newVisible为true和newValue.length > 0同时满足
                // @en In focus + valued mode, newVisible is required to be true and newValue.length > 0 to be satisfied at the same time
            } else if (associationShowType === 'default') {
                setVisible(newVisible && Boolean(newValue));
                // 仅有值模式下，visible需要newValue.length > 0
                // @en In value-only mode, visible requires newValue.length > 0
            } else if (associationShowType === 'value') {
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
                    className={cls(
                        `${searchBarPrefixCls}-input`,
                        inputClass,
                        `${searchBarPrefixCls}-input-${textAlign}`,
                    )}
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
    },
);

export default SearchBar;
