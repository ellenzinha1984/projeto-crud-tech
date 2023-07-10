function showUserEditBox(id) {
  // Obtém o pet do banco de dados
  const xhttp = new XMLHttpRequest();
  xhttp.withCredentials = true;
  xhttp.open("GET", "https://crud-pets-desafio-tech.onrender.com/pets/" + id);
  xhttp.send();
  xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
          const object = JSON.parse(this.responseText);

          // Preenche o formulário com os dados do pet
          document.getElementById("nome").value = object["nome"];
          document.getElementById("especie").value = object["especie"];
          document.getElementById("raca").value = object["raca"];
          document.getElementById("cor").value = object["cor"];
          document.getElementById("idade").value = object["idade"];
          document.getElementById("tutor").value = object["tutor"];

          // Mostra o formulário de edição
          document.getElementById("editForm").style.display = "block";

          
              };
          };

          document.querySelector("#editForm button").onclick = function () {
            submitEditedPet(id);
          };
      }


function userDelete(id) {
  const xhttp = new XMLHttpRequest();
  xhttp.withCredentials = true;
  xhttp.open("DELETE", "https://crud-pets-desafio-tech.onrender.com/pets/deleta/" + id);
  xhttp.send();
  xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
          // Recarrega a tabela para mostrar as alterações
          loadTable();
      }
  };
}

function loadTable() {
    const xhttp = new XMLHttpRequest();
    xhttp.withCredentials = true;
    xhttp.open("GET", "https://crud-pets-desafio-tech.onrender.com/pets/todos");
    xhttp.send();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        
        var trHTML = "";
        const objects = JSON.parse(this.responseText);
        for (let object of objects) {
          trHTML += "<tr>";
          trHTML += "<td>" + object["nome"] + "</td>";
          trHTML += "<td>" + object["especie"] + "</td>";
          trHTML += "<td>" + object["raca"] + "</td>";
          trHTML += "<td>" + object["cor"] + "</td>";
          trHTML += "<td>" + object["idade"] + "</td>";
          trHTML += "<td>" + object["tutor"] + "</td>";
          trHTML +=
            '<td><button type="button" class="btn btn-outline-secondary" onclick="showUserEditBox(\'' +
            object["_id"]["$oid"] + 
            '\')">Edit</button>';
          trHTML +=
            '<button type="button" class="btn btn-outline-danger" onclick="userDelete(\'' +
            object["_id"]["$oid"] +
            '\')">Del</button></td>';
          trHTML += "</tr>";
        }
        document.getElementById("mytable").innerHTML = trHTML;
      }
    };
}
  
loadTable();


function cadastrarPet() {
  // Limpa o formulário
  document.getElementById("nome1").value = "";
  document.getElementById("especie1").value = "";
  document.getElementById("raca1").value = "";
  document.getElementById("cor1").value = "";
  document.getElementById("idade1").value = "";
  document.getElementById("tutor1").value = "";

  // Mostra o formulário de criação
  document.getElementById("createForm").style.display = "block";

  
}

function buscaPet() {
  // Limpa os dados da pesquisa anterior
  document.getElementById("petInfo").innerHTML = "";

  // Obtém o ID do pet do campo de entrada
  const id = document.getElementById("searchIdd").value;

  // Envia a requisição HTTP do tipo GET para a rota de busca do backend
  const xhttp = new XMLHttpRequest();
  xhttp.withCredentials = true;
  xhttp.open("GET", "https://crud-pets-desafio-tech.onrender.com/pets/" + id);
  xhttp.send();
  xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
          // Mostra os dados do pet na página
          const object = JSON.parse(this.responseText);
          let petInfo = "";
          petInfo += "Nome: " + object["nome"] + "<br>";
          petInfo += "Espécie: " + object["especie"] + "<br>";
          petInfo += "Raça: " + object["raca"] + "<br>";
          petInfo += "Cor: " + object["cor"] + "<br>";
          petInfo += "Idade: " + object["idade"] + "<br>";
          petInfo += "Tutor: " + object["tutor"] + "<br>";
          document.getElementById("petInfo").innerHTML = petInfo;

          // Limpa o valor do campo de entrada da busca
          document.getElementById("searchIdd").value = "";
          
      }
  };
  //64a72b492792f806542e1428 britney
  //64ab4d9995eb417fde7dc282 fred
   

}


function limparBusca() {
  document.getElementById("petInfo").innerHTML = "";
}


function submitEditedPet(id) {

  // Obtém os dados do formulário
  const nome = document.getElementById("nome").value;
  const especie = document.getElementById("especie").value;
  const raca = document.getElementById("raca").value;
  const cor = document.getElementById("cor").value;
  const idade = document.getElementById("idade").value;
  const tutor = document.getElementById("tutor").value;

  // Cria um objeto Dog com os dados do formulário
  const dog = {
    nome: nome,
    especie: especie,
    raca: raca,
    cor: cor,
    idade: idade,
    tutor: tutor,
  };

  // Envia as alterações para o backend
  fetch(`https://crud-pets-desafio-tech.onrender.com/pets/atualiza/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dog),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // Recarrega a tabela para mostrar as alterações
      loadTable();
      // Esconde o formulário de edição
      document.getElementById("editForm").style.display = "none";
    })
    .catch((error) => {
      console.error(error);
    });

    if (this.readyState == 4 && this.status == 200) {
      // Recarrega a tabela para mostrar as alterações
      loadTable();

      // Esconde o formulário de criação
      document.getElementById("editForm").style.display = "none";
  }

}


  function submitNewPet() {

    // Obtém os dados do formulário
    const nome = document.getElementById("nome1").value;
    const especie = document.getElementById("especie1").value;
    const raca = document.getElementById("raca1").value;
    const cor = document.getElementById("cor1").value;
    const idade = document.getElementById("idade1").value;
    const tutor = document.getElementById("tutor1").value;
  
    // Cria um objeto Dog com os dados do formulário
    const dog = {
      nome: nome,
      especie: especie,
      raca: raca,
      cor: cor,
      idade: idade,
      tutor: tutor,
    };
  
    // Envia os dados para o backend
    fetch("https://crud-pets-desafio-tech.onrender.com/pets/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dog),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Recarrega a tabela para mostrar as alterações
        loadTable();
        // Esconde o formulário de criação
        document.getElementById("createForm").style.display = "none";
      })
      .catch((error) => {
        console.error(error);
      });

      if (this.readyState == 4 && this.status == 200) {
        // Recarrega a tabela para mostrar as alterações
        loadTable();

        // Esconde o formulário de criação
        document.getElementById("createForm").style.display = "none";
    }


  }
  
  
