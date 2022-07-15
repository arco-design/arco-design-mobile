import React from 'react';
import { ISvgIcon } from './type';

export default function RightArrow({ className = '' }: ISvgIcon) {
    return (
        <svg
            width="9"
            height="15"
            viewBox="0 0 9 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.353553 12.4098C0.158291 12.605 0.158291 12.9216 0.353553 13.1169L1.06066 13.824C1.25592 14.0193 1.5725 14.0193 1.76777 13.824L8.13173 7.46004C8.32699 7.26477 8.32699 6.94819 8.13173 6.75293L7.42462 6.04582C7.22936 5.85056 6.91278 5.85056 6.71751 6.04582L0.353553 12.4098Z"
                fill="currentColor"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.35746 1.76777C0.162198 1.57251 0.162198 1.25592 0.35746 1.06066L1.06457 0.353555C1.25983 0.158293 1.57641 0.158293 1.77167 0.353555L8.13563 6.71752C8.3309 6.91278 8.3309 7.22936 8.13563 7.42462L7.42853 8.13173C7.23326 8.32699 6.91668 8.32699 6.72142 8.13173L0.35746 1.76777Z"
                fill="currentColor"
            />
        </svg>
    );
}
