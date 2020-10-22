import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStarHalfAlt, faSlash, faStar as faLightStar } from '@fortawesome/pro-light-svg-icons';
import { faStar as faSolidStar } from '@fortawesome/pro-solid-svg-icons';
import { StoreProps } from '../../store';
import './equip_enhance.less';

interface StrengthenPickerState {
    originalLevel: number;
    equipId: number | null,
}

@observer
export class StrengthenPicker extends Component<StoreProps, StrengthenPickerState> {
    constructor(props) {
        super(props);
        this.state = {
            originalLevel: 0,
            equipId: null,
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps: StoreProps) {
        const { store } = nextProps;
        const nextEquip = store.equips[store.activeEquipNav];
        if (nextEquip?.id !== this.state.equipId) {
            this.setState({
                originalLevel: nextEquip?.strengthLevel ?? 0,
                equipId: nextEquip?.id ?? null,
            });
        }
    }

    handleMouseIn = (level: number) => {
        const { store } = this.props;
        const currentEquip = store.equips[store.activeEquipNav];
        if (currentEquip) {
            store.equips[store.activeEquipNav] = currentEquip.setStrengthLevel(level);
        }
    };

    handleMouseOut = () => {
        const { store } = this.props;
        const currentEquip = store.equips[store.activeEquipNav];
        if (currentEquip) {
            store.equips[store.activeEquipNav] = currentEquip.setStrengthLevel(this.state.originalLevel);
        }
    };

    handleSelect = (level: number) => {
        this.setState({ originalLevel: level });
        this.handleMouseIn(level);
    };

    render() {
        const { store } = this.props;
        const currentEquip = store.equips[store.activeEquipNav];
        return (
            <>
                <div className="label">精炼</div>
                <span
                    className="fa-layers fa-2x cancel-star"
                    onClick={() => this.handleSelect(0)}
                    onMouseLeave={() => this.handleMouseOut()}
                    onMouseEnter={() => this.handleMouseIn(0)}
                >
                    <FontAwesomeIcon icon={faStarHalfAlt} />
                    <FontAwesomeIcon icon={faSlash} />
                </span>
                {Array.from({ length: currentEquip?.strengthen ?? 0 })
                    .map((_, i) => {
                        const handlers = {
                            onMouseLeave: () => this.handleMouseOut(),
                            onMouseEnter: () => this.handleMouseIn(i + 1),
                            onClick: () => this.handleSelect(i + 1),
                            key: `strengthen-${i}`,
                            className: 'add-star',
                        };
                        if (i + 1 <= (currentEquip?.strengthLevel ?? 0)) {
                            return <FontAwesomeIcon icon={faSolidStar} size="2x" {...handlers} />;
                        }
                        return <FontAwesomeIcon icon={faLightStar} size="2x" {...handlers} />;
                    })}
            </>
        );
    }
}
