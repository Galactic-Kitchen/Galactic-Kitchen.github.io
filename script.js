function GoToTop () {
    window.scrollTo({
        top:0,
        behavior:"smooth"
    })
};


function main () {
    document.getElementById("ButtonToTop").addEventListener("click", ()=> {
        GoToTop();
    });
}

main();
console.log("Hello !")