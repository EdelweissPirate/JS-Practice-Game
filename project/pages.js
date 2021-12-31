const pages = {
    init: () => {
        pages.addPage('home', 'menu');
        pages.init_home();

        pages.addPage('difficulty', 'menu');
        pages.init_difficulty();

        pages.addPage('mode', 'menu');
        pages.init_mode();

        pages.addPage('question', 'question');

        pages.setPage('home');
    },

    addPage: (pageName, type) => {
        let lib = props.library;
        let newPage;

        switch(pageName){
            case 'home':
                newPage = new lib.page_home();
                break;
            case 'difficulty':
                newPage = new lib.page_difficulty();
                break;
            case 'mode':
                newPage = new lib.page_mode();
                break;
            case 'question':
                newPage = new lib.page_question();
                break;
        };

        _.holder_page.addChild(newPage);
        newPage.name = 'page_'+pageName;
        props.pages[pageName] = newPage;
        newPage.visible = false;
        newPage.type = type;
    },

    setPage: (newPage) => {
        if(props.currentPage){
            pages.hidePage(props.currentPage, newPage, props.pages[props.currentPage].type, props.pages[newPage].type);
        } else {
            pages.showPage(newPage, props.pages[newPage].type);
        };

        props.currentPage = newPage;
    },

    hidePage: (thisPage, newPage, thisType, newType) => {
        switch (thisType) {
            case 'menu':
                props.pages[thisPage].buttons.map((button, i) => {
                    setTimeout(function(){
                        if(i === props.pages[thisPage].buttons.length - 1){
                            controls.buttons.shiftPos(button, 1, pages.showPage(newPage, newType));
                            setTimeout(function (){
                                props.pages[thisPage].visible = false;
                            }, 1000)
                        } else {
                            controls.buttons.shiftPos(button, 1);
                        };
                    }, (Math.random(500) * i) + (500 * i));
                });
                break;

            case 'question':
                //TODO - 
                props.pages[thisPage].visible = false;
                pages.showPage(newPage, newType)
                break;
        
            default:
                break;
        };
    },

    showPage: (thisPage, type) => {
        props.pages[thisPage].visible = true;

        switch (type) {
            case 'menu':
                props.pages[thisPage].buttons.map((button, i) => {
                    setTimeout(function(){
                        controls.buttons.shiftPos(button, 0);
                    }, (Math.random(500) * i) + (500 * i));
                });
                break;

            case 'question':
                //TODO - 
                break;
        
            default:
                break;
        };
    },

    init_home: () => {
        props.pages.home.buttons = [];

        props.pages.home.buttons[0] = props.pages.home.button_start; 
        props.pages.home.buttons[0].label.text = 'START';

        props.pages.home.buttons[1] = props.pages.home.button_highScores; 
        props.pages.home.buttons[1].label.text = 'SCORES';

        props.pages.home.buttons[2] = props.pages.home.button_resetScores; 
        props.pages.home.buttons[2].label.text = 'RESET';

        props.pages.home.buttons.map(button => {
            controls.init_obj(button, button.x, button.y);
            button.y += 300;
        });

        props.pages.home.buttons[0].on('mousedown', function(){
            pages.setPage('difficulty');
        });

        props.pages.home.buttons[1].on('mousedown', function(){
            pages.setPage('scores');
        });

        props.pages.home.buttons[2].on('mousedown', function(){
            game.resetScores();
        });
    },

    init_difficulty: () => {
        props.pages.difficulty.buttons = [];

        props.pages.difficulty.buttons[0] = props.pages.difficulty.button_easy; 
        props.pages.difficulty.buttons[0].label.text = 'EASY';

        props.pages.difficulty.buttons[1] = props.pages.difficulty.button_medium; 
        props.pages.difficulty.buttons[1].label.text = 'MEDIUM';

        props.pages.difficulty.buttons[2] = props.pages.difficulty.button_hard; 
        props.pages.difficulty.buttons[2].label.text = 'HARD';

        props.pages.difficulty.buttons.map(button => {
            controls.init_obj(button, button.x, button.y);
            button.y += 300;

            button.on('mousedown', function(){
                props.currentDifficulty = button.label.text.toLowerCase();
                pages.setPage('mode');
            });
        });
    },

    init_mode: () => {
        props.pages.mode.buttons = [];

        props.pages.mode.buttons[0] = props.pages.mode.button_normal; 
        props.pages.mode.buttons[0].label.text = 'NORMAL';

        props.pages.mode.buttons[1] = props.pages.mode.button_timed; 
        props.pages.mode.buttons[1].label.text = 'TIMED';

        props.pages.mode.buttons[2] = props.pages.mode.button_survival; 
        props.pages.mode.buttons[2].label.text = 'SURVIVAL';

        props.pages.mode.buttons.map(button => {
            controls.init_obj(button, button.x, button.y);
            button.y += 300;
        });

        props.pages.mode.buttons[0].on('mousedown', function(){
            props.currentMode = this.label.text.toLowerCase();
            game.start();
        });

        props.pages.mode.buttons[1].on('mousedown', function(){
            props.currentMode = this.label.text.toLowerCase();
            timer.enable();
            game.start();
        });

        props.pages.mode.buttons[2].on('mousedown', function(){
            props.currentMode = this.label.text.toLowerCase();
            // timer.enable();
            game.start();
        });
    },

    init_question: () => {
        controls.init_obj(props.pages.question.bg, props.pages.question.bg.x, props.pages.question.bg.y);
        //TODO - 
    },

};