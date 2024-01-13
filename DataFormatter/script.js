const currentDateParagraph = document.getElementById("current-date");
const dateOptionsSelectElement = document.getElementById("date-options");

/**Objeto DATE
 * Tenemos los metodos para obtener los datos
**/
const date = new Date();
const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();
const hours = date.getHours();
const minutes = date.getMinutes();

const formattedDate = `${day}-${month}-${year}`;
currentDateParagraph.textContent = formattedDate;

/**Se puede tener un evento para el cambio**/
dateOptionsSelectElement.addEventListener("change", () => {

  switch (dateOptionsSelectElement.value) {
    case "yyyy-mm-dd":
      currentDateParagraph.textContent = formattedDate
        .split("-") //Split para separar un cadena en base a un caracter
        .reverse()  //Para invertir un arreglo
        .join("-"); // Unir un arreglo con un caracter
      break;
    case "mm-dd-yyyy-h-mm":
      currentDateParagraph.textContent = `${month}-${day}-${year} ${hours} Hours ${minutes} Minutes`;
      break;
    default:
      currentDateParagraph.textContent = formattedDate;
      break;
  }
});
