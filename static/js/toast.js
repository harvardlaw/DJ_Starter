/**
 * Created by wpalin on 11/16/16.
 */

function toasty(v, xyz) {
    if (v == 'q02.0') {
    Materialize.toast('Hooah!', 2000) // 4000 is the duration of the toast
    }
    if (v == 'q02.1') {
    Materialize.toast('Hooyah!', 2000) // 4000 is the duration of the toast
    }

    if (xyz == 'q8') {
    Materialize.toast('Almost done!', 4000) // 4000 is the duration of the toast
    }
}

function chameleon(xyz, v){
    var x = document.getElementsByName(xyz);
    var i;
    for (i = 0; i < x.length; i++) {
        if (x[i].value == v)
            x[i].className = "btn-large waves-light blue  "
        else {
            x[i].className = "btn-large waves-light black "
            }
        }
    }
