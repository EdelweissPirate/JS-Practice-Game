var props = {
    fps: 24,
    library: null,
    pages: {},
    buttons: {},

    currentPage: null,
    currentDifficulty: null,
    currentMode: null,
    gameStarted: false,
    gameEnded: false,
    countdown: 3,
    questionList: [],
    questionDots: [],
    questionCount: 5,
    currentQuestionNum: 0,
    
    correctAnswers: [],
    currentScore: 0,

    highScores: {
        normal: [],
        timed: [],
        survival: [],
    },

    sessionTime: 0,
    remainingLives: 3,
    maxLives: 3,
};

function onEnterFrame() {
    timer.update();
};

document.ready(function(){
    init_touch()

    init_();
    init_library();
    banner.init();
    pages.init();
    controls.init();
    timer.init();
    message.init();
    question.init();

});
