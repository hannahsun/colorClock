
// $('body').animate({
//     color: '#ffffff',
//     opacity:0.3
//       }, 300);



$(document).ready(function(){


let time = document.getElementById('time');
let hex = document.getElementById('hex');
let color = document.getElementById('color');
let ring = document.getElementById('ring');
let solid = document.getElementById('solid');
let ampm = $('#ampm');

$(time).show();
$(ampm).show();
$(hex).hide();



function update(){
    let date = new Date();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();

    let hour_12 = timeConverter(hour);

    time.innerHTML = `${padZero(hour_12)}:${padZero(minute)}:${padZero(second)}`;   


    function newColor(){
        let h = second * 6;
        let s = 70 + '%';
        let l = 60 + '%';
        let newColor = (`hsl(${h},${s},${l})`);
        return newColor;
    }
    ring.style.borderColor = newColor();
    time.style.color = newColor();
    ampm.css('color', newColor());

}
update();
setInterval(update, 1000);




function padZero(val){
    let paddedVal;
    if (val < 10){
        paddedVal = '0' + val;
    }
    else{
        paddedVal = val;
    }
    return paddedVal;
}

function timeConverter(val){
    let newHour;
    if(val > 12){
        newHour = val - 12;
        ampm.html('pm');
    }else{
        newHour = val;
        ampm.html('am');
    }
    return newHour;
}





//_________interactive_________________________________

$('#clock-container').click(function(){
    $(time).toggle( );
    $(ampm).toggle( );
    $(hex).toggle( );
});




});