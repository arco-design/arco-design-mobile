import React, { useEffect, useState, useContext, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { Anchor, Button } from 'arco';
import { getUrlsByLanguage } from '../../../utils/url';
import { LanguageSupport } from '../../../utils/language';
import getUrlParam from '../../../utils/getUrlParam';
import CodePopover from '../../../components/code-popover';
import Layout from '../layout';
import { HistoryContext } from '../context';
import { localeMap } from '../../../utils/locale';
import toQuery, { parseUrlQuery } from '../../../utils/toQuery';
import './index.less';

const AnchorLink = Anchor.Link;
const urlQuery = parseUrlQuery();

export interface IDemoProps {
    name: string;
    doc: any;
    type: 'readme' | 'doc';
    showQRCode?: boolean;
    language?: LanguageSupport;
    route?: string;
}

export default function Demo(props: IDemoProps) {
    const {
        name,
        doc,
        type,
        showQRCode = true,
        language = LanguageSupport.CH,
        route = 'components',
    } = props;
    const [update, setUpdate] = useState(0);
    const previewUrl = `${getUrlsByLanguage(language).MOBILE_DOC_PREFIX}${
        name === 'readme' ? '' : `${route}/${name}`
    }`;
    // 是否为 demo icon 页
    const isIcon = name === 'icon';
    // 是否为 readme
    const isReadMe = type === 'readme' && name === 'readme';
    // 是否展示 iframe
    const needShowIframe = (type === 'doc' && !isIcon) || isReadMe;
    // 是否隐藏返回按钮
    const hideBack = getUrlParam('hide_back');
    const history = useContext(HistoryContext);
    const [anchorCollapse, setAnchorCollapse] = useState(window.innerWidth <= 1440);

    useEffect(() => {
        // 强制组件渲染qrcode组件
        setUpdate(up => up + 1);
        window.scrollTo({ top: 0 });
    }, [doc]);

    const onResize = useCallback(() => {
        const windowWidth = window.innerWidth;
        if (windowWidth <= 1200 && !anchorCollapse) {
            setAnchorCollapse(true);
        }
        if (windowWidth > 1440 && anchorCollapse) {
            setAnchorCollapse(false);
        }
    }, [anchorCollapse]);

    useEffect(() => {
        window.addEventListener('resize', onResize);

        return () => {
            window.removeEventListener('resize', onResize);
        };
    }, [onResize]);

    function renderCodePopover() {
        const el = document.getElementsByClassName('demo-comp-name')[0];
        return el && showQRCode
            ? ReactDOM.createPortal(
                  <CodePopover
                      url={previewUrl}
                      text={localeMap.QRCodeTip[language]}
                      className="demo-comp-qrcode"
                      popoverClass="demo-comp-qrcode-popover"
                  >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M1.74992 7.58337H7.58325V1.75004H1.74992V7.58337ZM0.916585 0.083374H8.41658C8.87682 0.083374 9.24992 0.45647 9.24992 0.916707V8.41671C9.24992 8.87694 8.87682 9.25004 8.41658 9.25004H0.916585C0.456348 9.25004 0.083252 8.87694 0.083252 8.41671V0.916707C0.083252 0.45647 0.456348 0.083374 0.916585 0.083374ZM3.41658 3.41671H5.91658V5.91671H3.41658V3.41671ZM1.74992 12.1667V14.25H3.83325V12.1667H1.74992ZM0.916585 10.5H4.66658C5.12682 10.5 5.49992 10.8731 5.49992 11.3334V15.0834C5.49992 15.5436 5.12682 15.9167 4.66658 15.9167H0.916585C0.456348 15.9167 0.083252 15.5436 0.083252 15.0834V11.3334C0.083252 10.8731 0.456348 10.5 0.916585 10.5ZM12.1666 1.75004V3.83337H14.2499V1.75004H12.1666ZM11.3333 0.083374H15.0833C15.5435 0.083374 15.9166 0.45647 15.9166 0.916707V4.66671C15.9166 5.12694 15.5435 5.50004 15.0833 5.50004H11.3333C10.873 5.50004 10.4999 5.12694 10.4999 4.66671V0.916707C10.4999 0.45647 10.873 0.083374 11.3333 0.083374ZM12.1666 12.1667V14.25H14.2499V12.1667H12.1666ZM11.3333 10.5H15.0833C15.5435 10.5 15.9166 10.8731 15.9166 11.3334V15.0834C15.9166 15.5436 15.5435 15.9167 15.0833 15.9167H11.3333C10.873 15.9167 10.4999 15.5436 10.4999 15.0834V11.3334C10.4999 10.8731 10.873 10.5 11.3333 10.5ZM7.16658 10.5H8.83325V12.1667H7.16658V10.5ZM7.16658 13.4167H8.83325V15.9167H7.16658V13.4167ZM10.4999 7.16671H12.1666V8.83337H10.4999V7.16671ZM13.4166 7.16671H15.9166V8.83337H13.4166V7.16671Z"
                              fill="currentColor"
                          />
                      </svg>
                  </CodePopover>,
                  el,
              )
            : null;
    }

    function renderRightNav() {
        const headings = document.querySelectorAll('.resource-title');
        if (headings.length <= 1) {
            return null;
        }
        const rightNav: any[] = [];
        headings.forEach(heading => {
            rightNav.push({
                title: heading.innerHTML,
                href: `#${heading.id}`,
            });
        });

        return (
            <>
                <div
                    className={`ac-anchor-layout-holder ${
                        anchorCollapse ? 'ac-anchor-layout-holder-close' : ''
                    }`}
                >
                    <div className="ac-anchor-wrapper">
                        <div className="ac-anchor-inner">
                            <Anchor lineless hash={false} boundary={70} affix={false}>
                                {rightNav.map(nav => (
                                    <AnchorLink title={nav.title} href={nav.href} key={nav.href} />
                                ))}
                            </Anchor>
                        </div>
                    </div>
                </div>
                <Button
                    className={`ac-anchor-collapse-btn ${
                        anchorCollapse ? 'ac-anchor-collapse-btn-close' : ''
                    }`}
                    icon={
                        <svg
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="4"
                            viewBox="0 0 48 48"
                            width="1em"
                            height="1em"
                            className="arco-icon arco-icon-left"
                        >
                            <path d="M32 8.4 16.444 23.956 32 39.513" />
                        </svg>
                    }
                    shape="circle"
                    size="large"
                    onClick={() => {
                        setAnchorCollapse(!anchorCollapse);
                    }}
                />
            </>
        );
    }

    function getIframeSrc() {
        const urlParts = previewUrl.split('#');
        const customQuery = toQuery({
            ...urlQuery,
            hide_back: hideBack || 1,
            from_web: 1,
            ...(isReadMe ? { need_jump: 0 } : {}),
        });
        return `${urlParts[0] || ''}?${customQuery}#${urlParts[1] || ''}`;
    }

    useEffect(() => {
        window.addEventListener('message', event => {
            const routeType = event?.data?.type;
            if (
                event?.data?.type === 'components' ||
                event?.data?.type === 'composite-components'
            ) {
                history.push(
                    `${event?.data?.language === LanguageSupport.EN ? '/en-US' : ''}/${routeType}/${
                        event.data.data
                    }?hide_back=0`,
                );
            }
        });
    }, []);

    return (
        <Layout name={name} type={type} language={language}>
            {doc}
            {needShowIframe && (
                <div className="mobile-iframe">
                    <iframe src={getIframeSrc()} title="mobile sites" key={name} />
                </div>
            )}
            {update && doc && !isIcon && renderCodePopover()}
            {renderRightNav()}
        </Layout>
    );
}
