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
            if(props.currentMode === 'timed'){
                timer.started = true;
            };
            pages.setPage('question');
            questionList.showIndicators(true);
        }, 1000);
        
    },

    resetSession: () => {
        props.currentPage = null;
        props.currentDifficulty = null;
        props.currentMode = null;
        props.currentScore = 0;
        props.gameStarted = false;
        props.gameEnded = true;
        props.countdown = 3;
        props.questionList = [];
        props.correctAnswers = [];
        props.questionCount = 5;
        props.currentQuestionNum = 0;

        timer.disable();
        pages.setPage('home');
        question.hide();
        message.hideBoard();
        questionList.clearIndicators();
    },

    resetHighScores: () => {
        // TODO: make an 'are you sure?' pop up before clearing scores data
    },

    showScore: () => {
        props.gameStarted = false;
        props.gameEnded = true;
        timer.started = false;
        props.pages.messageBoard.label.alpha = 1;

        message.showScoreConfig();
        pages.setPage('messageBoard');
        setTimeout(function(){
            message.showBoard();
        }, 1000);
    },
};