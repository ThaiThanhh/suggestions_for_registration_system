import { handleSweetAlert } from "./handleSweetAlert.mjs";
window.addEventListener("load", function () {
  document
    .getElementById("login-form")
    .addEventListener("submit", async (event) => {
      event.preventDefault(); // prevent form from submitting normally
      const data = new FormData(event.target);
      await axios
        .post("/login", {
          mssv: data.get("mssv"),
          password: data.get("password"),
        })
        .then((response) => {
          handleSweetAlert("success", response.data.status, "/");
        })
        .catch((error) => {
          //   console.log(error.response.data);
        });
    });
});
