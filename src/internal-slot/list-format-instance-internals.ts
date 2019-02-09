import {Locale} from "../locale/locale";
import {Type} from "../type/type";
import {Style} from "../style/style";
import {ListFormat} from "../list-format/list-format";

export interface ListFormatInstanceInternals {
	initializedListFormat: ListFormat;
	locale: Locale;
	type: Type;
	style: Style;
	templatePair: string;
	templateStart: string;
	templateMiddle: string;
	templateEnd: string;
}
