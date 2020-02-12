$(document).ready(function () {
    let isLevelTwo = false;
    //Strech goal: Timer
    const timerMax = 3;
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
    
    
    // play button disappear after clicked
    $('.playButton').on('click', function (e) {
        e.preventDefault();
        $('.playButton').hide();
        $('.description').hide();
        $('h4').removeClass('invisible');
        $(`.${direction}`).removeClass('invisible');
        $('.restart').removeClass('invisible');
        //timer
        countdownFunction('levelTwo');
    });

    const newDirection = function(direction){
        $(`.${direction}`).addClass('invisible');
        direction = directionGenerator();
        $(`.${direction}`).removeClass('invisible');
    }

    //check input 
    let answer = null
    let score = 0;
    document.addEventListener('keydown', function (event) {
        let userInput = '';
        if (event.keyCode === 37) {
            if (direction === 'right' ){
                answer = true
            }
            else{
                answer = false
            }
        }
        else if (event.keyCode == 39) {
            if (direction === 'left') {
                answer = true
            }
            else {
                answer = false
            }
        }
        else if (event.keyCode == 38) {
            if (direction === 'down') {
                answer = true
            }
            else {
                answer = false
            }
        }
        else if (event.keyCode == 40) {
            if (direction === 'up') {
                answer = true
            }
            else {
                answer = false
            }
        }
            
        if(answer !== null){
            if(answer === true){
                $(`.${direction}`).addClass('correct');
                score++
                $('.scoreKeeper').html(`${score}`)
                setTimeout(() => {
                    $(`.${direction}`).removeClass('correct');
                    newDirection(direction)
                }, 300)
                generateCross()
            }
            else{
                $(`.${direction}`).addClass('incorrect');
                setTimeout(() => {
                    $(`.${direction}`).removeClass('incorrect');
                    newDirection(direction)
                }, 300)
                generateCross()
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
        console.log("current dir"+direction)
        let result = null
        let up = touchstartY- touchendY
        let right = touchendX - touchstartX
        let y = Math.abs(up)
        let x = Math.abs(right)
        if (y >= x && timer < timerMax){
            // swipe in up dir
            if (up >= 0){
                // swipe up
                console.log("swipe up")
                if (direction === 'down'){
                    result = true;
                }
                else{
                    result = false;
                }
            }

            else{
                console.log("swipe down")
                //swipe down
                if (direction === 'up'){
                    result = true
                }
                else{
                    result = false
                }
            }
        }

        if (y < x && timer < timerMax){
            //swipe in left right directions
            if (right >= 0){
                //swipe right
                if (direction === 'left'){
                    result = true
                }
                else{
                    result = false
                }
            }
            else{
                //swipe left 
                if (direction === 'right'){
                    result = true
                }
                else{
                    result = false
                }
            }
        }

        if (result !== null) {
            if (result === true) {
                $(`.${direction}`).addClass('correct');
                score++
                $('.scoreKeeper').html(`${score}`)
                setTimeout(() => {
                    $(`.${direction}`).removeClass('correct');
                    newDirection(direction)
                }, 300)
            }
            else {
                $(`.${direction}`).addClass('incorrect');
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
        countdownFunction('levelThree');
    })

    let numOfCross = 0;
    function generateCross(){
        if (isLevelTwo){
            const modifyCross = Math.floor(Math.random() * 3) - 1;
            const top = Math.random() * window.innerHeight * 0.8 + 0.2 * window.innerHeight;
            const left = Math.random() * window.innerWidth
            console.log(modifyCross)
            if (modifyCross > 0){
                //add cross
                $('ul').append(`<li class = "floatingCross"><i class="fas fa-times"></i></li>`)
                $("li").last().css({top: top, left: left})
                numOfCross ++
                console.log(numOfCross)
            }else if (modifyCross < 0 && numOfCross > 0){
                //remove cross
                $('li').last().remove();
                numOfCross --
                console.log(numOfCross)
            }
        }
    }

    // how many cross 
    // if cross === 0, cannot substract
    // remove: take one from list
        //$('li').first().remove()
    // add: add one to the list 
        //ul append li.added${'.number'}
        //$("li").last().css({top = top, left = left})
    // do nothing



    
    // if (numberOfCross === 1){
    //     const top = Math.random() * window.innerHeight * 0.8 + 0.2 * window.innerHeight;
    //     const left = Math.random() * window.innerWidth
    //     $('ul').append(`<li class = "floatingCross"><i class="fas fa-times"></i></li>`)

    // }



    //level three
    $('.levelThree').on('click', function (e) {
        e.preventDefault(e);
        $('.levelThree').addClass('invisible')
        $('.timeKeeper').html(`${timerMax}`);
        $(`.${direction}`).removeClass('invisible');
        score = 0
        $('.scoreKeeper').html(`${score}`);
        //timer
        timer = timerMax;
        countdownFunction('endingScreen');
    })






}); // the end of the document ready
