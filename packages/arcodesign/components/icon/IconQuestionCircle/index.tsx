import React, { SVGAttributes, CSSProperties } from 'react';
import { ContextLayout } from '../../context-provider';

export interface IconProps extends SVGAttributes<SVGElement> {
    className?: string;
    useCurrentColor?: boolean;
    style?: CSSProperties;
}

export default function IconQuestionCircle(props: IconProps) {
    const { className = '', useCurrentColor = true, style, ...other } = props;

    return (
        <ContextLayout>
            {({ prefixCls }) => (
                <svg
                    className={`${prefixCls}-icon ${prefixCls}-icon-question-circle ${className}`}
                    width="1em"
                    height="1em"
                    style={style}
                    viewBox="0 0 16 16"
                    fill={useCurrentColor ? 'currentColor' : '#000'}
                    xmlns="http://www.w3.org/2000/svg"
                    {...other}
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M7.982.68a7.312 7.312 0 110 14.625 7.312 7.312 0 010-14.625zm0 1.33a5.983 5.983 0 100 11.965 5.983 5.983 0 000-11.966zm.333 8.641c.183 0 .332.15.332.333v.664a.332.332 0 01-.332.333H7.65a.332.332 0 01-.332-.333v-.664c0-.184.148-.333.332-.333h.665zm-.427-6.647c.79 0 1.447.19 1.97.574.522.382.784.95.784 1.7 0 .461-.114.85-.341 1.165-.133.191-.389.436-.766.733l-.373.293c-.202.16-.337.345-.403.558a1.8 1.8 0 00-.048.323.332.332 0 01-.331.304h-.744a.332.332 0 01-.331-.363c.043-.463.088-.755.137-.878.091-.229.325-.492.703-.79l.383-.302c.126-.096.774-.553.774-.957 0-.405-.07-.553-.273-.775-.203-.222-.66-.294-1.073-.294-.405 0-.752.108-.922.38a1.921 1.921 0 00-.189.4 1.388 1.388 0 00-.048.204.332.332 0 01-.328.276h-.782a.332.332 0 01-.33-.37c.008-.074.017-.136.025-.185.13-.722.458-1.253.985-1.592.413-.27.92-.404 1.521-.404z"
                    />
                </svg>
            )}
        </ContextLayout>
    );
}
