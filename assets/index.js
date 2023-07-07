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
            '<td><button type="button" class="btn btn-outline-secondary" onclick="showUserEditBox(' +
            object["id"] +
            ')">Edit</button>';
          trHTML +=
            '<button type="button" class="btn btn-outline-danger" onclick="userDelete(' +
            object["id"] +
            ')">Del</button></td>';
          trHTML += "</tr>";
        }
        document.getElementById("mytable").innerHTML = trHTML;
      }
    };
}
  
loadTable();
