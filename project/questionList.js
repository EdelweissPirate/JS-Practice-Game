const questionList = {
    generate: () => {
        for(let i = 1; i <= props.questionCount; i++){
            let thisQuestion = randomFromArray(questions[props.currentDifficulty]);
            thisQuestion.num = i;
            props.questionList.push(thisQuestion);
        };

        questionList.initIndicators();
    },

    getNextQuestion: () => {
        let thisQuestion = props.questionList[props.currentQuestionNum];
        props.currentQuestionNum++;
        return thisQuestion;
    },

    initIndicators: () => {
        let lib = props.library;

        _.dotHolder = new lib.holder_empty();
        _.addChild(_.dotHolder);

        _.dotHolder.x = 520;
        _.dotHolder.y = 90;

        for(let i = 0; i <= props.questionCount - 1; i++){
            let newDot = new lib.questionIndicator();
            newDot.green.visible = false;
            newDot.red.visible = false;
            newDot.dotOn.visible = false;
            newDot.num = i + 1;

            _.dotHolder.addChild(newDot);
            newDot.x -= 20 * 5;
            newDot.x += 20 * i;

            newDot.update = (rightWrong) => {
                if(newDot.num == props.currentQuestionNum){
                    newDot.dotOn.visible = true;
                };

                if(rightWrong != undefined){
                    newDot.green.visible = rightWrong;
                    newDot.red.visible = !newDot.green.visible;
                };
            };

            props.questionDots.push(newDot);
        };

        _.dotHolder.alpha = 0;
    },

    showIndicators: (onOff) => {
        check_tween(_.dotHolder.tween_alpha);
        _.dotHolder.tween_alpha = Tween(_.dotHolder, 'alpha', 'none', 1 * onOff, 1);
    },

    clearIndicators: () => {
        let holderIndex = _.getChildIndex(_.dotHolder);
        _.removeChildAt(holderIndex);
        props.questionDots = [];
    },
};