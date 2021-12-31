var props = {
    fps: 24,
    library: null,
    pages: {},
    buttons: {},

    currentPage: null,
    currentDifficulty: null,
    currentMode: null,
    currentScore: 0,
    gameStarted: false,
    countdown: 3,
    questionList: [],
    questionCount: 5,
    currentQuestionNum: 1,
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
