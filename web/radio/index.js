document.addEventListener("DOMContentLoaded", function (event) {
    set();
    play();
})
function play(){
    document.getElementById('player').volume=0.025;
    // document.getElementById('player').volume=0;
    document.getElementById('player').play();
};
async function set() {
    try {
        const info = await fetch("http://kel-raspberry.local:9090/info.xsl");
        const json = await info.json();
        const apiTitle = json["/stream"].title;
        const author = apiTitle.split(" - ")[0];
        const title = apiTitle.split(" - ")[1];
        document.getElementById("author").innerText = author;
        document.getElementById("title").innerText = title;
        setTimeout(set, 250)
    } catch (e) {
        console.log(e);
        setTimeout(set, 500);
    }
}