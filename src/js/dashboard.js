// guardian
(function (){
    const userOnline = localStorage.getItem('userOnline')
    if(userOnline === null){
        window.location.href = "/"
    }
})()

import {successAlert} from "./alerts.js"
const btnLogout=document.querySelector(".btn-logout")
const tbody = document.querySelector("tbody");
const form = document.querySelector("form");
const numberRoom = document.getElementById("number-room")
const typeRoom = document.querySelector(".type-room")
const breakfast = document.getElementById("breakfast")
const airConditioning = document.getElementById("air-conditioning")
const wifi = document.getElementById("wifi")
const price = document.getElementById("price")
const beds = document.getElementById("beds")
const bathrooms = document.getElementById("bathrooms")
const URL_ROOMS="http://localhost:3000/rooms"
let idCatche;

// Button to exit the dashboard
btnLogout.addEventListener("click", () => {
    localStorage.removeItem("userOnline")
    window.location.href = "index.html"
})

index()

// Event that after clicking on the submit button of the form allows you to differentiate if it is an update or a creation of a room.
form.addEventListener("submit", async(e)=>{
e.preventDefault()
if(idCatche === undefined){
    await create(numberRoom, typeRoom, price, beds, bathrooms, breakfast, wifi, airConditioning,)
    successAlert("Successfully created a new room")
}else{
    await update(idCatche, numberRoom, typeRoom, price, beds, bathrooms, breakfast, wifi, airConditioning)
    idCatche = undefined
    successAlert("Successfully updated the room")
}
form.reset();
await index()
})

// Event that listens to the table's edit or delete buttons
tbody.addEventListener("click", async function (e){
    if(e.target.classList.contains("btn-warning")){
        idCatche = e.target.dataset.id
        let room = await find(idCatche)
        numberRoom.value = room.numberRoom
        typeRoom.value = room.typeRoom
        price.value = room.price
        beds.value = room.beds
        bathrooms.value = room.bathrooms
        breakfast.checked = room.breakfast
        wifi.checked = room.wifi
        airConditioning.checked = room.airConditioning
    }
    if(e.target.classList.contains("btn-danger")){
       const id=e.target.dataset.id
       const confirmDelete = confirm("Are you sure you want to delete?")
       console.log(confirmDelete)
       if(confirmDelete){
        await deleteRoom(id)
        await index()
       } 
    }
})

// Function that renders all the rooms of the hotel
async function index(){
    const response = await fetch(URL_ROOMS);
    const rooms= await response.json();

    tbody.innerHTML = "";
    rooms.forEach(room => {
        tbody.innerHTML += `
            <td>${room.numberRoom}</td>
            <td>${room.typeRoom}</td>
            <td>${room.price}</td>
            <td>${room.beds}</td>
            <td>${room.bathrooms}</td>
            <td>${room.breakfast}</td>
            <td>${room.wifi}</td>
            <td>${room.airConditioning}</td>
            <td>
                <button type="button" data-id=${room.id} class="btn btn-warning">Edit</button>
                <button type="button" data-id=${room.id} class="btn btn-danger">Delete</button>
            </td>
        `
    })
}

// Function that finds a specific room
async function find(id){
    const response = await fetch(`${URL_ROOMS}/${id}`);
    const room = await response.json();
    return room;
}

// Function that creates a room

async function create(numberRoom, typeRoom, price, beds, bathrooms, breakfast, wifi, airConditioning){
    const newRoom = {
        numberRoom: numberRoom.value,
        typeRoom: typeRoom.value,
        price: price.value,
        beds: beds.value,
        bathrooms: bathrooms.value,
        breakfast: breakfast.checked ? true : false,
        wifi: wifi.checked ? true : false,
        airConditioning: airConditioning.checked ? true : false   
    };

    await fetch(`${URL_ROOMS}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newRoom)
    })
}

// Function that updates a specific room

async function update(idCatche, numberRoom, typeRoom, price, beds, bathrooms, breakfast, wifi, airConditioning){
  let updateRoom = {
    numberRoom: numberRoom.value,
    typeRoom: typeRoom.value,
    price: price.value,
    beds: beds.value,
    bathrooms: bathrooms.value,
    breakfast: breakfast.checked ? true : false,
    wifi: wifi.checked ? true : false,
    airConditioning: airConditioning.checked ? true : false   
  }

  await fetch(`${URL_ROOMS}/${idCatche}`,{
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updateRoom)
  })
}

// Function that deletes a specific room
async function deleteRoom(id){
    await fetch(`${URL_ROOMS}/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
}