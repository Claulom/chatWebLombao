

let socket = io();

let chatBox = document.getElementById('chatBox');
let log = document.getElementById('log')
let user;

Swal.fire({
    title: "Indentificate",
    input:'text',
    allowOutsideClick:false,
    inputValidator:(val) =>{
        return !val && '¡Falta tu nombre de usuario!'
    }
}).then(res=>{
    user = res.value;
})

chatBox.addEventListener('keyup', evt=>{
    if(evt.key === "Enter"){
        if(chatBox.value.trim().length > 0){
            socket.emit('message', {
                user: user, 
                message: chatBox.value.trim(),
                time: `${new Date().getHours()}:${new Date().getMinutes()}`
            })
            chatBox.value = "";
        }
    }
})

//Sockets eventos
socket.on('log', data=>{
    let messages = "";
    data.forEach(log=>{
        messages = messages + `${log.user} dice: </br><p class="message">${log.message}  ${log.time}</p></br>`
    })
    log.innerHTML = messages;
})