// Это типа document ready
$(function() {

    $('.fs-form-order__form').each(function() {
        var $form = $(this);

        var setError = function ($field) {
            if ($field.data('invalid')) {
                return;
            }
            $field.data('invalid', true);
            $field.addClass('_error');
            var $errorItem = $form.find('.fs-form-order-errors__item._required').clone();

            var offset = $field.offset();
            var width = $field.outerWidth();
            $errorItem.css({
                position: 'absolute',
                left: offset.left + width + 10,
                top: offset.top - 2
            });
            $errorItem.appendTo('body');

            $field
                .on('keyup.fsFormValidate change.fsFormValidate', function() {
                    if ($(this).val()) {
                        $field.removeClass('_error');
                        $errorItem.remove();
                        $field.off('keyup.fsFormValidate change.fsFormValidate focus.fsFormValidate blur.fsFormValidate');
                        $field.data('invalid', false);
                    }
                });
                // .on('focus.fsFormValidate', function () {
                //     $errorItem.fadeOut(200);
                // })
                // .on('blur.fsFormValidate', function () {
                //     $errorItem.fadeIn(200);
                // });

        };

        $form.find('.fs-form-order__input._datepick').datepicker();

        $form.on('submit', function(e) {
            var valid = true;
            var $requiredFields = $form.find(
                '.fs-form-order__input, .fs-form-order__select, .fs-form-order__textarea'
            ).filter('._required');

            $requiredFields.each(function() {
                var $el = $(this);

                if (!$el.val()) {
                    valid = false;
                    setError($el);
                }
            });

            if (!valid) {
                e.preventDefault();
                $requiredFields.filter('._error').first().focus();
            }
        });
    });


    var toggleSelectEmpty = function($el) {
        if (!$el.val()) {
            $el.addClass('_empty');
        } else {
            $el.removeClass('_empty');
        }
    }
    $('.fs-form-order__select').each(function() {
        var $el = $(this);
        toggleSelectEmpty($el);

        $el.on('change', function() {
            toggleSelectEmpty($el);
        });
    });




});
