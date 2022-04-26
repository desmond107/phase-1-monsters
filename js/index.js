document.addEventListener("DOMContentLoaded", init);
let url;
let i =1;
let monsterArr;

function init() {
    url = "http://localhost:3000/monsters";
    fetch(url)
        .then(res => res.json())
        .then(data => monsterArr = data);
    callFetch(i);
    const fBtn = document.getElementById("forward");
    const bBtn = document.getElementById("back");
    const div = document.getElementById("monster-container");
    const formDiv = document.getElementById("create-monster");

    fBtn.addEventListener("click", () => {
        div.innerHTML = "";
        formDiv.innerHTML = "";
        if(i <= (monsterArr.length / 50 + 1)) {
            i++;
            callFetch(i);
            console.log(i);
        }
    });
    bBtn.addEventListener("click", () => {
        div.innerHTML = "";
        formDiv.innerText = "";
        if(i >1) {
            i--;
            callFetch(i);
            console.log(i);
        } else {
            callFetch(1);
        }
    })
}

function callFetch(i) {
    fetch(url + "/?_limit=50&_page=" + i)
        .then(res => res.json())
        .then(data => {
            createMonster();
            data.forEach(item => {
                addMonster(item);
            })
        });
}



function addMonster(item) {
    const div = document.getElementById("monster-container");

    const name = document.createElement("h2");
    const age=  document.createElement("h4");
    const bio = document.createElement("p");

    name.textContent = item.name;
    age.textContent = `Age: ${item.age}`;
    bio.textContent = `Bio: ${item.description}`;

    div.append(name, age, bio);
}

function createMonster() {
    const formDiv = document.getElementById("create-monster");
    const form = document.createElement("form");
    const input1 = document.createElement("input");
    const input2 = document.createElement("input");
    const input3 = document.createElement("input");
    const btn = document.createElement("button");

    input1.type = "text";
    input1.name = "name";
    input1.placeholder = "name..."
    input2.type = "text";
    input2.name = "age";
    input2.placeholder = "age..."
    input3.type = "text";
    input3.name = "description";
    input3.placeholder = "description..."
    btn.textContent = "Create";

    form.append(input1, input2, input3, btn);
    formDiv.append(form);

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const newMonster = {
            "name": e.target.name.value,
            "age": e.target.age.value,
            "description": e.target.description.value
        }
        form.reset();
        postMonster(newMonster);
    })
}

function postMonster(monster){
  fetch(url, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
      },
      body: JSON.stringify(monster)
  })
      .then(res => res.json())
      .then(data => console.log(data));
}