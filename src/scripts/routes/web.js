const routes = {
    '/': 'home.html',
    '/': 'home.html',
    '/': 'home.html',
    '/': 'home.html',
}

function view(viewName) {
    const viewsDir = path.join(__dirname, './views/'); //! relative ke-folder dist
    const viewPath = path.join(viewsDir, viewName);
    return viewPath;
}

export { routes, view }