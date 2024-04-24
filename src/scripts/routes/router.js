import { Controller } from "../app/controller/Controller.js";
import UrlParser from "./link-parser/url-parser.js";
import UrlPatternExtractor from "./link-parser/url-pattern-extractor.js";

function router(urlPattern, controller) {
    urlPattern = isNaN(+urlPattern) ? urlPattern : `/${urlPattern}`
    const isArray = Array.isArray(controller)
    const isController = isArray ? controller[0] instanceof Controller : false
    controller = isController ? callMethod(controller) : controller

    if (typeof controller !== 'function') {
        throw new Error("router harus memiliki 'function' atau 'Controller'");
    }

    return {
        pattern: urlPattern,
        startWith: UrlPatternExtractor.startWith(urlPattern),
        request: {
            segment: UrlParser.urlSplitter(urlPattern),
            parameter: Object.entries(UrlPatternExtractor.getPatternParameter(urlPattern)),
            putParameter: () => {
                const patternParameter = UrlPatternExtractor.getPatternParameter(urlPattern)
                const urlParameter = {}
                const urlPath = UrlParser.urlSplitter(window.location.hash)

                Object.entries(patternParameter).forEach(([key, value]) => {
                    urlParameter[value] = urlPath[+key];
                });

                Controller.putRequestParameter(urlParameter)
            }
        },
        action: controller
    }
}

function goto(routes, controller) {
    if (!(controller instanceof Controller)) {
        throw new Error("Parameter kedua harus merupakan instance dari MainClass atau turunannya.");
    }
}

function callMethod([instance, methodName]) {
    // Memanggil metode dengan menggunakan string nama metode
    if (typeof instance[methodName] === 'function') {
        return () => instance[methodName]();
    } else {
        throw new Error(`Metode '${methodName}' tidak ditemukan`);
    }
}

function compareUrlWithPattern(url, pattern) {
    const urlSegments = UrlParser.urlSplitter(url);
    const patternSegments = UrlParser.urlSplitter(pattern);

    if (urlSegments.length !== patternSegments.length) {
        return false;
    }

    // Cek setiap segment
    for (let i = 0; i < patternSegments.length; i++) {
        const patternSegment = patternSegments[i];
        const urlSegment = urlSegments[i];

        // jika merupakan segment parameter adalah parameter maka di-skip
        if (patternSegment.startsWith(':')) {
            continue;
        }

        if (patternSegment !== urlSegment) {
            return false;
        }
    }

    return true;
}

export { router, compareUrlWithPattern }