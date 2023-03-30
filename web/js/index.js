var chatHTML;
document.addEventListener("DOMContentLoaded", function(event) {
    chatHTML = document.querySelector("#chat>ul");
    getCount();
    get();
})
var count = 0;
async function getCount(){
    const chat = await fetch(`/chat`);
    const data = await chat.json();
    count = data.count;
}
async function get(){
    const chat = await fetch(`/chat`);
    const data = await chat.json();
    // console.log(data)
    if(data.count != count){
        for(i1=count;i1<data.count;i1++){
            var msg = data.messages[i1];
            var newMessage = document.createElement("li");
            newMessage.innerText = `${msg.author}: ${msg.message}`;
            chatHTML.append(newMessage);
        }
        count = data.count;
    }
    setTimeout(get, 1)
}