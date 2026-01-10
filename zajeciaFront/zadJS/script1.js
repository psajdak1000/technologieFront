console.log('Skrypt załadowany!');
const firstName = 'Jan';
const age = 25;
const isStudent = true;

// Array (Tablica) - lista wartości w nawiasach kwadratowych []
const languages = ['Java', 'Python', 'C#'];

//Object (Obiekt) - zbiór par klucz: wartość w nawiasach klamrowych {}

const person = {
    firstName: 'Jan',
    age: 25,
    city: 'Warszawa'
};

//null i undefined
const emptyValue = null;   
let notDefined;            // Zmienna zadeklarowana, bez przypisanej wartości 

//Operacje arytmetyczne
console.log("Dodawanie (10 + 5):", 10 + 5);
console.log("Odejmowanie (10 - 5):", 10 - 5);
console.log("Mnożenie (10 * 5):", 10 * 5);
console.log("Dzielenie (10 / 5):", 10 / 5);
console.log("Modulo (reszta z dzielenia 10 przez 3):", 10 % 3);
console.log("Potęgowanie (2 do potęgi 3):", 2 ** 3);

const numberFive = 5;
const stringFive = '5';

// ==(luzne porownanie) pod spodem konwertuje typy,
//  ===(scisle porownanie) sprawdza typy bez konwersji
console.log("Czy '5' == 5?", stringFive == numberFive); 
console.log("Czy '5' === 5?", stringFive === numberFive);

//  Operatory logiczne
const isAdult = true;
const hasCar = false;

console.log("AND (&&): Czy dorosły ma auto?", isAdult && hasCar);
console.log("OR (||): Czy dorosły LUB ma auto?", isAdult || hasCar);
console.log("NOT (!): Zaprzeczenie posiadania auta:", !hasCar);

//Sprawdzanie typów za pomocą typeof
console.log('Typ zmiennej firstName:', typeof firstName);
console.log('Typ zmiennej age:', typeof age);
console.log('Typ zmiennej isStudent:', typeof isStudent);
console.log('Typ zmiennej languages:', typeof languages);
console.log('Typ zmiennej person:', typeof person);
console.log('Typ zmiennej emptyValue:', typeof emptyValue);
console.log('Typ zmiennej notDefined:', typeof notDefined);