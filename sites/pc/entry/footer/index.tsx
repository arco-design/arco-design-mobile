import React from 'react';
import LogoPicture from '../../../components/logo-pic';
import './index.less';

export default function Footer() {
    return (
        <footer className="arcodesign-pc-site-footer">
            <LogoPicture />
            <span className="arcodesign-pc-site-footer-team">
                Powered by GIP UED & Novel FE
                <svg
                    className="arcodesign-pc-site-footer-team-right"
                    viewBox="0 0 1024 1024"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                >
                    <path d="M630.4 512L283.52 165.12a21.12 21.12 0 010-30.08l30.08-30.08a21.12 21.12 0 0130.08 0l377.6 376.96a42.24 42.24 0 010 60.16l-377.6 376.96a21.12 21.12 0 01-30.08 0l-30.08-30.08a21.12 21.12 0 010-30.08z" />
                </svg>
            </span>
            <span className="arcodesign-pc-site-footer-copyright">Copyright ByteDance 2022</span>
        </footer>
    );
}
