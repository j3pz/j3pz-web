import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/pro-solid-svg-icons';
import { Category, CATEGORY_DESC } from '../../model/base';
import { Equip } from '../../model/equip';
import './equip_view.less';
import {
    PrimaryAttribute, SecondaryAttribute, ATTRIBUTE_DESC, DECORATOR_DESC, AttributeDecorator,
} from '../../model/attribute';
import { CollectionService } from '../../service/collection_service';
import { Stone } from '../../model/stone';
import { EmbedService } from '../../service/embed_service';
import { $store } from '../../store';


interface EquipViewProps {
    equip: Equip;
    stone?: Stone;
}

function EquipView({ equip, stone }: EquipViewProps) {
    let isWeapon = false;
    let isSecondaryWeapon = false;
    let isTrinket = false;
    if (([
        Category.PRIMARY_WEAPON,
        Category.TERTIARY_WEAPON,
    ] as Category[]).includes(equip.category)) {
        isWeapon = true;
    } else if (([
        Category.NECKLACE,
        Category.PENDANT,
        Category.RING,
    ] as Category[]).includes(equip.category)) {
        isTrinket = true;
    } else if (Category.SECONDARY_WEAPON === equip.category) {
        isSecondaryWeapon = true;
    }

    if (equip === undefined || equip.id === undefined) {
        let icon = 'fad fa-helmet-battle';
        if (isWeapon) {
            icon = 'fad fa-swords';
        } else if (isTrinket) {
            icon = 'fad fa-rings-wedding';
        } else if (isSecondaryWeapon) {
            icon = 'fad fa-bow-arrow';
        }
        return (
            <div className="equip empty-equip">
                <p style={{ width: 80, backgroundColor: '#F12Cf1' }} className="placeholder" />
                <p style={{ width: 40, backgroundColor: '#FFFFFF' }} className="placeholder" />
                <p style={{ width: 140, backgroundColor: '#FFFFFF' }} className="placeholder" />
                <p style={{ width: 140, backgroundColor: '#FFFFFF' }} className="placeholder" />
                <p style={{ width: 70, backgroundColor: '#FFFFFF' }} className="placeholder" />
                <p style={{ width: 70, backgroundColor: '#FFFFFF' }} className="placeholder" />
                <p style={{ width: 130, backgroundColor: '#00C848' }} className="placeholder" />
                <p style={{ width: 140, backgroundColor: '#00C848' }} className="placeholder" />
                <p style={{ width: 160, backgroundColor: '#00C848' }} className="placeholder" />
                <p style={{ width: 150, backgroundColor: '#00C848' }} className="placeholder" />
                <p style={{ width: 190, backgroundColor: '#9B9B9B' }} className="placeholder" />
                <p style={{ width: 190, backgroundColor: '#9B9B9B' }} className="placeholder" />
                <p style={{ width: 0, backgroundColor: 'transparent' }} className="placeholder" />
                <p style={{ width: 100, backgroundColor: '#FFFF00' }} className="placeholder" />
                <p style={{ width: 100, backgroundColor: '#FF8000' }} className="placeholder" />
                <p style={{ width: 110, backgroundColor: '#FFFFFF' }} className="placeholder" />
                <p style={{ width: 110, backgroundColor: '#FFFFFF' }} className="placeholder" />
                <p style={{ width: 40, backgroundColor: '#9B9B9B' }} className="placeholder" />
                <p style={{ width: 140, backgroundColor: '#9B9B9B' }} className="placeholder" />
                <i className={icon} />
                <div>尚未穿戴装备</div>
            </div>
        );
    }

    const embedScore = equip.embedScore + (isWeapon ? ($store.stones[equip.category]?.level ?? 0) * 308 : 0);

    return (
        <div className="equip">
            <li className={`equip-name ${equip.strengthen > 6 ? 'rare' : ''}`}>
                {equip.name}
                {[1, 2, 3, 4, 5, 6, 7, 8].filter((n) => n <= equip.strengthLevel)
                    .map((n) => <FontAwesomeIcon icon={faStar} className="star" key={`star-${n}`} />)}
                <span className="right">
                    精炼等级:
                    {equip.strengthLevel}
                    /
                    {equip.strengthen}
                </span>
            </li>
            <li className="basic-info">
                {CATEGORY_DESC[equip.category]}
            </li>

            {['basicMagicShield', 'basicPhysicsShield'].filter((attributeKey) => equip[attributeKey] > 0).map((attributeKey) => (
                <li className="basic-info" key={attributeKey}>
                    {ATTRIBUTE_DESC[attributeKey]}
                    {equip[attributeKey]}
                </li>
            ))}

            {isWeapon && (
                <>
                    <li className="basic-info">
                        近身伤害提高
                        {equip.damageRangeDesc}
                        <span className="right" style={{ color: '#F2F2F2' }}>
                            速度
                            {equip.speed}
                        </span>
                    </li>
                    <li className="basic-info">
                        每秒伤害
                        {equip.damagePerSecond}
                    </li>
                </>
            )}
            {PrimaryAttribute.filter((attributeKey) => equip[attributeKey] > 0).map((attributeKey) => (
                <li className="basic-info" key={attributeKey}>
                    {ATTRIBUTE_DESC[attributeKey]}
                    {equip[attributeKey]}
                    {equip.strengthLevel > 0 && <span>{`(+${equip.getStrengthValue(equip[attributeKey])})`}</span>}
                </li>
            ))}

            {SecondaryAttribute.filter((attributeKey) => equip[attributeKey] > 0).map((attributeKey) => (
                <li className="plus-info" key={attributeKey}>
                    {DECORATOR_DESC[equip.decorators?.[attributeKey] ?? AttributeDecorator.NONE]}
                    {ATTRIBUTE_DESC[attributeKey]}
                    {equip[attributeKey]}
                    {equip.strengthLevel > 0 && <span>{`(+${equip.getStrengthValue(equip[attributeKey])})`}</span>}
                </li>
            ))}

            {/* 触发类特效 */
                equip.effect?.trigger === 'Passive' && (
                    <li className="score has-break">
                        {equip.effect?.description.replace(/;/g, '\n')}
                    </li>
                )
            }
            {/* 装备镶嵌孔 */}
            {[1, 2, 3].map((n) => {
                if (equip.embed.count < n) {
                    return null;
                }
                const embedStone = equip.embedding[n - 1] ?? { index: n - 1, level: 0 };
                const active = embedStone.level > 0;
                const img = active ? `0-${embedStone.level}` : 'empty-slot';
                const embedValue = EmbedService.getPlusValueByLevel(equip.embed.attributes[n - 1], embedStone.level);
                return (
                    <li className={active ? 'hole-active' : 'inactive'} key={`embed-${n}`}>
                        <img
                            src={`https://images.j3pz.com/imgs/stones/${img}.jpg`}
                            className="slot"
                            alt=""
                        />
                        <span>
                            镶嵌孔：
                            {DECORATOR_DESC[equip.embed.attributes[n - 1][1]]}
                            {ATTRIBUTE_DESC[equip.embed.attributes[n - 1][0]]}
                            {embedValue > 0 ? `${embedValue}` : '?'}
                        </span>
                    </li>
                );
            })}
            {/* 五彩石镶嵌孔(未镶嵌)  */}
            {isWeapon && !stone && (
            <li className="inactive">
                <img src="https://images.j3pz.com/imgs/stones/empty-slot.jpg" className="slot" alt="" />
                <span>&lt;只能镶嵌五彩石&gt;</span>
            </li>
            )}

            {/* 五彩石镶嵌孔(已镶嵌) */}
            {isWeapon && stone && (
                <>
                    {stone.attributes.map((attrib, i) => {
                        const active = attrib.requiredLevel <= EmbedService.totalLevel
                            && attrib.requiredQuantity <= EmbedService.totalCount;
                        return (
                            <li className={active ? 'hole-active' : 'inactive'} key={`stone-attribute-${attrib.id}`}>
                                {i === 0
                                    ? <img src={`https://icons.j3pz.com/${stone.icon}.png`} className="slot" alt="" />
                                    : <span className="slot" />}
                                <span>{DECORATOR_DESC[attrib.decorator] + ATTRIBUTE_DESC[attrib.key] + attrib.value}</span>
                            </li>
                        );
                    })}
                </>
            )}

            {/* 装备使用类特效 */
                equip.effect?.trigger === 'Usage' && (
                    <li className="plus-info has-break">
                        {`使用: ${equip.effect?.description}`}
                    </li>
                )
            }
            {/* 装备套装汇总信息 */}
            {equip.set && (
            <li className="quality">
                {`${equip.set.name}(${CollectionService.getActiveCount(equip)}/${CollectionService.getEquips(equip).length})`}
            </li>
            )}
            {/* 装备套装激活信息 */}
            {
                CollectionService.getEquips(equip).map((info) => {
                    if (info.active) {
                        return <li className="quality" key={`equip-set-${info.position}`}>{info.name}</li>;
                    }
                    return <li className="inactive" key={`equip-set-${info.position}`}>{info.name}</li>;
                })
            }
            <br />
            {/* 装备套装特效信息 */}
            {
                CollectionService.getEffects(equip).map((effect) => {
                    if (effect.active) {
                        return (
                            <li className="plus-info" key={`set-effect-${effect.id}`}>
                                {`[${effect.requirement}] ${effect.description}`}
                            </li>
                        );
                    }
                    return (
                        <li className="inactive" key={`set-effect-${effect.id}`}>
                            {`[${effect.requirement}] ${effect.description}`}
                        </li>
                    );
                })
            }
            {/* 装备附魔 */}
            <li className="enhance">{equip.enhance?.description ?? ''}</li>
            {/* 装备品质 */}
            <li className="quality">
                品质等级
                {equip.quality}
                {equip.strengthLevel > 0 && <span>{`(+${equip.getStrengthValue(equip.quality)})`}</span>}
            </li>
            {/* 装备分数 */}
            <li className="score">
                装备分数
                {equip.score}
                {(equip.strengthLevel > 0 || embedScore > 0)
                    && <span>{`(+${equip.getStrengthValue(equip.score)}+${embedScore})`}</span>}
            </li>
            {/*
            <!-- 装备推荐门派：-->
            <li class="basicInfo">
                推荐门派：{{equips[$root.focus].getRecommend()}}
            </li>
            */}
            {/* 装备外观 */}
            {equip.represent && (
                <li className="basic-info">
                    外观:
                    {' '}
                    {equip.represent.name}
                </li>
            )}

            {/* 装备来源 */}
            <li className="basic-info extension has-break">
                获取:
                {'\n'}
                {equip.sourceDescription}
            </li>
        </div>
    );
}

export { EquipView };
