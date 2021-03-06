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
                $('#result').html($(B[i]).html() + ' Wins!');
                return
            }
        }

        //check columns
        for(var i = 0; i <= 2 ; i++) {
            if($(B[i]).html() !== "E" && $(B[i]).html() === $(B[i + 3]).html() && $(B[i + 3]).html() === $(B[i + 6]).html()) {
                console.log($(B[i]).html() + '-won');
                $('#result').html($(B[i]).html() + ' Wins!');
                return
            }
        }

        //check diagonals
        for(var i = 0, j = 4; i <= 2 ; i = i + 2, j = j - 2) {
            if ($(B[i]).html() !== "E" && $(B[i]).html() == $(B[i + j]).html() && $(B[i + j]).html() === $(B[i + 2 * j]).html()) {
                console.log($(B[i]).html() + '-won');
                $('#result').html($(B[i]).html() + ' Wins!');
                return
            }
        }

    $('#result').html('Draw Game!');
};

ui.reset = function(){
    $('.cell').removeClass('occupied');
    $('.cell').html('');
    $('#result').html('');
    $('#menu').animate({opacity: 0}, 'slow', function() {
        $('#menu').css('visibility', 'hidden');
        $("#main").animate({top: '-=150px'}, 1500);
    });
    $('#main').css('visibility', 'visible');
};

ui.gameEnd = function(){
    $("#main").animate({top: '+=150px'}, 2000, function(){
        ui.showMenu();
    })
};

ui.showMenu = function(){
    $('#menu').animate({opacity: 1}, 'fast', function() {
        $('#menu').css('visibility', 'visible');
    });
};

ui.hideMain = function(){
    $('#main').css('visibility', 'hidden');
};
