$(document).ready(function ($) {
  var $userForm = $('.new-user')

  $userForm.on('submit', function (e) {
    // preventDefault is used to create ajax request
    e.preventDefault()
    // console.log($(this).serializeArray())
    var formdata = $(this).serializeArray()

    // console.log(data[0].name)

    // var user_name = $('#user-name').val()
    // var user_password = $('#user-password').val()
    // var user_email = $('#user-email').val()
    //
    // console.log(user_name, user_password, user_email)
    alert('ajax call now')
    $.ajax({
      type: 'POST',
      url: '/api/users',
      data: formdata
    }).done(doSomething)
  })

  function doSomething (data) {
    alert('form submitted, new users created')
    $('#all-user-list').append('<li>' + data.local.name + '<br>' + data.local.email + '<br>' + data.local.password + '</li>')
  }
})
