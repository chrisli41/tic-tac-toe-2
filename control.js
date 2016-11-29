/**
 * Created by Christopher on 11/22/2016.
 */
$(document).ready(function(){

    var globals = {};

    //ui.hideMain();

    $('#x').click(function(){

        ui.player = 'X';
        ui.ai = 'O';

        var aiPlayer = new AI('master');
        globals.game = new Game(aiPlayer);

        aiPlayer.plays(globals.game);

        ui.reset();

        globals.game.start();
    });

    $('#o').click(function(){
        
        ui.player = 'O';
        ui.ai = 'X';

        var aiPlayer = new AI('master');
        globals.game = new Game(aiPlayer);

        aiPlayer.plays(globals.game);

        ui.reset();

        globals.game.start();
    });

    $('.cell').click(function(){
        var $this = $(this);

        if(globals.game.status === 'running' && globals.game.currentState.turn === 'X' && !$this.hasClass('occupied')){
            var indx = parseInt($this.data('indx'));

            var next = new State(globals.game.currentState);
            next.board[indx] = 'X';
            ui.insertAt(indx, ui.player);

            next.advanceTurn();

            globals.game.advanceTo(next);
        }
    });


});