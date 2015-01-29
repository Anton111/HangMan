(function(){
    
    var app = angular.module('hangman', []);
    
    app.controller('HangmanController', function ($scope) {
        this.hangmanWord = '';
        this.guess = '';
        this.homeImage = 'images/brady.jpg'; 
        this.image = 'images/hangman0.jpg';
        this.hintOption = '';
        this.definition = '';
        this.setupComplete = false;
        this.numberOfMisses = 0;
        this.misses = [];
        this.winner = false;
        this.matchCount = 0;
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
            var found = false;
            
            //If the user didn't enter a letter we can bail out
            if(!hangman.guess) return;
            
            for(var i = 0; i< hangman.hangmanWord.length; i++)
            {
                if(hangman.hangmanWord.charAt(i).toLowerCase() == hangman.guess.toLowerCase())
                {
                    hangman.wordArray[i] = hangman.guess; 
                    hangman.matchCount++;
                    found = true;
                }
            }
            
            if(!found)
            {
                hangman.misses.push(hangman.guess);
                hangman.numberOfMisses++;
            }
            
            //Do we have a winner??
            if(hangman.matchCount == hangman.hangmanWord.length)
            {
                hangman.winner = true;
            }
            
            if(!hangman.winner) //Keep guessing..
            {
                switch(hangman.numberOfMisses){
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
                        hangman.image = 'images/loser.jpg'
                        break;
                }
            }
            else //You won!!
            {
                hangman.image = 'images/winner.jpg'    
            }
            
            //Clear out the previous guess
            hangman.guess = '';
            
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
 
