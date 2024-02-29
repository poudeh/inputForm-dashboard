const usersWrapper = document.querySelector('.st_table');
const deleteModal = document.querySelector('#deleteModal');
const exitDeleteModal = document.querySelector('#exitDeleteModal')
const confirmDeleteBtn = document.querySelector('#confirm-delete__btn')

const editModal = document.querySelector('#edit-modal')
const exitEditModal = document.querySelector('#exitEditModal')
const confirmEditUser = document.querySelector('#edit-user--btn')

const firstnameInput = document.querySelector('#firstname')
const lastnameInput = document.querySelector('#lastname')
const usernameInput = document.querySelector('#username')
const emailInput = document.querySelector('#email')

let mainUserID = null


async function getAllUsers(params) {
    await fetch('http://localhost:8003/api/users/all')
        .then(res => res.json())
        .then(data => {
            console.log(data);
            showUsersInDom(data)

        })

}

function showUsersInDom(users) {
    usersWrapper.innerHTML = ''
    users.forEach(user => {
        usersWrapper.insertAdjacentHTML('beforeend', `
        <div class="st_row">
        <div class="st_column _rank">${user.id}</div>
        <div class="st_column _name">${user.firstname}</div>
        <div class="st_column _surname">${user.lastname}</div>
        <div class="st_column _year">${user.username}</div>
        <div class="st_column _section">${user.email}</div>
        <div class="btn__wrapper">
            <button class="delete__btn" role="button" onclick="openDeleteModal(${user.id})">Delete</button>
            <button id="editBtn" class="delete__btn edit__btn" onclick=openEditModal(${JSON.stringify(user)})>Edit</button>
        </div>
      </div>
        
        `)


    });


}

function openDeleteModal(userID) {
    mainUserID = userID
    console.log(userID);
    deleteModal.classList.remove('d-none')
    deleteModal.classList.add('d-flex')

}


confirmDeleteBtn.addEventListener('click', () => {
    console.log('click');
    fetch(`http://localhost:8003/api/users/delete/${mainUserID}`, {
        method: 'DELETE'
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            deleteModal.classList.add('d-none')
            getAllUsers()
        })

})

exitDeleteModal.addEventListener('click', () => {
    deleteModal.classList.remove('d-flex')
    deleteModal.classList.add('d-none')
})

function openEditModal(user) {
    console.log(user);
    console.log('edit Modal opened');
    editModal.classList.remove('d-none')
    editModal.classList.add('d-flex')

    mainUserID = user.id

    firstnameInput.value = user.firstname;
    lastnameInput.value = user.lastname;
    usernameInput.value = user.username;
    emailInput.value = user.email;



}

confirmEditUser.addEventListener('click', () => {
    let newUserInfo = {
        firstname: firstnameInput.value,
        lastname: lastnameInput.value,
        username: usernameInput.value,
        email: emailInput.value
    }
    fetch(`http://localhost:8003/api/users/edit/${mainUserID}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUserInfo)
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            editModal.classList.remove('d-flex')
            editModal.classList.add('d-none')
            getAllUsers()

        })
})

exitEditModal.addEventListener('click', () => {
    editModal.classList.remove('d-flex')
    editModal.classList.add('d-none')
})

window.addEventListener('load', () => {
    getAllUsers()
})



