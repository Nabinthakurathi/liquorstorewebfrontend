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
                url:'localhost:8080/users/login',
                data:{
                    'email':email,
                    'password':password
                },
                type:'POST',

                success: function(data){

                },

                error: function(err){
                    
                }
            })
        }
    })
})