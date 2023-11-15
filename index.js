let slideIndex = [1, 1];
let slideId = ["project-card1", "project-card2"]

showSlides(1, 0);
showSlides(1, 1);

function plusSlides(n, m) {
    showSlides(slideIndex[m] += n, m);
}

function showSlides(n, m) {
    let x = document.getElementsByClassName(slideId[m]);

    if (n > x.length) {
        slideIndex[m] = 1;
    }

    if (n < 1) {
        slideIndex[m] = x.length;
    }

    for (let i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }

    x[slideIndex[m] - 1].style.display = "block";
}