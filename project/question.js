const question = {
    init: () => {
        question.hide();
    },

    show: () => {
        question.construct();

        check_tween(props.pages.question.tween_alpha);
        props.pages.question.tween_alpha = Tween(props.pages.question, 'alpha', 'none', 1, 1);
    },

    hide: () => {
        check_tween(props.pages.question.tween_alpha);
        props.pages.question.tween_alpha = Tween(props.pages.question, 'alpha', 'none', 0, 1);
    },

    construct: () => {
        let currentQuestion = questionList.getNextQuestion();
        props.pages.question.question.text = currentQuestion.num + '. ' + currentQuestion.q;

        //TODO - buildanswer buttons
        question.addAnswers(currentQuestion);
    },

    addAnswers: (thisQuestion) => {
        let answers = thisQuestion.answers;
        let keys = Object.keys(answers);

        keys.map(key => {
            let answerText = answers[key]; 
            props.pages.question['answer_' + key].tBox.text = answerText;

            //TODO - not working 
            props.pages.question['answer_' + key].selector.label.text = String(key);

            props.pages.question['answer_' + key].selector.on('mousedown', function(){
                let test = question.processAnswer(answerText, thisQuestion);
                console.log(test);
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
};