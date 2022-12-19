// @ partie calculatrice

// ? définition des variables de calculs et d'affichage
let mainString = ''
let displayString = ''

// ? lockNumber pour 'bloquer l'accès' à la fonction numFunction
let lockNumber = false

// ? cette regExp nous indique si le dernier élément n'est pas un nombre
const regExp = /.[^0-9.]$/i
const operatorRegExp = /.[^0-9.]/i // on met un caractère devant pour fixer le bug des nombres négatifs
// attention, à cause de ça la var opérateur prend 2 caractères (le permier un chiffre le second l'opérateur)
// de même, le mainNumArray[0] perd son dernier chiffre (mais cela ne change pas le résultat)


// ? définition des clicks
// function() {functionName()} pour avoir des paramètres dans la fonction sans qu'elle ne s'execute seule

document.getElementById('b1').onclick = function() {numFunction(1)};
document.getElementById('b2').onclick = function() {numFunction(2)};
document.getElementById('b3').onclick = function() {numFunction(3)};
document.getElementById('b4').onclick = function() {numFunction(4)};
document.getElementById('b5').onclick = function() {numFunction(5)};
document.getElementById('b6').onclick = function() {numFunction(6)};
document.getElementById('b7').onclick = function() {numFunction(7)};
document.getElementById('b8').onclick = function() {numFunction(8)};
document.getElementById('b9').onclick = function() {numFunction(9)};
document.getElementById('b0').onclick = function() {numFunction(0)};
document.getElementById('b.').onclick = function() {numFunction('.')}
document.getElementById('b+').onclick = function() {operatorFunction('+')};
document.getElementById('b-').onclick = function() {operatorFunction('-')};
document.getElementById('b*').onclick = function() {operatorFunction('*')};
document.getElementById('b/').onclick = function() {operatorFunction('/')};
document.getElementById('bAC').onclick = function() {operatorFunction('AC')};
document.getElementById('bDEL').onclick = function() {operatorFunction('DEL')};
document.getElementById('b=').onclick = function() {operatorFunction('=')};

function numFunction(num) {
    // ! condition locknumber a vérifier

    if (lockNumber) {
        return
    }
    // ! ajouter une contrainte sur la taille du nombre

    // * condition sur le dernier élément de mainString
    if (regExp.test(mainString)) {
        displayString = ''
    }

    // * on ajoute le num à la mainString; typeof(mainString) == string
    mainString += num
    displayString += num
    document.getElementById('screendisplay').innerHTML = displayString
}

function operatorFunction(operator) {

    // ! to fix first number negative
    // ? gestion du - en début de ligne
    if (mainString == '' && operator == '-') {
        mainString += operator
        displayString += operator
        document.getElementById('screendisplay').innerHTML = displayString
        return
    }

    // ? gestion de l'erreur si la mainString est vide ou contient déjà un opérateur
    if (mainString == ''|| regExp.test(mainString)) {
        return
    }

    // ? on évalue en avance la mainString pour éviter les problèmes d'importance des opérateurs
    if (operator != 'DEL' && operator !='AC') {
        console.log(mainString,mainString.search(operatorRegExp))

        // ! to fix float precision
        if (mainString.search(operatorRegExp) != -1) {
            let mainNumArray = mainString.split(operatorRegExp)
            let operator = mainString.match(operatorRegExp)[0]
            console.log(mainNumArray,operator)
            displayString = eval(mainNumArray[0] + operator + mainNumArray[1]).toPrecision(9).toString()
            mainString = displayString
            
        }
        displayString = eval(mainString).toString();
        mainString = displayString;
    }

    // ! on remet lockNumber à false sauf si l'opérateur est DEL
    if (operator != 'DEL' && operator != '=') {
        lockNumber = false
    }


    // ? switch des operators
    switch(operator) {
        // ? + on ajoute l'opérateur + à mainString
        case '+':
            mainString += operator;
            break;
        // ? - on ajoute l'opérateur - à mainString
        case '-':
            mainString += operator;
            break;
        // ? * on ajoute l'opérateur * à mainString
        case '*':
            mainString += operator;
            break;
        // ? / on ajoute l'opérateur / à mainString
        case '/':
            mainString += operator;
            break;

        // ? DEL, si le dernier élément est un chiffre, on le retire de mainString et displayString
        case 'DEL':
            if (! regExp.test(mainString) && !lockNumber) {
                mainString = mainString.slice(0,-1)
                displayString = displayString.slice(0,-1)
            };
            break;

        // ? AC, on remet tout à 0
        case 'AC':
            mainString = '';
            displayString = '';
            break;
        
        // ? =, affiche le resultat
        case '=':
            // ! interdiction de remettre un nombre après l'affichage du resultat
            lockNumber = true

            // ? affichage et réafectations
            document.getElementById('screendisplay').innerHTML = displayString;
            break;
    }

    // ? on affiche la displayString 
    document.getElementById('screendisplay').innerHTML = displayString

}

// @ partie Menu

document.querySelector('.menu').onclick = function() {menu()};

function menu() {
    // test
    alert('test menu click')
}