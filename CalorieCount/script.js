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

console.log(isInvalidInput("1e10"))