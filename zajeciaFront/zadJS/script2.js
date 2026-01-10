console.log("--- CZĘŚĆ A: INSTRUKCJE WARUNKOWE ---");

// Funkcja sprawdzająca czy liczba jest parzysta/nieparzysta
function sprawdzParzystosc(liczba) {
    if (liczba % 2 === 0) {
        console.log("Liczba " + liczba + " jest parzysta.");
    } else {
        console.log("Liczba " + liczba + " jest nieparzysta.");
    }
}

// Testujemy funkcję:
sprawdzParzystosc(10);
sprawdzParzystosc(7);


// Kalkulator ocen (0-100 punktów -> ocena słowna)
function ocenStudenta(punkty) {
    if (punkty >= 90) {
        console.log("Wynik: " + punkty + " pkt -> Ocena: Bardzo dobra (5)");
    } else if (punkty >= 75) {
        console.log("Wynik: " + punkty + " pkt -> Ocena: Dobra (4)");
    } else if (punkty >= 50) {
        console.log("Wynik: " + punkty + " pkt -> Ocena: Dostateczna (3)");
    } else {
        console.log("Wynik: " + punkty + " pkt -> Ocena: Niedostateczna (1)");
    }
}

// Testujemy oceny:
ocenStudenta(95);
ocenStudenta(60);
ocenStudenta(30);


// Switch - Dni tygodnia
const numerDnia = 3; 

switch (numerDnia) {
    case 1:
        console.log("Dzień " + numerDnia + ": Poniedziałek");
        break;
    case 2:
        console.log("Dzień " + numerDnia + ": Wtorek");
        break;
    case 3:
        console.log("Dzień " + numerDnia + ": Środa");
        break;
    case 4:
        console.log("Dzień " + numerDnia + ": Czwartek");
        break;
    case 5:
        console.log("Dzień " + numerDnia + ": Piątek");
        break;
    case 6:
        console.log("Dzień " + numerDnia + ": Sobota");
        break;
    case 7:
        console.log("Dzień " + numerDnia + ": Niedziela");
        break;
    default:
        console.log("Nie ma takiego dnia tygodnia!");
}


// Operator trójargumentowy (Ternary Operator)
// Składnia: warunek ? wartość_jeśli_prawda : wartość_jeśli_fałsz

const wiek = 17;
const status = (wiek >= 18) ? "Pełnoletni" : "Niepełnoletni";

console.log("Wiek: " + wiek + " -> Status: " + status);

console.log("\n--- CZĘŚĆ B: PĘTLE ---");

// Pętla FOR: liczby od 1 do 10
console.log("Pętla FOR (1-10):");
for (let i = 1; i <= 10; i++) {
    console.log("Liczba: " + i);
}

// Pętla WHILE: odliczanie od 10 do 0
console.log("\nPętla WHILE (odliczanie):");
let licznik = 10;
while (licznik >= 0) {
    console.log("Odliczanie: " + licznik);
    licznik--; // Bardzo ważne! Zmniejszamy licznik, żeby nie zrobić nieskończonej pętli
}

//  Pętla FOR...OF: iteracja po tablicy (wartości)
console.log("\nPętla FOR...OF (tablica owoców):");
const owoce = ["Jabłko", "Banan", "Gruszka", "Śliwka"];

for (const owoc of owoce) {
    console.log("Lubię: " + owoc);
}

//  Pętla FOR...IN: iteracja po obiekcie (klucze)
console.log("\nPętla FOR...IN (właściwości samochodu):");
const samochod = {
    marka: "Toyota",
    model: "Corolla",
    rok: 2020,
    kolor: "Czerwony"
};

for (const klucz in samochod) {
    // Wyświetlamy nazwę klucza i przypisaną do niego wartość
    console.log(klucz + ": " + samochod[klucz]);
}

// BREAK i CONTINUE
console.log("\nTestowanie BREAK i CONTINUE:");
for (let i = 1; i <= 10; i++) {
    if (i === 3) {
        console.log("--- Pomijam 3 (CONTINUE) ---");
        continue; // Przerwij ten obrót pętli i idź do następnego
    }
    
    if (i === 7) {
        console.log("--- Stop na 7 (BREAK) ---");
        break; // Całkowicie zakończ pętlę
    }
    
    console.log("Wartość: " + i);
}


console.log("\n--- CZĘŚĆ C ---");
console.log("Tabliczka mnożenia:");

// Pętla zagnieżdżona 
for (let i = 1; i <= 10; i++) {
    let wiersz = ""; // Tworzymy pusty tekst dla każdego wiersza
    
    for (let j = 1; j <= 10; j++) {
        // Obliczamy wynik
        let wynik = i * j;
        
        // Dodajemy wynik do wiersza + odstęp, żeby było ładnie
        // Jeśli wynik jest jednocyfrowy, dodajemy spację dla wyrównania
        if (wynik < 10) {
            wiersz += wynik + "   "; 
        } else if (wynik < 100) {
            wiersz += wynik + "  ";
        } else {
            wiersz += wynik + " ";
        }
    }
    
    
    console.log(wiersz);
}