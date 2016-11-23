/**
 * Created by Christopher on 11/22/2016.
 */
var State = function(old){

    this.board = [];
    this.turn = '';
    this.oMovesCount = 0;
    this.result = 'still running';

    if(typeof old !== 'undefined'){
        this.board = old.board;
        this.turn = old.turn;
        this.oMovesCount = old.oMovesCount;
        this.result = old.result;
    }

    this.advanceTurn = function(){
        this.turn = this.turn === 'X' ? 'O' : 'X';
    };

    this.emptyCells = function(){
        var indxs = [];
        for(var i = 0; i < this.board.length; i++){
            if(this.board[i] === 'E'){
                indxs.push(i);
            }
        }
        return indxs;
    };

    this.isTerminal = function(){

        var board = this.board;

        //check rows
        for(var i = 0; i < board.length; i += 3){
            if(board[i] !== 'E' && board[i] === board[i + 1] && board[i] === board[i + 2]){
                this.result = board[i] + '-won';
                return true;
            }
        }

        //check columns
        for(var j = 0; j < 3; j++){
            if(board[j] !== 'E' && board[j] === board[j + 3] && board[j] === board[j + 6]){
                this.result = board[i] + '-won';
                return true;
            }
        }

        //check diagnoals
        if((board[0] !== 'E' && board[0] === board[4] && board[0] === board[8]) || (board[2] !== 'E' && board[2] === board[4] && board[2] === board[6])){
            this.result = board[4] + '-won';
            return true;
        }

        var available = this.emptyCells();
        if(available.length === 0){
            this.result = 'draw';
            return true;
        }

        else {
            return false;
        }
    };
};

var Game = function(aiPlayer){

    this.ai = aiPlayer;

    this.currentState = new State();

    this.currentState.board = ['E', 'E', 'E',
                               'E', 'E', 'E',
                               'E', 'E', 'E'];

    this.currentState.turn = 'X';
    this.status = 'beginning';

    this.advanceTo = function(_state){
        this.currentState = _state;
        if(_state.isTerminal()){
            this.status = 'ended';

            if(_state.result === 'X-won'){
                console.log('X-won');
            }
            else if(_state.result === 'O-won'){
                console.log('O-won');
            }
            else {
                console.log('draw');
            }

        }
        else {

            if(this.currentState.turn === 'X'){
                console.log('human');
            }
            else {
                console.log('ai');
                this.ai.makeMove();
            }
        }
    };

    this.start = function(){
        if(this.status === 'beginning'){
            this.advanceTo(this.currentState);
            this.status = 'running';
        }
    }
};

Game.score = function(_state){
    if(_state.result = 'X-won'){
        return 10 - _state.oMovesCount;
    }
    else if(_state.result === 'O-won'){
        return -10 + _state.oMovesCount;
    }
    else {
        return 0;
    }
};