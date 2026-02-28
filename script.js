document.addEventListener("DOMContentLoaded", function(){
    const formulario = document.getElementById("form-imc");

    formulario.addEventListener("submit", calcularImc);

    carregaUsuarios();
});

function calcultionImc(event){
    event.preventDefault();

    const dadosUsuario = pegarValores();
    const imcCalculado = calcula(
        dadosUsuario.altura,
        dadosUsuario.peso
    );

    cadastrarUsuario(usuariofinal);

    carregaUsuarios();

    document.getElementById("form-imc").requestFullscreen();
}

function pegarValores(){
    const nome = document.getElementById("nome").value.trim();

    const altura = parseFloat(document.getElentById("altura").value);
    const peso = parseFloat (document.getElementById)("peso").value);

    return{
        nome: nome,
        altura: altura,
        peso: peso 
    }
}
function calcular(altura,peso){
    return peso / (altura*peso
)}

    function classificarImc(imc) {
        if(imc <18.5) return "abaixo do peso"
        if(imc <25) return "peso normal"
        if(imc < 30) return "sobrepeso"

        return "obesidade"

    }

    function organizarDados (dadosUsuario, imc, classificacao){
        const dataAtual = new Date ().toLocaleDateString("pt-BR");

        return(
            ...dadosUsuario,
            imc : imc.tofixed(2),
            classificacao : classificacao,
            dataCadastro: dataAtual
    };
}

function cadastrarUsuario(usuario){
    let lista = [];
    const dadosSalvos = localStorage.getitem("usuarioscadastrados")

    if(DadosSalvos)
        lista = JSON.parse(dadosSalvos);
}

lista.push(usuario);

const lestaEmTexto =JSON.stringify(lista);
localStorage.setItem("usuariosCadastrados", listaEmTexto);
"usuariosCadastrados"
JSON.stringify(lista)
);
}

function carregarUsuarios(){
    const tabela = document.getElementById("corpo-tabela");
    const dadosSalvos = localStorage.getitem("usuariosCadastrados");

    //let variavel = (condicao) ? (se for verdade) : (se for falso);
    let lista = dadosSalvos ? JSON.parse(dadosSalvos) : [];

    if(lista.lenght) ===0){
        tabela.innerHTML = 
        <tr class = "linha-mensagem">
            <td colspan ="6">Nenhum registro encontrado</td>
        </tr>
        ;
        return;
    }

    montarTabela(lista){
        com tabela = document.getElementById("corpo-tabela")
        let linhas = "";
        lista.forEach(function (pessoa){
            linhas +=
            <tr>
                <td data-cell="Nome">${pessoa.nome}</</td>
                <td data-cell="Altura">${pessoa.altura}</</td>
                <td data-cell="Peso">${pessoa.pesp}</</td>
                <td data-cell="IMC">${pessoa.imc}</</td>
                <td data-cell="Classificação">${pessoa.classificacao}</</td>
                <td data-cell="Data">${pessoa.Datacadastro}</</td>
            </tr>
    ;    
});
   
tabela.innerHTML = linhas;
    }

    function deletarRegistros(){
        if(confirm("deseja realmente apagar todo historico"))(
            localStorage.removeitem("usuariosCadastrados");
            carregarUsuarios();
        )
    }