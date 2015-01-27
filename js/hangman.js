(function(){
    
    var app = angular.module('hangman', []);
    
    app.controller('HangmanController', function () {
        
        this.hangmanWord = '';
        this.image = 'images/hangman0.jpg';
        this.hintOption = '';
        this.definition = '';
        this.setupComplete = false;
        this.numberOfMisses = 0;
        this.misses = [];
        this.lastHit = ''
        this.matchCount = 0;
        this.winner = false;
    });
    
    app.controller('SetupController', function(){
        
        this.done = function(hangman){
            hangman.wordArray =[];
            
            for(var i = 0; i <hangman.hangmanWord.length; i++)
            {
                hangman.wordArray.push('');         
            }
            
            hangman.setupComplete = true;
        };    
    });
    
        
    app.controller('DataEntryController', function(){
        
        this.submit = function(hangman){
            var currentMatch = '';
            var matchCount = 0;
            
            for(var i = 0; i< hangman.hangmanWord.length; i++){
                //If the user changed the value of this text box
                if(hangman.wordArray[i] !== '')
                {
                    if(hangman.wordArray[i] !== hangman.hangmanWord.charAt(i))
                    {
                        //This was a miss
                        hangman.numberOfMisses ++;
                        hangman.misses.push(hangman.wordArray[i])
                        hangman.wordArray[i] = '';
                    }
                    else {
                        //A hit and a match
                        this.currentMatch = hangman.wordArray[i];
                        this.matchCount ++;
                    }
                }   
                else if(hangman.hangmanWord.charAt(i) == this.currentMatch)
                {
                    hangman.wordArray[i] = this.currentMatch;
                    this.matchCount ++;
                }
            }
            
            
            if(this.matchCount == hangman.hangmanWord.length)
            {
                hangman.winner = true;    
            }
            
            if(!hangman.winner && hangman.numberOfMisses == 6) //You lost :(
            {
                hangman.image = 'images/hangman.jpg';
            }
            else if(!hangman.winner) 
            {
                switch(hangman.numberOfMisses){
                    case 0:
                        hangman.image = 'images/hangman0.jpg';
                        break;
                    case 1:
                        hangman.image = 'images/hangman1.jpg';
                        break;    
                    case 2:
                        hangman.image = 'images/hangman2.jpg';
                        break;   
                    case 3:
                        hangman.image = 'images/hangman3.jpg';
                        break;   
                    case 4:
                        hangman.image = 'images/hangman4.jpg';
                        break;
                    case 5:
                        hangman.image = 'images/hangman5.jpg';
                        break;
                    case 6:
                        hangman.image = 'images/hangman6.jpg';
                        break;
                }
            }
            else 
            {
                hangman.image = 'images/hangman.jpg'    
            }
            
        };
    });
    
    app.controller('HintController',['$http', function($http){
        this.getHint = function(hangman){
            
            if(typeof(hangman.hintOption !== 'undefined')){
                if(hangman.hintOption === 'Standard Definition'){
                    var standardDictUrl = 'https://montanaflynn-dictionary.p.mashape.com/define?word={0}';
                    standardDictUrl = standardDictUrl.replace('{0}', hangman.hangmanWord);
                    
                    var standardDictConfig = {headers: { 'X-Mashape-Key': '6mu2zVKmZ1mshiwmLQaz9njkStapp1NGD01jsnRSo50kJjCQg0'}};
                    
                    $http.get(standardDictUrl, standardDictConfig).success(function(data){
                        hangman.definition = data.definitions[0].text;
                    });
                }
                else if(hangman.hintOption === 'Urban Dictionary Definition'){
                    var urbanDictUrl = 'https://mashape-community-urban-dictionary.p.mashape.com/define?term={0}';
                    urbanDictUrl = urbanDictUrl.replace('{0}', hangman.hangmanWord);
                    
                    var urbanDictConfig = {headers: { 'X-Mashape-Key': '6mu2zVKmZ1mshiwmLQaz9njkStapp1NGD01jsnRSo50kJjCQg0'}};
                    
                    $http.get(urbanDictUrl, urbanDictConfig).success(function(data){
                        hangman.definition = data.list[0].definition;
                    });
                }
            }
            
        };
    }]);
    
})();
 
