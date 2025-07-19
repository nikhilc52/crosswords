// dictionary of image ID's as keys, values are booleans to see if the highlight is displayed
const highlight_dict = {
    "1": false,
    "2": false
}

document.addEventListener('wheel', (e) => {
    for (const key of Object.keys(highlight_dict)) {
        const elem = document.getElementById(key);
        // if the element is visible and it is not 
        if (elementIsVisibleInViewport(elem) && !(highlight_dict[key])) {
            // show the highlight, and change the bool to indicate the change
            elem.classList.add('highlight-animation')
            highlight_dict[key] = true
        }
        // if it is fully hidden
        else if (elementIsFullyHiddenInViewport(elem)) {
            // change to hidden, indicate the change
            elem.classList.remove('highlight-animation')
            highlight_dict[key] = false
        }
    }
});