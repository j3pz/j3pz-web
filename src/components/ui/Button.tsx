import React, { PropsWithChildren } from 'react';
import './button.css';

interface ButtonProps {
    className?: string;
}

function Button({ children, className }: PropsWithChildren<ButtonProps>) {
    return (
        <div className={`${className} button`}>
            {children}
        </div>
    );
}

export default Button;
