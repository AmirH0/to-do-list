
let addd = document.querySelector('.Add-task');
let ul = document.querySelector('.task-list');
let form = document.querySelector('.myform');
let input = document.querySelector('.input-task');
let editeinput = document.querySelector('.edite-input');
let removebtn = document.querySelector('.li-btn');
let miancontainer = document.querySelector(".main-container")
let editcontainer = document.querySelector(".edite-container")
let alert = document.querySelector(".alert-box")
let btnEdite = document.querySelector(".edite-btn-submit")

let itt = ""
editcontainer.style.display = "none"

let task_list = [];

form.addEventListener('submit', event => {
    event.preventDefault()
    if (input.value.trim() && input.value.length > 4) {
        let item = input.value;
        let itemid = input.value + String(Math.floor(Math.random() * 10000) + 1);
        AddItemToList(itemid, item)
    }
    else {
        alert.style.top = "10px"
        setTimeout(() => {
            alert.style.top = "-150px"
        }, 3000)
    }
})

// removebtn.addEventListener("click" , DeleteTask(e))
// removebtn.parentElement.remove();

function AddItemToList(itemid, item) {
    const newli = document.createElement("li");
    newli.setAttribute('data-id', itemid);
    task_list.push({ id: `${itemid}`, text: `${item}` })

    newli.insertAdjacentHTML("beforeend", `
    <p class="task-txt" id="${itemid}"  onclick="TaskDone(this)" >${item}</p>
    <div>
        <button class="li-btn-e" onclick="EditeTask(event)" >Edit</button>
        <button class="li-btn" onclick="DeleteTask(event)">Delete</button>
    </div>
    `)
    ul.appendChild(newli);
    console.log(task_list)
    input.value = ""
}

function DeleteTask(event) {
    let itemid = event.target.parentElement.parentElement.getAttribute('data-id');

    console.log(itemid)
    event.target.parentElement.parentElement.remove()
    console.log(event)
    task_list = task_list.filter(name => {
        return name.id != itemid;
    })
    console.log(task_list)

    //    let rem = event.target.getAttribute('data-id');
    //    btn.parentElement.remove();
    //    console.log(rem)
}

function edittaskvalue() {
    let res = task_list.find(id => {
        return id.id == itt
    })
    // editeinput.placeholder = "aslkdufog"
    res.text = editeinput.value.trim();
    let textin = document.querySelector(`#${itt}`)
    textin.innerHTML = editeinput.value.trim();
    console.log(res)
    console.log(textin)
    canselEdit()
}

function EditeTask(event) {
    miancontainer.style.filter = "blur(1rem)"
    editcontainer.style.display = "flex"
    itt = event.target.parentElement.parentElement.getAttribute('data-id');
    let res = task_list.find(id => {
        return id.id == itt
    })
    // editeinput.target.text = res.text
    // console.log(res)
    // document.querySelector(".edite-input").placeholder = "Type name here..";
    editeinput.placeholder = res.text

}

function TaskDone(event) {
    event.classList.toggle("done")
}

function canselEdit() {
    editcontainer.style.display = "none"
    miancontainer.style.filter = "none"
    editeinput.value = "";

}