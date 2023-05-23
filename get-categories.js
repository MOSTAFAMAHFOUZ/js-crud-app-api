let categoryContainer = document.querySelector("table tbody");
let nextBtn = document.getElementById("next");
let prevBtn = document.getElementById("prev");
let page = 1;
let lastPage = 1;

async function getCategories() {
  categoryContainer.innerHTML = `
    <tr>
        <td colspan="2">Loading ...</td>
    </tr>
    `;
  let data = await fetch(
    "https://api.eraasoft.com/api/categories?page=" + page,
    {
      headers: {
        accept: "application/json",
        "Content-type": "application/json",
      },
    }
  );
  data = await data.json();
  lastPage = +data.links.next.slice(-1);
  renderElements(data.data);
}
nextBtn.addEventListener("click", function () {
  if (page < lastPage) {
    page++;
    getCategories();
  }
});

prevBtn.addEventListener("click", function () {
  if (page > 1) {
    page--;
    getCategories();
  }
});

function renderElements(data) {
  let newItems = data.map(function (item, index) {
    return `
            <tr>
                <td>${index + 1}</td>
                <td>${item.name}</td>
                <td><button class="btn btn-danger delete-item" data-id="${
                  item.id
                }">Delete</button></td>
            </tr>
        `;
  });
  categoryContainer.innerHTML = newItems.join("");
}

export { getCategories };
