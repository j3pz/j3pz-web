import React from 'react';
import {
    Nav, Popover, Tooltip, Whisper,
} from 'rsuite';
import Talent from '../model/talent';

interface TalentOptionsProps {
    talents: Talent[];
    idx: number;
    onChange?: (talent: Talent) => void;
}

function TalentOptions({ idx, talents, onChange = () => {} }: TalentOptionsProps) {
    const selected = talents[idx];
    return (
        <Whisper
            trigger={['hover', 'focus']}
            enterable
            speaker={(
                <Popover>
                    <div className="talent-options">
                        {talents.map((t, i) => (
                            <div key={`option-${t.id}`} className="talent-option">
                                <Whisper
                                    placement="top"
                                    trigger={['focus', 'hover']}
                                    speaker={<Tooltip>{t.description}</Tooltip>}
                                >
                                    <img
                                        className={`option-talent-icon ${idx === i ? 'active' : ''}`}
                                        src={`https://icons.j3pz.com/${t.icon}.png`}
                                        alt={t.name}
                                        onClick={() => {
                                            onChange(t);
                                        }}
                                    />
                                </Whisper>
                                <div>{t.name}</div>
                            </div>
                        ))}
                    </div>
                </Popover>
            )}
        >
            <Nav.Item>
                <img
                    className="selected-talent-icon"
                    src={`https://icons.j3pz.com/${selected.icon}.png`}
                    alt={selected.name}
                />
                <div className="talent-selection">
                    <div className="talent-name">{selected.name}</div>
                    <div className="talent-desc">{selected.description}</div>
                </div>
            </Nav.Item>
        </Whisper>
    );
}

export default TalentOptions;
