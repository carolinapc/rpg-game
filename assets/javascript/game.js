$(document).ready(function(){

    var charactersName = ["Batman","Superman","Iron-Man","Spiderman","Captain-America"];
    var characters = [];
    var divSelection = $(".selection");
    var divEnemies = $(".enemies");
    var divBattle = $(".battle");
    var characterChosen = {};
    var enemyChosen = {};
    var battleStarted = false;
    var enemyStartHealth;
    var userStartHealth;
    var enemiesRemained;
    

    //get random value between 2 values
    function getRandomValue(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
    }
    
    //create characters
    function createCharacters(){
        characters = [];
        for (var i=0; i< charactersName.length; i++){
            var character = {
                id: i,
                name: charactersName[i].replace("-"," "),
                healthPoints: getRandomValue(100,300),
                attackPower: getRandomValue(1,10),
                counterAttackPower: getRandomValue(20,70),
                picture: "assets/images/" + charactersName[i].toLocaleLowerCase() + ".png"

            };
            characters.push(character);
        }
        enemiesRemained = characters.length-1;
    }

    function addCharacterIntoDiv(div, character){
        var figure = $("<figure>");
        figure.attr("id","figure-"+character.id);

        var caption = $("<figcaption>");
        caption.html(character.name + "<br>HP: " + character.healthPoints);

        var img = $("<img>");
        img.attr("src",character.picture);
        img.attr("alt",character.name);
        img.attr("id",character.id);

        figure.append(img);
        figure.append(caption);
        div.append(figure);

    }

    function updateBattle(){
        //calculates the percentage of HP
        
        var pcUserHp = (characterChosen.healthPoints / userStartHealth)*100;
        var pcEnemyHp = (enemyChosen.healthPoints / enemyStartHealth)*100;

        $("#enemy-hp").css("width",pcEnemyHp.toString() + "%");
        $("#user-hp").css("width",pcUserHp.toString() + "%");
        $("#enemy-hp").text(enemyChosen.healthPoints);
        $("#user-hp").text(characterChosen.healthPoints);
        

    }

    //sets the characters and their atributes on the battle field and prepare to start the battle
    function startBattle(){
        battleStarted = true;

        $("#user-character").attr("src",characterChosen.picture);
        $("#user-character").css("visibility","visible");
        $("#enemy-character").attr("src",enemyChosen.picture);
        $("#enemy-character").css("visibility","visible");
        $("#battle-user").text(characterChosen.name);
        $("#battle-enemy").text(enemyChosen.name);
        $("#btn-attack").css("display","block");
        $("#battle-msg").text("Fight!");
        $("#battle-msg").css("display","block");
        enemyStartHealth = enemyChosen.healthPoints;


        //update data of the battle
        updateBattle();

    }

    function gameOver(){
        $("#user-character").css("visibility","hidden");
        $("#user-hp").css("width", "0");
        $("#user-hp").text("0");
        $("#battle-msg").html("GAME OVER<br>Sorry... You Lost! Try again!");
        $("#btn-restart").css("display","block");
        $("#btn-attack").css("display","none");
        
    }

    function destroyEnemy(){
        var msg;
        $("#enemy-character").css("visibility","hidden");
        $("#enemy-hp").css("width", "0");
        $("#enemy-hp").text("0");
        $("#btn-attack").css("display","none");

        //decrease the enemies remained
        enemiesRemained--;

        if(enemiesRemained == 0){
            msg = "You won the Game!!!";
            $("#btn-restart").css("display","block");
        }
        else{
            msg = "You've defeated "+enemyChosen.name+" on this battle!!! You can choose another enemy to fight!";
        }
        $("#battle-msg").html("CONGRATULATIONS!!<br>"+msg);

        battleStarted = false;
    }
    
    function reset(){
        characterChosen = {};
        enemyChosen = {};
        battleStarted = false;
        divEnemies.empty();
        divSelection.empty();
        $("#btn-restart").css("display","none");
        $("#btn-attack").css("display","none");
        $("#battle-msg").css("display","none");
        $("#battle-msg").text("Fight!");
        $("#text-choose-character").text("Choose your character");
        $(".enemies-wrap").css("display","none");
        $("#enemy-character").css("visibility","hidden");
        $("#user-character").css("visibility","hidden");
        

    }

    function start(){
        createCharacters();
        showOptions();
    }


    //place all characteres on the Selection div
    function showOptions (){
        for(var i=0; i < characters.length; i++){
            addCharacterIntoDiv(divSelection,characters[i]);
        }
    }

    //when the user chooses the character
    $(".selection").click(function(event){

        //makes sure that user choose once and that an img tag was clicked
        if(Object.keys(characterChosen).length === 0 && event.target.nodeName == "IMG")
        {
            var choice = event.target.id;

            characterChosen = characters[choice]; //assign the character chosen into the global variable
            divSelection.empty(); //cleans the selection div
            addCharacterIntoDiv(divSelection, characters[choice]); //add character chosen into the selection div
            $("#"+choice).attr("class","chosen"); //applies the css class on the chosen
    
            //add all the enemies characters into enemy div
            for(var i=0; i < characters.length; i++){
                if(i != choice){
                    addCharacterIntoDiv(divEnemies, characters[i]);
                }
            }

            userStartHealth = characterChosen.healthPoints; 
            $("#text-choose-character").text("You!");
            $(".enemies-wrap").css("display","block");
    
        }
        
    });

    //when the user chooses the enemy
    $(".enemies").click(function(event){

        //makes sure that an img tag was clicked
        if(event.target.nodeName == "IMG" && !battleStarted)
        {
            var choice = event.target.id;

            enemyChosen = characters[choice]; //assign the character chosen into the global variable

            //hides the chosen one from the enemies div
            $("#figure-"+choice).css("display","none");


            startBattle();
    
        }
        
    });

    //when the user attacks the enemy
    $("#btn-attack").click(function(){

        //the enemy loses health
        enemyChosen.healthPoints -= characterChosen.attackPower;
        
        $("#battle-msg").text("You attacked "+enemyChosen.name+" for "+characterChosen.attackPower+" damage.");
        //the user increases its power
        characterChosen.attackPower += characterChosen.attackPower;

        //if the enemy loses all hp
        if(enemyChosen.healthPoints <= 0){ 
            destroyEnemy();
        }
        else{
            //the user loses health with the counter attack of the enemy
            characterChosen.healthPoints -= enemyChosen.counterAttackPower;
            $("#battle-msg").html($("#battle-msg").text()+"<br>"+enemyChosen.name+" attacked you back for "+enemyChosen.counterAttackPower+" damage.");

            //if the user loses all hp
            if(characterChosen.healthPoints <=0){ 
                gameOver();
            }
            else {
                updateBattle();
            }

        }
        

    });
    
    $("#btn-restart").click(function(){
        reset();
        start();
    });



    //starts the game
    start();
   


});