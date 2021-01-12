import CssGenerator from "./generator";
import { Aliases, Side, SpaceType } from "./utilityConfig";

export class Css implements CssGenerator {
    output: { write: (value: string) => void }
    aliases: Aliases;

    indent = 0;
    format = true;

    breakpoint: string = '';

    constructor(output: Css['output'], aliases: Aliases) {
        this.output = output;
        this.aliases = aliases;
    }

    write(value: string) {
        const prefix = this.format ? '\t'.repeat(this.indent) : '';
        const endline = this.format ? '\n' : '';
        this.output.write(`${prefix}${value}${endline}`);
    }

    beginBreakpoint(name: string, size: number) {
        if (!name || name.length == 0)
            return;

        this.breakpoint = name;
        this.write(`@media only screen and (max-width:${size}px){`);
        this.indent += 1;
    }

    joinName(parts: (string | number)[]) {
        return parts.filter(p => p !== undefined && p !== '').join('-');
    }

    aliasedName(parts: (string | number)[]) {
        return this.joinName(parts.map(p => this.aliases[p] || p));
    }

    writeStartClass(...classParts: (string | number)[]) {
        let className = this.aliasedName(classParts);
        if (this.breakpoint)
            className = this.breakpoint + '\\:' + className;

        const line = `.${className} {`
        this.write(this.format ? line : line.replace(' ', ''));
        this.indent += 1;
    }

    writeValue(propertyNameParts: string[], value: string | number, units: string = '') {
        const propertyName = this.joinName(propertyNameParts);
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