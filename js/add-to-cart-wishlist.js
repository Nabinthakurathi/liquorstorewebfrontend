$(document).ready(function(){
getSingleDrink();
})


function getSingleDrink() {

    var link = window.location.href;
    var id = link.split('?')[1];


    $.ajax({
        url: 'http://localhost:8080/admin/getsingledrink/' + id,
        type: 'GET',
        success: function (data) {
            if (data.selected) {
                let drinkData = data.data;
               
                $('#single-drink-image').attr('src', 'http://localhost:8080/asset/uploads/images/drinks/' + drinkData.image)
                
            }
            else if (!data.selected) {
                alert(data.message)
            }

        },
        error: function () {
            alert('Error fetching data')
        }
    })

}
