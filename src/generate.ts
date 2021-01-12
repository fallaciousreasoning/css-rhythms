import fs from 'fs/promises';
import { Css } from './css-generator';
import { sides, spaceTypes, UtilityConfig } from './utilityConfig';

const loadConfig = (filename: string) => fs.readFile(filename).then(b => b.toString('utf-8')).then(text => JSON.parse(text)) as Promise<UtilityConfig>;

const run = async () => {
    const config = await loadConfig("config.json");
    const generator = new Css({ write: console.log });
    config.breakpoints[''] = 0;

    for (const breakpoint in config.breakpoints) {
        const breakpointSize = config.breakpoints[breakpoint];
        generator.beginBreakpoint(breakpoint, breakpointSize);

        for (const spaceType of spaceTypes) {
            generator.writeStartSpacing(spaceType);
            for (const spacing of config.spacing) {
                for (const side of sides) {
                    generator.writeStartSide(side);
                    generator.writeValue(spacing);
                    generator.endBlock();
                }
            }
            generator.endBlock();
        }
        generator.endBlock();
    }

}

run();