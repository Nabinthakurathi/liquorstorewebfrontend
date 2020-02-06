$(document).ready(function () {
    let category = 'gin';

    $.getJSON('http://localhost:8080/categories/getdrinks/' + category, function (drinkdata) {
        let result = drinkdata.data;
        $.each(result, function (index) {

            $('#drinks-items').append(
                '<div class="col-sm-4">' +
                '<div class="product-image-wrapper">' +
                '<div class="single-products">' +
                '<div class="productinfo text-center">' +
                '<a href="singledrink.html?' + result[index]._id + '"> <img src="http://localhost:8080/asset/uploads/images/drinks/' + result[index].image + '" alt="" /> </a>' +
                '<h2> $' + result[index].price + ' </h2>' +
                '<p>' + result[index].drinkname + '</p>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>'
            )
        })
    })
})

