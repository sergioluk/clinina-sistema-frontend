
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
  acc[i].click(); //pra começar já o accordion aberto
}

var imagens = document.getElementsByClassName("imagensGrandes");
var j;
for (j = 0; j < imagens.length; j++) {
  imagens[j].addEventListener("click", function() {
    document.getElementById("overlay").style.display = "block";
    document.getElementById('overlayImg').src = this.src;
    captionText.innerHTML = this.alt;
  });
}

function off() {
  document.getElementById("overlay").style.display = "none";
}

function preco(id) {
  var preco;
  var corPadrao = "#dff6f8";
  var corSelecionada = "#98a2d7";
  document.getElementById("a1").style.backgroundColor = corPadrao;
  document.getElementById("2.5").style.backgroundColor = corPadrao;
  document.getElementById("15").style.backgroundColor = corPadrao;
  document.getElementById("20").style.backgroundColor = corPadrao;
  if (id == "a1"){
    preco = "R$ 36,90";
  } else if (id === "2.5"){
    preco = "R$ 79,90";
  } else if (id === "15"){
    preco = "R$ 244,90";
  } else {
    preco = "R$ 316,90";
  }
  document.getElementById("valor").innerText = preco;
  document.getElementById(id).style.backgroundColor = corSelecionada
}
/*
//Consumindo uma API

function fazGet(url){
  let request = new XMLHttpRequest();
  request.open("GET", url, false);
  request.send();
  return request.responseText;
}
function criaLinha(usuario){

}
function main(){
  let data = fazGet("https://jsonplaceholder.typicode.com/users");
  let usuarios = JSON.parse(data);
  console.log(usuarios);
}
//main();


//API mike brito

async function getContent(id){
  try {
    //const reponse = await fetch("https://jsonplaceholder.typicode.com/users");
    const url = "http://localhost:8080/produtos";
    const reponse = await fetch(url);
    console.log(reponse);
    const data = await reponse.json();
    console.log(data);
    console.log("hehehe " + data.preco)
    //show(data);
    produto(data);
  } catch (error){
    console.error(error);
  }
}

getContent(1);

function show(users){
  let output = ''

  for (let user of users){
    output += `<li>${user.name}</li>`;
  }

  document.querySelector('main').innerHTML = output;
}

function listaDescricao(descricao){

  let output = ''
  const descArray = descricao.split(":");

  for (var i = 0; i < descArray.length; i++){
    output += `<li>${descArray[i]}</li>`;
  }

  document.querySelector('.descUL').innerHTML = output;

}

function produto(produto){
  //document.querySelector('.testeBanco').innerHTML = `<h1>${teste[0].name}</h1>`;
  //document.getElementById("jojo").innerText = `${teste[1].name}`;
  document.getElementById("jojo").innerText = `${produto[0].produto}`;
  listaDescricao(produto[0].informacao);
  document.getElementById("valor").innerText = `R$ ${produto[0].preco}`;



}

*/
