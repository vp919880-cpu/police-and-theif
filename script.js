let players = [];

let playerCount = 5;

let currentPlayer = 0;

let policeIndex = -1;

let thiefIndex = -1;


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

    /*
    3 Players
    King
    Police
    Thief
    */

    if (count === 3) {

        return [

            allCharacters[0], // King
            allCharacters[3], // Police
            allCharacters[4]  // Thief

        ];

    }


    /*
    4 Players
    King
    Queen
    Police
    Thief
    */

    if (count === 4) {

        return [

            allCharacters[0], // King
            allCharacters[1], // Queen
            allCharacters[3], // Police
            allCharacters[4]  // Thief

        ];

    }


    /*
    5 Players
    King
    Queen
    Pawn
    Police
    Thief
    */

    if (count === 5) {

        return [

            allCharacters[0],
            allCharacters[1],
            allCharacters[2],
            allCharacters[3],
            allCharacters[4]

        ];

    }


    /*
    6 Players
    Add Minister
    */

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


    /*
    7 Players
    Add Guard
    */

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


    /*
    8 Players
    Add Spy
    */

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

            points: 0

        });

    }


    /*
    Get correct characters
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

}


/*
=========================================
SCOREBOARD
=========================================
*/

function showScoreboard() {

    let html = `

        <table class="score-table">

            <tr>

                <th>
                    Player
                </th>

                <th>
                    Character
                </th>

                <th>
                    Points
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