import { number } from "prop-types";
import { AttributeDecorator } from "./attribute";

export class DecoratedAttribute {
    [AttributeDecorator.PHYSICS] = 0;
    [AttributeDecorator.MAGIC] = 0;
    [AttributeDecorator.LUNAR] = 0;
    [AttributeDecorator.SOLAR] = 0;
    [AttributeDecorator.SOLAR_LUNAR] = 0;
    [AttributeDecorator.NEUTRAL] = 0;
    [AttributeDecorator.POISON] = 0;

    addAll(value: number) {
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

}