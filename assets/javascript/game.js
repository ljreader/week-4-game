//variables
var wrestle = false;
var chooseWrestler = false;
var userPinned = false;
var aiPinned = false;
var victim;
var attacker;
var winner;
var pinnedWrestler = [];
//Wrestlers//
var HulkHogan = {
    hp: 100,
    attackPower: 9
}
var AndreTheGiant = {
    hp: 120,
    attackPower: 7
}
var TheUndertaker = {
    hp: 180,
    attackPower: 5
}
var TheUltimateWarrior = {
    hp: 150,
    attackPower: 6
}
var Chyna = {
    hp: 100,
    attackPower: 9
}
var AndreTheGiant = {
    hp: 120,
    attackPower: 7
}
var TheUndertaker = {
    hp: 180,
    attackPower: 5
}
var TheUltimateWarrior = {
    hp: 150,
    attackPower: 6
}


$(".character").on("click", function() {
    if (!(wrestle) && !(chooseWrestler)) {
        chooseWrestler = true; 
        $(this).css("border-color", "#320B68");
        $("#choose").html("Enemy"); 
        attacker = $(this).detach(); 
        attacker.appendTo("#active"); 
        console.log(attacker);
        $("#battle").fadeIn("slow");
    } else if (chooseWrestler) { 
        chooseWrestler = false;
        wrestle = true; 
        $("#alerts").html(""); 
        $(this).css("border-color", "#B9161A");
        victim = $(this).detach(); 
        victim.appendTo("#under-attack"); 
        console.log(victim);
        $("#available").fadeOut("slow"); 
        $("#fight").fadeIn("slow"); 
    } 
})

function reset() {
    if (userPinned) {
        winner = victim.detach();
    }
    wrestle = false;
    chooseWrestler = false;
    userPinned = false;
    aiPinned = false;
    for (let x = 0; x < pinnedWrestler.length; x++) {
        pinnedWrestler[x].appendTo("#available");
    }
   pinnedWrestler = [];
    winner.appendTo("#available"); 

    $("#alerts").html("");
    $("#choose").html("Character");
    $(".character").css("border-color", "#7D9403");
    $("#reset").fadeOut("slow");
    $("#battle").fadeOut("slow");
    $("#HulkHogan").data("hp", HulkHogan.hp).find("wrestlerHp").html(HulkHogan.hp);
    $("#HulkHogan").data("attack-power", HulkHogan.attackPower);
    $("#AndreTheGiant").data("hp", AndreTheGiant.hp).find("wrestlerHp").html(AndreTheGiant.hp);;
    $("#AndreTheGiant").data("attack-power", AndreTheGiant.attackPower);
    $("#TheUndertaker").data("hp", TheUndertaker.hp).find("wrestlerHp").html(TheUndertaker.hp);;
    $("#TheUndertaker").data("attack-power", TheUndertaker.attackPower);
    $("#TheUltimateWarrior").data("hp", TheUltimateWarrior.hp).find("wrestlerHp").html(TheUltimateWarrior.hp);;
    $("#TheUltimateWarrior").data("attack-power", TheUltimateWarrior.attackPower);
    $("#available").fadeIn("slow");
}

// functions //
var transition;

function checkForWin () {
    if (pinnedWrestler.length === 3) {
        function youWin() {
            $("#alerts").text(" You Win!!!");
            $("#fight").fadeOut("fast"); 
            $("#battle").fadeOut("fast"); 
            $("#reset").fadeIn("slow"); 
            wrestle = false;
            winner = attacker.detach();
        }
        transition = setTimeout(youWin, 2000);
    } else { 
        $("#fight").fadeOut("slow"); 
        $("#available").fadeIn("slow"); 
        chooseWrestler = true;
    }
}

function battle() {
    var vhp = parseInt(victim.data("hp")); 
    var attack = parseInt(attacker.data("attack-power")); 
    vhp-= attack; 
    victim.data("hp", vhp); 
    $("#under-attack").find("wrestlerHp").html(vhp); 
    $("#alerts").html("You did " + attack + " damage to " + victim.data("name") +"! ");
    attack+=attack; 
    attacker.data("attack-power", attack); 
    if (vhp <= 0) {
        function wrestlerPinned() {
            pinnedWrestler.push(victim.detach());
            console.log(pinnedWrestler);
            $("#alerts").text(" And you get the Win!");
            checkForWin();
        }
            transition = setTimeout(wrestlerPinned, 2000);
    } else {
        var uhp = parseInt(attacker.data("hp"));
        var counterAttack = parseInt(victim.data("counter-attack")); 
        uhp -= counterAttack; 
        attacker.data("hp", uhp);
        $("#active").find("wrestlerHp").html(uhp);
        $("#alerts").append(victim.data("name") + " " + " did " + counterAttack + " damage to you.");
        if (uhp <= 0) {
            $("#alerts").text(" You got pinned!");
            function gotPinned() {
                userPinned = true;
           
                pinnedWrestler.push(attacker.detach());
                console.log(pinnedWrestler);
                $("#fight").fadeOut("fast"); 
                $("#battle").fadeOut("fast"); 
                $("#reset").fadeIn("slow"); 
            }
            transition = setTimeout(gotPinned, 2000);
        }
    }
}

// Attack and Start Over Buttons only active after players selected
// Start Over Button only visible after game won or game lost
$("button").on("click", function() {
    if (userPinned || !(wrestle)) {
        reset();
    } else {
        battle();
    }
})
