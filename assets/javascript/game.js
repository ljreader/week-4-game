
var fight

    = false;
var pickYourPony;
pickYourPony = false;
var ponyLaidToRest = false;
var AIpony = false;
var ponyAttacked;
var rabidPony;
var winner;
var loser = [];
var TwilightSparkle = {
    hp: 100,
    attackPower: 6
}
var FlutterShy
    = {
    hp: 120,
    attackPower: 6
}
var AppleJack
    = {
    hp: 180,
    attackPower: 6
}
var RainbowDash
    = {
    hp: 150,
    attackPower: 6
}

$(".character").on("click", function() {
    if (!(fight

        ) && !(pickYourPony)) {
        pickYourPony = true;

        $(this).css("border-color", "#320B68");
        $("#choose").html("Enemy");
        rabidPony = $(this).detach();
        rabidPony.appendTo("#active");
        console.log(rabidPony);
        $("#battle").fadeIn("slow");
    } else if (pickYourPony) {
        pickYourPony = false;
        fight = true;
        $("#alerts").html("");
        $(this).css("border-color", "#B9161A");
        ponyAttacked = $(this).detach();
        ponyAttacked.appendTo("#under-attack");
        console.log(ponyAttacked);
        $("#available").fadeOut("slow");
        $("#fight").fadeIn("slow");
    }
})

function reset() {
    if (ponyLaidToRest) {
        winner = ponyAttacked.detach();
    }
    fight = false;
    pickYourPony = false;
    ponyLaidToRest = false;
    AIpony = false;
    for (let x = 0; x < loser.length; x++) {
        loser [x].appendTo("#available");
    }

    loser = [];
    winner.appendTo("#available");
    $("#alerts").html("");
    $("#choose").html("Character");
    $(".character").css("border-color", "#8adcf6");
    $("#reset").fadeOut("slow");
    $("#battle").fadeOut("slow");
    $("#TwilightSparkle").data("hp", TwilightSparkle.hp).find(".pony-hp" +
        "").html(TwilightSparkle.hp);
    $("#TwilightSparkle").data("attack-power", TwilightSparkle.attackPower);
    $("#FlutterShy").data("hp", FlutterShy
        .hp).find(".pony-hp" +
        "").html(FlutterShy
        .hp);
    $("#FlutterShy" +
        "").data("attack-power", FlutterShy
        .attackPower);
    $("#AppleJack").data("hp", AppleJack
        .hp).find(".pony-hp" +
        "").html(AppleJack
        .hp);
    $("#AppleJack" +
        "").data("attack-power", AppleJack
        .attackPower);
    $("#RainbowDash").data("hp", RainbowDash
        .hp).find(".pony-hp" +
        "").html(RainbowDash
        .hp);
    $("#RainbowDash").data("attack-power", RainbowDash
        .attackPower);
    $("#available").fadeIn("slow");
}

var transition;
function checkForWin () {
    if (loser
            .length === 3) {
        function youWin() {
            $("#alerts").text(" YOU WIN!!!");
            $("#fight").fadeOut("fast");
            $("#battle").fadeOut("fast");
            $("#reset").fadeIn("slow");
            fight = false;
            winner = rabidPony.detach();
        }
        transition = setTimeout(youWin, 2000);
    } else {
        $("#fight").fadeOut("slow");
        $("#available").fadeIn("slow");
        pickYourPony = true;
    }
}

function battle() {
    var vhp = parseInt(ponyAttacked.data("hp"));
    var attack = parseInt(rabidPony.data("attack-power"));
    vhp -= attack;
    ponyAttacked.data("hp", vhp);
    $("#under-attack").find(".pony-hp" +
        "").html(vhp);
    $("#alerts").html("You did " + attack + " damage to " + ponyAttacked.data("name") + ". ");
    attack += attack;
    rabidPony.data("attack-power", attack);
    if (vhp <= 0) {
        function jediDied() {
            loser.push(ponyAttacked.detach());
            console.log(loser);
            $("#alerts").text(" And you killed him!");
            checkForWin();
        }

        transition = setTimeout(ponyDied, 2000);
    }
    else {
        var uhp = parseInt(rabidPony.data("hp"));
        var counterAttack = parseInt(ponyAttacked.data("counter-attack"));
        uhp -= counterAttack;
        rabidPony.data("hp", uhp);
        $("#active").find(".pony-hp").html(uhp);
        $("#alerts").append(ponyAttacked.data("name") + " did " + counterAttack + " damage to you.");
        if (uhp <= 0) {
            $("#alerts").text(" And She killed you!");

            function YouBoughtTheFarm() {
                ponyLaidToRest = true;
                loser.push(rabidPony.detach());
                console.log(loser
                );
                $("#fight").fadeOut("fast");
                $("#battle").fadeOut("fast");
                $("#reset").fadeIn("slow");
                transition = setTimeout(YouBoughtTheFarm, 2000);
            }
        }
    }


    $("button").on("click", function () {
        if (ponyLaidToRest || !(fight

            )) {
            reset();
        } else {
            battle();
        }
    })
}