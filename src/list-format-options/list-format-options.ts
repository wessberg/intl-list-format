import {Type} from "../type/type";
import {Style} from "../style/style";
import {LocaleMatcher} from "../locale-matcher/locale-matcher";

export interface ListFormatOptions {
	type: Type;
	style: Style;
	localeMatcher: LocaleMatcher;
}