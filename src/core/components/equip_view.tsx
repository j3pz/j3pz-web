import React from 'react';
import { Category, CATEGORY_DESC } from '../model/base';
import Equip from '../model/equip';
import './equip_view.less';
import { PrimaryAttribute, SecondaryAttribute, ATTRIBUTE_DESC } from '../model/attribute';

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
            <li className="equip-name">
                {equip.name}
                {/* <span class="star" ng-repeat="n in [1,2,3,4,5,6,7,8]" ng-if="n<=equips[$root.focus].jinglian.strengthen">★</span> */}
                <span className="right">
                    精炼等级:
                    {equip.strengthened}
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
                </li>
            ))}

            {SecondaryAttribute.filter((attributeKey) => equip[attributeKey] > 0).map((attributeKey) => (
                <li className="plus-info" key={attributeKey}>
                    {ATTRIBUTE_DESC[attributeKey]}
                    {equip[attributeKey]}
                </li>
            ))}

            {/* 触发类特效 */}
            <li className="score">
                {equip.effect?.description}
            </li>
            {/* 装备镶嵌孔 */}
            {[1, 2, 3].map((n) => {
                if (equip.embedding.holes < n) {
                    return null;
                }
                const embedStone = equip.embedding.stones[n - 1];
                const active = embedStone.level > 0;
                const img = active ? `0-${embedStone.level}` : 'empty-slot';
                return (
                    <li className={active ? 'plus-info' : 'hole-inactive'} key={`embed-${n}`}>
                        <img
                            src={`https://images.j3pz.com/imgs/stones/${img}.jpg`}
                            className="slot"
                            style={{ marginRight: 4 }}
                            alt=""
                        />
                        镶嵌孔：
                        {embedStone.attribute}
                    </li>
                );
            })}
            {/* 五彩石镶嵌孔(未镶嵌)  */}
            {isWeapon && (
            <li className="hole-inactive">
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

            {/* 装备使用类特效 */}
            <li className="plus-info">
                {equip.effect?.description}
            </li>
            {/*
            <!-- 装备套装汇总信息 -->
            <li class="quality" ng-if="equips[$root.focus].data.texiao&&equips[$root.focus].data.texiao.type==='Collection'">
                {{setController.collectionsList[setController.posSetMap[$root.focus]].name}}({{setController.collectionsList[setController.posSetMap[$root.focus]].activeNum}}/{{setController.collectionsList[setController.posSetMap[$root.focus]].allNum}})
            </li>
            <!-- 装备套装激活信息 -->
            <li class="quality" ng-repeat-start="component in setController.collectionsList[setController.posSetMap[$root.focus]].components" ng-if="component.active">{{component.equipName}}</li>
            <li class="holeInactive" ng-repeat-end ng-if="!component.active">{{component.equipName}}</li>
            <br ng-if="equips[$root.focus].data.texiao&&equips[$root.focus].data.texiao.type==='Collection'">
            <!-- 装备套装特效信息 -->
            <li ng-class="setController.collectionsList[setController.posSetMap[$root.focus]].activeNum>=effect.conditionNum?'plusInfo':'holeInactive'" ng-repeat="effect in setController.collectionsList[setController.posSetMap[$root.focus]].effects">[{{effect.conditionNum}}]{{effect.desc}}</li>
            <!-- 装备附魔 -->
            <li class="enhance">{{equips[$root.focus].enhance.desc}}</li>
            */}
            {/* 装备品质 */}
            <li className="quality">
                品质等级
                {equip.quality}
                {/* <span>(+{{equips[$root.focus].jinglian.quality}})</span> */}
            </li>
            {/* 装备分数 */}
            <li className="score">
                装备分数
                {equip.score}
                {/* <span>(+{{equips[$root.focus].jinglian.score}}+{{equips[$root.focus].embed.totalScore}})</span> */}
            </li>
            {/*
            <!-- 装备推荐门票 -->
            <li class="basicInfo">
                推荐门派：{{equips[$root.focus].getRecommend()}}
            </li>
            <!-- 装备来源 -->
            <li class="basicInfo" style="white-space: pre-wrap;">获取：{{equips[$root.focus].getDropSource()}}</li>
            <li class="basicInfo">
                {{equips[$root.focus].data.prediction}}
            </li>
            */}
        </div>
    );
}

export default EquipView;
