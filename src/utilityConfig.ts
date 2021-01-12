export const sides = ['top', 'bottom', 'left', 'right'] as const;
export const spaceTypes = ['margin', 'padding'] as const;

export type Side = typeof sides[number];
export type SpaceType = typeof spaceTypes[number];

type Spacing<T extends string> = `${T}` | `${T}-${Side}`;
type CssProperty = Spacing<SpaceType>;
type Points = 'breakpoints' | 'spacings' | 'colors';


export interface UtilityConfig {
    spacing: number[];
    breakpoints: {
        [name: string]: number;
    }
    properties: { [P in CssProperty]?: string }
}