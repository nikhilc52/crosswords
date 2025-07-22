var white_boxes = document.querySelectorAll("div.white-box");
var black_boxes = document.querySelectorAll("div.black-box");
var scroll_elements = document.querySelectorAll("div.scroll");
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
    if (!(window.innerWidth > 500 && (window.innerWidth / window.innerHeight < 3.33) && (window.innerWidth / window.innerHeight > 1.62))) {
        white_boxes.forEach(function (element) {
            element.style.left = 0.5 * window.innerWidth + "px";
            element.style.top = ((parseInt(element.id) - 1) * 90) + 2 + "vh";
        });
        black_boxes.forEach(function (element) {
            element.style.left = "50%";
            if (element.id === "35.0") {
                element.style.marginBottom = '2vh';
            }
            element.style.top = ((parseInt(element.id) - 1) * 90) + "vh";
        });
        scroll_elements.forEach(function (element) {
            element.style.left = "0vh";
            element.style.backgroundColor = "rgb(200,200,200)";
        });
    }
    else {
        white_boxes.forEach(function (element) {
            element.style.left = element_style_map.get(element)[0];
            element.style.top = element_style_map.get(element)[1];
        });
        black_boxes.forEach(function (element) {
            element.style.left = element_style_map.get(element)[0];
            element.style.top = element_style_map.get(element)[1];
        });
        scroll_elements.forEach(function (element) {
            element.style.left = element_style_map.get(element)[0];
            element.style.top = element_style_map.get(element)[1];
            element.style.backgroundColor = element_style_map.get(element)[2];
        });
    }
    // document.getElementById('1.0')!.scrollTo({ 'behavior': 'instant' })
}
window.onresize = vertical_check;
vertical_check();
