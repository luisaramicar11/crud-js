/* (function (){
    const userOnline = localStorage.getItem('userOnline')
    if(userOnline != null){
        window.location.href = "dashboard.html"
    }
})() */

import {successAlert, warningAlert, errorAlert} from "./alerts.js"
const form = document.querySelector("form")
const email = document.getElementById("email")
const password = document.getElementById("password")

// Event that allows a registered user to enter the dashboard and its section to be saved in local storage

form.addEventListener("submit", async function (event){
    event.preventDefault()
    let user = await checkEmail(email)
    if (user === false){
        errorAlert("Email does not exist")
    }else{
        if (user.password === password.value){
            localStorage.setItem("userOnline", JSON.stringify(user));
            successAlert("Login successful")
            window.location.href="dashboard.html"
        }
        else{
            warningAlert("Password does not match")
        }
    }
    
})

// Funtion that checks an email
async function checkEmail(email){
    const response = await fetch(`http://localhost:3000/users?email=${email.value}`);
    const datos = await response.json()
    
    console.log(datos)

    if(datos.length === 1){
        return datos[0];
    }else{
        warningAlert("Email is not registered")
        return false;
    }
}