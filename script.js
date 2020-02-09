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
            return direction = '.left'
        }

        if (numDirection == 2) {
            return direction = '.up'
        }

        if (numDirection == 3) {
            return direction = '.right'
        }

        if (numDirection == 4) {
            return direction = '.down'
        }
    };
    
    // play button disappear after clicked
    $('button').on('click', function (e) {
        e.preventDefault();
        $('.playButton').hide();
        $('.description').hide();
        $('h4').removeClass('invisible');
        let direction = directionGenerator()
        $(`${direction}`).removeClass('invisible');
    });



});

//console.log('hi')