$(document).ready(function(){


let time = document.getElementById('time');
let hex = document.getElementById('hex');
let ring = document.getElementById('ring');
let ampm = $('#ampm');
let black = "#000000";
let white = "#FFFFFF";
let colorMode = 0;

$(time).show();
$(ampm).show();
$(hex).hide();


function update(){
    let date = new Date();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    let transitionTime;
    let hour_12 = timeConverter(hour);
    // hexVal = timeToHex(hour, minute, second);


    if ($('#clock-container').hasClass('BW')){
        colorMode = 1
    }else{
        colorMode = 0;
    }

    if(colorMode == 0){ 
        hexVal = timeToHex(hour, minute, second);
    }else{
        hexVal = timeToBW(hour).split('#')[1];
    }

    time.innerHTML = `${padZero(hour_12)}:${padZero(minute)}:${padZero(second)}`;   
    hex.innerHTML =`#${hexVal}`;


    function newColor(){
        return `#${hexVal}`;
    }

    $('body').animate({'background-color': newColor()}, 1000);
    BWtoggle();
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

function timeToHex(h,m,s){
    let valR = padZero(parseInt((h / 24) * 255, 10).toString(16));
    let valG = padZero(parseInt((m / 60) * 255, 10).toString(16));
    let valB = padZero(parseInt((s / 60) * 255, 10).toString(16));
    return (valR + valG + valB);
}

function timeToBW(h){
    if( 5 < h < 17){return white}
    else{return black};
}

function BWtoggle(){
    let color = $('body').css('background-color');
    let startIndex = color.indexOf('(') + 1;
    let endIndex = color.indexOf(')');

    let rgb = color.slice(startIndex, endIndex).split(',');
    let o = Math.round(
        (
        (parseInt(rgb[0])*299) + 
        (parseInt(rgb[1])*587) + 
        (parseInt(rgb[2])*114)
        ) / 1000
        );
        // console.log(o);
        
        let transitionTime = 1000;
        (o > 127) ? 
            $('#hex, #time').add(ampm).animate({'color': black}, transitionTime)
            : 
            $('#hex, #time').add(ampm).animate({'color': white}, transitionTime);
        (o > 127) ? 
            $('#ring').animate({'border-color': black}, transitionTime) 
            : 
            $('#ring').animate({'border-color': white}, transitionTime);

}




//_________interactive_________________________________

$('#clock-container').click(function(){
    $(time).toggle( );
    $(ampm).toggle( );
    $(hex).toggle( );
    $(this).toggleClass('BW');
});




});