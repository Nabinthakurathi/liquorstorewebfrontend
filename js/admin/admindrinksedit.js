$(document).ready(function () {

    getAllDrinks();

    let foodDetailsTableBody = $('#drink-details-body');
    foodDetailsTableBody.on('click', '#btn_delete_drink', function () {
        let id = $(this).attr('drink_id');
        let confirm = window.confirm('Are you sure to delete?');

        if (confirm) {
            $.ajax({
                url: 'http://localhost:8080/admin/delete_drink',
                type: 'DELETE',
                data: {
                    'id': id
                },
                success: function (res) {
                    if (res.deleted) {
                        window.location.reload();
                    }
                    else if (!res.deleted) {
                        alert(res.message)
                    }
                },
                error: function () {
                    alert('Something went wrong please try again')
                }

            })
        }
    })
})


function getAllDrinks() {
    var editDrinkDatabale = $('#editDrinkTable').DataTable();
    $.getJSON('http://localhost:8080/admin/getalldrink', function (drinkdata) {
        drinkdatas = drinkdata.data;
        $.each(drinkdatas, function (index) {
            editDrinkDatabale.row.add([
                drinkdatas[index].drinktype,
                drinkdatas[index].drinkname,
                drinkdatas[index].price,
                '<img src="' + 'http://localhost:8080/asset/uploads/images/drinks/' + drinkdatas[index].image + '" class="img-fluid img-thumbnail" width="80px;"></img>',
                '<a href="updatedrink.html?' + drinkdatas[index]._id + '"><button class="btn btn-success" id="btn_update_food">  <i class="fa fa-pencil"></i> </button> </a>',
                '<button drink_id="' + drinkdatas[index]._id + '"' + 'class="btn btn-danger" id="btn_delete_drink">  <i class="fa fa-trash"></i> </button>',
            ]).draw(false)
        })
    })
}

