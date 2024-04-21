async function view(viewName = '') {
    const html = await fetchViewAsHtml(viewName);
    document.querySelector('#app-content').innerHTML = html;
    console.log('view')
}

async function fetchViewAsHtml(viewName = '') {
    const trimmedViewName = viewName.trim();
    const viewsDir = trimmedViewName.startsWith('/') ? './views' : './views/'; //! relative ke-folder dist
    const viewPath = `${viewsDir}${viewName}`;

    try {
        const response = await fetch(viewPath);
        if (!response.ok) {
            throw new Error(`View tidak ditemukan: ${response.statusText}`);
        }
        return await response.text();
    } catch (error) {
        console.error('Error mendapatkan view:', error);
        throw error;
    }
}

export { view, fetchViewAsHtml };