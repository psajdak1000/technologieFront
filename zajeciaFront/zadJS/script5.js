document.addEventListener('DOMContentLoaded', () => {
    
    // --- KONFIGURACJA I POBIERANIE ELEMENTÓW ---
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const successMsg = document.getElementById('successMessage');

    // Pobieramy pola formularza
    const fields = {
        username: document.getElementById('username'),
        email: document.getElementById('email'),
        phone: document.getElementById('phone'),
        topic: document.getElementById('topic'),
        message: document.getElementById('message'),
        consent: document.getElementById('consent')
    };

    // --- FUNKCJE POMOCNICZE (UX) ---

    // Funkcja ustawiająca błąd
    const setError = (element, msg) => {
        const inputGroup = element.closest('.form-group');
        const errorDisplay = inputGroup.querySelector('.error-text');

        errorDisplay.innerText = msg;
        inputGroup.classList.add('error');
        inputGroup.classList.remove('success');
    };

    // Funkcja ustawiająca sukces
    const setSuccess = (element) => {
        const inputGroup = element.closest('.form-group');
        const errorDisplay = inputGroup.querySelector('.error-text');

        errorDisplay.innerText = '';
        inputGroup.classList.add('success');
        inputGroup.classList.remove('error');
    };

    // Regex dla Emaila
    const isValidEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    // Regex dla Telefonu (dokładnie 9 cyfr)
    const isValidPhone = (phone) => {
        const re = /^\d{9}$/;
        return re.test(phone);
    };

    // --- GŁÓWNA FUNKCJA WALIDUJĄCA ---
    
    const validateInputs = () => {
        let isValid = true;

        // 1. Walidacja Imienia (min 2 litery)
        const usernameVal = fields.username.value.trim();
        // Regex: tylko litery (w tym polskie) i spacje
        if (usernameVal.length < 2 || !/^[a-zA-ZąęćłńóśźżĄĘĆŁŃÓŚŹŻ\s]+$/.test(usernameVal)) {
            setError(fields.username, 'Imię musi mieć min. 2 litery (bez cyfr).');
            isValid = false;
        } else {
            setSuccess(fields.username);
        }

        // 2. Walidacja Emaila
        const emailVal = fields.email.value.trim();
        if (!isValidEmail(emailVal)) {
            setError(fields.email, 'Podaj poprawny adres email.');
            isValid = false;
        } else {
            setSuccess(fields.email);
        }

        // 3. Walidacja Telefonu (Opcjonalny)
        const phoneVal = fields.phone.value.trim();
        if (phoneVal !== '') {
            // Jeśli coś wpisano, sprawdzamy czy to 9 cyfr
            if (!isValidPhone(phoneVal)) {
                setError(fields.phone, 'Telefon musi mieć 9 cyfr.');
                isValid = false;
            } else {
                setSuccess(fields.phone);
            }
        } else {
            // Jeśli pusty, czyścimy ewentualne błędy (ale nie dajemy zielonej ramki sukcesu, bo to opcjonalne)
            const group = fields.phone.closest('.form-group');
            group.classList.remove('error', 'success');
            group.querySelector('.error-text').innerText = '';
        }

        // 4. Walidacja Tematu (Select)
        if (fields.topic.value === '') {
            setError(fields.topic, 'Wybierz temat wiadomości.');
            isValid = false;
        } else {
            setSuccess(fields.topic);
        }

        // 5. Walidacja Wiadomości (min 10 znaków)
        const messageVal = fields.message.value.trim();
        if (messageVal.length < 10) {
            setError(fields.message, 'Wiadomość musi mieć min. 10 znaków.');
            isValid = false;
        } else {
            setSuccess(fields.message);
        }

        // 6. Walidacja Zgody (Checkbox)
        if (!fields.consent.checked) {
            setError(fields.consent, 'Musisz zaakceptować regulamin.');
            isValid = false;
        } else {
            setSuccess(fields.consent);
        }

        return isValid;
    };

    // --- CZĘŚĆ B: WALIDACJA REAL-TIME ---
    // Dodajemy nasłuchiwanie na każde pole
    Object.values(fields).forEach(input => {
        // 'blur' = gdy użytkownik opuści pole (kliknie poza nie)
        input.addEventListener('blur', () => {
            validateInputs(); // Można tu zoptymalizować, by walidować tylko to jedno pole
        });

        // 'input' = gdy użytkownik pisze (żeby błąd zniknął natychmiast po poprawieniu)
        input.addEventListener('input', () => {
            if (input.closest('.form-group').classList.contains('error')) {
                validateInputs();
            }
        });
    });

    // --- CZĘŚĆ A & C: WYSYŁKA FORMULARZA ---
    
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Zatrzymaj domyślne przeładowanie strony

        if (validateInputs()) {
            // C.17: Zablokuj przycisk
            submitBtn.disabled = true;
            submitBtn.textContent = 'Wysyłanie...';

            // A.17: FormData API - zbieranie danych
            const formData = new FormData(form);
            
            // Konwersja do obiektu dla łatwiejszego podglądu w konsoli
            const formObject = Object.fromEntries(formData.entries());
            
            // A.18: Wyświetlenie danych w konsoli
            console.log('--- WYSYŁANIE DANYCH ---');
            console.log(formObject);
            
            // Pobranie radio buttona ręcznie (dla pewności A.16)
            const contactMethod = document.querySelector('input[name="contactMethod"]:checked').value;
            console.log('Preferowany kontakt:', contactMethod);

            // Symulacja wysyłki do serwera (1.5 sekundy)
            setTimeout(() => {
                // C.18: Sukces
                successMsg.style.display = 'block';
                form.reset(); // Wyczyść pola
                
                // Usuń zielone ramki
                document.querySelectorAll('.form-group').forEach(g => g.classList.remove('success'));
                
                submitBtn.disabled = false;
                submitBtn.textContent = 'Wyślij wiadomość';

                // Ukryj komunikat po 5 sekundach
                setTimeout(() => {
                    successMsg.style.display = 'none';
                }, 5000);

            }, 1500);
        }
    });
});