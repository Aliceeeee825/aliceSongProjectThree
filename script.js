$(document).ready(function () {
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
    });

    //check input 
    // 37 = left 38 = up 39 = right 40 = down
    //if direction left 
                    //green
                    //new direction
                    //flag true
                //else 
                    //red
                    //new direction
                    //flag true 
    // while (true){
        let userInput = '';
        document.addEventListener('keydown', function (event) {
            if (event.keyCode === 37) {
                if (direction === 'right' ){
                    $(`.${direction}`).addClass('correct');
                    setTimeout(() => {
                        $(`.${direction}`).removeClass('correct');
                        $(`.${direction}`).addClass('invisible');
                        direction = directionGenerator();
                        $(`.${direction}`).removeClass('invisible')
                    }, 500)
                }
                
                else{
                    $(`.${direction}`).addClass('incorrect');
                    setTimeout(() => {
                        $(`.${direction}`).removeClass('incorrect');
                        $(`.${direction}`).addClass('invisible');
                        direction = directionGenerator();
                        $(`.${direction}`).removeClass('invisible')
                    }, 500)
                }
            }

            else if (event.keyCode == 39) {
                if (direction === 'left') {
                    $(`.${direction}`).addClass('correct');
                    setTimeout(() => {
                        $(`.${direction}`).removeClass('correct');
                        $(`.${direction}`).addClass('invisible');
                        direction = directionGenerator();
                        $(`.${direction}`).removeClass('invisible')}, 500)
                }

                else {
                    $(`.${direction}`).addClass('incorrect');
                    setTimeout(() => {
                        $(`.${direction}`).removeClass('incorrect');
                        $(`.${direction}`).addClass('invisible');
                        direction = directionGenerator();
                        $(`.${direction}`).removeClass('invisible')
                    }, 500)
                }
            }
            else if (event.keyCode == 38) {
                if (direction === 'down') {
                    $(`.${direction}`).addClass('correct');
                    setTimeout(() => {
                        $(`.${direction}`).removeClass('correct');
                        $(`.${direction}`).addClass('invisible');
                        direction = directionGenerator();
                        $(`.${direction}`).removeClass('invisible')}, 500)
                }

                else {
                    $(`.${direction}`).addClass('incorrect');
                    setTimeout(() => {
                        $(`.${direction}`).removeClass('incorrect');
                        $(`.${direction}`).addClass('invisible');
                        direction = directionGenerator();
                        $(`.${direction}`).removeClass('invisible')
                    }, 500)
                }
            }
            else if (event.keyCode == 40) {
                if (direction === 'up') {
                    $(`.${direction}`).addClass('correct');
                    setTimeout(() => {
                        $(`.${direction}`).removeClass('correct');
                        $(`.${direction}`).addClass('invisible');
                        direction = directionGenerator();
                        $(`.${direction}`).removeClass('invisible')}, 500)
                }

                else {
                    $(`.${direction}`).addClass('incorrect');
                    setTimeout(() => {
                        $(`.${direction}`).removeClass('incorrect');
                        $(`.${direction}`).addClass('invisible');
                        direction = directionGenerator();
                        $(`.${direction}`).removeClass('invisible')
                    }, 500)
                }
            }
            //else
        });
    // }
});

//console.log('hi')