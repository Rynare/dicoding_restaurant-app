import { Controller } from "../app/controller/Controller.js";
import UrlParser from "./url-parser";
import UrlPatternExtractor from "./url-pattern-extractor";
import { routes } from "./web.js";

const route = (event) => {
    event = event || window.event;
    const nextUrl = new URL(event.currentTarget.href);
    const currentUrl = window.location;
    window.history.pushState({}, "", currentUrl.host === nextUrl.host ? nextUrl.href : currentUrl.href);
    if ((currentUrl.host === nextUrl.host) && (nextUrl.pathname !== currentUrl.pathname)) {
        event.preventDefault();
        handleLocation();
    }
};

function router(urlPattern, controller) {
    urlPattern = isNaN(+urlPattern) ? urlPattern : `/${urlPattern}`

    return {
        pattern: urlPattern,
        startWith: UrlPatternExtractor.startWith(urlPattern),
        request: {
            segment: UrlParser.urlSplitter(urlPattern),
            parameter: UrlPatternExtractor.getParameter(urlPattern)
        },
        action: controller
    }
}

function goto(routes, controller) {
    if (!(controller instanceof Controller)) {
        throw new Error("Parameter kedua harus merupakan instance dari MainClass atau turunannya.");
    }
}

const handleLocation = async () => {
    const path = window.location.pathname;
    let route = path == '' ? routes['/'] : routes[404];
    let doAction = null

    if (path.includes(':') && routes[path]) {
        route = routes[path]
    } else {
        const pathSplit = UrlParser.urlSplitter(path)
        // mencari rute dengan mencocokkan awalan pattern dengan awalan url, dan berdasarkan panjang segmen url & segmen pattern
        let filteredRoutes = routes.filter(cursor => path.startsWith(cursor.startWith) && pathSplit.length === +cursor.request.segment.length)

        // Jika rute ketemu 1 maka langsung dieksekusi
        if (filteredRoutes.length == 1) {
            doAction = filteredRoutes[0].action
        } else {
            // Jika rute ketemu 2 maka difilter lagi
            if (filteredRoutes.length >= 2) {
                filteredRoutes = routes.filter(cursor => compareUrlWithPattern(path, cursor.pattern))
                doAction = filteredRoutes[0].action

                // Jika tetap 2 maka throw error
                if (filteredRoutes.length >= 2) {
                    throw new Error('Multiple matching routes found.');
                }
            } else {
                // Jika rute tidak ada maka throw error
                throw new Error('Route not found.');
            }
        }
    }

    if (typeof doAction === 'function' || doAction instanceof Controller) {
        doAction()
    } else {
        throw new Error("Harus berupa function");
    }
};

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

export { router, route }