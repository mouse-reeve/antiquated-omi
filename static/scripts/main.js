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
    toggle(this);
});

var toggle = function(options, callback) {
    var current = $(options).children('.visible');
    var next = $(options).children('.visible').next();
    if (!next.length) {
        next = $(options).children()[0];
    }

    typeback(current, function() {
        $(options).children().removeClass('visible');

        var text = $(next).text();
        $(next).text('');
        $(next).addClass('visible');
        typein(next, callback, text, 100);
    }, 100);
}

var typeback = function(node, callback, delay) {
    var text = $(node).html();
    if (delay === undefined) {
        $(node).attr('data-text', text);
        delay = 50;
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
        if (!!callback) {
            callback();
        }
    }
};

var typein = function(node, callback, text, delay) {
    delay = delay || 50;
    if (text === undefined) {
        text = $(node).html();
        $(node).attr('data-text', text);
        $(node).html('');
        $(node).show();
    }
    if (!!text.length) {
        $(node).html($(node).html() + text.slice(0, 1));
        window.setTimeout(function () {
            delay = delay * 0.99;
            text = text.slice(1);
            typein(node, callback, text, delay);
        }, delay);
    } else {
        if (!!callback) {
            callback();
        }
    }
};
