/* eslint-disable react/no-array-index-key */
import { faBrackets, faBracketsCurly, IconDefinition } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { observer } from 'mobx-react';
import React, { Component } from 'react';
import {
    Alert,
    Button, Dropdown, FlexboxGrid, List, Modal,
} from 'rsuite';
import FlexboxGridItem from 'rsuite/lib/FlexboxGrid/FlexboxGridItem';
import { ATTRIBUTE_SHORT_DESC, EXTRA_ATTRIBUTE_DESC, PrimaryAttribute } from '../../model/attribute';
import { Result } from '../../model/result';
import { ResultService } from '../../service/result_service';
import { StoreProps } from '../../store';
import { flatten } from '../../utils/array';

function DropdownIcon({ icon, className }: { icon: IconDefinition; className: string; }) {
    return <FontAwesomeIcon className={`rs-icon ${className}`} icon={icon} />;
}

@observer
export class ShareResult extends Component<StoreProps> {
    result: Result;

    private static attribs = [
        ['health', ...PrimaryAttribute, 'attack', 'baseAttack'],
        [
            ['critRate', 'crit'], ['critEffectRate', 'critEffect'], 'surplus', ['hasteRate', 'haste'],
            ['overcomeRate', 'overcome'], ['strainRate', 'strain'], 'baseHeal', 'heal',
        ],
        [
            ['physicsShieldRate', 'physicsShield'], ['magicShieldRate', 'magicShield'],
            ['dodgeRate', 'dodge'], ['parryBaseRate', 'parryBase'],
            'parryValue', ['toughnessRate', 'toughness'],
            ['huajingRate', 'huajing'], 'score',
        ],
    ];

    private static renderHeader(attribs) {
        return (
            <FlexboxGrid style={{ padding: '8px 36px' }}>
                {attribs.map((attrib) => {
                    let key = attrib;
                    if (attrib instanceof Array) {
                        [,key] = attrib;
                    }
                    return (
                        <FlexboxGridItem colspan={3} key={key}>
                            <b>{ATTRIBUTE_SHORT_DESC[key] ?? EXTRA_ATTRIBUTE_DESC[key]}</b>
                        </FlexboxGridItem>
                    );
                })}
            </FlexboxGrid>
        );
    }

    private renderValue(attribs) {
        return (
            <FlexboxGrid style={{ padding: '8px 36px' }}>
                {attribs.map((attrib) => {
                    if (attrib instanceof Array) {
                        return (
                            <FlexboxGridItem colspan={3} key={attrib[0]}>
                                {this.result[attrib[0]]}
                                {`(${this.result[attrib[1]]})`}
                            </FlexboxGridItem>
                        );
                    }
                    return <FlexboxGridItem colspan={3} key={attrib}>{this.result[attrib]}</FlexboxGridItem>;
                })}
            </FlexboxGrid>
        );
    }

    copy = (format: 'csv' | 'json') => {
        const keys = flatten(ShareResult.attribs, 2);
        const values = keys.map((key) => this.result[key] || 0);
        let result = '';
        if (format === 'csv') {
            result += keys.map((key) => EXTRA_ATTRIBUTE_DESC[key] ?? ATTRIBUTE_SHORT_DESC[key]).join(',');
            result += '\n';
            result += values.join(',');
        } else if (format === 'json') {
            const resultObj = keys.map((key) => [key, EXTRA_ATTRIBUTE_DESC[key] ?? ATTRIBUTE_SHORT_DESC[key]]).reduce((acc, cur) => {
                const key = cur[0];
                const desc = cur[1];
                acc[desc] = `${this.result[key] || 0}`;
                return acc;
            }, {});
            result = JSON.stringify(resultObj);
        } else {
            Alert.error('不支持的格式');
        }
        const copyzone = document.getElementById('copyzone')!;
        copyzone.innerText = result;
        const range = document.createRange();
        range.selectNodeContents(copyzone);
        const selection = window.getSelection()!;
        selection.removeAllRanges();
        selection.addRange(range);
        try {
            document.execCommand('copy', false);
            Alert.info('复制成功');
        } catch (e) {
            Alert.info('复制失败');
        }
    };

    render() {
        this.result = ResultService.calc(this.props.store);
        return (
            <>
                <Modal.Body>
                    <List hover>
                        {ShareResult.attribs.map((attribTuples, i) => (
                            <>
                                <List.Item key={i * 2}>{ShareResult.renderHeader(attribTuples)}</List.Item>
                                <List.Item key={i * 2 + 1}>{this.renderValue(attribTuples)}</List.Item>
                            </>
                        ))}
                    </List>
                    <div id="copyzone" style={{ position: 'absolute', top: -99999 }} />
                </Modal.Body>
                <Modal.Footer>
                    <Dropdown title="复制结果" toggleComponentClass={Button} appearance="primary" style={{ marginLeft: 12 }}>
                        <Dropdown.Item onSelect={() => this.copy('json')} icon={<DropdownIcon className="rs-icon" icon={faBracketsCurly} />}>复制为 JSON</Dropdown.Item>
                        <Dropdown.Item onSelect={() => this.copy('csv')} icon={<DropdownIcon className="rs-icon" icon={faBrackets} />}>复制为 CSV</Dropdown.Item>
                    </Dropdown>
                </Modal.Footer>
            </>
        );
    }
}
