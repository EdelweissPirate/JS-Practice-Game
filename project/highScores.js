const highScores = {
    checkScore: (score, time) => {
        switch (props.currentMode) {
            case 'normal':
                if(props.highScores[props.currentMode].length < 5){
                    highScores.saveScore(score);
                    return
                };
                break;

            case 'timed':
                if(props.highScores[props.currentMode].length < 5){
                    highScores.saveScore(score, time);
                    return
                };
                break;

            case 'survival':
                if(props.highScores[props.currentMode].length < 5){
                    highScores.saveScore(score, props.remainingLives);
                    return
                };
                break;
        }
    },

    saveScore: (score, typeScore) => {
        
    },

    clear: () => {
        
    },
};