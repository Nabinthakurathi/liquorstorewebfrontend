$(document).ready(function () {

    selectComment();

    $('#btn-post-comment').click(function () {
        let userid = localStorage.getItem('userid');
        let username = localStorage.getItem('username');
        let drinkid = localStorage.getItem('drinkid');
        let comment = $('#txt-post-comment').val();

        if (comment === '') {
            alert('Please wriet something')
        }
        else {
            addComment(userid, username, drinkid, comment)
        }

    })
})

function addComment(userid, username, drinkid, comment) {
    $.ajax({
        url: 'http://localhost:8080/comment',
        type: 'POST',
        data: {
            'userid': userid,
            'username': username,
            'drinkid': drinkid,
            'comment': comment
        },
        success: function (data) {
            if (data.added) {
                alert(data.message)
                setTimeout(function () {
                    window.location.reload()
                }, 3000)
            }
            else if (!data.added) {
                alert(data.message)
            }
        },
        error: function () {
            alert('Something went wrong')
        }
    })
}

function selectComment() {
    let drinkid = localStorage.getItem('drinkid');

    $.ajax({
        url: 'http://localhost:8080/comment',
        type: 'PUT',
        data: {
            'drinkid': drinkid
        },
        success: function (data) {
            let commentdata = data.commentdata

            $.each(commentdata, function (index) {
                $('#comments-container').append(
                    ' <div id="comments-list">' +
                    '<span id="comment-user">' + commentdata[index].username + ' :</span>' +
                    '<span id="comment-content"> ' + commentdata[index].comment + ' </span>' +
                    '</div>'
                )
            })
        }
    })
}