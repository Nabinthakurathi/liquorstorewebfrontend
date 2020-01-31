$(document).ready(function(){
    $('#btn-login').click(function(){
        let email= $('#txt-email').val();
        let password= $('#txt-password').val();

        if(email===''){
            $('#validate-email').text('Please enter your email');
            $('#txt-email').focus();
        }

        else if(password===''){
            $('#validate-password').text('Please enter your password');
            $('#txt-password').focus();
        }

        else{
          
            $.ajax({
                url:'http://localhost:8080/users/login',
                data:{
                    'email':email,
                    'password':password
                },
                type:'POST',

                success: function(data){
                    if(data.loggedin){
                     localStorage.setItem('token', data.token);
                     $('#login-validation').removeClass('alert-danger');
                     $('#login-validation').addClass('alert-success');
                     $('#login-validation').text(data.message);
                     $('#login-validation').fadeIn(100);
                    }
                    else if(!data.loggedin){
                     $('#login-validation').removeClass('alert-success');
                     $('#login-validation').addClass('alert-danger');
                     $('#login-validation').text(data.message);
                     $('#login-validation').fadeIn(100);
                    }
                 },
 
                 error: function(err){
                     $('#login-validation').removeClass('alert-success');
                     $('#login-validation').addClass('alert-danger');
                     $('#login-validation').text(data.message);
                     $('#login-validation').fadeIn(100);
                 }
            })
        }
    })
})