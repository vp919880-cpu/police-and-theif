let gameMode = "";

let players = [];

let playerCount = 5;

let currentPlayer = 0;

let policeIndex = -1;

let thiefIndex = -1;

let roundNumber = 1;


/*
=========================================
CHARACTER DEFINITIONS
=========================================
*/

const allCharacters = [

    {
        name: "King",
        emoji: "👑",
        points: 1000
    },

    {
        name: "Queen",
        emoji: "👸",
        points: 500
    },

    {
        name: "Pawn",
        emoji: "♟️",
        points: 200
    },

    {
        name: "Police",
        emoji: "👮",
        points: 0
    },

    {
        name: "Thief",
        emoji: "🕵️",
        points: 0
    },

    {
        name: "Minister",
        emoji: "🧙",
        points: 300
    },

    {
        name: "Guard",
        emoji: "💂",
        points: 150
    },

    {
        name: "Spy",
        emoji: "🥷",
        points: 250
    }

];


/*
=========================================
GET CHARACTERS BASED ON PLAYER COUNT
=========================================
*/

function getCharacters(count) {

    if (count === 3) {

        return [
            allCharacters[0],
            allCharacters[3],
            allCharacters[4]
        ];

    }

    if (count === 4) {

        return [
            allCharacters[0],
            allCharacters[1],
            allCharacters[3],
            allCharacters[4]
        ];

    }

    if (count === 5) {

        return [
            allCharacters[0],
            allCharacters[1],
            allCharacters[2],
            allCharacters[3],
            allCharacters[4]
        ];

    }

    if (count === 6) {

        return [
            allCharacters[0],
            allCharacters[1],
            allCharacters[2],
            allCharacters[3],
            allCharacters[4],
            allCharacters[5]
        ];

    }

    if (count === 7) {

        return [
            allCharacters[0],
            allCharacters[1],
            allCharacters[2],
            allCharacters[3],
            allCharacters[4],
            allCharacters[5],
            allCharacters[6]
        ];

    }

    if (count === 8) {

        return [
            allCharacters[0],
            allCharacters[1],
            allCharacters[2],
            allCharacters[3],
            allCharacters[4],
            allCharacters[5],
            allCharacters[6],
            allCharacters[7]
        ];

    }

}


/*
=========================================
SHUFFLE
=========================================
*/

function shuffle(array) {

    for (let i = array.length - 1; i > 0; i--) {

        const j = Math.floor(
            Math.random() * (i + 1)
        );

        [array[i], array[j]] =
            [array[j], array[i]];

    }

    return array;

}
/*
=========================================
SELECT GAME MODE
=========================================
*/

function selectGameMode(mode) {

    gameMode = mode;

    if (mode === "online") {

        alert("🌐 Online multiplayer is coming soon!");

        return;

    }

    document.getElementById("gameModeScreen").classList.add("hidden");

    document.getElementById("playerCountScreen").classList.remove("hidden");
}


/*
=========================================
BACK TO GAME MODE
=========================================
*/

function backToGameMode() {

    document.getElementById("playerCountScreen").classList.add("hidden");

    document.getElementById("gameModeScreen").classList.remove("hidden");

}


/*
=========================================
SELECT PLAYER COUNT
=========================================
*/

function selectPlayerCount() {

    playerCount =
        parseInt(
            document.getElementById(
                "playerCount"
            ).value
        );


    document.getElementById(
        "playerCountScreen"
    ).classList.add("hidden");


    document.getElementById(
        "nameScreen"
    ).classList.remove("hidden");


    document.getElementById(
        "playerCountText"
    ).innerText =
        "Enter names for " +
        playerCount +
        " players.";


    createNameInputs();

}


/*
=========================================
CREATE NAME INPUTS
=========================================
*/

function createNameInputs() {

    const container =
        document.getElementById(
            "nameInputs"
        );


    container.innerHTML = "";


    for (
        let i = 1;
        i <= playerCount;
        i++
    ) {

        const input =
            document.createElement(
                "input"
            );


        input.type = "text";

        input.id =
            "player" + i;

        input.placeholder =
            "Player " + i;

        input.maxLength = 25;


        container.appendChild(input);

    }

}


/*
=========================================
BACK
=========================================
*/

function goBackToCount() {

    document.getElementById(
        "nameScreen"
    ).classList.add("hidden");


    document.getElementById(
        "playerCountScreen"
    ).classList.remove("hidden");

}


/*
=========================================
START GAME
=========================================
*/

function startGame() {

    players = [];

    roundNumber = 1;


    /*
    Get player names
    */

    for (
        let i = 1;
        i <= playerCount;
        i++
    ) {

        const input =
            document.getElementById(
                "player" + i
            );


        const name =
            input.value.trim();


        if (name === "") {

            alert(
                "Please enter all player names."
            );

            input.focus();

            return;

        }


        players.push({

            name: name,

            role: null,

            // Points earned in current round
            points: 0,

            // Total points from all rounds
            totalPoints: 0

        });

    }


    startNewRound();

}


/*
=========================================
START NEW ROUND
=========================================
*/

function startNewRound() {

    currentPlayer = 0;

    policeIndex = -1;

    thiefIndex = -1;


    /*
    Reset current round points
    */

    players.forEach(player => {

        player.points = 0;

    });


    /*
    Get characters
    */

    let characters =
        getCharacters(playerCount);


    /*
    Randomize characters
    */

    characters =
        shuffle([...characters]);


    /*
    Assign characters
    */

    players.forEach(
        (player, index) => {

            player.role =
                characters[index];

        }
    );


    /*
    Find Police
    */

    policeIndex =
        players.findIndex(
            player =>
                player.role.name === "Police"
        );


    /*
    Find Thief
    */

    thiefIndex =
        players.findIndex(
            player =>
                player.role.name === "Thief"
        );


    /*
    Show character list
    */

    showCharacters();


    document.getElementById(
        "nameScreen"
    ).classList.add("hidden");


    document.getElementById(
        "resultScreen"
    ).classList.add("hidden");


    document.getElementById(
        "characterScreen"
    ).classList.remove("hidden");

}


/*
=========================================
SHOW CHARACTER LIST
=========================================
*/

function showCharacters() {

    const container =
        document.getElementById(
            "characterList"
        );


    container.innerHTML = "";


    const heading =
        document.createElement("p");

    heading.innerHTML =
        "<b>Round " +
        roundNumber +
        "</b>";

    container.appendChild(heading);


    players.forEach(player => {

        const card =
            document.createElement(
                "div"
            );


        card.className =
            "character-card";


        card.innerHTML = `

            <div class="character-emoji">
                ${player.role.emoji}
            </div>

            <div class="character-info">

                <div class="character-name">
                    ${player.role.name}
                </div>

                <div class="character-points">

                    ${
                        player.role.name === "Police" ||
                        player.role.name === "Thief"

                        ?

                        "Guess dependent"

                        :

                        player.role.points +
                        " points"
                    }

                </div>

            </div>

        `;


        container.appendChild(card);

    });

}


/*
=========================================
START ROLE REVEAL
=========================================
*/

function startRoleReveal() {

    currentPlayer = 0;


    document.getElementById(
        "characterScreen"
    ).classList.add("hidden");


    document.getElementById(
        "roleScreen"
    ).classList.remove("hidden");


    showCurrentPlayer();

}


/*
=========================================
SHOW CURRENT PLAYER
=========================================
*/

function showCurrentPlayer() {

    const player =
        players[currentPlayer];


    document.getElementById(
        "currentPlayer"
    ).innerText =

        player.name +
        "'s Turn";


    document.getElementById(
        "roleDisplay"
    ).innerHTML = "";


    document.getElementById(
        "revealButton"
    ).classList.remove("hidden");


    document.getElementById(
        "nextButton"
    ).classList.add("hidden");

}


/*
=========================================
REVEAL ROLE
=========================================
*/

function revealRole() {

    const player =
        players[currentPlayer];


    let pointsText;


    if (

        player.role.name === "Police" ||

        player.role.name === "Thief"

    ) {

        pointsText =
            "Your points depend on the Police's guess.";

    }

    else {

        pointsText =
            player.role.points +
            " Points";

    }


    document.getElementById(
        "roleDisplay"
    ).innerHTML = `

        <div class="role-emoji">

            ${player.role.emoji}

        </div>


        <div class="role-name">

            ${player.role.name}

        </div>


        <div class="points">

            ${pointsText}

        </div>

    `;


    document.getElementById(
        "revealButton"
    ).classList.add("hidden");


    document.getElementById(
        "nextButton"
    ).classList.remove("hidden");

}


/*
=========================================
NEXT PLAYER
=========================================
*/

function nextPlayer() {

    currentPlayer++;


    if (
        currentPlayer <
        players.length
    ) {

        showCurrentPlayer();

    }

    else {

        startPoliceRound();

    }

}


/*
=========================================
POLICE ROUND
=========================================
*/

function startPoliceRound() {

    document.getElementById(
        "roleScreen"
    ).classList.add("hidden");


    document.getElementById(
        "policeScreen"
    ).classList.remove("hidden");


    const police =
        players[policeIndex];


    document.getElementById(
        "policeMessage"
    ).innerText =

        police.name +

        ", you are the Police. " +

        "Who do you think is the Thief?";


    const buttons =
        document.getElementById(
            "guessButtons"
        );


    buttons.innerHTML = "";


    players.forEach(
        (player, index) => {

            /*
            Police cannot select themselves
            */

            if (
                index === policeIndex
            ) {

                return;

            }


            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "guess-button";


            button.innerText =

                "🔎 " +
                player.name;


            button.onclick =

                function () {

                    makeGuess(index);

                };


            buttons.appendChild(button);

        }
    );

}


/*
=========================================
MAKE GUESS
=========================================
*/

function makeGuess(guessIndex) {

    const correct =

        guessIndex ===
        thiefIndex;


    /*
    Correct guess
    */

    if (correct) {

        players[policeIndex]
            .points = 100;


        players[thiefIndex]
            .points = 0;

    }


    /*
    Wrong guess
    */

    else {

        players[policeIndex]
            .points = 0;


        players[thiefIndex]
            .points = 100;

    }


    /*
    Give normal points
    */

    players.forEach(player => {

        if (

            player.role.name !== "Police" &&

            player.role.name !== "Thief"

        ) {

            player.points =
                player.role.points;

        }

    });


    /*
    ADD THIS ROUND'S POINTS
    TO TOTAL POINTS
    */

    players.forEach(player => {

        player.totalPoints +=
            player.points;

    });


    showResult(correct);

}


/*
=========================================
SHOW RESULT
=========================================
*/

function showResult(correct) {

    document.getElementById(
        "policeScreen"
    ).classList.add("hidden");


    document.getElementById(
        "resultScreen"
    ).classList.remove("hidden");


    if (correct) {

        document.getElementById(
            "resultTitle"
        ).innerHTML =

            `<span class="correct">

                🎉 Correct Guess!

            </span>`;


        document.getElementById(
            "resultMessage"
        ).innerText =

            players[policeIndex].name +

            " correctly identified the Thief!";

    }

    else {

        document.getElementById(
            "resultTitle"
        ).innerHTML =

            `<span class="wrong">

                ❌ Wrong Guess!

            </span>`;


        document.getElementById(
            "resultMessage"
        ).innerText =

            "The Thief was " +

            players[thiefIndex].name +

            ".";

    }


    showScoreboard();


    /*
    CREATE NEXT ROUND BUTTON
    */

    const resultScreen =
        document.getElementById(
            "resultScreen"
        );


    /*
    Remove old game buttons
    */

    const oldButtons =
        document.getElementById(
            "roundButtons"
        );


    if (oldButtons) {

        oldButtons.remove();

    }


    const buttonContainer =
        document.createElement("div");


    buttonContainer.id =
        "roundButtons";


    buttonContainer.innerHTML = `

        <button onclick="nextRound()">

            🎲 Next Round

        </button>

        <button
            class="secondary"
            onclick="stopGame()">

            🛑 Stop Game

        </button>

    `;


    resultScreen.appendChild(
        buttonContainer
    );

}


/*
=========================================
NEXT ROUND
=========================================
*/

function nextRound() {

    roundNumber++;

    startNewRound();

}


/*
=========================================
STOP GAME
=========================================
*/

function stopGame() {

    /*
    Hide current screens
    */

    document.getElementById(
        "characterScreen"
    ).classList.add("hidden");


    document.getElementById(
        "roleScreen"
    ).classList.add("hidden");


    document.getElementById(
        "policeScreen"
    ).classList.add("hidden");


    /*
    Show final result
    */

    document.getElementById(
        "resultScreen"
    ).classList.remove("hidden");


    document.getElementById(
        "resultTitle"
    ).innerHTML =

        `<span class="correct">

            🏆 Final Scores

        </span>`;


    document.getElementById(
        "resultMessage"
    ).innerText =

        "Game stopped after " +
        roundNumber +
        " round(s).";


    showFinalScoreboard();


    /*
    Remove round buttons
    */

    const roundButtons =
        document.getElementById(
            "roundButtons"
        );


    if (roundButtons) {

        roundButtons.remove();

    }


    /*
    Add New Game button
    */

    const newGameButton =
        document.createElement("button");


    newGameButton.innerText =
        "🔄 New Game";


    newGameButton.onclick =
        function () {

            newGame();

        };


    document.getElementById(
        "resultScreen"
    ).appendChild(
        newGameButton
    );

}


/*
=========================================
ROUND SCOREBOARD
=========================================
*/

function showScoreboard() {

    let html = `

        <h3>Round ${roundNumber} Scores</h3>

        <table class="score-table">

            <tr>

                <th>
                    Player
                </th>

                <th>
                    Character
                </th>

                <th>
                    Round Points
                </th>

                <th>
                    Total
                </th>

            </tr>

    `;


    players.forEach(player => {

        html += `

            <tr>

                <td>
                    ${player.name}
                </td>

                <td>
                    ${player.role.emoji}
                    ${player.role.name}
                </td>

                <td>
                    <b>
                        ${player.points}
                    </b>
                </td>

                <td>
                    <b>
                        ${player.totalPoints}
                    </b>
                </td>

            </tr>

        `;

    });


    html += `

        </table>

    `;


    document.getElementById(
        "scoreBoard"
    ).innerHTML = html;

}


/*
=========================================
FINAL SCOREBOARD
=========================================
*/

function showFinalScoreboard() {

    let html = `

        <h3>🏆 Total Points After ${roundNumber} Rounds</h3>

        <table class="score-table">

            <tr>

                <th>
                    Player
                </th>

                <th>
                    Total Points
                </th>

            </tr>

    `;


    /*
    Sort players by total points
    */

    const finalPlayers =
        [...players].sort(
            (a, b) =>
                b.totalPoints -
                a.totalPoints
        );


    finalPlayers.forEach(player => {

        html += `

            <tr>

                <td>
                    ${player.name}
                </td>

                <td>
                    <b>
                        ${player.totalPoints}
                    </b>
                </td>

            </tr>

        `;

    });


    html += `

        </table>

    `;


    document.getElementById(
        "scoreBoard"
    ).innerHTML = html;

}


/*
=========================================
NEW GAME
=========================================
*/

function newGame() {

    location.reload();

}
