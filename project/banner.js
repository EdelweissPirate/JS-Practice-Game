const banner = {
    init: () => {
        _.banner.title.text = 'JS Game'
        _.banner.home_icon.on('mousedown', function(){
            game.resetSession();
        });
    },
};