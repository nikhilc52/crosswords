// map of highlight elements as keys, values are booleans to see if the highlight is displayed
const highlight_list = new Map(Array.from(document.getElementsByClassName('highlight')).map(value => [value, false]))

function check_highlights() {
    for (const key of highlight_list.keys()) {
        // if the element is visible and it is not 
        if (elementIsVisibleInViewport(key) && !(highlight_list.get(key))) {
            // show the highlight, and change the bool to indicate the change
            key.classList.add('highlight-animation')
            highlight_list.set(key, true)
        }
        // if it is fully hidden
        else if (elementIsFullyHiddenInViewport(key)) {
            // change to hidden, indicate the change
            key.classList.remove('highlight-animation')
            highlight_list.set(key, false)
        }
    }
}

document.addEventListener('wheel', (e) => {
    check_highlights()
});