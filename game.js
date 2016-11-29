var State = function(old){
    this.turn = '';
    this.oMovesCount = 0;
    this.result = 'still running';
    this.board = [];

    if(typeof old !== 'undefined'){
        var length = old.board.length;
        this.board = new Array(length);
        for(var i = 0; i < length; i++){
            this.board[i] = old.board[i];
        }

        this.oMovesCount = old.oMovesCount;
        this.result = old.result;
        this.turn = old.turn;
    }

    this.advanceTurn = function(){
        this.turn = this.turn === 'X' ? 'O' : 'X';
    };

    this.emptyCells = function(){
        var indxs = [];
        for(var i = 0; i < 9; i++){
            if(this.board[i] === 'E'){
                indxs.push(i);
            }
        }
        return indxs;
    };

    this.isTerminal = function() {
        var B = this.board;

        //check rows
        for(var i = 0; i <= 6; i = i + 3) {
            if(B[i] !== "E" && B[i] === B[i + 1] && B[i + 1] == B[i + 2]) {
                this.result = B[i] + "-won"; //update the state result
                return true;
            }
        }

        //check columns
        for(var i = 0; i <= 2 ; i++) {
            if(B[i] !== "E" && B[i] === B[i + 3] && B[i + 3] === B[i + 6]) {
                this.result = B[i] + "-won"; //update the state result
                return true;
            }
        }

        //check diagonals
        for(var i = 0, j = 4; i <= 2 ; i = i + 2, j = j - 2) {
            if(B[i] !== "E" && B[i] == B[i + j] && B[i + j] === B[i + 2*j]) {
                this.result = B[i] + "-won"; //update the state result
                return true;
            }
        }

        var available = this.emptyCells();
        if(available.length == 0) {
            //the game is draw
            this.result = "draw"; //update the state result
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
    this.currentState.board = ['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'];
    this.currentState.turn = 'X';
    this.status = 'beginning';

    this.advanceTo = function(_state){
        this.currentState = _state;
        if(_state.isTerminal()){
            this.status = 'ended';
            ui.checkWin();
        }
        else {
            
            if(this.currentState.turn === 'X'){
                console.log('human - turn');
            }
            else {
                console.log('AI - turn');
                this.ai.notify('O');
            }
        }
    };
    
    this.start = function(){

            this.currentState = new State();
            this.currentState.board = ['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'];
            this.currentState.turn = 'X';

            this.advanceTo(this.currentState);
            this.status = 'running';
    }
};

Game.score = function(_state){
    if(_state.result === 'X-won')
        return 10 - _state.oMovesCount;
    else if(_state.result === 'O-won')
        return - 10 + _state.oMovesCount;
    else 
        return 0;
};