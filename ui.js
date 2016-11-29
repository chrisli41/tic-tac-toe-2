/**
 * Created by Christopher on 11/22/2016.
 */
var ui = {'player': '', 'ai': ''};

ui.insertAt = function(indx, symbol){
    var board = $('.cell');
    var targetCell = $(board[indx]);
    
    if(!targetCell.hasClass('occupied')){
        targetCell.html(symbol);
        targetCell.addClass('occupied');
    }
};

ui.checkWin = function(){

    var B = $('.cell');

        //check rows
        for(var i = 0; i <= 6; i = i + 3) {
            if($(B[i]).html() !== 'E' && $(B[i]).html() === $(B[i + 1]).html() && $(B[i + 1]).html() == $(B[i + 2]).html()) {
                console.log($(B[i]).html() + '-won');
                return;
            }
        }

        //check columns
        for(var i = 0; i <= 2 ; i++) {
            if($(B[i]).html() !== "E" && $(B[i]).html() === $(B[i + 3]).html() && $(B[i + 3]).html() === $(B[i + 6]).html()) {
                console.log($(B[i]).html() + '-won');
                return ;
            }
        }

        //check diagonals
        for(var i = 0, j = 4; i <= 2 ; i = i + 2, j = j - 2) {
            if ($(B[i]).html() !== "E" && $(B[i]).html() == $(B[i + j]).html() && $(B[i + j]).html() === $(B[i + 2 * j]).html()) {
                console.log($(B[i]).html() + '-won');
                return
            }
        }

        console.log('draw');
};

ui.reset = function(){
    $('.cell').removeClass('occupied');
    $('.cell').html('E');
};