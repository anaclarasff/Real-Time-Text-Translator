/*JAVASCRIPT
Logica de programação
Algoritmos
--> Variaveis - pedacinho na memoria do computador 
que voce pode guardar o que quiser

--> Funcoes - pedacinho de codigo que 
só executa quando eu chamo

Como se comunicar com o HTML
    Manipular o DOM

console.log() mostra o que eu quiser na tela
    
[x] Saber quabdo o botão foi clicado
[x] Pegar o texto que o usuário digitou
[x] Mando para o servidor traduzir
[x] Receber a resposta do servidor
[x]  Colocar o texot na tela 

Fase 2
[x] escolher o idioma
[] Traduzir pelo microfone (voz)
  
JAVASCRIPT - scripts
HTML - document

padrao= https://api.mymemory.translated.net/get?q=
traduzir= Hello%20World!
idioma= &langpair=en|it

json --> formato amigavel
*/ 

//pegando o texto dentro do text-area do HTML
let inputTexto = document.querySelector(".input-texto")
let traducao = document.querySelector(".traducao")
let idioma = document.querySelector(".idioma")


async function traduzir(){

    //endereço para se comunicar com o servidor 
    // com o texto que eu quero traduzir

    let endereco = "https://api.mymemory.translated.net/get?q="
    + inputTexto.value
    + "&langpair=pt-BR|"
    + idioma.value

    //comunicação com o servidor - fetch
    //await (espere)
    //async --> avisa a funcao que tambem vai esperar

    let resposta = await fetch(endereco)//resposta do servidor

    let dados = await resposta.json()//formato amifgavel da resposta

    traducao.textContent = dados.responseData.translatedText

    console.log(dados)
}

function ouvirVoz(){
    //ferramenta de transcricao de audio
    let voz = window.webkitSpeechRecognition

    //Deixando ela PRONTA PRA USO
    let reconhecimentoVoz = new voz()

    reconhecimentoVoz.lang = "pt-BR"

    reconhecimentoVoz.onresult = (evento) => {
       let transcricaoTexto = evento.results[0][0].transcript

       inputTexto.value = transcricaoTexto

       traduzir()
    }

    reconhecimentoVoz.start()
}

//clicou no botao --> chama a funcao --> monto o endereco
//chamo o servidor --> peco para esperar --> responde