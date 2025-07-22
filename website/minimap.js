var minimap_elements = document.querySelectorAll("div.black-box, div.white-box");
minimap = document.getElementById("minimap-image")

// adapted from https://www.30secondsofcode.org/js/s/element-is-visible-in-viewport/
// if the element is partially visible
function elementIsPartlyVisibleInViewport(el) {
    const { top, left, bottom, right } = el.getBoundingClientRect();
    const { innerHeight, innerWidth } = window;
    return ((top > 0 && top < innerHeight) ||
        (bottom > 0 && bottom < innerHeight)) &&
        ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
};

document.addEventListener('wheel', (event) => {
    minimap_elements.forEach(function (element) {
        if (elementIsPartlyVisibleInViewport(element)) {
            minimap.src = '../illustrator/minimap/' + parseInt(element.id) + '.svg'
        }
    });
});