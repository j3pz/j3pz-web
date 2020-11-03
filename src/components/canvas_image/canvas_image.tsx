import { ImageConfig } from 'konva/types/shapes/Image';
import React, { Component } from 'react';
import { Group, Image as KonvaImage } from 'react-konva';

interface CanvasImageState {
    image: HTMLImageElement | null;
}

interface CanvasImageProps {
    src: string;
    cornerRadius?: number;
}

export class CanvasImage extends Component<CanvasImageProps & Omit<ImageConfig, 'image'>, CanvasImageState> {
    private image: HTMLImageElement;

    constructor(props) {
        super(props);
        this.state = {
            image: null,
        };
    }

    componentDidMount() {
        this.loadImage();
    }
    componentDidUpdate(oldProps) {
        if (oldProps.src !== this.props.src) {
            this.loadImage();
        }
    }
    componentWillUnmount() {
        this.image.removeEventListener('load', this.handleLoad);
    }
    loadImage() {
        this.image = new window.Image();
        this.image.src = this.props.src;
        this.image.crossOrigin = 'anonymous';
        this.image.addEventListener('load', this.handleLoad);
    }
    handleLoad = () => {
        this.setState({
            image: this.image,
        });
    };
    render() {
        if (!this.state.image) {
            return null;
        }
        const { src, cornerRadius: r, ...rest } = this.props;
        const {
            x, y, width: w, height: h,
        } = rest;
        const image = (
            <KonvaImage
                image={this.state.image}
                {...rest}
            />
        );
        if (r) {
            return (
                <Group
                    clipFunc={(ctx) => {
                        ctx.beginPath();
                        ctx.moveTo(x + r, y);
                        ctx.arcTo(x + w, y, x + w, y + h, r);
                        ctx.arcTo(x + w, y + h, x, y + h, r);
                        ctx.arcTo(x, y + h, x, y, r);
                        ctx.arcTo(x, y, x + w, y, r);
                        ctx.closePath();
                    }}
                >
                    {image}
                </Group>
            );
        }
        return image;
    }
}
