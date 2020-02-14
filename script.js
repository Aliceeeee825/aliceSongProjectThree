$(document).ready(function () {
    //sound effects
    const correctSound = new Audio('assets/correct.mp3')
    const falseSound = new Audio('assets/wrong.mp3')
    
    //flag for whether it is level two
    let isLevelTwo = false;
    
    //Strech goal: Timer
    const timerMax = 30;
    let timer = timerMax;
    $('.timeKeeper').html(`${timer}`);
    
    const countdownFunction = function(level){
        const countdown = setInterval(() => {
            timer--;
            $('.timeKeeper').html(`${timer}`);
            if (timer <= 0) {
                clearInterval(countdown)
                $('.'+ level).removeClass('invisible');
                $(`.${direction}`).addClass('invisible');
                $('.socialMedia').addClass('socialMediaRelocation')
            }
        }, 1000)
    }


    //generate random numbers from 1 to 4
    let randomNum = 0;
    const randomArrow = function(){
        return randomNum = Math.floor(Math.random() * 4) + 1;
    };
    
    //generate direction from numDirection
    let direction = '';
    const directionGenerator = function(){
        let numDirection = randomArrow()
        if (numDirection == 1){
            return direction = 'left'
        }

        if (numDirection == 2) {
            return direction = 'up'
        }

        if (numDirection == 3) {
            return direction = 'right'
        }

        if (numDirection == 4) {
            return direction = 'down'
        }
    };

    direction = directionGenerator()
    
    
    // click the play button
    $('.playButton').on('click', function (e) {
        e.preventDefault();
        $('.playButton').hide();
        $('.description').hide();
        $('h4').removeClass('invisible');
        $(`.${direction}`).removeClass('invisible');
        $('.restart').removeClass('invisible');
        //timer
        countdownFunction('levelTwo');
        // bgm.play()
    });

    //random generate new directions
    const newDirection = function(direction){
        $(`.${direction}`).addClass('invisible');
        direction = directionGenerator();
        $(`.${direction}`).removeClass('invisible');
    }

    // to make sure my determination will work
    function oppositeDirection(direction){
        if (direction === 'left'){
            return 'right'
        }else if(direction === 'right'){
            return 'left'
        }else if(direction === 'up'){
            return 'down'
        }else{
            return 'top'
        }
    }

    // to determine whether the key pressed matches the arrow showing 
    function determination(arrowDirection){
            if (isLevelTwo == false) {
                //for level one
                if (direction === `${arrowDirection}`) {
                    answer = true
                }
                else {
                    answer = false
                }
            }
            
            else{
                //for level two
                if (numOfCross % 2 === 0){
                    //for even number of arrows
                    if (direction === `${arrowDirection}`) {
                        answer = true
                    }
                    else {
                        answer = false
                    }
                }
                
                else if (numOfCross % 2 != 0) {
                    // for odd number of arrows
                    if (direction === oppositeDirection(`${arrowDirection}`)) {
                        answer = true
                    }
                    else {
                        answer = false
                    }
                }
            }
        }

    //take the input and check  
    let answer = null
    let score = 0;
    document.addEventListener('keydown', function (event) {
        let userInput = '';
        if (event.keyCode === 37) {
            //press left 
            determination('right')
        } //press left ends

        //press right
        else if (event.keyCode == 39) {
            determination('left')
        } //pree right ends

        //press up
        else if (event.keyCode == 38) {
            determination('down')
        } //press up ends

        //press down
        else if (event.keyCode == 40) {
            determination('up')
        }
            
        if(answer !== null){
            if(answer === true){
                correctSound.play();
                $(`.${direction}`).addClass('correct');
                score++
                $('.scoreKeeper').html(`${score}`)
                setTimeout(() => {
                    $(`.${direction}`).removeClass('correct');
                    newDirection(direction)
                    generateCross()
                }, 300)
                
            }
            else{
                falseSound.play();
                $(`.${direction}`).addClass('incorrect');
                setTimeout(() => {
                    $(`.${direction}`).removeClass('incorrect');
                    newDirection(direction)
                    generateCross()
                }, 300)
                
            }
        }
    });

    //restart button
    $('.restart').on('click', function(){
        window.location.reload(false);
    });

    //mobile swipe
    let touchstartX = 0;
    let touchstartY = 0;
    let touchendX = 0;
    let touchendY = 0;
    
    window.addEventListener('touchstart', function (event) {
        touchstartX = event.changedTouches[0].screenX;
        touchstartY = event.changedTouches[0].screenY;
    }, false);

    window.addEventListener('touchend', function (event) {
        touchendX = event.changedTouches[0].screenX;
        touchendY = event.changedTouches[0].screenY;
        handleGesture();
    }, false);

    function handleGesture() {
        let up = touchstartY- touchendY
        let right = touchendX - touchstartX
        let y = Math.abs(up)
        let x = Math.abs(right)
        if (x > 5 && y > 5){
            if (y >= x && timer < timerMax){
                // swipe in up directions 
                if (up >= 0){
                    // swipe up
                    determination('down')
                }

                else{
                    //swipe down
                    determination('up')
                }
            }

            else if (y < x && timer < timerMax){
                //swipe in left right directions
                if (right >= 0){
                    //swipe right
                    determination('left')
                }
                else{
                    //swipe left 
                    determination('right')
                }
            }
        }    

        if (answer !== null) {
            if (answer === true) {
                $(`.${direction}`).addClass('correct');
                score++
                $('.scoreKeeper').html(`${score}`)
                correctSound.play()
                setTimeout(() => {
                    $(`.${direction}`).removeClass('correct');
                    newDirection(direction)
                }, 300)
            }
            else {
                $(`.${direction}`).addClass('incorrect');
                falseSound.play()
                setTimeout(() => {
                    $(`.${direction}`).removeClass('incorrect');
                    newDirection(direction)
                }, 300)
            }
        }
    } // end of handle gesture 


    // level two
    $('.levelTwo').on('click', function(e){
        e.preventDefault(e);
        isLevelTwo = true;
        $('.levelTwo').addClass('invisible')
        $('.timeKeeper').html(`${timerMax}`);
        $(`.${direction}`).removeClass('invisible');
        score = 0
        $('.scoreKeeper').html(`${score}`);
        //timer
        timer = timerMax;
        countdownFunction('endingScreen');
    })

    //random generate cross in random places in the browswer 
    let numOfCross = 0;
    function generateCross(){
        if (isLevelTwo){
            const modifyCross = Math.floor(Math.random() * 3) - 1;
            const top = Math.random() * window.innerHeight * 0.6 + 0.2 * window.innerHeight;
            const left = Math.random() * window.innerWidth * 0.8
            if (modifyCross > 0){
                //add cross
                $('.cross ul').append(`<li class = "floatingCross"><i class="fas fa-times"></i></li>`)
                $("li").last().css({top: top, left: left})
                numOfCross ++
            }else if (modifyCross < 0 && numOfCross > 0){
                //remove cross
                $('li').last().remove();
                numOfCross --
            }
        }
    }

}); // the end of the document ready
