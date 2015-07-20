// LICENSE : MIT
"use strict";
import seco from "seco"
export function formatVideoTime(seconds) {
    var se = seco(Math.round(seconds));
    if (seconds < 60) {
        return se.s + "s";
    }
    if (seconds < 60 * 60) {
        return se.m + "m" + se.s + "s";
    }
    return se.h + "h" + se.m + "m" + se.s + "s";
}