import React, { useContext, useMemo } from 'react';
import { formatDateNumber } from '@arco-design/mobile-utils';
import { convertTsToDateObj } from '../date-picker/helper';
import { GlobalContext } from '../context-provider';

export function DefaultPickerLinkedContainer({ value }: { value: (string | number)[] }) {
    const { prefixCls, locale } = useContext(GlobalContext);
    const className = `${prefixCls}-form-picker-link-container`;
    return (
        <div className={className}>
            {value && value.length ? (
                value.join('-')
            ) : (
                <span className={`${className}-placeholder`}>{locale?.Form.pickerDefaultHint}</span>
            )}
        </div>
    );
}

export function DefaultDatePickerLinkedContainer({
    ts,
    types,
}: {
    ts: number | [number, number];
    types: string[];
}) {
    const { prefixCls, locale } = useContext(GlobalContext);
    const className = `${prefixCls}-form-picker-link-container`;
    const dateTimeStr = useMemo(() => {
        if (typeof ts === 'number') {
            return formatDateTimeStr(ts, types);
        }
        return `${formatDateTimeStr(ts[0], types)} ~ ${formatDateTimeStr(ts[1], types)}`;
    }, [ts, types]);

    function formatDateTimeStr(timestamp: number, itemTypes: string[]) {
        const dateObj = convertTsToDateObj(timestamp);
        const validDateObj: Record<string, string> = Object.keys(dateObj).reduce(
            (acc, key) => ({
                ...acc,
                ...(itemTypes.includes(key) ? { [key]: formatDateNumber(dateObj[key]) } : {}),
            }),
            {},
        );
        const dateStr = [validDateObj.year, validDateObj.month, validDateObj.date]
            .filter(v => v)
            .join('-');
        const timeStr = [validDateObj.hour, validDateObj.minute, validDateObj.second]
            .filter(v => v)
            .join(':');
        return `${dateStr} ${timeStr}`;
    }

    return (
        <div className={className}>
            {ts ? (
                dateTimeStr
            ) : (
                <span className={`${className}-placeholder`}>{locale?.Form.pickerDefaultHint}</span>
            )}
        </div>
    );
}
