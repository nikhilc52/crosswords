// list of tool tip points
const lst = ["appearances"]

// for each of the tooltips, add the reveal function on mouseover and hide on mouse out
for (let i = 0; i < lst.length; i++) {
    const elem = document.getElementById(lst[i]);
    elem!.addEventListener('mouseover', function (e) { reveal(lst[i]) });
    const desc = document.getElementById(lst[i] + "-desc");
    // initially fade out
    desc!.classList.toggle('fade-opacity');
    elem!.addEventListener('mouseout', function (e) { hide(lst[i]) });
}

function reveal(name: string) {
    const desc = document.getElementById(name + "-desc");
    // desc!.style. = + "px"

    desc!.style.visibility = 'visible'
    desc!.classList.toggle('fade-opacity');
}

function hide(name: string) {
    const desc = document.getElementById(name + "-desc");
    desc!.classList.toggle('fade-opacity');
}