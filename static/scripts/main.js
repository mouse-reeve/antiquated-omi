$(document).ready(function() {
    title_toggle($('.title-set'), 0);
});

var title_toggle = function (optionset, i) {
    var options = optionset[i];
    window.setTimeout(function () {
        toggle(options, function() {
            if (i + 1 < optionset.length) {
                title_toggle(optionset, i+1);
            }
        });
    }, 200);
}

$('.option-set').click(function() {
    if ($(this).children('.active').length == 0) {
        toggle(this);
    }
});

var toggle = function(options, callback) {
    var current = $(options).children('.visible');
    var next = $(options).children('.visible').next();
    if (!next.length) {
        next = $(options).children()[0];
    }

    typeback(current, function() {
        $(options).children().removeClass('visible');

        $(next).addClass('visible');
        typein(next, callback);
    });
}

var typeback = function(node, callback, delay) {
    var text = $(node).html();
    if (delay === undefined) {
        $(node).attr('data-text', text);
        delay = 100;
        $(node).addClass('active');
    }
    if (!!text.length) {
        $(node).html(text.slice(0, -1));
        window.setTimeout(function () {
            delay = delay * 0.9;
            typeback(node, callback, delay);
        }, delay);
    } else {
        $(node).hide();
        $(node).html($(node).attr('data-text'));
        $(node).removeClass('active');
        if (!!callback) {
            callback();
        }
    }
};

var typein = function(node, callback, text, delay) {
    delay = delay || 100;
    if (text === undefined) {
        text = $(node).html();
        $(node).attr('data-text', text);
        $(node).html('');
        $(node).show();
        $(node).addClass('active');
    }
    if (!!text.length) {
        $(node).show();
        $(node).html($(node).html() + text.slice(0, 1));
        window.setTimeout(function () {
            delay = delay * 0.99;
            text = text.slice(1);
            typein(node, callback, text, delay);
        }, delay);
    } else {
        $(node).removeClass('active');
        if (!!callback) {
            callback();
        }
    }
};
