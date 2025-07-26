const white_boxes = document.querySelectorAll<HTMLElement>("div.white-box");
const black_boxes = document.querySelectorAll<HTMLElement>("div.black-box");
const scroll_elements = document.querySelectorAll<HTMLElement>("div.scroll");
var prev_width: number;
var prev_formatting_is_desktop = (window.innerWidth > 500) && (window.innerWidth / window.innerHeight < 3.33) && (window.innerWidth / window.innerHeight > 1.62);

const element_style_map = new Map()

const combined_box_list = (Array.from(white_boxes)).concat(Array.from(black_boxes))

// maps to obtain original element styles for resetting
combined_box_list.forEach(function (element) {
    const left = element.style.left + '';
    const top = element.style.top + '';
    element_style_map.set(element, [left, top]);
});

scroll_elements.forEach(function (element) {
    const left = element.style.left + '';
    const top = element.style.top + '';
    const color = element.style.backgroundColor + '';
    element_style_map.set(element, [left, top, color]);
});

function vertical_check() {
    if (!is_desktop_formatting) {
        combined_box_list.forEach(function (element) {
            // if the boxes will run off the width of the page, make them the left most edge
            if (window.innerHeight * 0.9 > window.innerWidth) {
                element.style.left = "0vh";
                element.style.transform = "";
            }
            else {
                element.style.left = "50%";
                element.style.transform = "translate(-50%,0%)";
            }
            element.style.top = ((parseInt(element.id) - 1) * 90) + 2 + "vh";

            if (element.id === "35.0") {
                element.style.marginBottom = '2vh'
            }
        });

        scroll_elements.forEach(function (element) {
            element.style.left = "0vh";
            element.style.backgroundColor = "rgb(200,200,200)";
        });

        // spacing element for scrolling, don't need anymore
        const spacing_elem = document.getElementById("spacing")
        spacing_elem!.style.visibility = "hidden"
        spacing_elem!.style.left = "0vh"
        spacing_elem!.style.width = "0vh";

        window.scrollTo({
            top: 0,
            left: (document.documentElement.scrollWidth - window.innerWidth) / 2,
            behavior: "instant"
        });
        // non-snap scrolling on mobile screens
        hideSnapScrolling()
    }
    else {
        // reset all the positions to their original states
        combined_box_list.forEach(function (element) {
            element.style.left = element_style_map.get(element)[0];
            element.style.top = element_style_map.get(element)[1];
            element.style.transform = "";
        });

        scroll_elements.forEach(function (element) {
            element.style.left = element_style_map.get(element)[0];
            element.style.top = element_style_map.get(element)[1];
            element.style.backgroundColor = element_style_map.get(element)[2];
        });

        const spacing_elem = document.getElementById("spacing")
        spacing_elem!.style.visibility = "visible"
        spacing_elem!.style.left = "1658vh"
        spacing_elem!.style.width = "100vh"

        enableSnapScrolling()
    }
}

window.onresize = function () {
    //workaround for iOS scrolling, only resizes if the width changes and from desktop view
    if (Math.abs(prev_width - window.innerWidth) !== 0 && prev_formatting_is_desktop) {
        is_desktop_formatting = (window.innerWidth > 500) && (window.innerWidth / window.innerHeight < 3.33) && (window.innerWidth / window.innerHeight > 1.62);
        prev_width = window.innerWidth
        vertical_check();
        check_highlights();
        
        check_minimap();
        prev_formatting_is_desktop = is_desktop_formatting
    }
}

document.addEventListener("DOMContentLoaded", () => {
    prev_width = window.innerWidth;
    vertical_check();
});




