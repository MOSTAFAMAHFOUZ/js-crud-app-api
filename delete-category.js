const categoryContainer = document.querySelector("table tbody");
const baseUrl = "https://api.eraasoft.com/api/categories";
export async function deleteCategory() {
  categoryContainer.addEventListener("click", async function (e) {
    if (e.target.classList.contains("delete-item")) {
      e.target.closest("tr").remove();
      let id = e.target.dataset.id;
      let req = await fetch(baseUrl + "/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      });
      req = await req.json();
      if ("errors" in req) {
        alert(req.message);
      } else {
        alert(req.message);
      }
      //   console.log(req);
    }
  });
}
