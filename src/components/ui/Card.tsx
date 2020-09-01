import React, { PropsWithChildren, CSSProperties } from 'react';
import './card.scss';

interface CardProps {
    style?: CSSProperties;
    className?: string;
}

function Card({
    children, style, className = '',
}: PropsWithChildren<CardProps>) {
    return (
        <div className={`${className} card`} style={style}>
            {children}
        </div>
    );
}

export default Card;
