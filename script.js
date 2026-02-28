// Carrega os dados salvos assim que a página é carregada
document.addEventListener("DOMContentLoaded", function() {
    carregarUsuarios();
});

// Função principal chamada ao enviar o formulário
function calcularIdade(event) {
    event.preventDefault();

    const dadosUsuario = pegarValores();
    
    // Validação simples para garantir que os campos foram preenchidos
    if (!dadosUsuario.nome || !dadosUsuario.dia || !dadosUsuario.mes || !dadosUsuario.ano) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }

    const idade = calcularIdadeExata(dadosUsuario.dia, dadosUsuario.mes, dadosUsuario.ano);
    
    // Verifica se a data colocada não é no futuro
    if (idade < 0) {
        alert("Data de nascimento inválida (ainda não nasceu!).");
        return;
    }

    const faixaEtaria = classificarFaixaEtaria(idade);

    // Formata o dia e mês para sempre terem 2 dígitos (ex: 05/02/1990)
    const diaFormatado = String(dadosUsuario.dia).padStart(2, '0');
    const mesFormatado = String(dadosUsuario.mes).padStart(2, '0');

    const usuarioFinal = {
        nome: dadosUsuario.nome,
        dataNascimento: `${diaFormatado}/${mesFormatado}/${dadosUsuario.ano}`,
        idade: idade,
        faixaEtaria: faixaEtaria
    };

    cadastrarUsuario(usuarioFinal);
    carregarUsuarios();
    
    // Limpa o formulário após o cadastro
    event.target.reset();
}

// Captura os valores digitados no HTML
function pegarValores() {
    const nome = document.getElementById("nome").value.trim();
    const dia = parseInt(document.getElementById("dia-nascimento").value);
    const mes = parseInt(document.getElementById("mes-nascimento").value);
    const ano = parseInt(document.getElementById("ano-nascimento").value);

    return { nome, dia, mes, ano };
}

// Calcula a idade com base na data atual
function calcularIdadeExata(dia, mes, ano) {
    const hoje = new Date();
    const nascimento = new Date(ano, mes - 1, dia); // No JS, os meses vão de 0 a 11
    
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mesAtual = hoje.getMonth();
    const diaAtual = hoje.getDate();

    // Reduz 1 ano se a pessoa ainda não fez aniversário no ano atual
    if (mesAtual < (mes - 1) || (mesAtual === (mes - 1) && diaAtual < dia)) {
        idade--;
    }

    return idade;
}

// Classifica a pessoa por faixa etária
function classificarFaixaEtaria(idade) {
    if (idade < 12) return "Criança";
    if (idade < 18) return "Adolescente";
    if (idade < 60) return "Adulto";
    return "Idoso";
}

// Salva o registro no LocalStorage
function cadastrarUsuario(usuario) {
    let lista = [];
    const dadosSalvos = localStorage.getItem("usuariosCadastradosIdade");

    if (dadosSalvos) {
        lista = JSON.parse(dadosSalvos);
    }

    lista.push(usuario);
    localStorage.setItem("usuariosCadastradosIdade", JSON.stringify(lista));
}

// Busca os dados no LocalStorage e verifica se a tabela deve ser renderizada
function carregarUsuarios() {
    const tabela = document.getElementById("corpo-tabela");
    const dadosSalvos = localStorage.getItem("usuariosCadastradosIdade");

    let lista = dadosSalvos ? JSON.parse(dadosSalvos) : [];

    if (lista.length === 0) {
        tabela.innerHTML = `
            <tr class="linha-mensagem">
                <td colspan="4">Nenhum registro encontrado</td>
            </tr>
        `;
        return;
    }

    montarTabela(lista);
}

// Constrói o HTML da tabela usando template literals (crases)
function montarTabela(lista) {
    const tabela = document.getElementById("corpo-tabela");
    let linhas = "";

    lista.forEach(function(pessoa) {
        linhas += `
            <tr>
                <td data-cell="nome">${pessoa.nome}</td>
                <td data-cell="data de nascimento">${pessoa.dataNascimento}</td>
                <td data-cell="idade">${pessoa.idade} anos</td>
                <td data-cell="faixa etária">${pessoa.faixaEtaria}</td>
            </tr>
        `;
    });

    tabela.innerHTML = linhas;
}

// Apaga os dados do LocalStorage e atualiza a interface
function deletarRegistros() {
    if (confirm("Deseja realmente apagar todo o histórico?")) {
        localStorage.removeItem("usuariosCadastradosIdade");
        carregarUsuarios();
    }
}