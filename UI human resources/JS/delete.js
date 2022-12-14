window.onload = init;

var url = "http://localhost:3000";


function init() {
    if (localStorage.getItem("token") != null) {
        document.querySelector('.delete').addEventListener('click', _delete);
        document.querySelector('.log-out').addEventListener('click', logout);
    }
    else {
        window.location.href = "../index.html";
    }
}

function _delete(){
    var id = document.getElementById('input-id').value;

    console.log('debug');
    axios({
        method: 'delete',
        url: url + '/employee/' + id,
        headers: {
            'Authorization': "bearer " + localStorage.getItem("token")
        },
        params:{
            id: id
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
