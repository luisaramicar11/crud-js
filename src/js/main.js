import '../scss/styles.scss'
import * as bootstrap from 'bootstrap'
const URL_ROOMS="http://localhost:3000/rooms"
const containerRooms = document.querySelector(".container-rooms")

index()
async function index(){
    const response = await fetch(URL_ROOMS)
    const rooms = await response.json()
    console.log(rooms)

    containerRooms.innerHTML=""
    rooms.forEach(room => {
        containerRooms.innerHTML+=`
        <div class="card text-light col-4 card-custom">
            <img src="https://www.sofitelbarucalablanca.com/wp-content/uploads/sites/19/2023/04/DUF_8644-v-ok-1170x780.jpg"
                class="card-img h-100 object-fit-cover" alt="example">
            <div class="card-body bg-light text-dark">
                <h5 class="card-title text-capitalize">${room.typeRoom}</h5>
                <h5 class="card-title">Price per night: $${room.price}</h5>
                <h5 class="card-title">Price per night: $${room.beds}</h5>
                <h5 class="card-title">Price per night: $${room.bathrooms}</h5>
            </div>
        </div>
        `
    })
}