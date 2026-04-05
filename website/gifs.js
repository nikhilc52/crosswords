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
    return !(((top > 0 && top < innerHeight) ||
        (bottom > 0 && bottom < innerHeight)) &&
        ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth)))
};

// dictionary of image ID's as keys, values are [gif filename, still image filename, 
// boolean value to see if the image is currently showing a still image]
// playing a GIF once is done with photoshop settings
const element_dict = {
    "unique-pie-chart": ["percent_unique_pie_e.webp", "percent_unique_pie_e1.webp", true],
    "heatmap-animation": ["heatmap_animation_e.webp", "heatmap_animation_e1.webp", true],
    "common-answers-bar": ["common_answers_e.webp", "answer_barplot_e.webp", true],
    "common-answers-pie": ["frequency_by_day.webp", "frequency_by_day_1.webp", true],
    "ttr-line": ["ttr_year_e.webp", "ttr_year.webp", true],
    "clue-pair": ["clue_frequency_pair.webp", "clue_frequency_pair_1.webp", true],
    "clue-length-img": ["clue_length_e.webp", "clue_length_e1.webp", true],
    "bracket-answer": ["brackets_answer_frequency_e.webp", "brackets_answer_frequency_e1.webp", true],
    "quote-answer": ["quote_answer_frequency_e.webp", "quote_answer_frequency_e1.webp", true],
    "adele": ["adele_e.webp", "adele_e2.webp", true],
    "serena": ["serena.webp", "serena_e1.webp", true]
}

function check_gifs() {
    for (const key of Object.keys(element_dict)) {
        const elem = document.getElementById(key);
        // if the element is visible and it is showing a still image
        if ((is_desktop_formatting ? elementIsVisibleInViewport(elem) : elementIsVerticallyPartlyVisibleInViewport(elem)) && element_dict[key][2]) {
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
}

['wheel','touchmove'].forEach(evt => document.addEventListener(evt, check_gifs));