import React from 'react';

export default function Img({
    className,
    name,
    onClick,
}: {
    className?: string;
    name: string;
    onClick?: () => void;
}) {
    return (
        <img
            className={className}
            src={`https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_home_/${name}`}
            alt=""
            onClick={onClick}
        />
    );
}
