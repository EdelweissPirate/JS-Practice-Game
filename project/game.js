const game = {
    start: () => {
        props.gameStarted = true;
        pages.setPage('question');
    },

    resetSession: () => {
        props.currentDifficulty = null;
        props.currentMode = null;
        props.currentScore = 0;
        props.gameStarted = false;

        timer.disable();
        pages.setPage('home');
    },

    resetScores: () => {
        // TODO: make an 'are you sure?' pop up before clearing scores data
    },
};