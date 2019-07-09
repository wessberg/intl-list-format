import {ElementOf} from "../util/element-of";

export const TYPE = ["conjunction", "disjunction", "unit"] as const;

export type Type = ElementOf<typeof TYPE>;
