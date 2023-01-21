/**
 * @description converts hex to rgba colors
 * @param hex hex string
 * @param opacity desired opacity
 * @returns rgba(color, opacity)
 */
export const hexToRgba = (hex: string, opacity: number) => {
    let c: any;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split("");
        if (c.length == 3) {
            c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c = "0x" + c.join("");
        return (
            "rgba(" +
            [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") +
            `,${opacity})`
        );
    }
    throw new Error("Bad Hex");
};

/**
 * @description converts rgba to hex colors
 * @param color rgba string
 * @returns hex #color
 */
export function rgbaToHex(color: any) {
    var values = color
        .replace(/rgba?\(/, "")
        .replace(/\)/, "")
        .replace(/[\s+]/g, "")
        .split(",");
    var a = parseFloat(values[3] || 1),
        r = Math.floor(a * parseInt(values[0]) + (1 - a) * 255),
        g = Math.floor(a * parseInt(values[1]) + (1 - a) * 255),
        b = Math.floor(a * parseInt(values[2]) + (1 - a) * 255);
    return (
        "#" +
        ("0" + r.toString(16)).slice(-2) +
        ("0" + g.toString(16)).slice(-2) +
        ("0" + b.toString(16)).slice(-2)
    );
}

/**
 * @description ensures that foreground/background colors provide sufficient contrast
 * @param bgColor background color
 * @param lightColor color to use as light contrast
 * @param darkColor color to use as dark contrast
 * @example pickTextColorBasedOnBgColorSimple(color, '#FFFFFF', '#000000');
 * @returns hex #color
 */
export function pickTextColorBasedOnBgColorSimple(bgColor, lightColor, darkColor) {
    let _bgColor;
    if (typeof bgColor === "string") {
        _bgColor = bgColor;
    } else if (typeof bgColor === "object") {
        _bgColor = bgColor.hexValue;
    }

    var color = (_bgColor.charAt(0) === '#') ? _bgColor.substring(1, 7) : _bgColor;
    var r = parseInt(color.substring(0, 2), 16); // hexToR
    var g = parseInt(color.substring(2, 4), 16); // hexToG
    var b = parseInt(color.substring(4, 6), 16); // hexToB
    return (((r * 0.299) + (g * 0.587) + (b * 0.114)) > 186) ?
        darkColor : lightColor;
}