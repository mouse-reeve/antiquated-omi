$(document).ready(function() {
    $('.option-set').each(function(index) {
        var options = $(this).children();
        var selected = options[Math.floor(Math.random()*options.length-1)];
        $(selected).addClass('visible');
    });
});

$('.option-set').click(function() {
    var next = $(this).children('.visible').next();
    if (!next.length) {
        next = $(this).children()[0];
    }
    $(this).children().removeClass('visible');
    $(next).addClass('visible');
});
