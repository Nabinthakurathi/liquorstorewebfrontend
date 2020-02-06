$(document).ready(function () {
    getSingleDrink();

    $('#btn-add-to-cart').click(function () {
        addToCartWishlist();
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
                localStorage.setItem('drinktype', drinkData.drinktype);
                localStorage.setItem('drinkname', drinkData.drinkname);
                localStorage.setItem('drinkprice', drinkData.price);
                localStorage.setItem('drinkid', drinkData._id);
                localStorage.setItem('drinkimage', drinkData.image);
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

function addToCartWishlist(cart, wishlist) {
    let drinkname = localStorage.getItem('drinkname');
    let drinkprice = localStorage.getItem('drinkprice');
    let drinkid = localStorage.getItem('drinkid');
    let drinkimage = localStorage.getItem('drinkimage');


    let userid = localStorage.getItem('userid');
    let username = localStorage.getItem('username');
    let userphone = localStorage.getItem('userphone');
    let useremail = localStorage.getItem('useremail');




    $.ajax({
        url: 'http://localhost:8080/cart/addtocartwishlist',
        type: 'POST',
        data: {
            'drinkid': drinkid,
            'drinkname': drinkname,
            'drinkprice': drinkprice,
            'drinkimage': drinkimage,
            'userid': userid,
            'username': username,
            'userphone': userphone,
            'useremail': useremail,
        },
        success: function (data) {
            if (data.added) {
                alert(data.message)
            }

            else if (!data.added) {
                alert(data.message)
            }
        },
        error: function () {
            alert('Something went wrong please try again')
        }
    })
}
