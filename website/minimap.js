var minimap_elements = document.querySelectorAll("div.black-box, div.white-box");
minimap_image = document.getElementById("minimap-image")
minimap_annotation_image = document.getElementById("minimap-annotation-image")
minimap_annotation_image_path = document.getElementById("minimap-annotation-image-path")
minimap = document.getElementById("minimap")
minimap_annotation = document.getElementById("minimap-annotation")
minimap_annotation_path = document.getElementById("minimap-annotation-path")


// adapted from https://www.30secondsofcode.org/js/s/element-is-visible-in-viewport/
// if the element is partially visible
function elementIsPartlyVisibleInViewport(el) {
    const { top, left, bottom, right } = el.getBoundingClientRect();
    const { innerHeight, innerWidth } = window;
    return ((top > 0 && top < innerHeight) ||
        (bottom > 0 && bottom < innerHeight)) &&
        ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
};

function check_minimap() {
    if (!(window.innerWidth > 500 && (window.innerWidth / window.innerHeight < 3.33) && (window.innerWidth / window.innerHeight > 1.62))) {
        minimap.style.bottom = "9vh";
        minimap.style.right = "0vh";
        minimap_image.style.height = "80vh";

        minimap_annotation.style.bottom = "7vh";
        minimap_annotation.style.right = "-0.5vh";
        minimap_annotation_path.style.bottom = "7vh";
        minimap_annotation_path.style.right = "-0.5vh";
        minimap_annotation_image.style.height = "85vh";
        minimap_annotation_image.src = '../illustrator/minimap_annotation_mobile.svg'
        minimap_annotation_image_path.style.height = "85vh";
        minimap_annotation_image_path.src = '../illustrator/minimap_annotation_mobile_path.svg'
        minimap_loop('../illustrator/minimap_mobile/')
    }
    else {
        minimap.style.bottom = "5vh";
        minimap.style.right = "5vh";
        minimap_image.style.height = "15vh";

        minimap_annotation.style.bottom = "-3.5vh";
        minimap_annotation.style.right = "2.5vh";
        minimap_annotation_path.style.bottom = "-3.5vh";
        minimap_annotation_path.style.right = "2.5vh";
        minimap_annotation_image.style.height = "33vh";
        minimap_annotation_image.src = '../illustrator/minimap_annotation.svg'
        minimap_annotation_image_path.style.height = "33vh";
        minimap_annotation_image_path.src = '../illustrator/minimap_annotation_path.svg'
        minimap_loop('../illustrator/minimap/')
    }
}

function minimap_loop(directory) {
    minimap_elements.forEach(function (element) {
        if (elementIsPartlyVisibleInViewport(element)) {
            minimap_image.src = directory + parseInt(element.id) + '.svg'
        }
    });
}

document.addEventListener('wheel', (event) => {
    check_minimap()
});

