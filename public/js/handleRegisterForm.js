$('.register-form-2').hide();
$('.register-form-3').hide();

$('.form-1-btn').click(function (e) {
    e.preventDefault();
    $('.register-form-2').show();
    $('.register-form-1').hide();
    $('#major').focus();
});

$('.form-2-btn').click(function (e) {
    e.preventDefault();
    $('.register-form-3').show();
    $('.register-form-2').hide();
    $('#password').focus();
});
