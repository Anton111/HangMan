(function(){
    
    var app = angular.module('hangman', []);
    
    app.controller('HangmanController', function () {
        
        this.hangmanWord = '';
        //this.wordArray = ['a', 'b', 'c', 'd', 'e'];
        this.wordArray = [];
        this.image = 'images/hangman.jpg';
        this.hintOption = '';
        this.definition = '';
        this.setupComplete = false;
        
    });
    
    app.controller('SetupController', function(){
        this.done = function(hangman){
            /*for(var i = 0; i < hangman.hangmanWord.length; i++)
            {
                hangman.wordArray[i] = hangman.hangmanWord.charAt(i);        
            }*/
            hangman.setupComplete = true;
        };    
    });
    
        
    app.controller('DataEntryController', function(){
        
        this.submit = function(hangman){
            
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
 
 