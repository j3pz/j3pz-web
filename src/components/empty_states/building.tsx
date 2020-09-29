import React from 'react';

function BuildingState() {
    return (
        <div
            style={{
                opacity: 0.7,
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <i className="fad fa-construction" style={{ display: 'block', fontSize: 96, textAlign: 'center' }} />
            <span
                style={{
                    display: 'block',
                    fontSize: 20,
                    marginTop: 12,
                    textAlign: 'center',
                }}
            >
                尚在建设中
            </span>
        </div>
    );
}

export { BuildingState };
