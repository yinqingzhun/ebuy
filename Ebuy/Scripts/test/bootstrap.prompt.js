(function ($, window, document, undefined) {
    var $window = $(window),
        id_alert = 'alert' + (new Date().getTime()),
        id_prompt = 'prompt' + (new Date().getTime()),
        html_alert = "<div class='modal fade' id='@id' role='dialog'><div class='modal-dialog'><div class='modal-content'><div class='modal-body' style='padding:0;'><div class='alert' style='margin:0;'><a href='#' class='close' data-dismiss='modal' aria-label='close'>&times;</a><div>@msg</div></div></div></div></div></div>",
        html_prompt = "<div class='modal fade' id='@id' role='dialog'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><button type='button' class='close' data-dismiss='modal'>&times;</button><h4 class='modal-title'>提示</h4></div><div class='modal-body'><div class='form-group'></div></div><div class='modal-footer'><button type='button' class='btn btn-default' data-dismiss='modal' name='cancel'>取消</button><button type='button' class='btn btn-primary' data-dismiss='modal' name='confirm'>确定</button></div></div></div></div>",
        hideWindow;

    function alert(msg, type, options) {
        var dtd = $.Deferred(),
            _window = $('#' + id_alert);
        options = $.extend({}, $.alert.defaults, options);
        type = type || 'alert-info';
        msg = msg || '';
        html_alert = html_alert.replace('@alertType', type).replace('@id', id_alert);

        if (_window.length == 0) {
            $('body').append(html_alert);
            _window = $('#' + id_alert);
        }

        _window.modal({ backdrop: true }).find('.alert').removeClass().addClass('alert ' + type).find('div').text(msg);
        !options.closable && _window.find('.alert a').hide();

        clearTimeout(hideWindow);
        hideWindow = setTimeout(function () {
            _window.modal('hide');
            dtd.resolve();
        }, options.delay);
        return dtd.promise();
    }

    function prompt(msg, title) {
        var dtd = $.Deferred();
        msg = msg || '',
        title = title || '提示',
        _window = $('#' + id_prompt);
        html_prompt = html_prompt.replace('@id', id_prompt);

        if (_window.length == 0) {
            $('body').append(html_prompt);
            _window = $('#' + id_prompt);
        }

        _window.modal({ backdrop: true }).find('.modal-title').text(title).end().find('.form-group').text(msg);
        _window.find('button').click(function (e) {
            if (e.target.name == 'cancel')
                dtd.reject();
            else if (e.target.name == 'confirm')
                dtd.resolve();
        });

        return dtd.promise();
    }

    $.extend({
        info: function (msg, options) {
            return alert(msg, 'alert-info', options);
        },
        success: function (msg, options) {
            return alert(msg, 'alert-success', options);
        },
        error: function (msg, options) {
            return alert(msg, 'alert-danger', options);
        },
        alert: alert,
        prompt: prompt
    });

    $.alert.defaults = { delay: 3000, closable: false };





})(jQuery, window, document);