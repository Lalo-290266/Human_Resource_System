window.onload = init;

function init() {
    if (localStorage.getItem("token") == null) {
        console.log("debug "+localStorage.getItem("token"));
        document.querySelector('.btn-primary').addEventListener('click', login);
    }
    else {
        window.location.href = "../pages/employees.html";
    }
}

function login() {
    var mail = document.getElementById('input-mail').value;
    var pass = document.getElementById('input-password').value;

    axios({
        method: 'post',
        url: 'http://localhost:3000/user/login',
        data: {
            user_mail: mail,
            user_pass: pass
        }
    }).then(function (response) {
        if (response.data.code == 200) {
            localStorage.setItem("token", response.data.message);
            window.location.href = "../pages/employees.html";
            console.log(response);
        } else {
            console.log("Usuario y/o contraseña incorrectos")
        }
    }).catch(function (error) {
        console.log(error)
    })
}