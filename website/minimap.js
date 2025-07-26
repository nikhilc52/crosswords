var minimap_elements = document.querySelectorAll("div.black-box, div.white-box");
minimap_image = document.getElementById("minimap-image")
minimap_annotation_image = document.getElementById("minimap-annotation-image")
minimap_annotation_path_image = document.getElementById("minimap-annotation-path-image")

// adapted from https://www.30secondsofcode.org/js/s/element-is-visible-in-viewport/
// if the element is partially visible
function elementIsVerticallyPartlyVisibleInViewport(el) {
    const { top, left, bottom, right } = el.getBoundingClientRect();
    const { innerHeight, innerWidth } = window;
    return ((top > 0 && top < innerHeight) ||
        (bottom > 0 && bottom < innerHeight))
};

function elementIsPartlyVisibleInViewport(el) {
    const { top, left, bottom, right } = el.getBoundingClientRect();
    const { innerHeight, innerWidth } = window;
    return (((top > 0 && top < innerHeight) ||
        (bottom > 0 && bottom < innerHeight)) &&
        ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth)))
};


function check_minimap() {
    if (!is_desktop_formatting) {
        minimap_annotation_image.src = '../illustrator/minimap_annotation_mobile.svg'
        minimap_annotation_path_image.src = '../illustrator/minimap_annotation_mobile_path.svg'
        minimap_image.style.height = "80vh";

        minimap_annotation_image.style.height = "85vh";
        minimap_annotation_path_image.style.height = "85vh";
        minimap_annotation_image.style.bottom = '5vh';
        minimap_annotation_path_image.style.bottom = '5vh';
        minimap_annotation_image.style.right = '3.5vh';
        minimap_annotation_path_image.style.right = '3.5vh';
        minimap_loop('../illustrator/minimap_mobile/')
    }
    else {
        minimap_annotation_image.src = '../illustrator/minimap_annotation.svg'
        minimap_annotation_path_image.src = '../illustrator/minimap_annotation_path.svg'
        minimap_image.style.height = "11vh";

        minimap_annotation_image.style.height = "25vh";
        minimap_annotation_path_image.style.height = "25vh";
        minimap_loop('../illustrator/minimap/')
    }
}

function minimap_loop(directory) {
    minimap_elements.forEach(function (element) {
        if (is_desktop_formatting ? elementIsPartlyVisibleInViewport(element) : elementIsVerticallyPartlyVisibleInViewport(element)) {
            minimap_image.src = directory + parseInt(element.id) + '.svg'
        }
    });
}

['wheel', 'touchmove'].forEach(evt => document.addEventListener(evt, check_minimap));

check_minimap()