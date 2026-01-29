/* =========================================
   ZADANIE 4: DOM i EVENTY - PEŁNE ROZWIĄZANIE
   ========================================= */

console.log("Skrypt 4 został załadowany poprawnie!");

/* --- CZĘŚĆ A i B: WYBIERANIE I MODYFIKACJA ELEMENTÓW --- */

// 12. & 14. Pobieranie elementów (getElementById, querySelector)
// Pobieramy główny kontener i nagłówek
const mainContainer = document.querySelector('.container');
const mainTitle = document.querySelector('h1');

// 13. Pobieranie wszystkich obrazków w galerii
const galleryImages = document.querySelectorAll('.gallery-card img');

// 18. Dynamiczna zmiana tytułu (innerHTML)
// Dodajemy stylowany span do tytułu
mainTitle.innerHTML = "Moja Galeria <span style='color: #e74c3c; font-size: 0.8em;'>(JS Interactive)</span>";

// 19. Manipulacja klasami CSS (classList)
// Po kliknięciu w tytuł dodajemy/usuwamy klasę (możesz dodać efekt w CSS dla .highlight)
mainTitle.style.cursor = "pointer";
mainTitle.addEventListener('click', () => {
    mainTitle.classList.toggle('highlight-text');
    console.log("Kliknięto nagłówek! Aktualne klasy:", mainTitle.className);
});

// 21. & 22. Pętla po obrazkach - dodawanie atrybutów i dataset
galleryImages.forEach((img, index) => {
    // Ustawiamy dymek z podpowiedzią (tooltip)
    img.setAttribute('title', `Kliknij, aby powiększyć zdjęcie nr ${index + 1}`);
    
    // Dodajemy atrybuty danych (data-*), które przydadzą się do Lightboxa
    img.dataset.id = index;
    img.dataset.group = "gallery-main";
    
    // 20. Zmiana stylu inline (drobny efekt wizualny)
    img.style.border = "1px solid #ddd";
});


/* --- CZĘŚĆ C: LIGHTBOX (INTERAKTYWNA GALERIA) --- */

// 1. Wstrzykiwanie HTML Lightboxa do strony (Dynamiczne tworzenie elementów)
// Dzięki temu nie musimy brudzić pliku HTML kodem modala
const lightboxHTML = `
<div id="js-lightbox" class="lightbox-modal">
    <a href="#" class="close-btn" id="js-close">&times;</a>
    <a href="#" class="nav-btn prev" id="js-prev">&#10094;</a>
    <a href="#" class="nav-btn next" id="js-next">&#10095;</a>
    <div class="lightbox-content">
        <img id="js-lightbox-img" src="" alt="Powiększenie">
        <p id="js-lightbox-caption" style="color: white; text-align: center; margin-top: 15px; font-size: 1.1rem; text-shadow: 1px 1px 2px black;"></p>
    </div>
</div>
`;

// Dodajemy kod HTML na sam koniec sekcji body
document.body.insertAdjacentHTML('beforeend', lightboxHTML);

// 2. Pobieranie referencji do elementów Lightboxa
const lightbox = document.getElementById('js-lightbox');
const lightboxImg = document.getElementById('js-lightbox-img');
const lightboxCaption = document.getElementById('js-lightbox-caption');
const btnClose = document.getElementById('js-close');
const btnPrev = document.getElementById('js-prev');
const btnNext = document.getElementById('js-next');

// Zmienna przechowująca aktualny numer slajdu
let currentIndex = 0;

// 3. Funkcja otwierająca Lightbox
function openLightbox(index) {
    currentIndex = index; // Zapisujemy, który obrazek otwieramy
    
    // Pobieramy dane klikniętego obrazka
    const sourceImg = galleryImages[currentIndex];
    
    // Podmieniamy src i alt w Lightboxie
    lightboxImg.src = sourceImg.src;
    lightboxCaption.textContent = sourceImg.alt; // Ustawiamy opis
    
    // Pokazujemy Lightbox (nadpisujemy style CSS display: none)
    lightbox.style.display = 'flex';
    
    // Blokujemy przewijanie strony w tle
    document.body.style.overflow = 'hidden';
}

// 4. Funkcja zamykająca Lightbox
function closeLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto'; // Przywracamy przewijanie strony
}

// 5. Funkcja zmieniająca slajd (Nawigacja)
function changeSlide(direction) {
    // direction: -1 (w lewo) lub 1 (w prawo)
    currentIndex += direction;
    
    // Logika karuzeli (zapętlanie)
    if (currentIndex < 0) {
        currentIndex = galleryImages.length - 1; // Skok na koniec
    } else if (currentIndex >= galleryImages.length) {
        currentIndex = 0; // Skok na początek
    }
    
    // Odświeżamy widok nowym indeksem
    openLightbox(currentIndex);
}

// 6. OBSŁUGA ZDARZEŃ (EVENTS)

// A. Kliknięcie w obrazek (Uruchomienie Lightboxa)
// Wybieramy linki otaczające obrazki
const triggers = document.querySelectorAll('.gallery-card a');

triggers.forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); // ZATRZYMUJEMY domyślne działanie (skok kotwicy CSS)
        
        // 15. Użycie closest (szukanie obrazka wewnątrz klikniętego linku)
        // Choć mamy referencję 'link', to dobra praktyka sprawdzenia struktury
        const img = link.querySelector('img');
        
        // Pobieramy ID z datasetu (które dodaliśmy w linii 33)
        const id = parseInt(img.dataset.id);
        
        openLightbox(id);
    });
});

// B. Obsługa przycisków Lightboxa
btnClose.addEventListener('click', (e) => { e.preventDefault(); closeLightbox(); });
btnPrev.addEventListener('click', (e) => { e.preventDefault(); changeSlide(-1); });
btnNext.addEventListener('click', (e) => { e.preventDefault(); changeSlide(1); });

// C. Kliknięcie w tło zamyka Lightbox
lightbox.addEventListener('click', (e) => {
    // Sprawdzamy, czy kliknięto w tło (lightbox), a nie w obrazek
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// D. Obsługa klawiatury (Accessibility)
document.addEventListener('keydown', (e) => {
    // Reagujemy tylko, jeśli lightbox jest otwarty
    if (lightbox.style.display === 'flex') {
        switch(e.key) {
            case 'Escape': 
                closeLightbox(); 
                break;
            case 'ArrowLeft': 
                changeSlide(-1); 
                break;
            case 'ArrowRight': 
                changeSlide(1); 
                break;
        }
    }
});