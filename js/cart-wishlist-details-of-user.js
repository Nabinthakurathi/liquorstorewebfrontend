$(document).ready(function () {
    getCartData();

})

function getCartData() {
    $.ajax({
        url: 'http://localhost:8080/cart/selectusercartdetails',
        type: 'PUT',
        data: {
            'userid': localStorage.getItem('userid')
        },
        success: function (cartData) {
            let data = cartData.data;
            var cartTable = $('#cartTable').DataTable();
            $.each(data, function (index) {
                cartTable.row.add([
                    data[index].drinkname,
                    data[index].drinkprice,
                    '<img src="' + 'http://localhost:8080/asset/uploads/images/drinks/' + data[index].drinkimage + '" class="img-fluid img-thumbnail" width="80px;"></img>',
                    '<button drink_id="' + data[index]._id + '"' + 'class="btn btn-danger" id="btn_delete_drink">  <i class="fa fa-trash"></i> </button>',
                ]).draw(false)
            })
        }

    })
}