$('.option-set').click(function() {
    var next = $(this).children('.visible').next();
    if (!next.length) {
        next = $(this).children()[0];
    }
    $(this).children().removeClass('visible');
    $(next).addClass('visible');
});
