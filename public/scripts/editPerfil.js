import Modal from './modal.js';
import dotenv from 'dotenv';

dotenv.config()
const modal = Modal();

const sendChangesButton = document.querySelector('.sendButton');
sendChangesButton.addEventListener("click", screenModal);

function screenModal(){
    console.log("click")
    event.preventDefault()

    let editForm = document.querySelector('#editProfile form')
    
    const id = editForm.className 
    const name = document.getElementById('nameUser').value || 'empty'
    const email = document.getElementById('email').value || 'empty'
    const password = document.getElementById('password').value || 'empty'
    const location = document.getElementById('location').value

    const form = document.querySelector('.modal form')
    
    form.setAttribute('action', `${process.env.API_HOST}/edit/${id}/${name}/${email}/${password}/${location}`)

    modal.open()
}