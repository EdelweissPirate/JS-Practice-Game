const timer = {
    msec_val: 0, 
    sec_val: 0, 
    min_val: 0,
    started: false,

    init: () => {
        let lib = props.library;

        let newTimer  = _.timer = new lib.timer();
        _.addChild(newTimer);

        newTimer.x = 550 - 50;
        newTimer.y = 35;
        newTimer.scale = 2;
        newTimer.alpha = 0;
        newTimer.visible = false;

        timer.parse_digit(_.timer.msec_1, '0');
        timer.parse_digit(_.timer.msec_2, '0');

        timer.parse_digit(_.timer.sec_1, '0');
        timer.parse_digit(_.timer.sec_2, '0');

        timer.parse_digit(_.timer.min_1, '0');
        timer.parse_digit(_.timer.min_2, '0');
    },

    enable: () => {
        _.timer.visible = true;
        check_tween(_.timer.tween_alpha);
        _.timer.tween_alpha = Tween(_.timer, 'alpha', 'none', 1, 1)
    },
    disable: () => {
        _.timer.visible = false;
        check_tween(_.timer.tween_alpha);
        _.timer.alpha = 0;
        timer.reset();
    },

    update: () => {
        timer.calc_time();
        timer.update_readout('msec');
        timer.update_readout('sec');
        timer.update_readout('min');
    },

    calc_time: () => {
        let msec;

        if(props.currentMode == 'timed' && props.gameStarted && timer.started){
            if(timer.msec_val < 100 - (100/props.fps)){
                msec = timer.msec_val += (100/props.fps);
                timer.msec_val = roundTo(msec, 0);
            } else {
                timer.msec_val = 0;
                timer.sec_val++;
            };

            if(timer.sec_val === 60){
                timer.sec_val = 0;
                timer.min_val++;
            };

            console.log('TIME: ', timer.min_val, ':', timer.sec_val, ':', timer.msec_val);
        };
    },

    update_readout: (unit) => {
        let val_array;

        let val_string = String(timer[unit + '_val']);
        if(val_string.length > 1){
            val_array = val_string.split('');
        };

        if(timer[unit + '_val'] < 10){
            _.timer[unit + '_1'].val = '0';
            _.timer[unit + '_2'].val = String(timer[unit + '_val']);
        } else {
            _.timer[unit + '_1'].val = val_array[0];
            _.timer[unit + '_2'].val = val_array[1];
        };

        timer.parse_digit(_.timer[unit + '_1'], _.timer[unit + '_1'].val);
        timer.parse_digit(_.timer[unit + '_2'], _.timer[unit + '_2'].val);
    },

    reset: () => {
        timer.msec_val = 
        timer.sec_val = 
        timer.min_val = '0';
    },

    parse_digit: (obj, val) => {
        switch(val){
            case '0':
                obj.seg1.visible = true;
                obj.seg2.visible = true;
                obj.seg3.visible = true;
                obj.seg4.visible = false;
                obj.seg5.visible = true;
                obj.seg6.visible = true;
                obj.seg7.visible = true;
                break;

            case '1':
                obj.seg1.visible = false;
                obj.seg2.visible = false;
                obj.seg3.visible = true;
                obj.seg4.visible = false;
                obj.seg5.visible = false;
                obj.seg6.visible = false;
                obj.seg7.visible = true;
                break;

            case '2':
                obj.seg1.visible = false;
                obj.seg2.visible = true;
                obj.seg3.visible = true;
                obj.seg4.visible = true;
                obj.seg5.visible = true;
                obj.seg6.visible = true;
                obj.seg7.visible = false;
                break;

            case '3':
                obj.seg1.visible = false;
                obj.seg2.visible = true;
                obj.seg3.visible = true;
                obj.seg4.visible = true;
                obj.seg5.visible = false;
                obj.seg6.visible = true;
                obj.seg7.visible = true;
                break;

            case '4':
                obj.seg1.visible = true;
                obj.seg2.visible = false;
                obj.seg3.visible = true;
                obj.seg4.visible = true;
                obj.seg5.visible = false;
                obj.seg6.visible = false;
                obj.seg7.visible = true;
                break;

            case '5':
                obj.seg1.visible = true;
                obj.seg2.visible = true;
                obj.seg3.visible = false;
                obj.seg4.visible = true;
                obj.seg5.visible = false;
                obj.seg6.visible = true;
                obj.seg7.visible = true;
                break;

            case '6':
                obj.seg1.visible = true;
                obj.seg2.visible = true;
                obj.seg3.visible = false;
                obj.seg4.visible = true;
                obj.seg5.visible = true;
                obj.seg6.visible = true;
                obj.seg7.visible = true;
                break;

            case '7':
                obj.seg1.visible = false;
                obj.seg2.visible = true;
                obj.seg3.visible = true;
                obj.seg4.visible = false;
                obj.seg5.visible = false;
                obj.seg6.visible = false;
                obj.seg7.visible = true;
                break;

            case '8':
                obj.seg1.visible = true;
                obj.seg2.visible = true;
                obj.seg3.visible = true;
                obj.seg4.visible = true;
                obj.seg5.visible = true;
                obj.seg6.visible = true;
                obj.seg7.visible = true;
                break;

            case '9':
                obj.seg1.visible = true;
                obj.seg2.visible = true;
                obj.seg3.visible = true;
                obj.seg4.visible = true;
                obj.seg5.visible = false;
                obj.seg6.visible = true;
                obj.seg7.visible = true;
                break;
        };
    },
}