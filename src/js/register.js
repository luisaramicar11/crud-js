import { successAlert, warningAlert, errorAlert } from "./alerts.js";
const form=document.querySelector("form");
const username=document.getElementById("username");
const lastName=document.getElementById("last-name");
const email=document.getElementById("email");
const password=document.getElementById("password");
const confirmPassword=document.getElementById("confirm-password");

// Event that allows you to register a new user
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const revisionEmail = await checkEmail(email)
    const revisionPassword = checkPasswords(password, confirmPassword)
    if(revisionEmail===true && revisionPassword===true){
        await registerUser(username, lastName, email, password)
        successAlert("Registration successful")
        window.location.href="login.html";
    }
})

// Function that allows you to check if the email already exists
async function checkEmail(email){
    const response = await fetch(`http://localhost:3000/users?email=${email.value}`);
    const datos = await response.json()
    
    console.log(datos)

    if(datos.length > 0){
        warningAlert("Email already in use")
        return false;
    }else{
        return true;
    }
}

// Function that allows creating a user
async function registerUser(username, lastName, email, password){
    const newUser = {
        username: username.value,
        lastName: lastName.value,
        email: email.value,
        password:  password.value
    }

    const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
    })
   const datos = response.json()
}

// Function that checks if the password and password verification are the same
function checkPasswords(password, confirmPassword){
    if(password.value === confirmPassword.value){
        return true;
    }else{
        errorAlert("Passwords do not match")
        return false;
    }
}