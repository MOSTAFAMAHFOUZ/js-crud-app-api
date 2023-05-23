const baseUrl = "https://api.eraasoft.com/api/categories";
const sendDataForm = document.getElementById("send-data");
const inputName = document.getElementById("input-name");
const categoriesContainer = document.querySelector("table tbody");

export async function storeData() {
  sendDataForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    sendDataForm.children[0].textContent = "Loading ....";
    let data = {
      name: inputName.value,
    };

    let req = await fetch(baseUrl, {
      method: sendDataForm.method,
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(data),
    });
    req = await req.json();

    if ("errors" in req) {
      errorInsertion(req.errors.name[0]);
      sendDataForm.children[0].textContent = "";
    }
    if ("status" in req) {
      console.log(req);
      successInsertion(req);
    }
  });
}

function renderCategoryInTable(data) {
  categoriesContainer.insertAdjacentHTML(
    "afterbegin",
    `
    <tr>
        <td>1</td>
        <td>${data.name}</td>
        <td><button class="btn btn-danger delete-item" data-id="${data.id}">Delete</button></td>
    </tr>
    `
  );
}

function successInsertion(req) {
  sendDataForm.children[0].textContent = req.message;
  renderCategoryInTable(req.data);
  inputName.nextElementSibling.textContent = "";
  inputName.value = "";
}

function errorInsertion(error) {
  inputName.nextElementSibling.textContent = error;
}
