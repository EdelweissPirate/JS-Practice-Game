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
        create: (holder, buttonFunc, name, thisPage) => {
            let lib = props.library;
            let newButton = new lib.button();
            holder.addChild(newButton);
            newButton.on('mousedown', function(){
                buttonFunc();
            });

            props.buttons[name] = newButton;
            newButton.page = thisPage;
            
            if(!props.buttons[name].buttons){
                props.buttons[name].buttons = [];
                props.buttons[name].buttons.push(newButton);
            } else {
                props.buttons[name].buttons.push(newButton);
            };
        },

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
