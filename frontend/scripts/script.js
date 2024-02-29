import { testEmail , testPassword } from "./rules.js";
const $ = document;
const submitBtn = $.querySelector('#submitBtn')
const firstnameInput = $.querySelector('#firstname')
const lastnameInput = $.querySelector('#lastname')
const usernameInput = $.querySelector('#username')
const passwordInput = $.querySelector('#password')
const emailInput = $.querySelector('#email')

submitBtn.addEventListener('click' , (event)=> {
    console.log('click');
    event.preventDefault()
    let newUserInfo = {
        firstname: firstnameInput.value,
        lastname: lastnameInput.value,
        username: usernameInput.value,
        password: passwordInput.value,
        email:emailInput.value
    }
    let isPasswordValidate = testPassword(passwordInput.value)
    let isEmailValidate = testEmail(emailInput.value)

    if (firstnameInput.value.length > 5 && lastnameInput.value.length > 3 && usernameInput.value.length > 3 && isPasswordValidate && isEmailValidate ) {
        fetch('http://localhost:8003/api/users/new-user' , {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(newUserInfo)
        }).then(res=> {
            return res.json()
        }).then(data=> {
            console.log(data);
            swal.fire({
                icon: "success",
                title: "You are registered successfully",
                showConfirmButton: false,
                timer: 2000
            })

        })
        
    }else {
        console.log('it is not sent');
        swal.fire({
            icon: "error",
            title: "something is wrong check the inputs again.",
            showConfirmButton: false,
            timer: 2000
        })
    }

    clearInputs()






})

function clearInputs(params) {
    firstnameInput.value = ''
    lastnameInput.value = ''
    usernameInput.value = ''
    passwordInput.value = ''
    emailInput.value = ''



    
}