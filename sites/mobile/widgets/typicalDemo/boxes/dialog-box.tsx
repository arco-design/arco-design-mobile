import React, { useContext } from 'react';
import { localeMap } from '../../locale';
import { GlobalContext } from '../setting';

export default function DialogBoxDemo() {
    const { language } = useContext(GlobalContext);
    return (
        <div className="typical-demo-card typical-demo-dialog-box">
            <div className="arco-dialog-content arco-dialog-part ios">
                <div
                    className="arco-dialog-header arco-dialog-part center ios system-ios"
                    style={{ cursor: 'grab' }}
                >
                    {localeMap.DialogTag[language]}
                </div>
                <div className="arco-dialog-body arco-dialog-part left ios">
                    <input
                        className="dialog-input-box-input"
                        placeholder={localeMap.DialogInputPlaceholder[language]}
                    />
                    <div className="dialog-input-box-hint">
                        {localeMap.DialogInputHint[language]}
                    </div>
                </div>
                <div className="arco-dialog-footer arco-dialog-part ios type-grid">
                    <div className="dialog-footer-button cancel system-ios">
                        {localeMap.DialogInputLeftButton[language]}
                    </div>
                    <div className="dialog-footer-button confirm system-ios">
                        {localeMap.DialogInputRightButton[language]}
                    </div>
                </div>
            </div>
        </div>
    );
}
