import React from 'react';

interface IProps {
    className?: string;
}
export default function ({ className = '' }: IProps) {
    return (
        <svg
            width="22"
            height="19"
            viewBox="0 0 22 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M19.45 1.75004C21.7475 4.04754 21.7828 7.75055 19.556 10.0913L19.45 10.2L12.0563 17.5937C11.4729 18.1771 10.5272 18.1771 9.9438 17.5937L2.55009 10.2L2.44405 10.0913C0.217253 7.75055 0.2526 4.04754 2.55009 1.75004C4.74049 -0.440359 8.20844 -0.574586 10.5554 1.34736C10.8118 1.55731 11.1883 1.55731 11.4447 1.34736C13.7917 -0.574586 17.2596 -0.440359 19.45 1.75004Z"
                fill="currentColor"
            />
        </svg>
    );
}
