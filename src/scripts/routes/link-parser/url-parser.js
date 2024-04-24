const UrlParser = {
    urlSplitter: (url) => {
        const urlSplits = url.split('/').filter(segment => segment !== '');
        const result = urlSplits[0] == '#' ? urlSplits.slice(1) : urlSplits
        return result;
    },
};

export default UrlParser;