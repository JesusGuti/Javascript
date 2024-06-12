const calorieCounter = document.getElementById('calorie-counter');
const budgetNumberInput = document.getElementById('budget');
const entryDropdown = document.getElementById('entry-dropdown');
const addEntryButton = document.getElementById('add-entry');
const clearButton = document.getElementById('clear');
const output = document.getElementById('output');
let isError = false;

/**Los regex son expresiones regulares que van dentro de //**/
function cleanInputString(str) {
  /**
   * Character class []: sirve para encontrar cualquier caracter dentro de este arreglo
   * \s: encuentra cada espacio en blanco
   * \g global: van al final y sirven para continuar buscando aun despues de un match
  */
  const regex = /[+-\s]/g;
  return str.replace(regex, '');
}

function isInvalidInput(str) {
  /**
   * i:insesitive
   * +: Permite igualar un patrón que ocurre 1 o más veces
   * \d: Es un class character para reemplazar cualquier digito
   * **/
  const regex = /\d+e\d+/i;
  return str.match(regex);
}


function addEntry() {
  /**Template literal: Son literales delimitados con ``
     * Permitiendo strings multilinea, interpolación
     * Tambien permiten colocar expresiones embedidas con ${}
     * **/
  const targetInputContainer = document.querySelector(`#${entryDropdown.value} .input-container`);
   
  /**querySelectorAll: Devuelve una lista con los elementos del documento
   * con el grupo especificado de selectores por ejemplo todos los inputs del tipo texto
   * **/
  const entryNumber = targetInputContainer.querySelectorAll('input[type="text"]').length + 1;
  const HTMLString = `
  <label for="${entryDropdown.value}-${entryNumber}-name">Entry ${entryNumber} Name</label>
  <input type="text" id="${entryDropdown.value}-${entryNumber}-name" placeholder="Name" />
  <label for="${entryDropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
  <input
    type="number"
    min="0"
    id="${entryDropdown.value}-${entryNumber}-calories"
    placeholder="Calories"
  />`;
  targetInputContainer.insertAdjacentHTML('beforeend', HTMLString);
}

function calculateCalories(e) {
  e.preventDefault();
  isError = false;

  const breakfastNumberInputs = document.querySelectorAll('#breakfast input[type=number]');
  const lunchNumberInputs = document.querySelectorAll('#lunch input[type=number]');
  const dinnerNumberInputs = document.querySelectorAll('#dinner input[type=number]');
  const snacksNumberInputs = document.querySelectorAll('#snacks input[type=number]');
  const exerciseNumberInputs = document.querySelectorAll('#exercise input[type=number]');

  const breakfastCalories = getCaloriesFromInputs(breakfastNumberInputs);
  const lunchCalories = getCaloriesFromInputs(lunchNumberInputs);
  const dinnerCalories = getCaloriesFromInputs(dinnerNumberInputs);
  const snacksCalories = getCaloriesFromInputs(snacksNumberInputs);
  const exerciseCalories = getCaloriesFromInputs(exerciseNumberInputs);
  const budgetCalories = getCaloriesFromInputs([budgetNumberInput]);

  if (isError) {
    return;
  }

  const consumedCalories = breakfastCalories + lunchCalories + dinnerCalories + snacksCalories;
  const remainingCalories = budgetCalories - consumedCalories + exerciseCalories;
  const surplusOrDeficit = remainingCalories >= 0 ? 'Surplus' : 'Deficit';
  output.innerHTML = `
  <span class="${surplusOrDeficit.toLowerCase()}">${Math.abs(remainingCalories)} Calorie ${surplusOrDeficit}</span>
  <hr>
  <p>${budgetCalories} Calories Budgeted</p>
  <p>${consumedCalories} Calories Consumed</p>
  <p>${exerciseCalories} Calories Burned</p>
  `;

  output.classList.remove('hide');
}

function getCaloriesFromInputs(list) {
  let calories = 0;

  for (let i = 0; i < list.length; i++) {
    const currVal = cleanInputString(list[i].value);
    const invalidInputMatch = isInvalidInput(currVal);

    /**Valores truthy o falsy
       * Es falsy si es evaluado a falso cuando es convertido a boolean Ej:null
       *  Es truthy
      **/
    if (invalidInputMatch) {
      alert(`Invalid Input: ${invalidInputMatch[0]}`);
      isError = true;
      return null;
    }
    calories += Number(currVal);
  }
  return calories;
}

function clearForm() {
  const inputContainers = Array.from(document.querySelectorAll('.input-container'));

  for (let i = 0; i < inputContainers.length; i++) {
    inputContainers[i].innerHTML = '';
  }

  budgetNumberInput.value = '';
  output.innerText = '';
  output.classList.add('hide');
}

addEntryButton.addEventListener("click", addEntry);
calorieCounter.addEventListener("submit", calculateCalories);
clearButton.addEventListener("click",clearForm);

  
  