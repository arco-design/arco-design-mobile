import React, { useContext } from 'react';
import { Collapse } from '../../../../../packages/arcodesign/components';
import { localeMap } from '../../locale';
import { GlobalContext } from '../setting';

function Clock(props) {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M9.00619 2.00087C13.1883 2.00087 16.5786 5.39114 16.5786 9.57325C16.5786 13.7554 13.1883 17.1456 9.00619 17.1456C4.82408 17.1456 1.43381 13.7554 1.43381 9.57325C1.43381 5.39114 4.82408 2.00087 9.00619 2.00087ZM9.00619 3.51534C5.66051 3.51534 2.94829 6.22756 2.94829 9.57325C2.94829 12.9189 5.66051 15.6312 9.00619 15.6312C12.3519 15.6312 15.0641 12.9189 15.0641 9.57325C15.0641 6.22756 12.3519 3.51534 9.00619 3.51534ZM9.38481 5.78706C9.59392 5.78706 9.76343 5.95657 9.76343 6.16568L9.76322 8.81579L12.4138 8.81601C12.6229 8.81601 12.7924 8.98552 12.7924 9.19463V9.95187C12.7924 10.161 12.6229 10.3305 12.4138 10.3305H8.62758C8.41847 10.3305 8.24896 10.161 8.24896 9.95187V6.16568C8.24896 5.95657 8.41847 5.78706 8.62758 5.78706H9.38481ZM4.42471 1.02184C4.72043 1.31756 4.72043 1.79701 4.42471 2.09273L2.28292 4.23453C1.9872 4.53025 1.50774 4.53025 1.21202 4.23453C0.916304 3.93881 0.916304 3.45935 1.21202 3.16363L3.35382 1.02184C3.64954 0.726119 4.12899 0.726119 4.42471 1.02184ZM14.7773 1.02184L16.9191 3.16363C17.2149 3.45935 17.2149 3.93881 16.9191 4.23453C16.6234 4.53025 16.144 4.53025 15.8482 4.23453L13.7065 2.09273C13.4107 1.79701 13.4107 1.31756 13.7065 1.02184C14.0022 0.726119 14.4816 0.726119 14.7773 1.02184Z"
                fill="currentColor"
            />
        </svg>
    );
}
export default function CollapseDemo() {
    const { language } = useContext(GlobalContext);
    return (
        <div className="typical-demo-card typical-demo-collapse-box">
            <Collapse.Group
                useAccordion
                defaultActiveItems={['1']}
                items={[
                    {
                        header: (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Clock style={{ marginRight: '8px' }} />
                                {localeMap.CollapseTitle[language]}1
                            </div>
                        ),
                        value: '1',
                        content: localeMap.CollapseContent[language],
                    },
                    {
                        header: (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Clock style={{ marginRight: '8px' }} />
                                {localeMap.CollapseTitle[language]}2
                            </div>
                        ),
                        value: '2',
                        content: localeMap.CollapseContent[language],
                    },
                    {
                        header: (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Clock style={{ marginRight: '8px' }} />
                                {localeMap.CollapseTitle[language]}3
                            </div>
                        ),
                        value: '3',
                        content: localeMap.CollapseContent[language],
                    },
                ]}
            />
        </div>
    );
}
