const controls = {
    init: () => {
        
    },

    init_obj: (thisObj, x, y) => {
        thisObj.x = x;
        thisObj.y = y;
        thisObj.homeX = thisObj.x;
        thisObj.homeY = thisObj.y;
    },

    buttons: {
        // created buttons not woking - maybe can't nest them? maybe ned to set as button type?
        create: (holder, buttonFunc, newName, thisPage, label) => {
            let lib = props.library;
            let newButton = new lib.button();
            holder.addChild(newButton);
            newButton.on('mousedown', function(){
                buttonFunc;
            });

            props.buttons[newName] = newButton;
            newButton.page = thisPage;
            
            if(!props.buttons[newName].buttons){
                props.buttons[newName].buttons = [];
                props.buttons[newName].buttons.push(newButton);
            } else {
                props.buttons[newName].buttons.push(newButton);
            };

            newButton.label.text = label;
            newButton.stop();
        },
        //

        shiftPos: (thisButton, direction, onEnd) => {
            check_tween(thisButton.tween_pos);
            thisButton.tween_pos = Tween(thisButton, 'y', 'inOut', thisButton.homeY + (300 * direction), 1, function(){
                if(onEnd){
                    onEnd;
                };
            });
        },
    },

};

function randomFromArray(array){
    let randomNum = randomInteger(0, array.length - 1);
    return array[randomNum];
};

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
};
