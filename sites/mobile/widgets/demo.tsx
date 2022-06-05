import React, { useEffect } from 'react';
import IconArrowBack from '../../../packages/arcodesign/components/icon/IconArrowBack';
import getUrlParam from '../../utils/getUrlParam';

export interface IDemoProps {
    name: string;
    doc: any;
}

export default function Demo(props: IDemoProps) {
    const { name, doc } = props;
    const isFromWeb = Boolean(getUrlParam('from_web'));
    const hideBack = +getUrlParam('hide_back');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        return () => {
            if (window.modalInstance && window.modalInstance.close) {
                window.modalInstance.close();
                window.modalInstance = null;
            }
        };
    }, [name]);

    return (
        <div className="arcodesign-mobile-demo-wrapper">
            {isFromWeb ? <div className="status-bar" /> : null}
            <div className="demo-content" id={`demo-${name}`}>
                {!hideBack ? (
                    <div
                        className="arrow-back"
                        onClick={() => history.back()}
                        style={{
                            top: isFromWeb ? '20px' : 0,
                        }}
                    >
                        <IconArrowBack />
                    </div>
                ) : null}
                {doc}
            </div>
        </div>
    );
}
