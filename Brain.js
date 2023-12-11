let ting = new Audio('ting.mp3');
let winsong = new Audio('Winsong.mp3');

//Handling the Start Button
start = document.getElementById('btn');
start.addEventListener('click',()=>{
    document.getElementById('Ques').style.display = 'none';
    document.getElementById('Game').style.display = 'flex';
})

turn = 'X';
gameover = false;
player1 = document.getElementById('player-1');
player2 = document.getElementById('player-2');

//change turn function
function changeTurn()
{
    turn = (turn==='X')?'0':'X';
}

//Checking the win
function checkWin()
{
    boxtext = document.getElementsByClassName('boxtext');
    win = [
        [0,1,2,8,3.5,0],
        [3,4,5,8,10.5,0],
        [6,7,8,8,17.5,0],
        [0,3,6,-8,10.5,90],
        [1,4,7,8.3,10.5,90],
        [2,5,8,24.2,10.5,90],
        [0,4,8,8,10,41],
        [2,4,6,8,10.2,139]
    ];
    win.forEach((e)=>{
        if((boxtext[e[0]].innerText===boxtext[e[1]].innerText) && (boxtext[e[1]].innerText===boxtext[e[2]].innerText) && (boxtext[e[0]].innerText!==''))
        {
            gameover = true;
            document.getElementById('WinInfo').style.opacity = 1;
            winsong.play();
            document.getElementById('line').style.transform = `translate(${e[3]}vh, ${e[4]}vw) rotate(${e[5]}deg)`;
            document.getElementById('line').style.opacity = 1;
            if(turn==='X')
            {
                document.getElementById('Winner').innerText = player2.value;
            }
            else
            {
                document.getElementById('Winner').innerText = player1.value;   
            }
        }
    })
}

//Handling the tic tac toe boxes
Array.from(document.getElementsByClassName('box')).forEach((e)=>{
    e.addEventListener('click',()=>{
        boxtext = e.querySelector('.boxtext');  // This wiil select that boxtext which is present inside e
        if(boxtext.innerText === '')
        {
            boxtext.innerText = turn;
            changeTurn();
            ting.play();
            checkWin();
            gameOver();
            if(gameover === false)
            {
                if(turn==='X')
                {
                    document.getElementById('Inf').innerText = "Turn for " + player1.value;
                }
                else
                {
                    document.getElementById('Inf').innerText = "Turn for " + player2.value;
                }
            }
        }
    })
})
function gameOver()
{
    let c = 0;
    Array.from(document.getElementsByClassName('boxtext')).forEach((e)=>{
        if(e.innerText!='')
        {
            c = c + 1;
        }
    })
    if(c==9)
    {
        document.getElementById('Inf').innerText = "Gameover";
        gameover = true;
    }
}


//Handling the reset button
reset = document.getElementById('reset');
reset.addEventListener('click',()=>{
    Array.from(document.getElementsByClassName('boxtext')).forEach((e)=>{
        e.innerText = '';
        gameover = false;
        document.getElementById('Inf').innerText = "Turn for player-1";
        // document.getElementById('turn').innerText = 'player-1';
        document.getElementById('WinInfo').style.opacity = 0;
        winsong.pause();
        winsong.currentTime = 0;
        turn = 'X';
        document.getElementById('line').style.transform = `translate(0vh, 0vw) rotate(0deg)`;
        document.getElementById('line').style.opacity = 0;
    })
})