/**
 * gijirec application core file.
 * use the google webspeech api.
 * ※.must be run on the server to use this application.
 *
 * @version 0.8α
 * @author  hank
 * @license MIT License(http://www.opensource.org/licenses/mit-license.php)
 */
$(document).ready(function() {
    var userCnt = 0;
    var state = false;

    // click action evnet.
    $('#add-user').click(function() {
        var userName = $('#user-name').val();
        $('#user_list')
        .append('<div id=user-' + userCnt + '><i class="glyphicon glyphicon-user"></i><span class="badge" onclick="insertUser(' + "'" + userName + "'" + ');" style="cursor: pointer">'
                + userName
                + '</span><button class="close" onclick="removeUser(' + "'" + userCnt + "'" + ');">×</button></div>');
        $('#addUserModal').modal('hide');
        $('#user-name').val("");
        userCnt++;
    });

    // setting is modal window show after is first focus.
    $('#addUserModal').on('shown.bs.modal', function () {
        $('#user-name').focus();
    });

    // webspeech api
    var recognition = new webkitSpeechRecognition();
    // set default language is japan.
    recognition.lang = "ja-JP";
    // display on the intermediate results
    recognition.interimResults = true;
    // set of continuous recognition
    recognition.continuous = true;

    // event when the recognition is finished
    recognition.onresult = function(event) {
        var results = event.results;
        for (var i = event.resultIndex; i < results.length; i++) {
            // last result of the recognition.
            if (results[i].isFinal) {
                var text = $('#contents').val();
                $('#contents').val('');
                $('#contents').focus().val(text + results[i][0].transcript + "\n");
            }
//            // intermediate result of the recognition.
//            else {
//                var text = $('#contents').val();
//                $('#contents').val('');
//                $('#contents').focus().val(text + results[i][0].transcript);
//            }
        }
    };

    // event when click on the icon image
    $('#image_state').click(function() {
        if (state) {
            state = false;
            recognition.stop();
            $('#state').html("stopped.");
            $('#image_state').attr("src", "./images/state_off.png");
        } else {
            state = true;
            recognition.start();
            $('#state').html("recording.");
            $('#image_state').attr("src", "./images/state_on.png");
        }
    });
});

/**
 * insert to textarea is user name.
 * @param userName
 */
function insertUser(userName) {
    var text = $('#contents').val();
    $('#contents').val('');
    $('#contents').focus().val(text + "\n\n【" + userName + "】：");
}

/**
 * remove user
 * @param cnt
 */
function removeUser(cnt) {
    $('#user-' + cnt).remove();
}
