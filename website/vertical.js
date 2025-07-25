var white_boxes = document.querySelectorAll("div.white-box");
var black_boxes = document.querySelectorAll("div.black-box");
var scroll_elements = document.querySelectorAll("div.scroll");
var prev_width;
var prev_formatting_is_desktop = (window.innerWidth > 500) && (window.innerWidth / window.innerHeight < 3.33) && (window.innerWidth / window.innerHeight > 1.62);
var minimap = document.getElementById("minimap");
var minimap_annotation = document.getElementById("minimap-annotation");
var minimap_annotation_path = document.getElementById("minimap-annotation-path");
var element_style_map = new Map();
white_boxes.forEach(function (element) {
    var left = element.style.left + '';
    var top = element.style.top + '';
    element_style_map.set(element, [left, top]);
});
black_boxes.forEach(function (element) {
    var left = element.style.left + '';
    var top = element.style.top + '';
    element_style_map.set(element, [left, top]);
});
scroll_elements.forEach(function (element) {
    var left = element.style.left + '';
    var top = element.style.top + '';
    var color = element.style.backgroundColor + '';
    element_style_map.set(element, [left, top, color]);
});
function vertical_check() {
    if (!is_desktop_formatting) {
        white_boxes.forEach(function (element) {
            if (window.innerHeight * 0.9 > window.innerWidth) {
                element.style.left = "0vh";
                element.style.transform = "";
            }
            else {
                element.style.left = "50%";
                element.style.transform = "translate(-50%,0%)";
            }
            element.style.top = ((parseInt(element.id) - 1) * 90) + 2 + "vh";
        });
        black_boxes.forEach(function (element) {
            if (window.innerHeight * 0.9 > window.innerWidth) {
                element.style.left = "0vh";
                element.style.transform = "";
            }
            else {
                element.style.left = "50%";
                element.style.transform = "translate(-50%,0%)";
            }
            if (element.id === "35.0") {
                element.style.marginBottom = '2vh';
            }
            element.style.top = ((parseInt(element.id) - 1) * 90) + 2 + "vh";
        });
        scroll_elements.forEach(function (element) {
            element.style.left = "0vh";
            element.style.backgroundColor = "rgb(200,200,200)";
        });
        var spacing_elem = document.getElementById("spacing");
        spacing_elem.style.visibility = "hidden";
        spacing_elem.style.left = "0vh";
        spacing_elem.style.width = "0vh";
        window.scrollTo({
            // scrollWidth is the total screen size including scrolling
            // innerWidth is the window size
            // goes halfway for centering
            top: 0,
            left: (document.documentElement.scrollWidth - window.innerWidth) / 2,
            behavior: "instant"
        });
        hideSnapScrolling();
    }
    else {
        white_boxes.forEach(function (element) {
            element.style.left = element_style_map.get(element)[0];
            element.style.top = element_style_map.get(element)[1];
            element.style.transform = "";
        });
        black_boxes.forEach(function (element) {
            element.style.left = element_style_map.get(element)[0];
            element.style.top = element_style_map.get(element)[1];
            element.style.transform = "";
        });
        scroll_elements.forEach(function (element) {
            element.style.left = element_style_map.get(element)[0];
            element.style.top = element_style_map.get(element)[1];
            element.style.backgroundColor = element_style_map.get(element)[2];
        });
        var spacing_elem = document.getElementById("spacing");
        spacing_elem.style.visibility = "visible";
        spacing_elem.style.left = "1658vh";
        spacing_elem.style.width = "100vh";
        enableSnapScrolling();
    }
}
window.onresize = function () {
    //workaround for iOS scrolling
    if (Math.abs(prev_width - window.innerWidth) !== 0 && prev_formatting_is_desktop) {
        is_desktop_formatting = (window.innerWidth > 500) && (window.innerWidth / window.innerHeight < 3.33) && (window.innerWidth / window.innerHeight > 1.62);
        prev_width = window.innerWidth;
        vertical_check();
        check_highlights();
        minimap.style.visibility = 'hidden';
        minimap_annotation.style.visibility = 'hidden';
        minimap_annotation_path.style.visibility = 'hidden';
        check_minimap();
        prev_formatting_is_desktop = is_desktop_formatting;
    }
};
document.addEventListener("DOMContentLoaded", function (event) {
    prev_width = window.innerWidth;
    console.log("DOM fully loaded and parsed");
    vertical_check();
});
