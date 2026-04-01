const nomeInput = document.getElementById("nome");
const telefoneInput = document.getElementById("telefone");
const botao = document.getElementById("adicionar");
const lista = document.getElementById("lista-contatos");

botao.addEventListener("click", function(){
    const nome = nomeInput.value;
    const telefone = telefoneInput.value;

    console.log(nome);
    console.log(telefone);

    if(nome === "" || telefone === ""){
        alert("Preencha seu nome e telefone");
        return;
    }

    //Cria um item da lista
    const li = document.createElement("li");
    li.textContent = nome + "-" + telefone;

    //Cria o botao de excluir
    const btnExcluir = document.createElement("button");
    btnExcluir.textContent = "Excluir";
    btnExcluir.classList.add("btn-excluir");

    btnExcluir.addEventListener("click", function(){
        li.remove();
        salvarContatos();
    });

    //Cria o botao de editar
    const btnEditar = document.createElement("button");
    btnEditar.textContent = "editar";
    btnEditar.classList.add("btn-editar");

    btnEditar.addEventListener("click", function(){
        nomeInput.value = nome;
        telefoneInput.value = telefone;
        li.remove();
        salvarContatos();

    });

    //Adiciona o botao na li
    li.appendChild(btnExcluir);
    li.appendChild(btnEditar);

    //Adciona a li na lista
    lista.appendChild(li);
    salvarContatos();

    nomeInput.value = "";
    telefoneInput.value = "";

});

function salvarContatos (){
    const contatos = [];

    const itens = lista.querySelectorAll("li");

    itens.forEach(function(li){
        const texto =li.firstChild.textContent.split("-")

        contatos.push({
            nome : texto [0],
            telefone :texto [1]
        });

    });

    localStorage.setItem("contatos", JSON.stringify(contatos));
   
}

function carregarContatos(){

    const dados = localStorage.getItem("contatos");

    if(dados){

        const contatos = JSON.parse(dados);

        contatos.forEach(function(contato){

            const li = document.createElement("li");
            li.textContent = contato.nome + "-" + contato.telefone;

            const btnExcluir = document.createElement("button");
            btnExcluir.textContent = "Excluir";
            btnExcluir.classList.add("btn-excluir");

            btnExcluir.addEventListener("click", function(){
                li.remove();
                salvarContatos();
            });

            const btnEditar = document.createElement("button");
            btnEditar.textContent = "editar";
            btnEditar.classList.add("btn-editar");

            btnEditar.addEventListener("click", function(){
                nomeInput.value = contato.nome;
                telefoneInput.value = contato.telefone;
                li.remove();
                salvarContatos();
            });

            li.appendChild(btnExcluir);
            li.appendChild(btnEditar);

            lista.appendChild(li);
        });
    }
}

carregarContatos();