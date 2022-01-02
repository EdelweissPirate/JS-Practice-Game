const question = {
    init: () => {
        props.pages.question.answer_buttons = [];

        props.pages.question.answer_buttons.push(props.pages.question['answer_A']);
        props.pages.question.answer_buttons.push(props.pages.question['answer_B']);
        props.pages.question.answer_buttons.push(props.pages.question['answer_C']);
        props.pages.question.answer_buttons.push(props.pages.question['answer_D']);

        props.pages.question.button_next.label.text = 'NEXT';
        props.pages.question.button_next.visible = false;
        props.pages.question.tBoxBig.visible = false;

        props.pages.question.button_next.on('mousedown', function(){
            if(props.currentQuestionNum < props.questionCount || props.remainingLives > -1){
                question.next();
            } else {
                question.hide();
                game.showScore();
            };
        });

        question.hide();
    },

    show: () => {
        question.construct();

        check_tween(props.pages.question.tween_alpha);
        props.pages.question.tween_alpha = Tween(props.pages.question, 'alpha', 'none', 1, .5);
        
        props.questionDots.map(dot => {
            dot.update();
        });
    },

    hide: (atEnd) => {
        check_tween(props.pages.question.tween_alpha);
        props.pages.question.tween_alpha = Tween(props.pages.question, 'alpha', 'none', 0, .5, function(){
            if(atEnd){
                atEnd();
            };
        });
    },

    construct: () => {
        question.reset();

        let currentQuestion = questionList.getNextQuestion();
        props.pages.question.tBox.text = props.currentQuestionNum + '. ' + currentQuestion.q;
        props.pages.question.tBox.visible = true;
        props.pages.question.tBoxBig.visible = false;

        question.addAnswers(currentQuestion);
    },

    addAnswers: (thisQuestion) => {
        let answers = thisQuestion.answers;
        let keys = Object.keys(answers);

        keys.map(key => {
            let answerText = answers[key]; 
            props.pages.question['answer_' + key].tBox.text = answerText;

            props.pages.question['answer_' + key].selector.label.text = String(key);

            props.pages.question['answer_' + key].selector.on('mousedown', function(){
                let answerOutcome = question.processAnswer(key, thisQuestion);
                question.presentResult(answerOutcome, thisQuestion);
            });
        });
    },

    processAnswer: (thisAnswer, thisQuestion) => {
        if(thisAnswer === thisQuestion.correctAnswer){
            return true
        } else {
            return false
        };
    },

    presentResult: (result, thisQuestion) => {
        switch (result) {
            case true:
                props.correctAnswers[props.currentQuestionNum - 1] = thisQuestion;
                props.pages.question.tBoxBig.text = 'CORRECT!';
                break;
        
            case false:
                props.pages.question.tBoxBig.text = 'INCORRECT';
                break;
        };
        
        props.pages.question.answer_buttons.map(button => {
            button.visible = false;
        });

        props.pages.question.tBox.visible = false;
        props.pages.question.tBoxBig.visible = true;
        props.pages.question.button_next.visible = true;

        let correctedAnswers = props.correctAnswers.filter(Object);

        props.currentScore = correctedAnswers.length;
        
        props.questionDots[props.currentQuestionNum-1].update(result);
    },

    next: () => {
        question.hide(question.show);
    },

    reset: () => {
        props.pages.question.answer_buttons.map(button => {
            button.visible = true;
        });

        props.pages.question.tBox.visible = true;
        props.pages.question.tBoxBig.visible = false;
        props.pages.question.button_next.visible = false;
    },
};