var btnImprimir = document.querySelector("#imprimir");

var btnAdicionarFormacao = document.querySelector("#adicionarFormacao");
var btnAdicionarProfissao = document.querySelector("#adicionarProfissao");
var btnAdicionarAtvComplementares = document.querySelector("#adicionarAtivComp")

var elementoDeFormacao = document.getElementById("listaDeFormacao");
var elementoDeProfissao = document.getElementById("listaDeProfissao");
var elementoDeAtvCompl = document.getElementById("listaDeAtvCompl");

// Listas
var collectionFormacao = [];
var collectionProfissao = [];
var collectionAtvComplementar = [];

var index;
var dados;
var formacao;
var profissao;
var complemento;


function adicionarNaLista(objeto, tipo) {
    if (tipo == "F") {
        collectionFormacao.push(objeto);
    } else if (tipo == "P") {
        collectionProfissao.push(objeto);
    } else if (tipo == "C") {
        collectionAtvComplementar.push(objeto);
    }
}

function montarConteudo(tipo) {
    if (tipo == "F") {
        elementoDeFormacao.innerHTML = "";
        for (object of collectionFormacao) {
            var elemento = "Instituição: " + object.escola +
                ", Curso: " + object.curso +
                ", Situação: ";
            if (object.situacao == 1) {
                elemento = elemento + "em andamento."
            } else if (object.situacao == 2) {
                elemento = elemento + "concluído."
            }
            index = collectionFormacao.indexOf(object);
            mostrarConteudo(elemento, tipo);
        }
    } else if (tipo == "P") {
        elementoDeProfissao.innerHTML = "";
        for (object of collectionProfissao) {
            var elemento = "Empresa: " + object.empresa + ", Cargo: " + object.cargo + ", ";
            if (object.dataInicial.length > 0) {
                elemento = elemento + "Inicio: " + object.dataInicial + ", ";
            }
            if (object.dataFinal.length > 0) {
                elemento = elemento + "Final: " + object.dataFinal + ", ";
            }
            elemento = elemento + "Atuação: " + object.atuacao + ".";
            index = collectionProfissao.indexOf(object);
            mostrarConteudo(elemento, tipo);
        }
    } else if (tipo == "C") {
        elementoDeAtvCompl.innerHTML = "";
        for (object of collectionAtvComplementar) {
            var elemento = "Conteudo: " + object.conteudo + ".";
            index = collectionAtvComplementar.indexOf(object);
            mostrarConteudo(elemento, tipo);
        }
    }
}

function mostrarConteudo(elemento, tipo) {
    var element = document.createElement("p");
    var info = document.createTextNode(elemento);
    element.appendChild(info);

    var btnDelete = document.createElement("a");
    btnDelete.setAttribute("href", "#");
    var texto = document.createTextNode("Excluir");
    btnDelete.setAttribute("onclick", "removerElemento(" + index + "," + "\"" + tipo + "\"" + ")");
    btnDelete.appendChild(texto);

    if (tipo == "F") {
        elementoDeFormacao.appendChild(btnDelete);
        elementoDeFormacao.appendChild(element);
    } else if (tipo == "P") {
        elementoDeProfissao.appendChild(btnDelete);
        elementoDeProfissao.appendChild(element);
    } else if (tipo == "C") {
        elementoDeAtvCompl.appendChild(btnDelete);
        elementoDeAtvCompl.appendChild(element);
    }
}

function removerElemento(index, tipo) {
    if (confirm("Deseja apagar o registro")) {
        if (tipo == "F") {
            collectionFormacao.splice(index, 1);
        } else if (tipo == "P") {
            collectionProfissao.splice(index, 1);
        } else if (tipo == "C") {
            collectionAtvComplementar.splice(index, 1);
        }
        montarConteudo(tipo);
    }

}

function limparForm(tipo) {
    if (tipo == "F") {
        document.getElementById("curso").value = "";
        document.getElementById("escola").value = "";
        document.getElementById("situacao").value = "0";
    } else if (tipo == "P") {
        document.getElementById("empresa").value = "";
        document.getElementById("cargo").value = "";
        document.getElementById("inicio").value = "";
        document.getElementById("final").value = "";
        document.getElementById("atuacao").value = "";
    } else if (tipo == "C") {
        document.getElementById("conteudo").value = "";
    }
}

// --Processo de adicionar formacao -- //
function recuperarFormacao() {
    formacao = new Object();
    formacao.curso = document.getElementById("curso").value;
    formacao.escola = document.getElementById("escola").value;
    formacao.situacao = document.getElementById("situacao").value;
    if (validarFormacao()) {
        adicionarNaLista(formacao, "F");
        montarConteudo("F");
        limparForm("F");
    }
}

function validarFormacao() {
    if (formacao.curso.length == 0) {
        alert("Informe o curso");
        return false;
    } else if (formacao.escola.length == 0) {
        alert("Informe a instituição");
        return false;
    } else if (formacao.situacao == 0) {
        alert("Informe a situação do curso");
        return false
    } else {
        return true;
    }
}

btnAdicionarFormacao.onclick = recuperarFormacao;

// -- fim Processo de adicionar formacao -- //

// --Processo de adicionar profissao -- //
function recuperarProfissao() {
    profissao = new Object();
    profissao.empresa = document.getElementById("empresa").value;
    profissao.cargo = document.getElementById("cargo").value;
    profissao.dataInicial = document.getElementById("inicio").value;
    profissao.dataFinal = document.getElementById("final").value;
    profissao.atuacao = document.getElementById("atuacao").value;
    if (validarProfissao()) {
        adicionarNaLista(profissao, "P");
        montarConteudo("P");
        limparForm("P");
    }
}

function validarProfissao() {
    if (profissao.empresa.length == 0) {
        alert("Informe a empresa");
        return false;
    } else if (profissao.cargo.length == 0) {
        alert("Informe o cargo");
        return false;
    } else if (profissao.atuacao.length == 0) {
        alert("Informe a atuação");
        return false;
    } else {
        return true;
    }
}

btnAdicionarProfissao.onclick = recuperarProfissao;
// -- fim Processo de adicionar formacao -- //

// -- Processo de adicionar atividades complementares -- //
function recuperarComplemento() {
    complemento = new Object();
    complemento.conteudo = document.getElementById("conteudo").value;
    if (validarComplemento()) {
        adicionarNaLista(complemento, "C");
        montarConteudo("C");
        limparForm("C");
    }
}

function validarComplemento() {
    if (complemento.conteudo.length == 0) {
        alert("Informe a atividade complementar");
        return false;
    }
    return true;
}

btnAdicionarAtvComplementares.onclick = recuperarComplemento;
// -- fim Processo de adicionar atividades complementares -- //

// -- PROCESSO PARA IMPRIMIR --//
function iniciar() {
    recuperarDados();
    if (validar()) {
        imprimir();
    }
}

function recuperarDados() {
    dados = new Object();
    dados.nome = document.getElementById("nome").value;
    dados.endereco = document.getElementById("endereco").value;
    dados.email = document.getElementById("email").value;
    dados.telCel = document.getElementById("telCel").value;
    dados.telRes = document.getElementById("telRes").value;
}

function validar() {
    if (dados.nome.length == 0) {
        alert("Informe seu nome completo");
        return false;
    } else if (dados.endereco.length == 0) {
        alert("Informe o endereço");
        return false;
    } else if (dados.email.length == 0) {
        alert("Informe o seu email");
        return false;
    } else if (dados.telCel.length == 0) {
        alert("Informe o numero do telefone celular");
        return false;
    } else {
        return true;
    }
}
function f(str) { return str.split("-").reduce(function (p, c) { return c + "-" + p }) }

function imprimir() {
    var pdf = window.open('', '', 'height=700,width=700');
    pdf.document.write("<p style='text-align: center; font-weight: bolder;text-decoration: underline;'>" + dados.nome + "</p><br>");
    pdf.document.write("<b>Dados pessoais</b><hr>");

    pdf.document.write("<ul>");
    pdf.document.write("<li><b>Endereço:</b> " + dados.endereco + "</li>");
    pdf.document.write("<li><b>Email:</b> " + dados.email + "</li>");
    pdf.document.write("<li><b>Telefones:</b> CEL: " + dados.telCel + " / RES: " + dados.telRes + "</li>");
    pdf.document.write("</ul>");

    pdf.document.write("<b>Formação</b><hr>");
    pdf.document.write("<ul>");
    if (collectionFormacao.length > 0) {
        for (object of collectionFormacao) {
            pdf.document.write("<li><b>Curso:</b> " + object.curso + ", <b>instituição:</b> "
                + object.escola + ", <b>situação:</b> " + (object.situacao == 1 ? "em andamento." : "concluído.") + "</li>");
        }
    }
    pdf.document.write("</ul>");
    pdf.document.write("<b>Experiência profissional</b><hr>");
    pdf.document.write("<ul>");
    if (collectionProfissao.length > 0) {
        for (object of collectionProfissao) {
            pdf.document.write("<li>");
            pdf.document.write("<b>Empresa: </b>" + object.empresa + " - <b>cargo: </b>" + object.cargo + "<br>");
            pdf.document.write("<b>Atuação: </b>" + object.atuacao + "<br>");
            if (object.dataInicial.length > 0 && object.dataFinal.length > 0) {
                pdf.document.write("<b>Periodo: </b>" + f(object.dataInicial) + " à " + f(object.dataFinal) + "<br>");
            } else if (object.dataInicial.length > 0) {
                pdf.document.write("<b>Inicio: </b>" + f(object.dataInicial) + "<br>");
            }
            pdf.document.write("</li>");
        }
    }
    pdf.document.write("</ul>");
    pdf.document.write("<b>Atividades complementares</b><hr>");
    pdf.document.write("<ul>");
    if (collectionAtvComplementar.length > 0) {
        for (object of collectionAtvComplementar) {
            pdf.document.write("<li><b>Descrição: </b>" + object.conteudo + ".</li><br>");
        }
    }



    pdf.document.close();
    pdf.print();
}

btnImprimir.onclick = iniciar;