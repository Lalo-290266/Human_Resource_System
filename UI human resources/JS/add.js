window.onload = init;

var url = "http://localhost:3000";


function init() {
    if (localStorage.getItem("token") != null) {
        document.querySelector('.add').addEventListener('click', add);
        document.querySelector('.log-out').addEventListener('click', logout);
    }
    else {
        window.location.href = "../index.html";
    }
}

function add(){
    var name = document.getElementById('input-add-name').value;
    var lastname = document.getElementById('input-add-lastname').value;
    var mail = document.getElementById('input-add-mail').value;
    var phone = document.getElementById('input-add-phone').value;
    var address = document.getElementById('input-add-address').value;

    console.log('debug');
    axios({
        method: 'post',
        url: url + '/employee',
        headers: {
            'Authorization': "bearer " + localStorage.getItem("token")
        }, 
        data: {
            emp_name: name,
            emp_lastname: lastname,
            emp_mail: mail,
            emp_phone: phone,
            emp_address: address,
            
        }
    }).then(function (response) {
        if (response.data.code == 201) {
            window.location.href = "employees.html";
        } else {
            console.log("Algo salió mal")
        }
    }).catch(function (error) {
        console.log(error)
    })
}

function logout() {
    localStorage.removeItem("token");

    if (localStorage.getItem("token") == null) {
        window.location.href = "../index.html";
    }
}
