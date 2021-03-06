/**
 * Created by luism on 14/05/2016.
 */

$(document).ready(function(){
    turn = 1;
    gamePlaying = true;
    userScore = 0;
    pcScore = 0;

    $('#userScore').html(userScore);
    $('#pcScore').html(pcScore);

    //Random to decide wich one starts to play

    $('.cd-popup').addClass('is-visible');

});


$( ".btn" ).click(function() {
    if ( this.innerHTML === "" && gamePlaying)
        this.innerHTML = user;
    else
        return;

    turn ++;

    if (checkEndOfGame() != -1)
        console.log("END---->" + checkEndOfGame());

    //PC MOVE
    if (gamePlaying)
        pcMove();

    if (checkEndOfGame() != -1)
        console.log("END---->" + checkEndOfGame());
});

/**
 *
 * @returns {number}: -1: not end of game; 0: tie; O/X: winner
 */
checkEndOfGame = function(){
    var cells = 0;
    var end = -1;

    $('.btn').each(function(){
        if ( this.innerHTML === "" )
            cells ++;
    });

    end = checkWinner();

    if ( cells === 0 && end == -1)
        end = 0;


    if ( end != -1 && gamePlaying) {
        handleWin(end);
        gamePlaying = false;
    }
    return end;
};

pcMove = function(){
    console.log(turn)
    switch (turn) {
        // Turn = 1 -> Go(1)   (upper left corner).
        case 1:
            $('#pos1').html(pc);
            break;
        // Turn = 2 -> If Board[5] is blank, Go(5), else Go(1).
        case 2:
            if ($('#pos5').text() === "")
                $('#pos5').html(pc);
            else
                $('#pos1').html(pc);
            break;
        // Turn = 3 -> If Board[9] is blank, Go(9), else Go(3).
        case 3:
            if ($('#pos9').text() === "")
                $('#pos9').html(pc);
            else
                $('#pos3').html(pc);
            break;
        // Turn = 4 -> If Posswin(X) is not 0, then Go(Posswin(X)) i.e. [ block opponent’s win], else Go(Make2).
        case 4:
            if (canWin(pc))
                $('#pos' + canWin(pc)).html(pc);
            else if (canWin(user))
                $('#pos' + canWin(user)).html(pc);
            else if ($('#pos2').text() === "")
                $('#pos2').html(pc);
            else
                anywhereBlank();
            break;
        // Turn = 5 -> if Posswin(X) is not 0 then Go(Posswin(X)) [i.e. win], else if Posswin(O) is not 0, then Go(Posswin(O)) [i.e. block win], else if Board[7] is blank, then Go(7), else Go(3). [to explore other possibility if there be any ].
        case 5:
            if (canWin(pc))
                $('#pos' + canWin(pc)).html(pc);
            else if (canWin(user))
                $('#pos' + canWin(user)).html(pc);
            else if ($('#pos7').text() === "")
                $('#pos7').html(pc);
            else if ($('#pos3').text() === "")
                $('#pos3').html(pc);
            else
                anywhereBlank();
            break;
        // Turn = 6 -> If Posswin(O) is not 0 then Go(Posswin(O)), else if Posswin(X) is not 0, then Go(Posswin(X)), else Go(Make2).
        case 6:
            if (canWin(pc))
                //alert(canWin(pc))
                $('#pos' + canWin(pc)).html(pc);
            else if (canWin(user))
                $('#pos' + canWin(user)).html(pc);
            else if ($('#pos2').text() === "")
                $('#pos2').html(pc);
            else
                anywhereBlank();
            break;
        // Turn = 7 -> If Posswin(X) is not 0 then Go(Posswin(X)), else if Posswin(X) is not 0, then Go(Posswin(O)) else go anywhere that is blank.
        case 7:
            if (canWin(pc))
                $('#pos' + canWin(pc)).html(pc);
            else if (canWin(user))
                $('#pos' + canWin(user)).html(pc);
            else
                anywhereBlank();
            break;
        // Turn = 8 -> if Posswin(O) is not 0 then Go(Posswin(O)), else if Posswin(X) is not 0, then Go(Posswin(X)), else go anywhere that is blank.
        case 8:
            if (canWin(pc))
                $('#pos' + canWin(pc)).html(pc);
            else if (canWin(user))
                $('#pos' + canWin(user)).html(pc);
            else
                anywhereBlank();
            break;
        // Turn = 9 -> Same as Turn=7.
        case 9:
            if (canWin(pc))
                $('#pos' + canWin(pc)).html(pc);
            else if (canWin(user))
                $('#pos' + canWin(user)).html(pc);
            else
                anywhereBlank();
            break;
        default: alert("ERROR");
    }
    turn++;
}

canWin = function(char){
//1 horizontal
    if ($('#pos1').text() === char && $('#pos2').text() === char && $('#pos3').text() === "")
        return 3;
    else if ($('#pos2').text() === char && $('#pos3').text() === char && $('#pos1').text() === "")
        return 1;
    else if ($('#pos1').text() === char && $('#pos3').text() === char && $('#pos2').text() === "")
        return 2;

//2 horizontal
    else if ($('#pos4').text() === char && $('#pos5').text() === char && $('#pos6').text() === "")
        return 6;
    else if ($('#pos6').text() === char && $('#pos5').text() === char && $('#pos4').text() === "")
        return 4;
    else if ($('#pos4').text() === char && $('#pos6').text() === char && $('#pos5').text() === "")
        return 5;

//3 horizontal
    else if ($('#pos7').text() === char && $('#pos8').text() === char && $('#pos9').text() === "")
        return 9;
    else if ($('#pos7').text() === char && $('#pos9').text() === char && $('#pos8').text() === "")
        return 8;
    else if ($('#pos8').text() === char && $('#pos9').text() === char && $('#pos7').text() === "")
        return 7;




//1 vertical
    else if ($('#pos1').text() === char && $('#pos4').text() === char && $('#pos7').text() === "")
        return 7;
    else if ($('#pos7').text() === char && $('#pos4').text() === char && $('#pos1').text() === "")
        return 1;
    else if ($('#pos1').text() === char && $('#pos7').text() === char && $('#pos4').text() === "")
        return 4;

//2 vertical
    else if ($('#pos2').text() === char && $('#pos5').text() === char && $('#pos8').text() === "")
        return 8;
    else if ($('#pos8').text() === char && $('#pos5').text() === char && $('#pos2').text() === "")
        return 2;
    else if ($('#pos2').text() === char && $('#pos8').text() === char && $('#pos5').text() === "")
        return 5;

//3 vertical
    else if ($('#pos3').text() === char && $('#pos6').text() === char && $('#pos9').text() === "")
        return 9;
    else if ($('#pos3').text() === char && $('#pos9').text() === char && $('#pos6').text() === "")
        return 6;
    else if ($('#pos6').text() === char && $('#pos9').text() === char && $('#pos3').text() === "")
        return 3;





//1 diagonal
    else if ($('#pos1').text() === char && $('#pos5').text() === char && $('#pos9').text() === "")
        return 9;
    else if ($('#pos9').text() === char && $('#pos5').text() === char && $('#pos1').text() === "")
        return 1;
    else if ($('#pos1').text() === char && $('#pos9').text() === char && $('#pos5').text() === "")
        return 5;

//2 diagonal
    else if ($('#pos3').text() === char && $('#pos5').text() === char && $('#pos7').text() === "")
        return 7;
    else if ($('#pos7').text() === char && $('#pos5').text() === char && $('#pos3').text() === "")
        return 3;
    else if ($('#pos3').text() === char && $('#pos7').text() === char && $('#pos5').text() === "")
        return 5;

    else
        return 0;
}

checkWinner = function(){
//1 horizontal
    if ($('#pos1').text() === $('#pos2').text() && $('#pos2').text() === $('#pos3').text() && $('#pos1').text() !== "" )
        return $('#pos1').text();

//2 horizontal
    if ($('#pos4').text() === $('#pos5').text() && $('#pos5').text() === $('#pos6').text() && $('#pos4').text() !== "" )
        return $('#pos4').text();


//3 horizontal
    if ($('#pos7').text() === $('#pos8').text() && $('#pos8').text() === $('#pos9').text() && $('#pos7').text() !== "" )
        return $('#pos7').text();

//1 vertical
    if ($('#pos1').text() === $('#pos4').text() && $('#pos4').text() === $('#pos7').text() && $('#pos1').text() !== "" )
        return $('#pos1').text();

//2 vertical
    if ($('#pos2').text() === $('#pos5').text() && $('#pos5').text() === $('#pos8').text() && $('#pos2').text() !== "" )
        return $('#pos2').text();

//3 vertical
    if ($('#pos3').text() === $('#pos6').text() && $('#pos6').text() === $('#pos9').text() && $('#pos3').text() !== "" )
        return $('#pos3').text();

//1 diagonal
    if ($('#pos1').text() === $('#pos5').text() && $('#pos5').text() === $('#pos9').text() && $('#pos1').text() !== "" )
        return $('#pos1').text();


//2 diagonal
    if ($('#pos3').text() === $('#pos5').text() && $('#pos5').text() === $('#pos7').text() && $('#pos3').text() !== "" )
        return $('#pos3').text();


    return -1;
}

anywhereBlank = function (){
    var i = 0;
    $('.btn').each(function(){
        if ( $(this).text() == "" && i == 0) {
            $(this).html(pc);
            i ++;
        }
    });
}

handleWin = function(char){
    $('.all').css('opacity', '0.3');

    console.log(char == user);
    console.log(char == pc);
    if ( char === 0 && gamePlaying)
        $('#end').html("TIE");
    else if ( char == user && gamePlaying) {
        $('#end').html("User Won");
        userScore++;
    }
    else if ( char == pc && gamePlaying) {
        $('#end').html("PC Won");
        pcScore++;
    }
    else
        $('#end').html("ERROR");

    $('#end').addClass("end");

    $('#end').animate({
        opacity: '1'
    }).fadeOut(2000, function(){
        $('.all').css('opacity', '1');
        $('#end').html("").removeClass("end");
        clearAll();
    });
}

clearAll = function(){
    $('.btn').each(function(){
        this.innerHTML =("");
    });

    gamePlaying = true;

    $('#userScore').html(userScore);
    $('#pcScore').html(pcScore);

    var temp = user;
    user = pc;
    pc = temp;
    turn = 1;

}


$('.opt').click(function(){
    if ( this.innerHTML == 'X') {
        user = 'X';
        pc = 'O';
    }
    else{
        user = 'O';
        pc = 'X';
    }

    $('.cd-popup').removeClass('is-visible');
});