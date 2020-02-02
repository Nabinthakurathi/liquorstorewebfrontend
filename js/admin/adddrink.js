$(document).ready(function () {

    $('#btn-add-drink').click(function () {
        let drinktype = $('#drink-type').val();
        let price = $('#txt-price').val();
        let name = $('#txt-name').val();
        let image = $('#image');
        uploadImageToServer(image, drinktype, price, name)
    })




})

function uploadImageToServer(imageUploadSelector, drinktype, price, name) {
    let formData = new FormData();
    let files = imageUploadSelector.get(0).files;
    if (files.length > 0) {
        formData.append("image", files[0]);
        formData.append("drinktype", drinktype);
        formData.append("price", price);
        formData.append("name", name);
    }

    var fileDetails = imageUploadSelector[0].files[0]
    var fileSize = fileDetails.size;

    if (fileSize > 1000000) {
        alert('Image size is larger');
    }

    else {

        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/admin/upload/drink/image',
            contentType: false,
            cache: false,
            processData: false,
            data: formData,
            success: function (data) {
                if (data.added) {
                    $('#add-drink-validation').removeClass('alert-danger');
                    $('#add-drink-validation').addClass('alert-success');
                    $('#add-drink-validation').text(data.message);
                    $('#add-drink-validation').fadeIn(100);
                }

                else if(!data.added){
                    $('#add-drink-validation').removeClass('alert-success');
                    $('#add-drink-validation').addClass('alert-danger');
                    $('#add-drink-validation').text(data.message);
                    $('#add-drink-validation').fadeIn(100);
                }
            },
            error: function () {
      
                    $('#add-drink-validation').removeClass('alert-success');
                    $('#add-drink-validation').addClass('alert-danger');
                    $('#add-drink-validation').text('Something went wrong please try again');
                    $('#add-drink-validation').fadeIn(100);
                
            }
        });
    }
}