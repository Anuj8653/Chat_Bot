const themeBtn = document.getElementById("themeBtn");
const clearBtn = document.getElementById("clearBtn");

themeBtn.addEventListener("click", function(){

document.body.classList.toggle("dark");

const icon = themeBtn.querySelector("i");

if(document.body.classList.contains("dark")){
icon.classList.remove("fa-sun");
icon.classList.add("fa-moon");
}
else{
icon.classList.remove("fa-moon");
icon.classList.add("fa-sun");
}

});

clearBtn.addEventListener("click",function(){
document.getElementById("chatBox").innerHTML="";
});

const API_KEY = "AIzaSyCflUC7CtSPYtexhaivTRpq2n2b24ue-9o";

async function sendMessage(){

const input = document.getElementById("userInput");
const chatBox = document.getElementById("chatBox");
const typing = document.getElementById("typing");

let userText = input.value.trim();

if(userText==="") return;

chatBox.innerHTML += `<div class="message user">${userText}</div>`;

input.value="";

typing.style.display="block";

try{

const response = await fetch(
`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
contents:[
{
parts:[
{ text:userText }
]
}
]
})
}
);

const data = await response.json();

typing.style.display="none";

let botReply = data.candidates[0].content.parts[0].text;

chatBox.innerHTML += `<div class="message bot">${botReply}</div>`;

chatBox.scrollTop = chatBox.scrollHeight;

}
catch(error){

typing.style.display="none";

chatBox.innerHTML += `<div class="message bot">⚠ Error fetching response</div>`;

}

}

const input = document.getElementById("userInput");

input.addEventListener("keydown",function(event){
if(event.key==="Enter"){
sendMessage();
}
});