// =========================================
// GAME VARIABLES
// =========================================

let gameMode = "";

let players = [];

let playerCount = 5;

let currentPlayer = 0;

let policeIndex = -1;

let thiefIndex = -1;


// =========================================
// SELECT GAME MODE
// =========================================

function selectGameMode(mode) {

    gameMode = mode;

    if (mode === "offline") {

        document
            .getElementById("gameModeScreen")
            .classList.add("hidden");

        document
            .getElementById("playerCountScreen")
            .classList.remove("hidden");

    }

    else if (mode === "online") {

        alert("🌐 Online multiplayer is coming soon!");

    }

}


// =========================================
// BACK TO GAME MODE
// =========================================

function backToGameMode() {

    document
        .getElementById("playerCountScreen")
        .classList.add("hidden");

    document
        .getElementById("gameModeScreen")
        .classList.remove("hidden");

}


// =========================================
// CHARACTER DEFINITIONS
// =========================================

const characters = {

    King: {
        emoji: "👑",
        points: 1000
    },

    Queen: {
        emoji: "👸",
        points: 500
    },

    Minister: {
        emoji: "🎩",
        points: 300
    },

    Spy: {
        emoji: "🕵️",
        points: 250
    },

    Pawn: {
        emoji: "♟️",
        points: 200
    },

    Guard: {
        emoji: "💂",
        points: 150
    },

    Police: {
        emoji: "👮",
        points: 100
    },

    Thief: {
        emoji: "🥷",
        points: 0
    }

};


// =========================================
// GET CHARACTERS BASED ON PLAYER COUNT
// =========================================

function getCharacters(count) {

    const roleSets = {

        3: [
            "King",
            "Police",
            "Thief"
        ],

        4: [
            "King",
            "Queen",
            "Police",
            "Thief"
        ],

        5: [
            "King",
            "Queen",
            "Pawn",
            "Police",
            "Thief"
        ],

        6: [
            "King",
            "Queen",
            "Minister",
            "Police",
            "Thief",
            "Pawn"
        ],

        7: [
            "King",
            "Queen",
            "Minister",
            "Pawn",
            "Police",
            "Guard",
            "Thief"
        ],

        8: [
            "King",
            "Queen",
            "Minister",
            "Spy",
            "Pawn",
            "Police",
            "Guard",
            "Thief"
        ]

    };

    return roleSets[count] || roleSets[5];

}


// =========================================
// SELECT PLAYER COUNT
// =========================================

function selectPlayerCount() {

    const select =
        document.getElementById("playerCount");

    playerCount =
        parseInt(select.value);


    document
        .getElementById("playerCountScreen")
        .classList.add("hidden");


    document
        .getElementById("nameScreen")
        .classList.remove("hidden");


    document
        .getElementById("playerCountText")
        .textContent =
        `Enter names for ${playerCount} players.`;


    createNameInputs();

}


// =========================================
// CREATE NAME INPUTS
// =========================================

function createNameInputs() {

    const container =
        document.getElementById("nameInputs");

    container.innerHTML = "";


    for (let i = 0; i < playerCount; i++) {

        const input =
            document.createElement("input");

        input.type = "text";

        input.id = `playerName${i}`;

        input.placeholder =
            `Player ${i + 1} name`;

        input.className = "name-input";


        container.appendChild(input);

    }

}


// =========================================
// GO BACK TO PLAYER COUNT
// =========================================

function goBackToCount() {

    document
        .getElementById("nameScreen")
        .classList.add("hidden");


    document
        .getElementById("playerCountScreen")
        .classList.remove("hidden");

}


// =========================================
// SHUFFLE ARRAY
// =========================================

function shuffle(array) {

    for (
        let i = array.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() * (i + 1)
            );


        [
            array[i],
            array[j]
        ] = [
            array[j],
            array[i]
        ];

    }

    return array;

}


// =========================================
// START GAME
// =========================================

function startGame() {

    players = [];


    const roleList =
        getCharacters(playerCount);


    const shuffledRoles =
        shuffle([...roleList]);


    for (let i = 0; i < playerCount; i++) {

        const input =
            document.getElementById(
                `playerName${i}`
            );


        let name =
            input.value.trim();


        if (name === "") {

            name = `Player ${i + 1}`;

        }


        players.push({

            name: name,

            character: shuffledRoles[i],

            points: 0

        });

    }


    policeIndex =
        players.findIndex(
            player =>
                player.character === "Police"
        );


    thiefIndex =
        players.findIndex(
            player =>
                player.character === "Thief"
        );


    document
        .getElementById("nameScreen")
        .classList.add("hidden");


    showCharacters();

}


// =========================================
// SHOW CHARACTERS
// =========================================

function showCharacters() {

    const container =
        document.getElementById(
            "characterList"
        );


    container.innerHTML = "";


    players.forEach(player => {

        const card =
            document.createElement("div");


        card.className =
            "character-card";


        const character =
            characters[player.character];


        card.innerHTML = `

            <div class="role-emoji">
                ${character.emoji}
            </div>

            <div class="role-name">
                ${player.character}
            </div>

            <div class="points">
                ${character.points} points
            </div>

        `;


        container.appendChild(card);

    });


    document
        .getElementById("characterScreen")
        .classList.remove("hidden");

}


// =========================================
// START ROLE REVEAL
// =========================================

function startRoleReveal() {

    document
        .getElementById("characterScreen")
        .classList.add("hidden");


    currentPlayer = 0;


    showCurrentPlayer();

}


// =========================================
// SHOW CURRENT PLAYER
// =========================================

function showCurrentPlayer() {

    const player =
        players[currentPlayer];


    document
        .getElementById("roleScreen")
        .classList.remove("hidden");


    document
        .getElementById("currentPlayer")
        .textContent =
        `🎮 ${player.name}`;


    document
        .getElementById("roleDisplay")
        .innerHTML = "";


    document
        .getElementById("revealButton")
        .classList.remove("hidden");


    document
        .getElementById("nextButton")
        .classList.add("hidden");

}


// =========================================
// REVEAL ROLE
// =========================================

function revealRole() {

    const player =
        players[currentPlayer];


    const character =
        characters[player.character];


    const display =
        document.getElementById(
            "roleDisplay"
        );


    display.innerHTML = `

        <div class="role-card">

            <div class="role-emoji">
                ${character.emoji}
            </div>

            <div class="role-name">
                ${player.character}
            </div>

            <div class="points">
                ${character.points} points
            </div>

        </div>

    `;


    document
        .getElementById("revealButton")
        .classList.add("hidden");


    if (
        currentPlayer <
        players.length - 1
    ) {

        document
            .getElementById("nextButton")
            .classList.remove("hidden");

    }

    else {

        document
            .getElementById("nextButton")
            .classList.remove("hidden");


        document
            .getElementById("nextButton")
            .textContent =
            "👮 Start Police Round";

    }

}


// =========================================
// NEXT PLAYER
// =========================================

function nextPlayer() {

    if (
        currentPlayer <
        players.length - 1
    ) {

        currentPlayer++;

        showCurrentPlayer();

    }

    else {

        document
            .getElementById("roleScreen")
            .classList.add("hidden");

        startPoliceRound();

    }

}


// =========================================
// START POLICE ROUND
// =========================================

function startPoliceRound() {

    const police =
        players[policeIndex];


    document
        .getElementById("policeScreen")
        .classList.remove("hidden");


    document
        .getElementById("policeMessage")
        .textContent =
        `${police.name}, identify the Thief!`;


    const container =
        document.getElementById(
            "guessButtons"
        );


    container.innerHTML = "";


    players.forEach(
        (player, index) => {

            if (index === policeIndex) {
                return;
            }


            const button =
                document.createElement("button");


            button.className =
                "guess-button";


            button.textContent =
                player.name;


            button.onclick = function () {

                makeGuess(index);

            };


            container.appendChild(button);

        }
    );

}


// =========================================
// MAKE GUESS
// =========================================

function makeGuess(guessIndex) {

    const police =
        players[policeIndex];


    const thief =
        players[thiefIndex];


    const guessedPlayer =
        players[guessIndex];


    let policePoints = 0;

    let thiefPoints = 0;


    if (guessIndex === thiefIndex) {

        policePoints = 100;

        thiefPoints = 0;

    }

    else {

        policePoints = 0;

        thiefPoints = 100;

    }


    police.points = policePoints;


    thief.points = thiefPoints;


    players.forEach(
        player => {

            if (
                player !== police &&
                player !== thief
            ) {

                player.points =
                    characters[
                        player.character
                    ].points;

            }

        }
    );


    document
        .getElementById("policeScreen")
        .classList.add("hidden");


    showResult(
        guessIndex === thiefIndex,
        guessedPlayer
    );

}


// =========================================
// SHOW RESULT
// =========================================

function showResult(
    correct,
    guessedPlayer
) {

    const title =
        document.getElementById(
            "resultTitle"
        );


    const message =
        document.getElementById(
            "resultMessage"
        );


    if (correct) {

        title.textContent =
            "🎉 Police Caught the Thief!";


        message.textContent =
            `${guessedPlayer.name} was the Thief.`;

    }

    else {

        title.textContent =
            "😈 The Thief Escaped!";


        message.textContent =
            `${guessedPlayer.name} was not the Thief.`;

    }


    showScoreboard();


    document
        .getElementById("resultScreen")
        .classList.remove("hidden");

}


// =========================================
// SHOW SCOREBOARD
// =========================================

function showScoreboard() {

    const container =
        document.getElementById(
            "scoreBoard"
        );


    let html = `

        <table class="score-table">

            <tr>

                <th>Player</th>

                <th>Character</th>

                <th>Points</th>

            </tr>

    `;


    players.forEach(player => {

        html += `

            <tr>

                <td>
                    ${player.name}
                </td>

                <td>
                    ${characters[player.character].emoji}
                    ${player.character}
                </td>

                <td>
                    ${player.points}
                </td>

            </tr>

        `;

    });


    html += `</table>`;


    container.innerHTML = html;

}


// =========================================
// NEW GAME
// =========================================

function newGame() {

    players = [];

    currentPlayer = 0;

    policeIndex = -1;

    thiefIndex = -1;

    gameMode = "";


    document
        .getElementById("resultScreen")
        .classList.add("hidden");


    document
        .getElementById("gameModeScreen")
        .classList.remove("hidden");

}
