var scroll_reduction_factor = 5 //20% scroll speed

function horizontalScrollOnly(e) {
    document.documentElement.scrollLeft += e.deltaY/scroll_reduction_factor; //scroll left if scrolling down]
    document.body.style.overflowX = 'auto' //allow horizontal scroll
    document.body.style.overflowY = 'hidden' //disallow vertical scroll
}

window.onload = function () {
    document.body.style.overflowX = 'auto' //allow horizontal scroll
    document.body.style.overflowY = 'hidden' //disallow vertical scroll
}

function verticalScrollOnly(e) {
    document.documentElement.scrollTop += e.deltaX/scroll_reduction_factor; //scroll down if scrolling left
    document.documentElement.scrollTop += e.deltaY/scroll_reduction_factor; //scroll down if scrolling down
    document.body.style.overflowX = 'hidden' //disallow horizontal scroll
    document.body.style.overflowY = 'hidden' //disallow vertical scroll
}

function invertVerticalScrollOnly(e) {
    document.documentElement.scrollTop -= e.deltaY/scroll_reduction_factor; //scroll up if scrolling down
    document.documentElement.scrollTop -= e.deltaX/scroll_reduction_factor; //scroll up if scrolling right
    document.body.style.overflowX = 'hidden' //disallow horizontal scroll
    document.body.style.overflowY = 'hidden' //disallow vertical scroll
}


function topRightCorner(e) {
    console.log('here')
    document.body.style.overflowX = 'hidden' //disallow horizontal scroll
    document.body.style.overflowY = 'hidden' //disallow vertical scroll
    if (e.deltaY < 0) {
        document.documentElement.scrollLeft += e.deltaY/scroll_reduction_factor; //if scrolling up, scroll left
    }
    else if (e.deltaX > 0) {
        document.documentElement.scrollTop += e.deltaX/scroll_reduction_factor; //if scrolling right, scroll down
    }
    else if (e.deltaY > 0) {
        document.body.style.overflowY = 'auto'
        // if scrolling up, continue
    }
    else if (e.deltaX < 0) {
        document.body.style.overflowX = 'auto'
        // if scrolling right, continue
    }
}

function bottomLeftCorner(e) {
    document.body.style.overflowX = 'hidden' //disallow horizontal scroll
    document.body.style.overflowY = 'hidden' //disallow vertical scroll
    if (e.deltaY > 0) {
        document.documentElement.scrollLeft += e.deltaY/scroll_reduction_factor; //if scrolling down, scroll left
    }
    else if (e.deltaX < 0) {
        document.documentElement.scrollTop += e.deltaX/scroll_reduction_factor; //if scrolling left, scroll up
    }
    else if (e.deltaY < 0) {
        document.body.style.overflowY = 'auto'
        // if scrolling up, continue
    }
    else if (e.deltaX > 0) {
        document.body.style.overflowX = 'auto'
        // if scrolling right, continue
    }
}

function bottomRightCorner(e) {
    document.body.style.overflowX = 'hidden' //disallow horizontal scroll
    document.body.style.overflowY = 'hidden' //disallow vertical scroll
    if (e.deltaY > 0) {
        document.documentElement.scrollTop -= e.deltaY/scroll_reduction_factor; //if scrolling down, scroll up
    }
    else if (e.deltaX > 0) {
        document.documentElement.scrollTop -= e.deltaX/scroll_reduction_factor; //if scrolling right, scroll up
    }
    else if (e.deltaY < 0) {
        document.documentElement.scrollLeft += e.deltaY/scroll_reduction_factor;
        // if scrolling up, scroll left
    }
    else if (e.deltaX < 0) {
        document.body.style.overflowX = 'auto'
        // if scrolling left, continue
    }
}

function topLeftCorner(e) {
    document.body.style.overflowX = 'hidden' //disallow horizontal scroll
    document.body.style.overflowY = 'hidden' //disallow vertical scroll
    if (e.deltaY > 0) {
        document.documentElement.scrollLeft += e.deltaY/scroll_reduction_factor; //if scrolling down, scroll right
    }
    else if (e.deltaX < 0) {
        document.documentElement.scrollTop -= e.deltaX/scroll_reduction_factor; //if scrolling left, scroll down
    }
    else if (e.deltaY < 0) {
        document.documentElement.scrollTop -= 1 * e.deltaY/scroll_reduction_factor;
        // if scrolling up, scroll down
    }
    else if (e.deltaX > 0) {
        document.body.style.overflowX = 'auto'
        // if scrolling right, continue
    }
}

document.addEventListener('wheel', (event) => {
    document.body.style.overflowX = 'hidden' //disallow horizontal scroll
    document.body.style.overflowY = 'hidden' //disallow vertical scroll
    if (elementIsVisibleInViewport(document.getElementById("0")) ||
        elementIsVisibleInViewport(document.getElementById("1")) ||
        elementIsVisibleInViewport(document.getElementById("9")) ||
        elementIsVisibleInViewport(document.getElementById("10")) ||
        elementIsVisibleInViewport(document.getElementById("11")) ||
        elementIsVisibleInViewport(document.getElementById("20")) ||
        elementIsVisibleInViewport(document.getElementById("21")) ||
        elementIsVisibleInViewport(document.getElementById("22")) ||
        elementIsVisibleInViewport(document.getElementById("23")) ||
        elementIsVisibleInViewport(document.getElementById("30")) ||
        elementIsVisibleInViewport(document.getElementById("31")) ||
        elementIsVisibleInViewport(document.getElementById("32")) ||
        elementIsVisibleInViewport(document.getElementById("33")) ||
        elementIsVisibleInViewport(document.getElementById("34"))) {
        horizontalScrollOnly(event)
    }
    else if (elementIsVisibleInViewport(document.getElementById("25"))) {
        verticalScrollOnly(event)
    }
    else if (elementIsVisibleInViewport(document.getElementById("2")) ||
        elementIsVisibleInViewport(document.getElementById("24")) ||
        elementIsVisibleInViewport(document.getElementById("35"))) {
        topRightCorner(event)
    }
    else if (elementIsVisibleInViewport(document.getElementById("3")) ||
        elementIsVisibleInViewport(document.getElementById("4")) ||
        elementIsVisibleInViewport(document.getElementById("5")) ||
        elementIsVisibleInViewport(document.getElementById("6")) ||
        elementIsVisibleInViewport(document.getElementById("7")) ||
        elementIsVisibleInViewport(document.getElementById("26")) ||
        elementIsVisibleInViewport(document.getElementById("27")) ||
        elementIsVisibleInViewport(document.getElementById("28")) ||
        elementIsVisibleInViewport(document.getElementById("36")) ||
        elementIsVisibleInViewport(document.getElementById("37")) ||
        elementIsVisibleInViewport(document.getElementById("38")) ||
        elementIsVisibleInViewport(document.getElementById("39")) ||
        elementIsVisibleInViewport(document.getElementById("40"))) {
        verticalScrollOnly(event)
    }
    else if (elementIsVisibleInViewport(document.getElementById("8")) ||
        elementIsVisibleInViewport(document.getElementById("29"))) {
        bottomLeftCorner(event)
    }
    else if (elementIsVisibleInViewport(document.getElementById("12"))) {
        bottomRightCorner(event)
    }
    else if (elementIsVisibleInViewport(document.getElementById("13")) ||
        elementIsVisibleInViewport(document.getElementById("14")) ||
        elementIsVisibleInViewport(document.getElementById("15")) ||
        elementIsVisibleInViewport(document.getElementById("16")) ||
        elementIsVisibleInViewport(document.getElementById("17")) ||
        elementIsVisibleInViewport(document.getElementById("18"))) {
        invertVerticalScrollOnly(event)
    }
    else if (elementIsVisibleInViewport(document.getElementById("19"))) {
        topLeftCorner(event)
    }
    else {
        document.body.style.overflowX = 'auto'
        document.body.style.overflowY = 'auto'
    }
});