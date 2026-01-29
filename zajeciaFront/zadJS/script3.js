console.log("--- CZĘŚĆ A: RÓŻNE SPOSOBY TWORZENIA FUNKCJI ---");

// 8. Function Declaration (Deklaracja Funkcji)
// Klasyczny sposób. Najważniejsza cecha: HOISTING (można wywołać funkcję przed jej napisaniem).
function powitanieDeklaracja(imie) {
    return "Cześć " + imie + "! (Function Declaration)";
}

console.log(powitanieDeklaracja("Adam"));


// 9. Function Expression (Wyrażenie Funkcyjne)
// Funkcja przypisana do zmiennej (const). Tutaj NIE MA hoistingu (musisz zdefiniować, zanim użyjesz).
const powitanieWyrazenie = function(imie) {
    return "Cześć " + imie + "! (Function Expression)";
};

console.log(powitanieWyrazenie("Beata"));


// 10. Arrow Function (Funkcja Strzałkowa) - Wprowadzona w ES6
// Krótszy zapis. Idealna do callbacków.
// Jeśli jest jeden argument, nawiasy () są opcjonalne.
// Jeśli jest jedna instrukcja zwracająca wartość, klamry {} i słowo 'return' są opcjonalne.
const powitanieStrzalkowa = (imie) => {
    return "Cześć " + imie + "! (Arrow Function)";
};

// Wersja skrócona (bardzo popularna):
// const powitanieStrzalkowa = imie => "Cześć " + imie + "! (Arrow Function)";

console.log(powitanieStrzalkowa("Cezary"));


// 11. IIFE (Immediately Invoked Function Expression)
// Funkcja, która wykonuje się "SAMA" natychmiast po zdefiniowaniu.
// Często używana do izolowania zmiennych, żeby nie zaśmiecać globalnego kodu.
(function(imie) {
    console.log("Cześć " + imie + "! (IIFE - wykonana natychmiast)");
})("Dorota"); // <-- Tu przekazujemy argument "Dorota"


console.log("\n--- CZĘŚĆ B: PARAMETRY I FUNKCJE WYŻSZEGO RZĘDU ---");

// 13. Parametry domyślne (Default Parameters)
// Jeśli nie podasz drugiego argumentu, 'waluta' przyjmie wartość "PLN"
function podajCene(kwota, waluta = "PLN") {
    return "Cena wynosi: " + kwota + " " + waluta;
}

console.log(podajCene(100));          // Użyje domyślnego PLN
console.log(podajCene(50, "EUR"));    // Nadpisze PLN na EUR


// 14. Parametr REST (...args)
// Pozwala przyjąć dowolną liczbę argumentów i wrzuca je do tablicy 'liczby'
function sumujWszystko(...liczby) {
    let suma = 0;
    for (const liczba of liczby) {
        suma += liczba;
    }
    return "Suma argumentów: " + suma;
}

console.log(sumujWszystko(5, 10));          // Suma: 15
console.log(sumujWszystko(1, 1, 1, 1, 1));  // Suma: 5


// 15. Zwracanie obiektu z wieloma wartościami
// Funkcja nie może zwrócić dwóch zmiennych naraz, ale może zwrócić jeden obiekt z wieloma danymi
function stworzUzytkownika(imie, wiek) {
    // Logika biznesowa (np. sprawdzanie pełnoletności)
    const status = wiek >= 18 ? "Dorosły" : "Dziecko";

    return {
        imie: imie,
        wiek: wiek,
        status: status,
        czyAktywny: true
    };
}

const uzytkownik = stworzUzytkownika("Marek", 20);
console.log("Zwrócony obiekt:", uzytkownik);


// 16. Callback (Funkcja zwrotna)
// Funkcja, którą przekazujemy jako argument do innej funkcji, żeby została wykonana później.
function powitanieAdmina(imie) {
    console.log("Witaj Administratorze " + imie + "!");
}

function powitanieGoscia(imie) {
    console.log("Cześć Gościu " + imie + "!");
}

function zaloguj(imie, rola, funkcjaCallback) {
    console.log("Logowanie użytkownika: " + imie + " (" + rola + ")...");
    // Tutaj wywołujemy funkcję, którą dostaliśmy w argumencie!
    funkcjaCallback(imie); 
}

// Przekazujemy nazwę funkcji (bez nawiasów!) jako argument
zaloguj("Michał", "admin", powitanieAdmina);
zaloguj("Ania", "user", powitanieGoscia);


// 17. Funkcja zwracająca inną funkcję (Higher-Order Function)
// To jest tzw. "fabryka funkcji".
function stworzMnozik(mnoznik) {
    // Ta funkcja wewnętrzna "pamięta" zmienną mnoznik (to się nazywa Closure/Domknięcie)
    return function(liczba) {
        return liczba * mnoznik;
    };
}

const podwajacz = stworzMnozik(2); // Tworzymy funkcję mnożącą razy 2
const potrajacz = stworzMnozik(3); // Tworzymy funkcję mnożącą razy 3

console.log("5 * 2 =", podwajacz(5)); // Wynik: 10
console.log("5 * 3 =", potrajacz(5)); // Wynik: 15

console.log("\n--- CZĘŚĆ C: ZAKRES I DOMKNIĘCIA (CLOSURES) ---");

// 5. Różnica między var a let w pętli
// VAR: ma zasięg funkcyjny (lub globalny), więc "wycieka" poza pętlę.
console.log("Test pętli z VAR:");
for (var i = 0; i < 3; i++) {
    // pętla się kręci...
}
console.log("Czy widzę 'i' poza pętlą? TAK:", i); // Wyświetli 3 (Dziwne, prawda?)


// LET: ma zasięg blokowy, istnieje tylko wewnątrz klamerek { ... }
console.log("Test pętli z LET:");
for (let j = 0; j < 3; j++) {
    // pętla się kręci...
}
// console.log(j); // To spowodowałoby BŁĄD: "j is not defined". Jest bezpiecznie ukryte.
console.log("Czy widzę 'j' poza pętlą? NIE (to wywołałoby błąd)");


// 6. Zasięg blokowy (Block Scope)
{
    const sekret = "Jestem ukryty w bloku";
    var nieSekret = "Ja uciekam z bloku bo jestem var";
}

// console.log(sekret); // BŁĄD - sekret nie istnieje poza klamrami {}
console.log("Zmienna var poza blokiem:", nieSekret); // Działa, bo var ignoruje bloki inne niż funkcja


// 7. Domknięcie (Closure) - Licznik z zapamiętanym stanem
// Funkcja zwraca inną funkcję, która "pamięta" zmienne ze swojego miejsca narodzin.

function stworzLicznik() {
    let stanLicznika = 0; // Ta zmienna jest prywatna, nikt z zewnątrz jej nie zmieni!

    // 8. Wyjaśnienie: Ta funkcja poniżej tworzy DOMKNIĘCIE (Closure).
    // Mimo że funkcja 'stworzLicznik' już się wykonała i zniknęła,
    // ta funkcja wewnętrzna wciąż ma dostęp do 'stanLicznika' w swojej "pamięci podręcznej".
    return function() {
        stanLicznika++;
        return "Liczba kliknięć: " + stanLicznika;
    };
}

const mojLicznik = stworzLicznik(); // Tworzymy nową instancję licznika
const innyLicznik = stworzLicznik(); // To jest zupełnie niezależny licznik

console.log("Mój licznik:", mojLicznik()); // 1
console.log("Mój licznik:", mojLicznik()); // 2
console.log("Mój licznik:", mojLicznik()); // 3

console.log("Inny licznik:", innyLicznik()); // 1 (Niezależny stan!)


