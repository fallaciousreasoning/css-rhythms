import { Side, SpaceType } from "./utilityConfig";

export const joinParts = (...args: string[]) => args.join('-');

export default interface CssGenerator {
    beginBreakpoint: (name: string, size: number) => void;
    writeStartClass: (...nameParts: string[]) => void;
    writeValue: (propertyName: string, value: string) => void;

    endBlock: () => void;
}