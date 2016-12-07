/**
 * Created by wpalin on 11/16/16.
 */

function update_site(xyz, v) {


    toasty(v, xyz);
    chameleon(xyz, v);

    var alldatadictionary = getcode(v)

    cb(alldatadictionary);
    // scrollpage(v);

    return true;
}


$(document).ready(function() {
  $('.modal-trigger').leanModal();
});


function ajaxpost(sdata) {
        // data = {'one':'one'}

         $.ajax({
        type : "POST",
        url : "/finished",
        data: sdata,
        contentType: 'application/json;charset=UTF-8',
        success: function(result) {
            $("body").html(result);
        }
    })

}


function cb(alldatadictionary) {
    $.post( "/postmethod", {

        all_data:JSON.stringify(alldatadictionary)},

        function( data ) {
        // alert(data['from'])
        //     addtolist()
            if (data['remove'][0] != "") {
                $(data['remove'][0]).fadeOut(500);
            }

            $(data['to']).insertAfter(data['from']);
            $(data['to']).fadeIn(1000);

            // alert(data['remove']);


            if (data['end'] == "YES") {
                ajaxpost(JSON.stringify(alldatadictionary));
            };


            $("html, body").delay(555).animate({scrollTop: $(data['from']).offset().top + 500}, 500).delay(500);
        });
}

// function cbx(y) {
//     $.post( "/finished", { all_data:JSON.stringify(y)}
        // window.location.replace("/finished")
        // );
// }
// function finished() {
//     $.post( "/finished", {
//             all_data:JSON.stringify(y)
//         }
//             window.location.replace("/finished")
// }

function getcode(v) {
    var dict = {};
    dict['current'] = v;

    var y = document.getElementsByClassName("btn-large waves-light blue ");
    for (i = 0; i < y.length; i++) {
        dict[y[i].name] = y[i].value;
    }

    var xc = document.getElementsByClassName('validate valid');
    for (i = 0; i < xc.length; i++) {
        dict[xc[i]['id'].substring(2)] = xc[i].value;
    }


    return dict
}



// //this passes the selection to the python to evaluate
// function passData(v, y) {
//     $.post( "/postmethod", {
//         // javascript_data: v,
//         all_data: JSON.stringify(y)
//     }),
//     $.get("/getpythondata", function(data) {
//         $(data['to']).insertAfter(data['from']);
//         $(data['to']).fadeIn(1000);
//         if (data['end'] == "YES") {
//             alert(data['end']);
//             window.location.replace("/finished");
//         }
//     });
// }
// //this retreives where we are going to load up next
// function retrieveData() {
//     $.get("/getpythondata", function(data) {
//         $(data['to']).insertAfter(data['from']);
//         $(data['to']).fadeIn(1000);
//     })
// }
//
// // this moves the code down
// function scrollpage() {
//     $.get("/getpythondata", function(data) {
//         $("html, body").delay(555).animate({scrollTop: $(data['from']).offset().top + 500}, 500).delay(500);
//     })
// }
//


