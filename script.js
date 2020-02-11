$(document).ready(function () {
    //Strech goal: Timer
    const timerMax = 90;
    let timer = timerMax;
    

    const countdownFunction = function(){
        const countdown = setInterval(() => {
            timer--;
            $('.timeKeeper').html(`${timer}`);
            if (timer <= 0) {
                clearInterval(countdown)
                $('.endingScreen').removeClass('invisible');
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

    // function sleep(ms) {
    //     return new Promise(resolve => setTimeout(resolve, ms));
    // }

    direction = directionGenerator()
    
    
    // play button disappear after clicked
    $('button').on('click', function (e) {
        e.preventDefault();
        $('.playButton').hide();
        $('.description').hide();
        $('h4').removeClass('invisible');
        $(`.${direction}`).removeClass('invisible');
        $('.restart').removeClass('invisible');
        //timer
        countdownFunction();
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
                }, 500)
            }
            else{
                $(`.${direction}`).addClass('incorrect');
                setTimeout(() => {
                    $(`.${direction}`).removeClass('incorrect');
                    newDirection(direction)
                }, 500)
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

    // const gestureZone = $('');
    
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
                }, 500)
            }
            else {
                $(`.${direction}`).addClass('incorrect');
                setTimeout(() => {
                    $(`.${direction}`).removeClass('incorrect');
                    newDirection(direction)
                }, 500)
            }
        }
        // if (right <= 0) {
        //     console.log('Swiped left');
        //     if (direction === 'left') {
        //         $(`.${direction}`).addClass('correct');
        //         score++
        //         $('.scoreKeeper').html(`${score}`)
        //         setTimeout(() => {
        //             $(`.${direction}`).removeClass('correct');
        //             newDirection(direction)
        //         }, 500)
        //     }

        //     else {
        //         $(`.${direction}`).addClass('incorrect');
        //         setTimeout(() => {
        //             $(`.${direction}`).removeClass('incorrect');
        //             newDirection(direction)
        //         }, 500)
        //     }
        }

    //     if (touchendX >= touchstartX) {
    //         console.log('Swiped right');
    //         if (direction === 'left') {
    //             $(`.${direction}`).addClass('correct');
    //             score++
    //             $('.scoreKeeper').html(`${score}`)
    //             setTimeout(() => {
    //                 $(`.${direction}`).removeClass('correct');
    //                 newDirection(direction)
    //             }, 500)
    //         }

    //         else {
    //             $(`.${direction}`).addClass('incorrect');
    //             setTimeout(() => {
    //                 $(`.${direction}`).removeClass('incorrect');
    //                 newDirection(direction)
    //             }, 500)
    //         }
    //     }

    //     if (touchendY <= touchstartY) {
    //         console.log('Swiped up');
    //         if (direction === 'down') {
    //             $(`.${direction}`).addClass('correct');
    //             score++
    //             $('.scoreKeeper').html(`${score}`)
    //             setTimeout(() => {
    //                 $(`.${direction}`).removeClass('correct');
    //                 newDirection(direction)
    //             }, 500)
    //         }

    //         else {
    //             $(`.${direction}`).addClass('incorrect');
    //             setTimeout(() => {
    //                 $(`.${direction}`).removeClass('incorrect');
    //                 newDirection(direction)
    //             }, 500)
    //         }
    //     }

    //     if (touchendY >= touchstartY) {
    //         console.log('Swiped down');
    //         if (direction === 'up') {
    //             $(`.${direction}`).addClass('correct');
    //             score++
    //             $('.scoreKeeper').html(`${score}`)
    //             setTimeout(() => {
    //                 $(`.${direction}`).removeClass('correct');
    //                 newDirection(direction)
    //             }, 500)
    //         }

    //         else {
    //             $(`.${direction}`).addClass('incorrect');
    //             setTimeout(() => {
    //                 $(`.${direction}`).removeClass('incorrect');
    //                 newDirection(direction)
    //             }, 500)
    //         }
    //     }

    //     // if (touchendY === touchstartY) {
    //     //     console.log('Tap');
    //     // }
    // }




    


}); // the end of the document ready
