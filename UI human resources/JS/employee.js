window.onload = init;

var headers = {};
var url = "http://localhost:3000";


function init() {
    if (localStorage.getItem("token") != '') {
        headers = {
            headers: {
                'Authorization': "bearer " + localStorage.getItem("token")
            }
        }
        loadData();
    }
    else {
        window.location.href = "index.html"
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

function displayEmployee(employee){
    var body = document.querySelector("body");
    for(var i = 0; i < employee.length; i++){
        body.innerHTML += `<h3>${employee[i].emp_name}</h3>`;
    }
}