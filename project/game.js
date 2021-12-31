const game = {
    confirmStart: () => {
        if(props.currentMode === 'timed'){
            timer.enable();
        };
        pages.setPage('messageBoard')
        setTimeout(function(){
            message.startGameConfig();
            message.showBoard();
        }, 1000);
    },

    start: () => {
        setTimeout(function(){
            props.gameStarted = true;
            pages.setPage('question');
        }, 1000);
        
    },

    resetSession: () => {
        props.currentDifficulty = null;
        props.currentMode = null;
        props.currentScore = 0;
        props.gameStarted = false;
        props.countdown = 3;
        props.questionList = [],

        timer.disable();
        pages.setPage('home');
    },

    resetScores: () => {
        // TODO: make an 'are you sure?' pop up before clearing scores data
    },
};