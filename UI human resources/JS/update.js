window.onload = init;

var url = "http://localhost:3000";


function init() {
    if (localStorage.getItem("token") != null) {
        document.querySelector('.update').addEventListener('click', update);
        document.querySelector('.log-out').addEventListener('click', logout);
    }
    else {
        window.location.href = "../index.html";
    }
}

function update(){
    var id = document.getElementById('input-id').value;
    var name = document.getElementById('input-upd-name').value;
    var lastname = document.getElementById('input-upd-lastname').value;
    var mail = document.getElementById('input-upd-mail').value;
    var phone = document.getElementById('input-upd-phone').value;
    var address = document.getElementById('input-upd-address').value;

    console.log('debug');
    axios({
        method: 'put',
        url: url + '/employee/' + id,
        headers: {
            'Authorization': "bearer " + localStorage.getItem("token")
        },
        params:{
            id: id
        },
        data: {
            emp_name: name,
            emp_lastname: lastname,
            emp_mail: mail,
            emp_phone: phone,
            emp_address: address,
            
        }
    }).then(function (response) {
        if (response.data.code == 200) {
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
