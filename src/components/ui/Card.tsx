import React, { PropsWithChildren, ReactNode, CSSProperties } from 'react';
import './card.scss';

interface CardProps {
    header?: ReactNode;
    footer?: ReactNode;
    style?: CSSProperties;
    className?: string;
}

function Card({
    header, footer, children, style, className = '',
}: PropsWithChildren<CardProps>) {
    return (
        <div className={`${className} card`} style={style}>
            { header && <div className="card-header">{header}</div> }
            <div className="card-body">
                {children}
            </div>
            { footer && <div className="card-footer">{footer}</div> }
        </div>
    );
}

export default Card;
