export const sides = ['top', 'bottom', 'left', 'right'] as const;
export const spaceTypes = ['margin', 'padding'] as const;
export const colorTypes = ['border-color', 'color', 'background-color'] as const;

export type Side = typeof sides[number];
export type SpaceType = typeof spaceTypes[number];
export type Aliases = { [key: string]: string }

type Spacing<T extends string> = `${T}` | `${T}-${Side}`;
type CssProperty = Spacing<SpaceType>;
type Points = 'breakpoints' | 'spacings' | 'colors';


export interface UtilityConfig {
    spacing: number[];
    breakpoints: {
        [name: string]: number;
    },
    colors: {
        [name: string]: string;
    }
    aliases: Aliases;
}