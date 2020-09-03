import React, { PropsWithChildren, CSSProperties } from 'react';
import './card.scss';

interface CardProps {
    style?: CSSProperties;
    className?: string;
    acrylic?: boolean;
}

function Card({
    children, style, className = '', acrylic,
}: PropsWithChildren<CardProps>) {
    const classNames = ['card', className];
    if (acrylic) {
        classNames.push('card-acrylic');
    }
    return (
        <div className={classNames.join(' ')} style={style}>
            {children}
        </div>
    );
}

export default Card;
