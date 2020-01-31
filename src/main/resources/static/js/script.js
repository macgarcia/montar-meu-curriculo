// -- J-QUERY -- //
$(document).ready(function () {
    M.updateTextFields();
});

$(document).ready(function () {
    $('.collapsible').collapsible();
});

$(document).ready(function () {
    $('select').formSelect();
});

$(document).ready(function () {
    $("button[name='adicionarFormacao']").click(function(){
        $('select').formSelect();
    });
});

// -- //
function nomeCaixaAlta() {
    var nomeCompleto = document.getElementById("nome").value;
    document.getElementById("nome").value = nomeCompleto.toUpperCase();
}
