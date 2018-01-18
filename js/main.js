$(function(){
	// Hamburger Menu
	$('#hamburger-menu').click(function() {
		$(this).toggleClass('expand')
		$('.nav-area').toggle(300)
    })
    
    // $('*').click(function(e) {
    //     console.log(e.target.id)
    //     if ($('#hamburger-menu').hasClass('expand') && e.target.id != 'dropdown') {
    //         $('#dropdown').hide();
    //     }
    // });

	function loginFailure() {
		$('#message').text('Your username/password combination is incorrect. Please try again.').show('100')
		resetForm()
	}

	function resetForm(type) {
		if (type === 'both') {
			$('input[type=text]').val('')
        }
        $('input[type=password]').val('')
	}
	
	function onResponse(response, loginData) {
		var loggedIn = false
		var credentials = response.credentials
		console.log(response)
		for (var i = 0, len = credentials.length; i < len && !loggedIn; i++) {
			if ( credentials[i].username && loginData.email === credentials[i].username.toLowerCase() && credentials[i].password && (loginData.password === credentials[i].password.toLowerCase() || !!credentials[i].password2 && loginData.password === credentials[i].password2.toLowerCase()) ) {
				alert('Success!')
				loggedIn = true
				resetForm('both')
			}
		}
		if (!loggedIn) loginFailure()
	}
	
	$('#signin').click(function() {
		$('#message').hide()
		var loginData = {
			email: $('#email').val().toLowerCase(),
			password: $('#password').val().toLowerCase()
		}
		if ((loginData.email + loginData.password).match(/[^0-9a-z.]/i)) {
			$('#message').text('Special characters are not allowed. Please try again').show('100')
			return
		}
		var url = 'https://mingle.rwsgateway.com/front-end-dev-skills-test/accounts/get'
		rwsAJAXPostAJAX(url, loginData, true, onResponse, loginData);
	})

	$('input[type=text], input[type=password]').click(function() {
        $('#message').hide(30)
    })
});