function buy() {
  let btn = document.getElementById("buy");
  let id = btn.getAttribute("data-id");
  let p = document.getElementById("userId");
  let userId = p.getAttribute("data-id");
  console.log(id);
  axios
    .post("/users/update", {
      id: id,
      userId: userId,
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => console.log(err));
}
