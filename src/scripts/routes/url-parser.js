const UrlParser = {
    urlSplitter: (url) => {
        const urlSplits = url.split('/').filter(segment => segment !== '');
        return urlSplits;
    },
};

export default UrlParser;