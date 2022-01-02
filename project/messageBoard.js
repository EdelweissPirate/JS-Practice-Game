const message = {
    init: () => {
        props.pages.messageBoard.homeY = props.pages.messageBoard.y;

        props.pages.messageBoard.y += 325;

        controls.init_obj(props.pages.messageBoard.button_one, props.pages.messageBoard.button_one.x, props.pages.messageBoard.button_one.y);
        controls.init_obj(props.pages.messageBoard.button_two, props.pages.messageBoard.button_two.x, props.pages.messageBoard.button_two.y);
        
        props.pages.messageBoard.buttons = [props.pages.messageBoard.button_one, props.pages.messageBoard.button_two];

        props.pages.messageBoard.buttons.map((button, i) => {
            setTimeout(function(){
                controls.buttons.shiftPos(button, 1);
            }, (Math.random(500) * i) + (500 * i));
        });

        message.hideBoard();
    },

    setMessage: (input) => {
        props.pages.messageBoard.label.tBox.text = input;
    },

    hideBoard: (atEnd) => {
        check_tween(props.pages.messageBoard.tween_pos);
        props.pages.messageBoard.tween_pos = Tween(props.pages.messageBoard, 'y', 'inOut', props.pages.messageBoard.homeY + (325 * 1), 1, function(){
            if(atEnd){
                atEnd
            };
            props.pages.messageBoard.visible = false;
        });
        props.pages.messageBoard.buttons.map((button, i) => {
            setTimeout(function(){
                controls.buttons.shiftPos(button, 1);
            }, (Math.random(500) * i) + (500 * i));
        });
    },

    showBoard: () => {
        props.pages.messageBoard.visible = true;
        check_tween(props.pages.messageBoard.tween_pos);
        props.pages.messageBoard.tween_pos = Tween(props.pages.messageBoard, 'y', 'inOut', props.pages.messageBoard.homeY + (325 * 0), 1.5, function(){
            props.pages.messageBoard.buttons.map((button, i) => {
                setTimeout(function(){
                    controls.buttons.shiftPos(button, 0);
                }, (Math.random(150) * i) + (250 * i));
            });
        });
    },

    startGameConfig: () => {
        props.pages.messageBoard.label.alpha = 1;
        message.setMessage('Are you ready to begin?');

        passSelection = (onOff) => {
            if(onOff){
                check_tween(props.pages.messageBoard.label.tween_alpha);
                props.pages.messageBoard.label.tween_alpha = Tween(props.pages.messageBoard.label, 'alpha', 'none', 0, 1, function(){
                    message.doCountdown();
                })
                props.pages.messageBoard.buttons.map((button, i) => {
                    setTimeout(function(){
                        controls.buttons.shiftPos(button, 1);
                    }, (Math.random(150) * i) + (250 * i));
                });
            } else {
                game.resetSession();
            };
        };

        props.pages.messageBoard.button_one.visible = true;
        props.pages.messageBoard.button_two.visible = true;
        props.pages.messageBoard.button_one.x = props.pages.messageBoard.button_one.homeX;
        props.pages.messageBoard.button_two.x = props.pages.messageBoard.button_two.homeX;
        props.pages.messageBoard.button_one.label.text = 'YES';
        props.pages.messageBoard.button_two.label.text = 'NO';

        props.pages.messageBoard.button_one.on('mousedown', function(){
            passSelection(true);
        });

        props.pages.messageBoard.button_two.on('mousedown', function(){
            passSelection(false);
        });
    },

    showScoreConfig: () => {
        if(props.currentMode == 'timed'){
            message.setMessage('SCORE: ' + props.currentScore + '\n' + props.sessionTime);
        } else {
            message.setMessage('SCORE: ' + props.currentScore);
        };

        props.pages.messageBoard.button_two.x -= 120;
        props.pages.messageBoard.button_two.label.text = 'END';
        props.pages.messageBoard.button_one.visible = false;
    },

    doCountdown: () => {
        message.setMessage(String(props.countdown));
        message.fadeLabelCountdown();
    },

    fadeLabelCountdown: () => {
        props.pages.messageBoard.label.alpha = 1;

        check_tween(props.pages.messageBoard.label.tween_alpha);
        props.pages.messageBoard.label.tween_alpha = Tween(props.pages.messageBoard.label, 'alpha', 'none', 0, 1, function(){
            if(props.countdown > 1){
                props.countdown--;
                message.doCountdown();
            } else if(props.countdown == 1) {
                props.countdown = 'GO!';
                message.doCountdown();
                message.hideBoard(game.start());
            };
        });
    },
};