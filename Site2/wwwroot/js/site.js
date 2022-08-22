// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your Javascript code.
var buttons = document.querySelector('.buttons');

$(window).ready(function(){
    SetCurveSize();
});

$(window).resize(function () {
    SetCurveSize();
});

function SetCurveSize() {
    buttons.style.setProperty('--central-row-height', $(window).height() - 525 + 'px');
}

