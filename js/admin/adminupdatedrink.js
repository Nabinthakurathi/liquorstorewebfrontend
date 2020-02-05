$(document).ready(function () {

    getSingleDrink();
})

function getSingleDrink() {

    var link = window.location.href;
    var id = link.split('?')[1];


    $.ajax({
        url: 'http://localhost:8080/admin/getsingledrink/'+id,
        type: 'GET',
        success: function (data) {
            let drinkData=data.data;
            $('#drink-type').val(drinkData.drinktype);
            $('#txt-price').val(drinkData.price);
            $('#txt-name').val(drinkData.drinkname);
            $('#showImage').attr('src',  'http://localhost:8080/asset/uploads/images/drinks/' + drinkData.image)
            $('#showImage').fadeIn(100);
            $('#id_to_update_drink').val(drinkData._id)

            $('#old_drink_image').val(drinkData.image);
        },
        error: function () {
            alert('Error fetching data')
        }
    })
}