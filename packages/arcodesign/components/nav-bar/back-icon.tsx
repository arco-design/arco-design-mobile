import React from 'react';
import { defaultLocale } from '@arco-design/mobile-utils';
import { ContextLayout } from '../context-provider';

function BackArrow({ color = 'currentColor' }) {
    return (
        <ContextLayout>
            {({ locale = defaultLocale }) => (
                <div
                    role="button"
                    className="c-svg-arrow nav-bar-back"
                    aria-label={locale.NavBar.backBtnAriaLabel}
                >
                    <svg height="100%" viewBox="0 0 16 16">
                        <path
                            id="path-1_1_"
                            d="M2.1,8l5.4,5.4c0.1,0.1,0.1,0.3,0,0.5L7,14.4c-0.1,0.1-0.3,0.1-0.5,0L0.7,8.5c-0.3-0.3-0.3-0.7,0-0.9
                l5.9-5.9c0.1-0.1,0.3-0.1,0.5,0l0.5,0.5c0.1,0.1,0.1,0.3,0,0.5L2.1,8z"
                            fill={color}
                        />
                    </svg>
                </div>
            )}
        </ContextLayout>
    );
}

export default BackArrow;
