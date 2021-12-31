const questionList = {
    generate: () => {
        for(let i = 1; i <= props.questionCount; i++){
            let thisQuestion = randomFromArray(questions_easy)//'questions_' + props.currentDifficulty);
            thisQuestion.num = i;
            props.questionList.push(thisQuestion);
        };
    },

    getNextQuestion: () => {
        let thisQuestion = props.questionList[props.currentQuestionNum - 1];
        props.currentQuestionNum++;
        return thisQuestion;
    }, 

};