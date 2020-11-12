import React from 'react';
import { ATTRIBUTE_SHORT_DESC, EXTRA_ATTRIBUTE_DESC } from '../../model/attribute';
import { Result } from '../../model/result';
import './editor_viewer.less';

interface ResultItemProps {
    attrib: keyof Result;
    tips: keyof Result | null;
    result: Result;
}

export function ResultItem({ attrib, tips, result }: ResultItemProps) {
    return (
        <li className="result-item">
            {ATTRIBUTE_SHORT_DESC[attrib] ?? ATTRIBUTE_SHORT_DESC[tips ?? '']}
            <span>{result[attrib]}</span>
            {tips && <span>{`(${EXTRA_ATTRIBUTE_DESC[tips]} ${result[tips]})`}</span>}
        </li>
    );
}
