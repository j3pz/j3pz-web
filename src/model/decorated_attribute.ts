import { classToClass } from 'class-transformer';
import { AttributeDecorator } from './attribute';

export class DecoratedAttribute {
    constructor(private initValue: number) {}

    [AttributeDecorator.ALL] = this.initValue;
    [AttributeDecorator.PHYSICS] = this.initValue;
    [AttributeDecorator.MAGIC] = this.initValue;
    [AttributeDecorator.LUNAR] = this.initValue;
    [AttributeDecorator.SOLAR] = this.initValue;
    [AttributeDecorator.SOLAR_LUNAR] = this.initValue;
    [AttributeDecorator.NEUTRAL] = this.initValue;
    [AttributeDecorator.POISON] = this.initValue;

    addAll(value: number) {
        this[AttributeDecorator.ALL] += value;
        this.addPhysics(value);
        this.addMagic(value);
    }

    addPhysics(value: number) {
        this[AttributeDecorator.PHYSICS] += value;
    }

    addMagic(value: number) {
        this[AttributeDecorator.MAGIC] += value;
        this[AttributeDecorator.LUNAR] += value;
        this[AttributeDecorator.SOLAR] += value;
        this[AttributeDecorator.SOLAR_LUNAR] += value;
        this[AttributeDecorator.NEUTRAL] += value;
        this[AttributeDecorator.POISON] += value;
    }

    clone() {
        return classToClass(this);
    }
}
