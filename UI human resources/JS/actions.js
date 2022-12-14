window.onload = init;

var headers = {};
var url = "http://localhost:3000";


function init() {
    if (localStorage.getItem("token") != null) {
        headers = {
            headers: {
                'Authorization': "bearer " + localStorage.getItem("token")
            }
        }
        loadData();
        document.querySelector('.log-out').addEventListener('click', logout);
    }
    else {
        window.location.href = "../index.html";
    }
}

function logout() {
    localStorage.removeItem("token");

    if (localStorage.getItem("token") == null) {
        window.location.href = "../index.html";
    }
}

function loadData() {
    axios.get(url + "/employee", headers)
        .then(function (response) {

            console.log(response);
            displayEmployee(response.data.message);

        }).catch(function (error) {
            console.log(error);
        })
}

function displayEmployee(employee) {
    var body = document.querySelector("tbody");
    for (var i = 0; i < employee.length; i++) {
        body.innerHTML += `<tr>
                           <th scope= "row">
                           ${employee[i].emp_id}
                           </th>
                           <td>${employee[i].emp_name}</td>
                           <td>${employee[i].emp_lastname}</td>
                           <td>${employee[i].emp_mail}</td>
                           <td>${employee[i].emp_phone}</td>
                           <td>${employee[i].emp_address}</td>
                           </tr>`;
    }
}