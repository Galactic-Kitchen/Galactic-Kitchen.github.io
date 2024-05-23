function createStarTimed() {
    star=createStar();
    setTimeout(() => {
        star.remove();
        createStarTimed();
    }, 3000);
}
function createStar() {
    const star = document.createElement('div');
    star.classList.add('star');
    star.style.top = `${Math.random() * 100}vh`;
    star.style.left = `${Math.random() * 100}vw`;
    star.style.animationDuration = `${Math.random() * 2 + 1}s`;
    let t = document.querySelector("#stars")
    t.appendChild(star);
    return star;
}


for (let index = 0; index < 50; index++) {
    createStar();
    createStarTimed();
}