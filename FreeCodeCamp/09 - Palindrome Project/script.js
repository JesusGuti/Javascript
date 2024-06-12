const userInput = document.getElementById("text-input");
const checkButton = document.getElementById("check-btn");
const divResult = document.getElementById("result");

const checkForPalindrome = (input) =>{
    /**Vamos a guardar la cadena original**/
    const original = input;
    if(input === ''){
        alert("Please input a value");
        return;
    }
    /**Sirve para reemplazar un hijo de un elemento**/
    divResult.replaceChildren();
    /**Usando regex podemos quitar los caracteres alfanujmericos
     * ^ Sirve para negar una clase de caracteres
     *  Basicamente vamos a reemplazar por "" aquellos caracteres que no sean alfanumericos
     * g global, encuentra un caso y continua
     * i case sensitive
    **/
    const lowerCase = input.replace(/[^A-Za-z0-9]/gi,"").toLowerCase();
    console.log(lowerCase)
    /**Aqui separamos la cadena, revertimos y unimos**/
    const reverse = lowerCase.split("").reverse().join("");
    console.log(reverse)
    const message = `<strong>${original}</strong> ${lowerCase === reverse ? "is":"is not"} a palindrome`;

    /**Cremos de forma dinamica un elemento p**/
    const paragraph = document.createElement('p');
    paragraph.innerHTML = message;
    /**Ponemos una propiedad a la tag p**/
    paragraph.classList.add("user-input");
    /**Añadimos un hijo al div**/
    divResult.appendChild(paragraph);

    divResult.classList.remove("hidden");
}

userInput.addEventListener("keydown",(e)=>{
    if(e.key == 'Enter'){
        checkForPalindrome(userInput.value);
        userInput.value = '';
    }
})

checkButton.addEventListener("click",() =>{
    checkForPalindrome(userInput.value);
    userInput.value = '';
});