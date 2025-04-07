const categories = ["FILMY", "VIDEOHRY", "SERIALY", "HISTORIA"];
const values = [20, 40, 60];
let currentQuestion = null;
let currentPlayer = 0;

const questionsDatabase = {
    FILMY: {
        20: [
            {
                question: "Kto režíroval film Pulp Fiction?",
                options: ["Steven Spielberg", "Quentin Tarantino", "Martin Scorsese", "Christopher Nolan"],
                correct: "b"
            }
        ],
        40: [
            {
                question: "Kto hral hlavnú rolu v filme Titanic?",
                options: ["Johnny Depp", "Leonardo DiCaprio", "Brad Pitt", "Tom Hanks"],
                correct: "b"
            }
        ],
        60: [
            {
                question: "Kedy bol uvedený film Star Wars: Nová nádej?",
                options: ["1975", "1977", "1980", "1982"],
                correct: "b"
            }
        ]
    },
    VIDEOHRY: {
        20: [
            {
                question: "Aká hra je známa pre postavu Mario?",
                options: ["Super Mario", "Zelda", "Donkey Kong", "Minecraft"],
                correct: "a"
            }
        ],
        40: [
            {
                question: "Ktorá hra je považovaná za najpredávanejšiu hru?",
                options: ["Tetris", "Minecraft", "Grand Theft Auto V", "Fortnite"],
                correct: "b"
            }
        ],
        60: [
            {
                question: "Aká spoločnosť vyvinula hru The Last of Us?",
                options: ["Naughty Dog", "Ubisoft", "Rockstar", "Bethesda"],
                correct: "a"
            }
        ]
    },
    // Pridajte ďalšie kategórie podľa potreby
};

// Inicializácia hry
function initGame() {
    const grid = document.getElementById("questionsGrid");
    grid.innerHTML = ""; // Vyčisti grid pred pridaním nových otázok

    values.forEach(value => {  // Pre každú hodnotu bodov (20, 40, 60)
        categories.forEach(category => {  // Pre každú kategóriu
            const div = document.createElement("div");
            div.className = "question-value";
            div.textContent = value;
            div.dataset.category = category;
            div.dataset.value = value;
            div.dataset.used = "false";  // Nastaví sa, že otázka nebola použitá
            div.addEventListener("click", () => {
                if (div.dataset.used === "false") {  // Skontroluje, či bola otázka už použitá
                    showQuestion(category, value, div);
                }
            });
            grid.appendChild(div);  // Pridá div do gridu
        });
    });

    updatePlayers();  // Aktualizuje stav hráčov
}

// Zobrazenie otázky po kliknutí na bodovú hodnotu
function showQuestion(category, value, div) {
    const questionData = questionsDatabase[category][value].pop();  // Zoberie otázku z databázy
    if (!questionData) {
        alert("Táto otázka už bola použitá.");
        return;
    }

    currentQuestion = questionData;
    div.dataset.used = "true";  // Označí, že otázka bola použitá
    const questionContainer = document.getElementById("questionContainer");
    questionContainer.innerHTML = `
        <h2>${category} - ${value} bodov</h2>
        <p>${questionData.question}</p>
        <div>
            ${questionData.options.map((option, index) => `
                <button onclick="checkAnswer('${String.fromCharCode(97 + index)}')">${option}</button>
            `).join('')}
        </div>
    `;
}

// Kontrola odpovede
function checkAnswer(selectedOption) {
    const isCorrect = selectedOption === currentQuestion.correct;
    alert(isCorrect ? "Správna odpoveď!" : "Nesprávna odpoveď!");
    updatePlayers();
    currentQuestion = null;  // Vymaže aktuálnu otázku
    initGame();  // Reštartuje hru
}

// Aktualizácia hráčov (len ako príklad, môžete to upravit podľa potreby)
function updatePlayers() {
    const playersContainer = document.getElementById("players");
    playersContainer.innerHTML = `
        <p>Aktuálny hráč: Hráč ${currentPlayer + 1}</p>
        <button onclick="switchPlayer()">Prepnúť hráča</button>
    `;
}

// Prepnúť hráča
function switchPlayer() {
    currentPlayer = (currentPlayer + 1) % 2;  // Prepnúť medzi hráčmi 1 a 2
    updatePlayers();
}

// Spustenie hry
initGame();
