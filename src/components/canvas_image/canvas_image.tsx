import { ImageConfig } from 'konva/types/shapes/Image';
import React, { Component } from 'react';
import { Image as KonvaImage } from 'react-konva';

interface CanvasImageState {
    image: HTMLImageElement | null;
}

interface CanvasImageProps {
    src: string;
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
        const { src, ...rest } = this.props;
        return (
            <KonvaImage
                image={this.state.image}
                {...rest}
            />
        );
    }
}
