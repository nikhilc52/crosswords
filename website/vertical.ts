const white_boxes = document.querySelectorAll<HTMLElement>("div.white-box");
const black_boxes = document.querySelectorAll<HTMLElement>("div.black-box");
const scroll_elements = document.querySelectorAll<HTMLElement>("div.scroll");

const element_style_map = new Map()

white_boxes.forEach(function (element) {
    const left = element.style.left + '';
    const top = element.style.top + '';
    element_style_map.set(element, [left, top]);
});

black_boxes.forEach(function (element) {
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
    if (!(window.innerWidth > 500 && (window.innerWidth / window.innerHeight < 3.33) && (window.innerWidth / window.innerHeight > 1.62))) {
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
                element.style.marginBottom = '2vh'
            }
            element.style.top = ((parseInt(element.id) - 1) * 90) + "vh";
        });

        scroll_elements.forEach(function (element) {
            element.style.left = "0vh";
            element.style.backgroundColor = "rgb(200,200,200)";
        });

        const spacing_elem = document.getElementById("spacing")
        spacing_elem!.style.visibility = "hidden"
        spacing_elem!.style.left = "0vh"
        spacing_elem!.style.width = "0vh";

        window.scrollTo({
            // scrollWidth is the total screen size including scrolling
            // innerWidth is the window size
            // goes halfway for centering
            top: 0,
            left: (document.documentElement.scrollWidth - window.innerWidth) / 2,
            behavior: "instant"
        });
        hideSnapScrolling()
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

        const spacing_elem = document.getElementById("spacing")
        spacing_elem!.style.visibility = "visible"
        spacing_elem!.style.left = "1658vh"
        spacing_elem!.style.width = "100vh"

        enableSnapScrolling()
    }
}

window.onresize = function () {
    if (window.innerWidth != prev_width) {
        prev_width = window.innerWidth
        vertical_check();
        check_highlights();
        check_minimap();
    }
}






