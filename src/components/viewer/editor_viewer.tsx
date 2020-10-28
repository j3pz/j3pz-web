import Konva from 'konva';
import { TextConfig } from 'konva/types/shapes/Text';
import { observer } from 'mobx-react';
import React, { Component } from 'react';
import {
    Layer, Stage, Text, Rect, Group,
} from 'react-konva';
import { ATTRIBUTE_SHORT_DESC } from '../../model/attribute';
import { GamingRole, schoolAbbrMap } from '../../model/base';
import { StoreProps } from '../../store';
import { schoolIcons } from '../../utils/school_icon';
import './editor_viewer.less';
import { ResultService } from '../../service/result_service';
import { Result } from '../../model/result';

interface EditorViewerState {
    width: number;
    height: number;
}


@observer
export class EditorViewer extends Component<StoreProps, EditorViewerState> {

    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
        };
    }

    render() {
        const { width, height } = this.state;
        const { kungfuMeta, kungfu } = this.props.store;
        const result = ResultService.calc(this.props.store);
        return (
            <div
                className="result-view"
            >

            </div>
        );
    }
}
