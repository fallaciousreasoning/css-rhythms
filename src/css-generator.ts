import CssGenerator from "./generator";
import { Side, SpaceType } from "./utilityConfig";

export class Css implements CssGenerator {
    output: { write: (value: string) => void }
    indent = 0;
    format = true;

    breakpoint: string = '';

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
        this.write(`@media only screen and (max-width:${size}px){`);
        this.indent += 1;
    }

    writeStartClass(...classParts: (string | number)[]) {
        let className = classParts.filter(p => p !== '').join('-');
        if (this.breakpoint)
            className = this.breakpoint + '\\:' + className;

        this.write(`.${className} {`);
        this.indent += 1;
    }

    writeValue(propertyName: string | string[], value: string | number, units: string = '') {
        if (Array.isArray(propertyName))
            propertyName = propertyName.filter(p => p !== '').join('-');
        this.write(`${propertyName}: ${value}${units};`)
    }

    endBlock() {
        if (this.indent === 0)
            return;
            
        if (this.breakpoint) {
            this.breakpoint = '';
        }

        this.indent -= 1;
        this.write('}');
    }
}

export const getSpacing = (spaceType: SpaceType, space: number, side?: Side) => {
    const cssProperty = `${spaceType}${side ? `-${side}` : ''}`;
    const cssValue = `${space}px`;

    // TODO: Make it possible to create aliases.
    const className = `${cssProperty}-${space}`;

    return `.${className} { ${cssProperty}: ${cssValue} }`
}