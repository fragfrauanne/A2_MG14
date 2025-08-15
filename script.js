const tasks = [
    { question: "wann nach Deutschland kommen", answer: "Wann bist du nach Deutschland gekommen?" },
    { question: "wo früher wohnen", answer: "Wo hast du früher gewohnt?" },
    { question: "wo aufwachsen", answer: "Wo bist du aufgewachsen?" },
    { question: "früher oft Freunde mit nach Hause bringen", answer: "Hast du früher oft Freunde mit nach Hause gebracht?" },
    { question: "in den Kindergarten gehen", answer: "Bist du in den Kindergarten gegangen?" },
    { question: "was dir als Kind nicht schmecken", answer: "Was hat dir als Kind nicht geschmeckt?" },
    { question: "wo sich früher mit Freunden treffen", answer: "Wo hast du dich früher mit Freunden getroffen?" },
    { question: "welche Sendungen früher gern ansehen", answer: "Welche Sendungen hast du früher gern angesehen?" },
    { question: "wer dir früher vorlesen", answer: "Wer hat dir früher vorgelesen?" },
    { question: "oft bei deinen Großeltern bleiben", answer: "Bist du oft bei deinen Großeltern geblieben?" },
    { question: "wo deinen besten Freund kennenlernen", answer: "Wo hast du deinen besten Freund kennengelernt?" },
    { question: "als Kind manchmal schlechte Noten bekommen", answer: "Hast du als Kind manchmal schlechte Noten bekommen?" },
    { question: "was früher am liebsten essen", answer: "Was hast du früher am liebsten gegessen?" },
    { question: "wann das letzte Mal umziehen", answer: "Wann bist du das letzte Mal umgezogen?" },
    { question: "mit wem manchmal streiten", answer: "Mit wem hast du manchmal gestritten?" },
    { question: "was als Kind gern trinken", answer: "Was hast du als Kind gern getrunken?" },
    { question: "gern zur Schule gehen", answer: "Bist du gern zur Schule gegangen?" },
    { question: "deinen Eltern manchmal im Haushalt helfen", answer: "Hast du deinen Eltern manchmal im Haushalt geholfen?" }
];

const container = document.getElementById("cardsContainer");
const fireworks = document.getElementById("fireworks");

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createCards(tasks) {
    container.innerHTML = "";

    shuffle(tasks).forEach(task => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">${task.question}</div>
                <div class="card-back">
                    <p>${task.answer}</p>
                    <div>
                        <button class="correctBtn">✅</button>
                        <button class="wrongBtn">❌</button>
                    </div>
                </div>
            </div>
        `;

        // Klicken auf die Karte dreht sie um, wenn sie noch nicht umgedreht ist
        // card.addEventListener("click", () => {
        //     if (!card.classList.contains("flipped")) {
        //         card.classList.add("flipped");
        //     }
        // });


        card.addEventListener("click", () => {
            card.classList.toggle("flipped");
        });


        // Beim "Richtig"-Button entfernen wir die Karte
        card.querySelector(".correctBtn").onclick = (e) => {
            e.stopPropagation(); // Prevent card flip
            card.classList.add("fade-out"); // fades out a card when you click the "checked" sign

            // Wait for the transition to finish before removing
            setTimeout(() => {
                card.remove();
                checkEnd();
            }, 600); // Match the CSS transition duration
        };


        // Beim "Falsch"-Button soll die Karte nach 1 Sekunde wieder umgedreht und neu positioniert werden
        card.querySelector(".wrongBtn").onclick = (e) => {
            e.stopPropagation();
            setTimeout(() => {
                card.classList.remove("flipped");
                repositionCard(card);
            }, 1000);
        };

        container.appendChild(card);
    });
}

// Diese Funktion entfernt die Karte aus dem Container und fügt sie an einer zufälligen Position wieder ein.
function repositionCard(card) {
    // Zuerst entfernen wir die Karte aus dem Container
    container.removeChild(card);
    // Bestimme die Anzahl der aktuell vorhandenen Karten
    const children = container.children;
    // Wähle einen zufälligen Index zwischen 0 und der Anzahl der vorhandenen Karten (inklusive Möglichkeit, am Ende einzufügen)
    const randomIndex = Math.floor(Math.random() * (children.length + 1));
    if (randomIndex === children.length) {
        container.appendChild(card);
    } else {
        container.insertBefore(card, children[randomIndex]);
    }
}



// Überprüft, ob alle Karten entfernt wurden und das Feuerwerk angezeigt werden soll.
function checkEnd() {
    if (container.children.length === 0) {
        fireworks.style.display = "block";
        setTimeout(() => { fireworks.style.display = "none"; }, 4000);
    }
}

createCards(tasks);

// layout toggling logic

const toggleBtn = document.getElementById("toggleLayoutBtn");
let isStacked = false;

toggleBtn.addEventListener("click", () => {
    isStacked = !isStacked;
    container.classList.toggle("stack-mode", isStacked);
    container.classList.toggle("grid-mode", !isStacked);
});
