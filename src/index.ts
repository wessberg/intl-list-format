import {SUPPORTS_LIST_FORMAT} from "./support/supports-relative-time-format";
import {patch} from "./patch/patch";

if (!SUPPORTS_LIST_FORMAT) {
	patch();
}
