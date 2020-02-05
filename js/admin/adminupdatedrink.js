$(document).ready(function () {

    getSingleDrink();

    $('#btn-update-drink').click(function () {
        let drinktype = $('#drink-type').val();
        let price = $('#txt-price').val();
        let name = $('#txt-name').val();
        let image = $('#old_drink_image').val();
        let id = $('#id_to_update_drink').val();


        if (drinktype === '') {
            $('#update-drink-validation').removeClass('alert-success');
            $('#update-drink-validation').addClass('alert-danger');
            $('#update-drink-validation').text('Select drink type');
            $('#update-drink-validation').fadeIn(100);
        }
        else if (price === '') {
            $('#update-drink-validation').removeClass('alert-success');
            $('#update-drink-validation').addClass('alert-danger');
            $('#update-drink-validation').text('Enter the price');
            $('#update-drink-validation').fadeIn(100);
        }

        else if (!price.match('^[0-9]*$')) {
            $('#update-drink-validation').removeClass('alert-success');
            $('#update-drink-validation').addClass('alert-danger');
            $('#update-drink-validation').text('Enter valid price');
            $('#update-drink-validation').fadeIn(100);
        }

        else if (name === '') {
            $('#update-drink-validation').removeClass('alert-success');
            $('#update-drink-validation').addClass('alert-danger');
            $('#update-drink-validation').text('Enter drink name');
            $('#update-drink-validation').fadeIn(100);
        }
        else {
            updateDrink(id, image, drinktype, price, name)
        }

    })
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
                $('#drink-type').val(drinkData.drinktype);
                $('#txt-price').val(drinkData.price);
                $('#txt-name').val(drinkData.drinkname);
                $('#showImage').attr('src', 'http://localhost:8080/asset/uploads/images/drinks/' + drinkData.image)
                $('#showImage').fadeIn(100);
                $('#id_to_update_drink').val(drinkData._id)

                $('#old_drink_image').val(drinkData.image);
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

function updateDrink(id, image, drinktype, price, name) {

    

    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/admin/updatedrink',
        dataType:'JSON',
        data: {
            'id': id,
            'image': image,
            'drinktype': drinktype,
            'name': name,
            'price': price
        },
        success: function (data) {
            if (data.updated) {
                $('#update-drink-validation').removeClass('alert-danger');
                $('#update-drink-validation').addClass('alert-success');
                $('#update-drink-validation').text(data.message);
                $('#update-drink-validation').fadeIn(100);
                window.location.reload();
            }

            else if (!data.added) {
                $('#update-drink-validation').removeClass('alert-success');
                $('#update-drink-validation').addClass('alert-danger');
                $('#update-drink-validation').text(data.message);
                $('#update-drink-validation').fadeIn(100);
            }
        },
        error: function () {

            $('#update-drink-validation').removeClass('alert-success');
            $('#update-drink-validation').addClass('alert-danger');
            $('#update-drink-validation').text('Something went wrong please try again');
            $('#update-drink-validation').fadeIn(100);

        }
    });
}