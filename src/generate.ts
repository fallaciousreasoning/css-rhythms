import fs from 'fs/promises';
import { Css } from './css-generator';
import { colorAliases, colorTypes, sides, spaceTypes, UtilityConfig } from './utilityConfig';

const loadConfig = (filename: string) => fs.readFile(filename).then(b => b.toString('utf-8')).then(text => JSON.parse(text)) as Promise<UtilityConfig>;

const run = async () => {
    const config = await loadConfig("config.json");
    const generator = new Css({ write: console.log });
    config.breakpoints[''] = 0;

    for (const breakpoint of Object.keys(config.breakpoints).sort((a, b) => (config.breakpoints[a] - config.breakpoints[b]))) {
        const breakpointSize = config.breakpoints[breakpoint];
        generator.beginBreakpoint(breakpoint, breakpointSize);

        for (const spaceType of spaceTypes) {
            for (const spacing of config.spacing) {
                for (const side of ['', ...sides]) {
                    generator.writeStartClass(spaceType, side, spacing);
                    generator.writeValue([spaceType, side], spacing, 'px');
                    generator.endBlock();
                }


                generator.writeStartClass(spaceType, 'x', spacing);
                generator.writeValue([spaceType, 'left'], spacing, 'px');
                generator.writeValue([spaceType, 'right'], spacing, 'px');
                generator.endBlock();

                generator.writeStartClass(spaceType, 'y', spacing);
                generator.writeValue([spaceType, 'top'], spacing, 'px');
                generator.writeValue([spaceType, 'bottom'], spacing, 'px');
                generator.endBlock();
            }
        }

        for (const color in config.colors) {
            const value = config.colors[color];
            for (const colorType of colorTypes) {
                const friendlyName = colorAliases[colorType];
                generator.writeStartClass(friendlyName, color);
                generator.writeValue([colorType], value);
                generator.endBlock();
            }
        }
        generator.endBlock();
    }

}

run();