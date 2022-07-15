import React from 'react';

interface ISvgIcon {
    className?: string;
}

export default function RightArrow({ className = '' }: ISvgIcon) {
    return (
        <svg
            width="8"
            height="12"
            viewBox="0 0 8 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.37394 4.49414L1.60104 0L0 1.46549L4.79522 5.98065L0 10.4958L1.60104 12L6.39449 7.48651L6.39896 7.49072L8 6.02523L7.9732 6L8 5.97477L6.39896 4.47058L6.37394 4.49414Z"
                fill="currentColor"
            />
        </svg>
    );
}
