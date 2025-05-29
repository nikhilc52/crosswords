function closeTo(input, target, precision){
    if (Math.abs(target - input) <= precision){
        return true
    }
    return false
}

function horizontalScrollOnly(e){
    document.documentElement.scrollLeft += e.deltaY; //scroll left if scrolling down
    document.documentElement.scrollLeft += e.deltaX; //scroll left if scrolling left
    document.body.style.overflowX = 'auto' //allow horizontal scroll
    document.body.style.overflowY = 'hidden' //disallow vertical scroll
}

function verticalScrollOnly(e){
    document.body.style.overflowX = 'hidden' //disallow horizontal scroll
    document.body.style.overflowY = 'auto' //allow vertical scroll
}

document.addEventListener('wheel', (event) => {
    const total_width = document.documentElement.scrollWidth
    const total_user_scroll_width = window.scrollX + window.innerWidth
    const total_height = document.documentElement.scrollHeight
    const total_user_scroll_height = window.scrollY + window.innerHeight
    
    if (total_user_scroll_width <= 0.71 * total_width && total_user_scroll_height <= window.innerHeight){
        // console.log(total_user_scroll_width)
        // console.log(0.7 * total_width)
        // console.log('before across')
        horizontalScrollOnly(event)
    }
    else if (total_user_scroll_width >= 0.69 * total_width && total_user_scroll_height >= 0.99*total_height) {
        // console.log(total_user_scroll_width)
        // console.log(0.7 * total_width)
        // console.log('after across')
        horizontalScrollOnly(event)
    }
    else if (closeTo(total_user_scroll_width, 0.7*total_width, 100)) {
        document.documentElement.scrollLeft += 0.7*total_width - total_user_scroll_width
        verticalScrollOnly(event)
        // console.log(total_user_scroll_width)
        // console.log(0.7 * total_width)
        // console.log('down')
    }
    else{
        // any scrolling
        document.body.style.overflowX = 'auto'
        document.body.style.overflowY = 'auto'
    }
});