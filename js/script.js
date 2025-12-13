// PWA Cache Management & Reload
async function clearCacheAndShowMessage() {
    if ('serviceWorker' in navigator && navigator.serviceWorker.ready) {
        const registration = await navigator.serviceWorker.ready;
        await registration.unregister();
        caches.keys().then(function (names) {
            for (let name of names) {
                caches.delete(name);
            }
        });

        const updateMessage = document.getElementById('update-message');
        if (updateMessage) {
            updateMessage.style.display = 'block';
        }

        setTimeout(() => {
            window.location.reload();
        }, 2000);
    }
}

setInterval(() => {
    clearCacheAndShowMessage();
}, 24 * 60 * 60 * 1000);

document.addEventListener('DOMContentLoaded', () => {
    const clearCacheBtn = document.getElementById('clearCacheButton');
    if (clearCacheBtn) {
        clearCacheBtn.addEventListener('click', clearCacheAndShowMessage);
    }
});

// --- Your Existing Score Counter Logic Below ---

let teamAscore = document.getElementById('team_a_score');
let teamBscore = document.getElementById('team_b_score');
let historyList = document.getElementById("score-history");

let scoreA = 0;
let scoreB = 0;

let roundsA = 0;
let roundsB = 0;
let bestOf = 3;
let roundNumber = 1;

function team_a() {
    scoreA += 1;
    teamAscore.textContent = scoreA;
    twelve_goal_limit();
}

function team_b() {
    scoreB += 1;
    teamBscore.textContent = scoreB;
    twelve_goal_limit();
}

function rst_btn() {
    scoreA = 0;
    scoreB = 0;
    teamAscore.textContent = scoreA;
    teamBscore.textContent = scoreB;
}

function setBestOf() {
    const inputVal = parseInt(document.getElementById('best-of').value);
    if (isNaN(inputVal) || inputVal < 1) {
        alert("Please enter a valid odd number (like 3, 5, 7).");
        return;
    }
    if (inputVal % 2 === 0) {
        alert("Please enter an odd number (like 3, 5, 7).");
        return;
    }
    bestOf = inputVal;
    roundsA = 0;
    roundsB = 0;
    roundNumber = 1;
    rst_btn();
    alert(`Game set to Best of ${bestOf}. First to ${Math.ceil(bestOf / 2)} rounds wins!`);
}

function twelve_goal_limit() {
    if (scoreA === 12 || scoreB === 12) {
        if (scoreA === 12) {
            roundsA++;
            addHistory(`Round ${roundNumber}: 🏆 Team A wins (${scoreA} - ${scoreB})`);
            alert(`Team A wins this round! (Rounds: A=${roundsA}, B=${roundsB})`);
        } else {
            roundsB++;
            addHistory(`Round ${roundNumber}: 🏆 Team B wins (${scoreB} - ${scoreA})`);
            alert(`Team B wins this round! (Rounds: A=${roundsA}, B=${roundsB})`);
        }
        roundNumber++;
        rst_btn();
        checkGameWinner();
    }
}

function checkGameWinner() {
    const needed = Math.ceil(bestOf / 2);
    if (roundsA === needed) {
        alert(`🏆 Team A wins the Best of ${bestOf} game!`);
        addEndGameDivider();
        resetGameStats();
    } else if (roundsB === needed) {
        alert(`🏆 Team B wins the Best of ${bestOf} game!`);
        addEndGameDivider();
        resetGameStats();
    }
}

function resetGameStats() {
    roundsA = 0;
    roundsB = 0;
    roundNumber = 1;
    rst_btn();
}

function addHistory(text) {
    const li = document.createElement("li");
    li.textContent = text;
    historyList.appendChild(li);
}

function addEndGameDivider() {
    const divider = document.createElement("li");
    divider.textContent = "🏁 End of Game 🏁";
    divider.classList.add("end-divider");
    historyList.appendChild(divider);
}