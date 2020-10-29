import React from 'react';
import { Tooltip, Whisper } from 'rsuite';
import { ATTRIBUTE_SHORT_DESC } from '../../model/attribute';
import { Result } from '../../model/result';
import './editor_viewer.less';

interface ResultItemProps {
    attrib: keyof Result;
    tips: keyof Result | null;
    result: Result;
}

export function ResultItem({ attrib, tips, result }: ResultItemProps) {
    return (
        tips ? (
            <Whisper
                trigger="hover"
                placement="left"
                speaker={<Tooltip>{result[tips]}</Tooltip>}
            >
                <li className="result-item">
                    {ATTRIBUTE_SHORT_DESC[attrib] ?? ATTRIBUTE_SHORT_DESC[tips]}
                    <span>{result[attrib]}</span>
                </li>
            </Whisper>
        ) : (
            <li className="result-item">
                {ATTRIBUTE_SHORT_DESC[attrib]}
                <span>{result[attrib]}</span>
            </li>
        )
    );
}
