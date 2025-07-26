let listaDeNumerosSorteados = [];
let numeroAleatorio = gerarNumeroAleatorio(1,100);
let tentativa = 0;

exibirMensagemInicial();

function exibirMensagemInicial(){
    exibirTextoNaTela("h1","Jogo do número secreto");
    exibirTextoNaTela("p","Escolha um número entre 1 e 10");
   
}

function exibirTextoNaTela(tag,texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto; 
    responsiveVoice.speak(texto,"Brazilian Portuguese Female", {rate: 1.2});
}
function gerarNumeroAleatorio(min,max){
    const numeroSorteado = parseInt(Math.random() * (max - min + 1) + min);
    const tamanhoLista = listaDeNumerosSorteados.length;

    if (tamanhoLista === max){
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroSorteado)){
        return gerarNumeroAleatorio(min,max);
    } else {
        listaDeNumerosSorteados.push(numeroSorteado);
        console.log(listaDeNumerosSorteados)
        return numeroSorteado;
    }
}
function verificarChute(){
    let chute = document.querySelector("input").value;
    tentativa++;
    if(chute == numeroAleatorio){
        const palavraTentativa = tentativa === 1 ? "tentativa" : "tentativas"
        exibirTextoNaTela("h1","Acertou!");
        exibirTextoNaTela("p",`Você descobriu o número secreto com ${tentativa} ${palavraTentativa}`);
        document.getElementById("reiniciar").removeAttribute("disabled");
    }else{
        const dica = chute > numeroAleatorio ? "menor" : "maior";
        exibirTextoNaTela("p",`O número secreto é ${dica}`);
        limparCampo("input");
    }
}

function limparCampo(tag){
    const campo = document.querySelector(tag);
    campo.value = "";
}

function reiniciarJogo(){
    numeroAleatorio = gerarNumeroAleatorio(1,100);
    limparCampo("input");
    tentativa = 0;
    exibirMensagemInicial();
    document.getElementById("reiniciar").setAttribute("disabled",true);
}