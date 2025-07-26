var snap_scrolling_disabled = false
const snap_scrolling_element = document.getElementById('snap-scrolling-image')
const snap_scrolling_annotation = document.getElementById('snap-scrolling-annotation-image')
const snap_scrolling_annotation_path = document.getElementById('snap-scrolling-annotation-image-path')

document.getElementById('snap-scrolling').addEventListener('click', (event) => {
    snap_scrolling_disabled ? enableSnapScrolling() : disableSnapScrolling()
});

function enableSnapScrolling() {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant"
    });
    document.body.style.overflowX = 'auto' //allow horizontal scroll
    document.body.style.overflowY = 'hidden' //disallow vertical scroll
    snap_scrolling_element.src = '../illustrator/snap_scroll_disable.svg'
    snap_scrolling_disabled = false
    if (is_fully_loaded) {
        snap_scrolling_element.style.display = 'block'
        snap_scrolling_annotation.style.display = 'block'
        snap_scrolling_annotation_path.style.display = 'block'
    }
    check_highlights()
}

function disableSnapScrolling() {
    document.body.style.overflowX = 'auto' //allow horizontal scroll
    document.body.style.overflowY = 'auto' //allow vertical scroll
    snap_scrolling_element.src = '../illustrator/snap_scroll_enable.svg'
    snap_scrolling_disabled = true
}

function hideSnapScrolling() {
    snap_scrolling_element.style.display = 'none'
    snap_scrolling_annotation.style.display = 'none'
    snap_scrolling_annotation_path.style.display = 'none'
}