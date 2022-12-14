window.onload = init;

function init() {
    if (localStorage.getItem("token") != null) {
        
        var result = localStorage.getItem("result");
        displayEmployee(JSON.parse(result));
        document.querySelector('.log-out').addEventListener('click', logout);
    }
    else {
        window.location.href = "../index.html";
    }
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

function logout() {

    localStorage.clear();

    if (localStorage.getItem("token") == null) {
        window.location.href = "../index.html";
    }
}
