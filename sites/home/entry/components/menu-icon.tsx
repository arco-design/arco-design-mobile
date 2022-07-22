import React from 'react';
import { ISvgIcon } from './type';

export default function menuIcon({ className = '' }: ISvgIcon) {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <rect width="20" height="20" fill="white" />
            <rect x="3" y="4" width="13" height="2" fill="#4E5969" />
            <rect x="3" y="9" width="13" height="2" fill="#4E5969" />
            <rect x="3" y="14" width="13" height="2" fill="#4E5969" />
        </svg>
    );
}
