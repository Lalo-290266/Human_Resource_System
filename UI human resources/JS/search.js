window.onload = init;

var url = "http://localhost:3000";

function init() {
    if (localStorage.getItem("token") != null) {
        document.querySelector('.search').addEventListener('click', search);
        document.querySelector('.log-out').addEventListener('click', logout);
    }
    else {
        window.location.href = "../index.html";
    }
}

function search(){

    var name = document.getElementById('input-search-name').value;

    console.log('debug');
    axios({
        method: 'get',
        url: url + '/employee/' + name,
        headers: {
            'Authorization': "bearer " + localStorage.getItem("token")
        },
        params:{
            name: name
        }
    }).then(function (response) {
        if (response.data.code == 200) {
            localStorage.setItem("result", JSON.stringify(response.data.message));
            window.location.href = "result.html";
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
