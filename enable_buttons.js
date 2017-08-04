function enable_buttons(origin) {
    var regex = new RegExp("^" + origin.pattern + "$");
    // Assign question buttons to a variable
    // console.log(origin.value)
    // console.log(regex.test(origin.value))
    // console.log(origin.id)
    // console.log(origin.id.slice(0, -1))
    // console.log(regex)
    if (regex.test(origin.value)) {
        var xe = document.getElementById(origin.id.slice(0, -1))
        var xf = xe.getElementsByTagName('button')
        for (var i = 0; i < xf.length; i++) {
            if (i != xf.length-1) {
                xf[i].className = "btn-large waves-effect waves-white"
            }
        }
        // alert(xf[0].className)
        // xf[0].attr('disabled', false)
        // xf[0].className = "btn-large waves-effect waves-white"
        // xf[1].className = "btn-large waves-effect waves-white"
        // if (xf.length == 3) {
        //     xf[1].className = "btn-large waves-effect waves-white"
        // }
    }
    else {
        var xe = document.getElementById(origin.id.slice(0, -1))
        var xf = xe.getElementsByTagName('button')
        // alert(xf[0].className)
        // xf[0].className = "btn-large waves-effect waves-white disabled"
        // xf[1].className = "btn-large waves-effect waves-white disabled"
        for (var i = 0; i < xf.length; i++) {
                if (i != xf.length-1) {
                    xf[i].className = "btn-large waves-effect waves-white disabled"
                }
        }

    }
    if (origin.pattern == "") {
        var xe = document.getElementById(origin.id.slice(0, -1))
        var xf = xe.getElementsByTagName('button')
        // alert(xf[0].className)
        // xf[0].className = "btn-large waves-effect waves-white"
        // xf[1].className = "btn-large waves-effect waves-white"
                for (var i = 0; i < xf.length; i++) {
                    if (i != xf.length - 1) {
                        xf[i].className = "btn-large waves-effect waves-white"
                    }
                }

    }

    // question_buttons = $("[name=" + origin.id + "_BUTTON]");
    //
    // console.log(question_buttons)
    // // If origin.pattern is undefined, enable button
    // if (origin.pattern == undefined) {
    //     question_buttons.attr('disabled', false);
    //     alert("Hello")
    // }
    //
    // // Else, compare pattern to value
    // else {
    //
    //     // Format pattern as Javascript regex object
    //     var regex = new RegExp("^" + origin.pattern + "$");
    //
    //     // If value matches regex, enable buttons
    //     if (regex.test(origin.value)) {
    //         question_buttons.attr('disabled', false);
    //
    //         // If user presses enter, and there is only one button, click the button
    //         if (question_buttons.length == 1) {
    //             if (event.keyCode == 13) {
    //                 question_buttons.click();
    //             }
    //         }
    //     }
    //
    //     // Else, disable buttons
    //     else {
    //         $("[name=" + origin.id + "_BUTTON]").attr('disabled', false)
    //     }
    // }
}