$(document).ready(function () {
    getCartData();

})

function getCartData() {
    $.ajax({
        url: 'http://localhost:8080/cart/selectallcartorders',
        type: 'PUT',
        success: function (cartData) {
            console.log(cartData)
            let data = cartData.data;
            var cartTable = $('#ordersTable').DataTable();
            $.each(data, function (index) {
                cartTable.row.add([
                    data[index].drinkname,
                    data[index].drinkprice,
                    '<img src="' + 'http://localhost:8080/asset/uploads/images/drinks/' + data[index].drinkimage + '" class="img-fluid img-thumbnail" width="80px;"></img>',
                    data[index].username,
                    data[index].userphone,
                    data[index].useremail,

                ]).draw(false)
            })
        }

    })
}

