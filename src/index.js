//Celsius or Farenheit
function celsiusTemp(event) {
  event.preventDefault();
  let newFarenheit = document.querySelector("#temp");
  newFarenheit.innerHTML = `91`;
}
let newFarenheit = document.querySelector("#farenheit");
newFarenheit.addEventListener("click", celsiusTemp);
