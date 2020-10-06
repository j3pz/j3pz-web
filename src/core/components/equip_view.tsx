import React from 'react';
import { Category, CATEGORY_DESC } from '../model/base';
import { Equip } from '../model/equip';
import './equip_view.less';
import {
    PrimaryAttribute, SecondaryAttribute, ATTRIBUTE_DESC, DECORATOR_DESC, AttributeDecorator,
} from '../model/attribute';
import { CollectionService } from '../service/collection_service';

interface EquipViewProps {
    equip: Equip;
}

function EquipView({ equip }: EquipViewProps) {
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
                <i className={icon} />
                <div>尚未穿戴装备</div>
            </div>
        );
    }
    return (
        <div className="equip">
            <li className={`equip-name ${equip.strengthen > 6 ? 'rare' : ''}`}>
                {equip.name}
                {[1, 2, 3, 4, 5, 6, 7, 8].filter((n) => n <= equip.strengthLevel)
                    .map((n) => <i className="fas fa-star star" key={`star-${n}`} />)}
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
                return (
                    <li className={active ? 'hole-active' : 'inactive'} key={`embed-${n}`}>
                        <img
                            src={`https://images.j3pz.com/imgs/stones/${img}.jpg`}
                            className="slot"
                            style={{ marginRight: 4 }}
                            alt=""
                        />
                        <span>
                            镶嵌孔：
                            {DECORATOR_DESC[equip.embed.attributes[n - 1][1]]}
                            {ATTRIBUTE_DESC[equip.embed.attributes[n - 1][0]]}
                            ?
                        </span>
                    </li>
                );
            })}
            {/* 五彩石镶嵌孔(未镶嵌)  */}
            {isWeapon && (
            <li className="inactive">
                <img src="https://images.j3pz.com/imgs/stones/empty-slot.jpg" className="slot" alt="" />
                &lt;只能镶嵌五彩石&gt;
            </li>
            )}

            {/* <!-- 五彩石镶嵌孔(已镶嵌) -->
            <li ng-repeat="attribute in attributeStone[attributeStoneSelected].attributes" ng-if="((focus=='b_primaryWeapon'||focus=='c_primaryWeapon')&&((attributeStone[0].level!=0&&focus=='b_primaryWeapon')||(attributeStone[1].level!=0&&focus=='c_primaryWeapon')))&&attribute.number>0" ng-class="attribute.isActive?'plusInfo':'holeInactive'">
                <img ng-if="attribute.isFirstChild" ng-src="{{'/images/'+attribute.type+'-'+attributeStone[attributeStoneSelected].level+'.jpg'}}" style="width:16px;height:16px;vertical-align:middle;"/>
                <img ng-if="!attribute.isFirstChild" src="imgs/tou.png" style="width:16px;height:16px;vertical-align:middle;">
                {{attribute.desc}}
            </li> */}

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
            {/* <li class="enhance">{{equips[$root.focus].enhance.desc}}</li> */}
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
                {equip.strengthLevel > 0 && <span>{`(+${equip.getStrengthValue(equip.score)})`}</span>}
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
