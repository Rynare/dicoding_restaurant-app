import UrlParser from "./url-parser.js";

const UrlPatternExtractor = {
    startWith: (url) => {
        // Mencari tanda ':'
        const colonIndex = url.indexOf(':');
        // Mengubah kursor -1 index dari tanda ':'
        if (colonIndex === -1) {
            return url;
        }
        // Potongan url pada cursor
        let firstUrl = url.substring(0, colonIndex);

        return firstUrl;
    },

    getParameter: (url) => {
        const urlSplits = UrlParser.urlSplitter(url);
        const parameters = urlSplits.filter(segment => segment.startsWith(':')).map(parameter => parameter.substring(1));
        return parameters;
    },
};

export default UrlPatternExtractor;