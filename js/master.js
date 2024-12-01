
let enterLoginMain = document.getElementById('login-main');
let enterRegistration = document.getElementById('Registration');
let enterSignUp = document.getElementById('signUp');
let enterLogin = document.getElementById('login');
let inputEmail = document.getElementById('Email');
let inputPassword = document.getElementById('password');
let  useNameregister = document.getElementById('useNameregister');
let  passwordregister = document.getElementById('passwordregister');
let  Password = document.getElementById('Password');
let enteEerrorMessage = document.getElementById('errorMessage');
let errorMessageregister = document.getElementById('errorMessageregister');
let submitRegister = document.getElementById('submitRegister');



let sumbitLogin = document.getElementById('sumbitLogin');
let contanierLogin = JSON.parse(localStorage.getItem('mylogin')) || [];
sumbitLogin.addEventListener("click", function (e) {
    e.preventDefault();

  
    let isEmailValid = validationLogin(inputEmail);
    let isPasswordValid = validationLogin(inputPassword);

    if (isEmailValid && isPasswordValid) {
        let registeredUsers = JSON.parse(localStorage.getItem('mylogin')) || [];

        let user = registeredUsers.find(user =>
            user.emailregister === inputEmail.value &&
            user.passwordregister === inputPassword.value
        );

        if (user) {
            enteEerrorMessage.classList.add("d-none");
            window.location.href = "index2.html";
        } else {
            enteEerrorMessage.textContent = "Invalid email or password.";
            enteEerrorMessage.classList.remove("d-none");
        }
    } else {
        enteEerrorMessage.classList.remove("d-none");
        console.log("Please correct the errors");
    }
});


function clear(type) {
    if (type === "login") {
        inputEmail.value = "";
        inputPassword.value = "";
    } else if (type === "register") {
        useNameregister.value = "";
        emailregister.value = "";
        passwordregister.value = "";
    }
}
enterSignUp.addEventListener('click', function (e) {
    e.preventDefault();
    enterLoginMain.classList.add('d-none');
    enterRegistration.classList.remove('d-none');
});

enterLogin.addEventListener('click', function (e) {
    e.preventDefault();
    enterRegistration.classList.add('d-none');
    enterLoginMain.classList.remove('d-none');
});

function validationLogin(element) {
    let text = element.value.trim(); 
     let regex1 = {

       Email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
         password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
    
       
    };

    if (!text) {
        enteEerrorMessage.textContent = `${element.id} cannot be empty`;
        return false;
    }

    if (regex1[element.id].test(text)) {
        return true;
    }

    enteEerrorMessage.textContent = `Invalid ${element.id}`;
    return false;
}

submitRegister.addEventListener("click", function (e) {
    e.preventDefault();

  
    let isUsernameValid = validationRegistration(useNameregister);
    let isEmailValid = validationRegistration(emailregister);
    let isPasswordValid = validationRegistration(passwordregister);

    if (isUsernameValid && isEmailValid && isPasswordValid) {
       
        let registeredUsers = JSON.parse(localStorage.getItem('mylogin')) || [];

        let emailExists = registeredUsers.some(user => user.emailregister === emailregister.value);

        if (emailExists) {
            errorMessageregister.textContent = "This email is already registered.";
            errorMessageregister.classList.remove("d-none");
        } else {
  
            errorMessageregister.classList.add("d-none");
            let newUser = {
                useNameregister: useNameregister.value,
                emailregister: emailregister.value,
                passwordregister: passwordregister.value,
            };

            registeredUsers.push(newUser);
            localStorage.setItem('mylogin', JSON.stringify(registeredUsers));
            window.location.href = "hello.html"; // الانتقال إلى صفحة أخرى
        }
    } else {
        errorMessageregister.classList.remove("d-none");
        console.log("Please correct the errors");
    }
});


function validationRegistration(elem) {
    let text2 = elem.value.trim();
    let regex2 = {
        useNameregister: /^[a-zA-Z0-9._]{3,20}$/,
        emailregister: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        passwordregister: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/
    };

    let errorElement = document.getElementById(`${elem.id}Error`);
    errorElement.textContent = "";

    if (!text2) {
        errorElement.textContent = `${elem.id} cannot be empty`;
        return false;
    }

    if (regex2[elem.id].test(text2)) {
        return true;
    }

    errorElement.textContent = `Invalid ${elem.id}`;
    return false;
}

