import { Side, SpaceType } from "./utilityConfig";

export default interface CssGenerator {
    beginBreakpoint: (name: string, size: number) => void;
    writeStartSpacing: (spacing: SpaceType) => void;
    writeStartSide: (side: Side) => void;
    writeValue: (space: number) => void;

    endBlock: () => void;
}