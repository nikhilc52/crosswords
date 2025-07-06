// adapted from https://www.30secondsofcode.org/js/s/element-is-visible-in-viewport/
// if the element is fully visible
function elementIsVisibleInViewport(el) {
    const { top, left, bottom, right } = el.getBoundingClientRect();
    const { innerHeight, innerWidth } = window;
    return top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
};

// if the element is fully hidden
function elementIsFullyHiddenInViewport(el) {
    const { top, left, bottom, right } = el.getBoundingClientRect();
    const { innerHeight, innerWidth } = window;
    return !((top > 0 && top < innerHeight) ||
        (bottom > 0 && bottom < innerHeight)) &&
        ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
};

// dictionary of image ID's as keys, values are [gif filename, still image filename, 
// boolean value to see if the image is currently showing a still image]
// playing a GIF once is done with photoshop settings
element_dict = {
    "unique-pie-chart": ["percent_unique_pie_e.gif", "percent_unique_pie_e1.png", true],
    "heatmap-animation": ["heatmap_animation_e.gif", "heatmap_animation_e1.png", true],
    "common-answers-bar": ["common_answers_e.gif", "answer_barplot_e.png", true],
    "common-answers-pie": ["frequency_by_day.gif", "frequency_by_day.png", true]
}

document.addEventListener('wheel', (e) => {
    for (var key of Object.keys(element_dict)) {
        const elem = document.getElementById(key);
        // if the element is visible and it is showing a still image
        if (elementIsVisibleInViewport(elem) && element_dict[key][2]) {
            // show the GIF, and change the bool to indicate the change
            elem.src = '../analysis/images/' + element_dict[key][0]
            element_dict[key][2] = false
        }
        // if it is fully hidden
        else if (elementIsFullyHiddenInViewport(elem)) {
            // change to a still image, indicate the change
            elem.src = '../analysis/images/' + element_dict[key][1]
            element_dict[key][2] = true
        }
    }
});