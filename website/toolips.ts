// list of tool tip points
const lst = ["appearances", "two-letter", "heatmap-years","ttr","answer-length","17-across","clue-length"]

// for each of the tooltips, add the reveal function on mouseover and hide on mouse out
for (let i = 0; i < lst.length; i++) {
    const elem = document.getElementById(lst[i]);
    elem!.addEventListener('mousemove', function (e) { reveal(lst[i], e) });
    
    // initially fade out
    const desc = document.getElementById(lst[i] + "-desc");
    desc!.classList.toggle('fade-opacity');

    // on in/out, fade the opacity
    elem!.addEventListener('mouseout', function (e) { opacity_animation(lst[i]) });
    elem!.addEventListener('mouseover', function (e) { opacity_animation(lst[i]) });
}

function reveal(name: string, e : MouseEvent) {
    // get the icon that the tooltip is based on and the description
    const icon = document.getElementById(name);
    const desc = document.getElementById(name + "-desc");

    // offset left is the number of pixels from the edges of the square
    // the subtraction is how far on the client viewport the mouse is vs the icon itself
    // the calculation offsets the description from the icon by that amount
    desc!.style.left = icon!.offsetLeft + (e.clientX - icon!.getBoundingClientRect().left) + "px"
    desc!.style.top = icon!.offsetTop + (e.clientY - icon!.getBoundingClientRect().top) + "px"

    desc!.style.visibility = 'visible'
}

function opacity_animation(name: string) {
    const desc = document.getElementById(name + "-desc");
    desc!.classList.toggle('fade-opacity');
}