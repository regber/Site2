﻿// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your Javascript code.
var buttons = document.querySelector('.buttons');
var movementObject = document.querySelector('.movement');
var mouseTopMoveLimit = 97;
var mouseLowerMoveLimit = 0;
var mouseCurrentPos = 97;
var curveSize = 799;
var intervalEvent = null;

$(window).ready(function(){
    SetCurveSize();
    SetMouseLowerMoveLimit()
});

$(window).resize(function () {
    SetCurveSize();
    SetMouseLowerMoveLimit();
});

window.addEventListener("wheel", function (e) {
    
    if (e.wheelDelta > 0) {
        //console.log("up");
        if (mouseCurrentPos < mouseTopMoveLimit) {
            MouseMove(mouseCurrentPos + 10);
        }
    }
    else {
        //console.log("down");
        if (mouseCurrentPos > mouseLowerMoveLimit) {
            MouseMove(mouseCurrentPos - 10);
        }
    }
});

function SetCurveSize() {

    let windowHeight = $(window).height()

    if (windowHeight < 765) {
        buttons.style.setProperty('--central-row-height',  240 + 'px');
    }
    else {
        buttons.style.setProperty('--central-row-height', windowHeight - 525 + 'px');
    }
}

function SetMouseLowerMoveLimit() {

    var buttonsStyles = window.getComputedStyle(buttons);
    var centralRowHeight = buttonsStyles.getPropertyValue('--central-row-height');
    
    mouseLowerMoveLimit = (((curveSize - parseFloat(centralRowHeight)) / curveSize) * 100 - 13);
    
}

function MouseMove(newPosition) {

    clearInterval(intervalEvent);

    intervalEvent = setInterval(frame, 20);

    function frame() {
        //Проверяем в какую сторону смещается мышь
        if (newPosition >= mouseCurrentPos) {
            mouseCurrentPos++;
        }
        else {
            mouseCurrentPos--;
        }

        if (mouseLowerMoveLimit >= mouseCurrentPos || mouseCurrentPos >= mouseTopMoveLimit || newPosition == mouseCurrentPos) {
            clearInterval(intervalEvent);
            if (mouseLowerMoveLimit >= mouseCurrentPos) {
                SetMousePosition(mouseLowerMoveLimit);
            }
            if (mouseCurrentPos >= mouseTopMoveLimit) {
                SetMousePosition(mouseTopMoveLimit);

            }
        } else {
            SetMousePosition(mouseCurrentPos);
        }

    }
}

function SetMousePosition(position){
    movementObject.style.setProperty('offset-distance', position + '%');
}

