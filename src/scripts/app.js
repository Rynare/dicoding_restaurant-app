import 'regenerator-runtime'; /* for async await transpile */

document.addEventListener('DOMContentLoaded', () => {
    buildApp()
})

function buildApp() {
    listenDrawer();
    listenTabIndex();
}

function listenTabIndex() {
    document.addEventListener('keydown', function (event) {
        const activeElement = document.activeElement;
        const isEditable = activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA';
        if (activeElement === event.target && isElementVisible(activeElement)) {
            if (
                (event.keyCode === 13 || event.keyCode === 32)
                && activeElement.tabIndex >= 0 && !isEditable
            ) {
                event.preventDefault()
                event.target.click();
            }
        }
    })
}

function listenDrawer() {
    const hamburger_btn = document.querySelector('.hamburger-btn');
    const drawer = document.querySelector('#app aside');

    const toggle = (event) => {
        event.stopPropagation();

        if (!event.target.closest('#app aside')) {
            drawer.classList.toggle('active');
            drawer.classList.contains('active')
                ? document.addEventListener('click', toggle)
                : document.removeEventListener('click', toggle);
        }
    };

    hamburger_btn.addEventListener('click', toggle);
}

function isElementVisible(el) {
    var rect = el.getBoundingClientRect();
    var isVisible = (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );

    var computedStyle = window.getComputedStyle(el);
    if (
        computedStyle.getPropertyValue('visibility') === 'hidden' ||
        computedStyle.getPropertyValue('display') === 'none' ||
        computedStyle.getPropertyValue('opacity') === '0'
    ) {
        isVisible = false;
    }

    return isVisible;
}
