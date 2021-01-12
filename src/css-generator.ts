import CssGenerator from "./generator";
import { Side, SpaceType } from "./utilityConfig";

export class Css implements CssGenerator {
    output: { write: (value: string) => void }
    indent = 0;
    format = true;

    breakpoint: string = '';
    spaceType: string = '';
    spaceSide: string = '';

    get className() {
        let result = '';
        if (this.breakpoint)
            result += `${this.breakpoint}\\:`
        if (this.spaceType)
            result += `${this.spaceType}`;
        if (this.spaceSide)
            result += `-${this.spaceSide}`;
        return result;
    }

    get cssProperty() {
        let result = '';
        if (this.spaceType)
            result += this.spaceType;
        if (this.spaceSide)
            result += `-${this.spaceSide}`;
        return result;
    }


    constructor(output: Css['output']) {
        this.output = output;
    }

    write(value: string) {
        const prefix = this.format ? '\t'.repeat(this.indent) : '';
        const endline = '';// this.format ? '\n' : '';
        this.output.write(`${prefix}${value}${endline}`);
    }

    beginBreakpoint(name: string, size: number) {
        if (!name || name.length == 0)
            return;
        
        this.breakpoint = name;
        this.write(`@media only screen and (min-width:${size}px){`);
        this.indent += 1;
    }

    writeStartSpacing(spacing: SpaceType) {
        this.spaceType = spacing;
    }

    writeStartSide(side: Side) {
        this.spaceSide = side;
    }

    writeValue(value: number) {
        this.write(`.${this.className}-${value} {`)
        this.indent += 1;
        this.write(`${this.cssProperty}: ${value}px;`)
        this.indent -= 1;
        this.write('}');
    }

    endBlock() {
        if (this.spaceSide)
            this.spaceSide = '';
        else if (this.spaceType)
            this.spaceType = '';
        else if (this.breakpoint) {
            this.breakpoint = '';
            this.indent -= 1;
            this.write('}');
        }
    }
}

export const getSpacing = (spaceType: SpaceType, space: number, side?: Side) => {
    const cssProperty = `${spaceType}${side ? `-${side}` : ''}`;
    const cssValue = `${space}px`;

    // TODO: Make it possible to create aliases.
    const className = `${cssProperty}-${space}`;

    return `.${className} { ${cssProperty}: ${cssValue} }`
}