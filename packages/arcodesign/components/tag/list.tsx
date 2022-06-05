import React, { useRef, forwardRef, Ref, useImperativeHandle, CSSProperties } from 'react';
import { cls } from '@arco-design/mobile-utils';
import { ContextLayout } from '../context-provider';
import { Tag } from './tag';
import IconAdd from '../icon/IconAdd';
import { TagListProps, TagListRef, TagProps, TagRef } from './type';

export function componentGenerator<P extends TagProps = TagProps, R extends TagRef = TagRef>(
    Comp: React.ForwardRefExoticComponent<P & React.RefAttributes<R>>,
) {
    return forwardRef((props: TagListProps<P>, ref: Ref<TagListRef>) => {
        const {
            className,
            style,
            list,
            type,
            showAddButton = true,
            addArea,
            horizontalPadding,
            verticalPadding,
            onAdd,
            onClose,
        } = props;
        const domRef = useRef<HTMLDivElement | null>(null);

        useImperativeHandle(ref, () => ({
            dom: domRef.current,
        }));

        function getTagStyle(tag: TagProps, index: number): CSSProperties {
            const baseStyle = tag.style || {};
            const paddingStyle =
                index === list.length - 1 && !showAddButton
                    ? {}
                    : { marginRight: horizontalPadding };
            return {
                ...baseStyle,
                ...paddingStyle,
                marginBottom: verticalPadding,
            };
        }

        function getListStyle() {
            let marginStyle: CSSProperties = {};
            if (verticalPadding && typeof verticalPadding === 'string') {
                marginStyle = { marginBottom: `-${verticalPadding}` };
            } else if (verticalPadding && typeof verticalPadding === 'number') {
                marginStyle = { marginBottom: -1 * verticalPadding };
            }
            return {
                ...(style || {}),
                ...marginStyle,
            };
        }

        return (
            <ContextLayout>
                {({ prefixCls, locale }) => {
                    const prefix = `${prefixCls}-tag-list`;
                    return (
                        <div className={cls(prefix, className)} style={getListStyle()} ref={domRef}>
                            {list.map((tag, index) => (
                                <Comp
                                    key={index}
                                    {...tag}
                                    style={getTagStyle(tag, index)}
                                    type={type}
                                    onClose={e => {
                                        tag.onClose && tag.onClose(e);
                                        onClose && onClose(index, e);
                                    }}
                                />
                            ))}
                            {showAddButton ? (
                                <div className="tag-list-add-wrap" onClick={onAdd}>
                                    {addArea !== void 0 ? (
                                        addArea
                                    ) : (
                                        <Tag
                                            type={type}
                                            className="tag-list-add"
                                            borderStyle="dashed"
                                            icon={<IconAdd />}
                                            style={{ marginBottom: verticalPadding }}
                                        >
                                            {locale?.Tag.addTag}
                                        </Tag>
                                    )}
                                </div>
                            ) : null}
                        </div>
                    );
                }}
            </ContextLayout>
        );
    });
}
