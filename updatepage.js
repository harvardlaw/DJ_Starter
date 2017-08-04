////


// $(document).on("change paste keyup", ".find_input", function(e) {
//
//     var ee = document.getElementById(e.target.id)
//     // console.log(ee)
//     // console.log(e.target.id)
//     // console.log(e.target.id.slice(0,-1))
//     var bb = document.getElementById(e.target.id.slice(0,-1))
//     var cc = bb.getElementsByClassName('btn-large')
//
//     var pp = document.getElementById(e.target.id).pattern
//
//     // var reg = new RegExp(pp);
//     var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//
//     // console.log(re.test($(this).val()))
//     // console.log(pp)
//     // console.log($(this).val())
//
//     var vv = $(this).val()
//
//
//
//     for (var i = 0; i < cc.length; i++) {
//         // console.log(cc[i])
//         if (re.test($(this).val()) == true) {
//             cc[i].className = "btn-large waves-effect waves-white disabled"
//         }
//     }
//
// });







$(document).on("click", ".btn-large", function(el){



    colorx(el)
    toast(el);
    scroll(el);
    var cd = dictionary(el)

    getFormulas(cd)
    var cd = dictionary(el)
    var cd = runFormulas(el, cd)

    var cd = dictionary(el)
    var cd = runFormulas(el, cd)
    getFormulas(cd)

    cd = add_session_data(cd);


    var m = checkMods(el, cd)
    dataname(el, cd)
    removeafterto(el, m);

});

function convert(str) {
  str = str.replace(/&lt;/g, "<");
  str = str.replace(/&gt;/g, ">");
  str = str.replace(/&quot;/g, '"');
  str = str.replace(/&#039;/g, "'");
  return str;
}

function getFormulas(cd){
    var x = document.getElementsByClassName('formulas')
    // console.log('formulas')
    // console.log(x)
    for (var i= 0; i < x.length; i++){
        try {
            // console.log(x[i].innerHTML)
        var form = x[i].innerHTML.substring(x[i].innerHTML.indexOf("="))
        var z = x[i].innerHTML.indexOf("=")
        var ourkey = x[i].innerHTML.slice(0,z)
        // console.log(ourkey)

            var ff = convert(form)
            var y = testform(ff, cd, ourkey)
            // console.log(ourkey)
            // console.log(y)
        }
        catch (err) {
            // alert(ff)
            // alert(err)
            // console.log(err)
        }
    }
}








function runFormulas(el, cd) {
    console.log('run formulas')
    var x = document.getElementById(el.target.getAttribute('idx'));

    // console.log(x)
    var t = x.getAttribute('data-card-formula')
    console.log(t)
    var y = ""
    if (t != "") {
        var k = x.getAttribute('data-card-formula')
        var form = k.substring(k.indexOf("="))
        var z = k.indexOf("=")
        var ourkey = k.slice(0,z)
        console.log(ourkey)
        try {
            y = testform(convert(form), cd, ourkey)

            console.log(y)
            if (ourkey.includes("ADDRESS")) {
                // alert(ourkey)
                getAddress(cd[cd['current'][0]], cd, ourkey)

            }
        }
        catch (e) {
            console.log('error')
            // console.log(form)

        }
    }
    return cd
}

function testform(formula, cd, fk) {


    regexp = RegExp('\\b(' + Object.keys(cd).join('|') + ')\\b', 'g');

    var text = formula.replace(regexp, function (_, word) {
        return cd[word];
    });

    var jj = text.split("?")[1]

    var nu_xl = text.replace(/\[/g, '').replace(/\]/g, '')
    nu_xl = nu_xl.replace(/\|/g, '"')
    // nu_xl = nu_xl.replace(/\s/g, "")
    nu_xl = nu_xl.replace(/\s+$/g, "")
    nu_xl = nu_xl.replace(/GOTO/g, "T")
    nu_xl = nu_xl.replace(/&amp;gt;/,">")
    nu_xl = nu_xl.replace(/&amp;lt;/,"<")

    var nuuu = nu_xl.split("?")[0]
    // console.log('excel')
    // console.log(nuuu)
    console.log(nu_xl)
    // var value = eval(excelFormulaUtilities.formula2JavaScript(nuuu))
    if (nu_xl.indexOf("{{") > -1) {

        var j = nu_xl.split("{{")[1].split("}}")[0]
        var jv = eval(excelFormulaUtilities.formula2JavaScript("="+j ))
        var jjj = nu_xl.split("{{")[0] + jv + nu_xl.split("}}")[1]
        var value = eval(jjj.replace("=",""))

    }
    else {
        try {
            var value = eval(excelFormulaUtilities.formula2JavaScript(nu_xl))

        }
        catch (e) {
            var value = "oops"
        }
    }
    if (value != "err") {
        if (value != "oops") {
            window.sessionStorage.setItem(fk, value);
        }else {
            window.sessionStorage.setItem(fk, value);
        }
    }
    else {
        window.sessionStorage.setItem(fk, 0);
    }
    return value
}


function fade(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 20);
}

function checkMods(el, cd) {




    var t = '#'+el.target.getAttribute('data-next-button')
    var x = $(t)
    var type = x[0].getAttribute('data-action-type')
    if (type == 'LOGIC') {
        // console.log("yes we called logic.")
        var idx = x[0].getAttribute('id')

        var f = x[0].getAttribute('data-card-formula')

        var form = f.substring(f.indexOf("="))
        // console.log(form)
        var z = f.indexOf("=")

        var ourkey = f.slice(0,z)
        // console.log(ourkey)

        // console.log("****")
        // console.log(cd)

        var idy = testform(convert(form), cd, ourkey);

        // console.log(idy)
        // console.log("****")

        // alert("LOGIC1")

        $("#"+idy).insertAfter("#"+idx);
                // alert("LOGIC2")

        // $("#"+idx).fadeOut(100);
                // alert(""#"+idx")
        var ele = document.getElementById(idx)
        fade(ele)

        $("#"+idy).fadeIn(300, function(){
            // $("#"+idx).fadeOut(100);
            // var dd = document.getElementById(idx)
            // dd.fadeOut(100)
        });
                        // alert("LOGIC4")


        return 1


        //
        // for (var jkey in sessionStorage){
        //     var notnull = window.sessionStorage.getItem(jkey)
        //     if (notnull != null) {
        //         cd[jkey] = window.sessionStorage.getItem(jkey)
        //     }
        // }
        // logic_post(cd, '/'+document.URL.split('\/')[3]+'postdata/', el)
    }




    if (type == 'DOWNLOAD') {
        // alert('download')
        download_post(cd, '/'+document.URL.split('\/')[3]+'/download/', el)
    }
    if (type == 'EMAIL') {
        // alert("EMAIL")
        // alert(x[0].getAttribute('id'))
        var f = x[0].getAttribute('data-card-formula')
        var f1 = x[0].getAttribute('data-card-emailto')
        var f2 = x[0].getAttribute('data-card-emailfrom')
        var f3 = x[0].getAttribute('data-card-emailbody')
        var f4 = x[0].getAttribute('data-card-emaildocs')

        // alert(f3)

        cd["emails"] = f
        cd["data-card-emailto"] = f1
        cd["data-card-emailfrom"] = f2
        cd["data-card-emailbody"] = f3
        cd["data-card-emaildocs"] = f4
        email_post(cd, '/'+document.URL.split('\/')[3]+'/email/', el)
    }
    if (type == 'LOOKUP')
    {

        var idx =   x[0].getAttribute('id')
        var f = x[0].getAttribute('data-card-formula')
        var l = x[0].getAttribute('data-card-lookup-value')
        var nxt = x[0].getAttribute('data-card-lookup-key')


        // console.log(idx)
        // console.log(f)
        // console.log(l)
        // console.log(nxt)

        cd['card_lookup'] = f
        cd['data-card-lookup-value'] = x[0].getAttribute('data-card-lookup-value')
        // cd['data-card-lookup-variable'] = x[0].getAttribute('data-card-formula')
        setTimeout(function (){
        lookup_post(cd, '/'+document.URL.split('\/')[3]+'/lookup/', l, idx, nxt)
          // Something you want delayed.

        }, 2000);


    }
    return 0
}

function colorx(el) {
    el.target.className = ("btn-large waves-effect waves-white blue");
    var x = document.getElementById(el.target.getAttribute('idx'));
    var y = x.getElementsByClassName('btn-large waves-effect waves-white');
    // console.log(y[0].innerHTML)
    for (var i = 0; i < y.length; i++) {
        // alert(y[i].innerText)

        // console.log(y[i])

        // console.log(el.target.innerText)

        if (y[i].innerHTML.split("<",1)[0].trim() != el.target.innerHTML.split("<",1)[0].trim()) {
        y[i].className = ("btn-large waves-effect waves-white grey");
        }
    }
}


function scroll(el){
    var f = '#'+el.target.getAttribute('idx')
    var tj = el.target.getAttribute('data-next-button')
    var t = '#'+el.target.getAttribute('data-next-button')
    $(t).insertAfter(f);
    $(t).fadeIn(300, function() {
        // dataname(tj, cd)
    });


    $("html, body").animate({scrollTop: $(t).offset().top }, 800);
}

function dataname(el, cd){
    var tj = el.target.getAttribute('data-next-button')
    var alt = document.getElementById(tj).getAttribute("data-card-alt-question");
    var ckeys = Object.keys(cd);
    for (var i in ckeys) {
        try {
            // console.log(ckeys[i])
            // console.log("*")
            if (ckeys[i] != undefined) {
                var hm = ckeys[i]
                // alert(alt)
                // if (alt.includes(ckeys[i]) == true)
                if (alt.indexOf(hm) > 0) {
                    console.log(hm)
                    // alert(alt)
                    // alert(alt.indexOf(ckeys[i]))
                     // alert('okay')
                    // alert(alt)
                    // alert(ckeys[i])

                    var regey = new RegExp("\\[" + ckeys[i] + "\\]", "g");
                    // var newone = alt.replace(regey, cd[ckeys[i]])
                    document.getElementById(tj).getElementsByClassName("card-title")[0].innerHTML = alt.replace(regey, cd[ckeys[i]])
                }
            }
        }
        catch(e) {

        }
    }
}


function toast(el){

    var toast = document.getElementById(el.target.getAttribute('idx')).getAttribute("data-card-toast").trim()

    Materialize.toast(toast, 3000)
}

//i need to set this up to go to









function update_page(qi, qt, qo) {

    // Materialize.toast(document.getElementById(qi.toString()+"_CARD").getAttribute("data-card-toast"), 3000)

    color(qi, qt, qo);

    var cd = dictionary(qi, qt, qo);

    add_session_data_to_dictionary(cd);

    checkModules(document.getElementById("q"+qo.toString() + '_CARD').getAttribute('value'), cd);

    scrollPage(qo, qi);

    // removeafterto('#q' + qo.toString() + '_CARD');

}

function scrollPage(qo, qi){
    var to = ('#q' + qo.toString() + '_CARD');
    var fro = ('#' + qi.toString() + '_CARD');
    $(to).insertAfter(fro);
    $(to).fadeIn(1000);
    $("html, body").animate({scrollTop: $(to).offset().top }, 800);

}

// function checkModules(fun, cd) {
//     if (fun == 'logic') {
//             for (var jkey in sessionStorage){
//             var notnull = window.sessionStorage.getItem(jkey)
//             if (notnull != null) {
//                 cd[jkey] = window.sessionStorage.getItem(jkey)
//             }
//         }
//         logic_post(cd, '/'+document.URL.split('\/')[3]+'/postdata/')
//     }
//
//     if (fun == 'download') {
//         // alert('download')
//         download_post(cd, '/'+document.URL.split('\/')[3]+'/download/')
//     }
//     if (fun == 'email') {
//         email_post(cd, '/'+document.URL.split('\/')[3]+'/email/')
//     }
//     if (fun == 'lookup') {
//         lookup_post(cd, '/'+document.URL.split('\/')[3]+'/lookup/')
//     }
// }


function isSuper(formula, cd) {
        regex = /\[(.*?)\]/g;
        var matches = [];
        var match = regex.exec(formula);
        while (match != null) {
            matches.push(match[1]);
            match = regex.exec(formula);
            // alert(match)
            // alert('end')
        }
        uniqueArray = matches.filter(function (item, pos) {
                return matches.indexOf(item) == pos;
            });

        var ckeys = Object.keys(cd);
        var isSuperset = uniqueArray.every(function(val) { return ckeys.indexOf(val) >= 0; });
        return isSuperset;
}

function add_session_data(cd) {
    for (var jkey in sessionStorage){
        var notnull = window.sessionStorage.getItem(jkey)
        if (notnull != null) {
            // alert(jkey)
            // console.log(jkey)
            // console.log(window.sessionStorage.getItem(jkey))
            cd[jkey] = window.sessionStorage.getItem(jkey)
        }
    }
    return cd
}

function add_session_data_to_dictionary (cd) {
    // console.log(" ")
    for (var jkey in sessionStorage){
        var notnull = window.sessionStorage.getItem(jkey)
        if (notnull != null) {
            // alert(jkey)
            // console.log(jkey)
            // console.log(window.sessionStorage.getItem(jkey))
            cd[jkey] = window.sessionStorage.getItem(jkey)
        }
    }

    var z = document.getElementById('calculations').value;
    var obj = JSON.parse(z);

    for (var key in obj) {
        // console.log(key)

        var formula = obj[key];

        var ss = isSuper(formula, cd)
        if (ss == true) {
            regexp = RegExp('\\b(' + Object.keys(cd).join('|') + ')\\b', 'g');
            var text = formula.replace(regexp, function (_, word) {
                return cd[word];
            });
            // var nu_xl = text.replace("{", '"').replaceAll("}", '"').replace("[", '"').replace("]", '"')
            var nu_xl = text.replace(/\[/g, '').replace(/\]/g, '')
            nu_xl = nu_xl.replace("|", '"').replace("|", '"').replace("|", '"').replace("|", '"').replace("|", '"').replace("|", '"').replace("|", '"').replace("|", '"').replace("|", '"').replace("|", '"');

            var nuuu = nu_xl.split("?")[0]
            var nuuuu = nu_xl.split("?")[1]
            var valu = eval(excelFormulaUtilities.formula2JavaScript(nuuu))
            var value = eval(valu+nuuuu)

            var keyX = key.split('-', 1);

            // console.log(key)
            // console.log(value)
            // console.log(nu_xl)
            if (value != "err") {

            window.sessionStorage.setItem(keyX, value);
            window.sessionStorage.setItem(key, value);
            }
            else{
                // alert(value)
                // alert(key)
            }
        }
    }
}

function add_to_downloads(cd) {
    var newlist = []
    try {
        var ckeys = Object.keys(cd);
        for (var i in ckeys) {
            var ourkey = ckeys[i]
            console.log(ourkey)
            if (ourkey.includes("DOCUMENT")) {
                if (cd[ourkey] == 1) {
                    newlist.push(ourkey.slice(0, -9) + ".pdf")
                }
            }
        }
        cd["DF"] = cd["DF"] + "," + newlist.join()
    }
    catch(e) {

    }
    return cd
}


function download_post(cd, pp, el){
    var two = '#'+el.target.getAttribute('data-next-button')
    var j = $(two)[0].getAttribute('data-card-lookup-key')
    var downloadFiles = document.getElementById(el.target.getAttribute('data-next-button')).getAttribute("data-card-download-files")
    cd['DF'] = downloadFiles;

    cd = add_to_downloads(cd)

    $.post(pp,
        {posted_data: JSON.stringify(cd)},
        function (direction) {
            // alert("download files correct")
            // $(direction['to']).insertAfter(direction['from']);
            // $(direction['to']).fadeIn(1000);
            var js = direction['goto'];
            //
            if (js != null){
                eval(js);
                // $(two).fadeOut(10);
                var ele = document.getElementById(el.target.getAttribute('data-next-button'))
                fade(ele)


                $('#'+j).insertAfter(two);
                $('#'+j).fadeIn(100);

                // var xkey = cd['current'][1];
                // var two = "#q"+xkey+'_CARD';
                // $(two).fadeOut(10);


            }
        }
    );
}

function email_post(cd, pp, el){
    var downloadFiles = document.getElementById(el.target.getAttribute('data-next-button')).getAttribute("data-card-emaildocs")

    cd['DF'] = downloadFiles;
    //
    console.log("ok")
    console.log("*&")
    // console.log(downloadFiles)
    // cd = add_to_downloads(cd)

    var key = cd['current'][0];
    var two = '#'+el.target.getAttribute('data-next-button')
    var j = $(two)[0].getAttribute('data-card-lookup-key')
    $.post(pp,
        {posted_data: JSON.stringify(cd)},
        function (direction) {
            // $(two).fadeOut(10);
            var ele = document.getElementById(el.target.getAttribute('data-next-button'))
            fade(ele)


            $('#'+j).insertAfter(two);
            $('#'+j).fadeIn(100);
        }
    );
}

// function logic_post(cd, pp, el){
//     var key = cd['current'][0];
//     var xkey = cd['current'][1];
//     var two = '#'+el.target.getAttribute('data-card-lookup-key')
//     // alert(two)
//
//     $.post(pp,
//         {posted_data: JSON.stringify(cd)},
//         function (direction) {
//
//             $(direction['to']).insertAfter(direction['from']);
//             $(direction['to']).fadeIn(1000);
//             // $(two).fadeOut(10);
//
//         }
//     );
// }

function lookup_post(cd, pp, l, idx, nxt){

    cd = add_session_data(cd)

    var kk = $.post(pp,
        {posted_data: JSON.stringify(cd)},
        function (direction) {
            // alert(l)
            // alert(idx)
            var alt = document.getElementById(nxt).getAttribute("data-card-alt-question");
            // alert(alt)
            // var re = "["+nxt+"]"
            // alt.replace(/&lt;/g, "<");
            var regey = new RegExp(nxt,"g");
            // alert(regey)
            var newone = alt.replace(regey, direction['info'])
            // alert(newone)
            // document.getElementById(nxt).getElementsByClassName("card-title")[0].innerHTML = direction['info']
            document.getElementById(nxt).getElementsByClassName("card-title")[0].innerHTML = newone

            // var two = "#q"+xkey+'_CARD';
            // $('#'+idx).fadeOut(10);
            $("#"+nxt).insertAfter('#'+idx);
            $("#"+nxt).fadeIn(100);

            var ele = document.getElementById(idx)
            fade(ele)
            // console.log('lookup value')
            // console.log(direction['info'])

            window.sessionStorage.setItem(idx, direction['info']);
            return "strg";
        }
    ).fail(function(response) {
        // cd = add_session_data(cd)
        // // alert(cd['BIOMOM_ADDRESS_administrative_area_level_2'])
        // //
        // var kk = $.post(pp,
        // {posted_data: JSON.stringify(cd)},
        // function (direction) {
        //     var alt = document.getElementById(nxt).getAttribute("data-card-alt-question");
        //     var regey = new RegExp(nxt,"g");
        //     var newone = alt.replace(regey, direction['info'])
        //     document.getElementById(nxt).getElementsByClassName("card-title")[0].innerHTML = newone
        //     $("#"+nxt).insertAfter('#'+idx);
        //     $("#"+nxt).fadeIn(100);
        //
        //     var ele = document.getElementById(idx)
        //     fade(ele)
        //     console.log('lookup value')
        //     console.log(direction['info'])
        //
        //     window.sessionStorage.setItem(idx, direction['info']);
        //     return "strg";
        // });

    });
        return "string"
}

function myFunction() {
    var x;

    if (confirm("Did you mean X") == true) {
        x = "You pressed OK!";
    } else {
        x = "You pressed Cancel!";
    }
}

function color(question_id, question_type, question_option) {

       // var dck = document.getElementById(question_id.toString()+"_CARD").getAttribute("data-card-key");

    // Assign buttons on current card to variable buttons
    var buttons = document.getElementsByName(question_id + '_BUTTON');

    // Iterate over buttons on current card
    for (var i = 0; i < buttons.length; i++) {

        // If current button value equals selected button value, change button color to pear
        if (buttons[i].value == question_type) {
            buttons[i].className = ("btn-large waves-effect waves-white blue");

            // window.sessionStorage.setItem(document.getElementById(question_id.toString()+"_CARD").getAttribute("data-card-key"), buttons[i].value);
        }
        // Else return current button to default color
        else {
            buttons[i].className = ("btn-large waves-effect waves-white disabled-color");
            }
        }
}

function removeafterto(el, m) {
    var tocard = '#'+el.target.getAttribute('data-next-button')

    var cards = $("[class='col s12']");
        for (i = 1; i < cards.length; i++) {
            var x = cards[i].id;


            var numx = '#'+x
            if (numx == tocard) {
                var newnum = i+1+m
                // alert('here')
                break
            }
        }
        for (newnum; newnum < cards.length; newnum++) {
            var j = cards[newnum].id;
            $("#" + j).fadeOut(100);

        }
}

function dictionary(el) {

    var qi = el.target.getAttribute('idx')
    var qo = el.target.getAttribute('data-next-button')
    var v  = el.target.innerHTML.split("<",1)[0].trim()
    console.log(v)
    console.log("----++++--")
    // alert(document.getElementById(question_id.toString()+"_CARD").getAttribute("data-card-key"))
    // window.sessionStorage.setItem(document.getElementById(question_id.toString()+"_CARD").getAttribute("data-card-key"), "one")

    // alert(window.sessionStorage.getItem('cardio'))
    // Initialize dict
    var card_dictionary = {};

    // Enter the current question into dict
    card_dictionary['current'] = [qi, qo];

    // For every card, append key/value pairs into dictionary by iterating over the number of selected buttons
    var selected_buttons = document.getElementsByClassName("btn-large waves-effect waves-white blue");
    for (var i = 0; i < selected_buttons.length; i++) {
        // card_dictionary[selected_buttons[i].getAttribute('idx')] = selected_buttons[i].innerHTML;
        card_dictionary[selected_buttons[i].getAttribute('idx')] = selected_buttons[i].innerHTML.split("<",1)[0].trim();
        // console.log(selected_buttons[i].innerHTML.split("<",1)[0].trim())
        // console.log(selected_buttons[i].innerText)
        // console.log("----++++--")

        // console.log(selected_buttons[i].getAttribute('idx'))
        // console.log(selected_buttons[i].innerText)
    }

    // For textboxes with class validate valid, update the value in each key/value pair
    // var textboxes_validate = $(".validate, .valid");
    var tv= document.getElementsByClassName('find_input');

    for (var i = 0; i < tv.length; i++) {
        // alert(tv[i].getAttribute('idx')   )
        if ((tv[i].getAttribute('idx')) in card_dictionary) {
            // console.log(tv[i].value)
            // alert(tv[i])
            card_dictionary[tv[i].getAttribute('idx')] = tv[i].value;
            // alert(tv[i].id)
            // if((tv[i].value.indexOf(", ma") !== -1) == true) {
            //     //this code will interface with registering types of data -
            //     // and will auto add the components for the people so they can refrence them later.
            //     getAddress(tv[i].value)
            // }
        }
    }



    // // For datepickers, update the value in each key/value pair
    // var datepickers = $(".datepicker, .picker__input");
    // for (var i = 0; i < datepickers.length; i++) {
    //     if ((datepickers[i].id) in card_dictionary) {
    //         card_dictionary[datepickers[i].id] = datepickers[i].value;
    //     }
    // }

    //     var xx = document.getElementById('calculations').value;
    //     var obj2 = JSON.parse(xx);
    //     var  keys = Object.keys(obj2);
    //     keys.forEach( function(s) {
    //         var v = window.sessionStorage.getItem(s);
    //         if (v != null) {
    //         card_dictionary[s] = v
    //         }
    //     } );
    //
    for (var jkey in sessionStorage) {
        var notnull = window.sessionStorage.getItem(jkey)
        if (notnull != null) {
            card_dictionary[jkey] = window.sessionStorage.getItem(jkey)
            // console.log("--")
            // console.log(window.sessionStorage.getItem(jkey))
            // console.log(jkey)

        }

    }
        // if (notnull != null) {
        //     card_dictionary[jkey] = window.sessionStorage.getItem(jkey)
        //
        // }
    // }
        // alert('nay')

    return card_dictionary;
}



function getAddress(address, cd, ourk) {
    var geocoder;
    geocoder = new google.maps.Geocoder();
    var y = {'address': address}

    geocoder.geocode(y, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            var arr = results[0].address_components
            for (var i = 0; i < arr.length; i++) {
                // console.log(ourk+"_"+results[0].address_components[i].types[0])
                // console.log(results[0].address_components[i].long_name)

                // alert(results[0].address_components[i].types[0])
                if (results[0].address_components[i].types[0] == "administrative_area_level_2"){
                    window.sessionStorage.setItem(ourk+"_county", results[0].address_components[i].long_name);
                }
                if (results[0].address_components[i].types[0] == "administrative_area_level_1"){
                    window.sessionStorage.setItem(ourk+"_state", results[0].address_components[i].long_name);
                }
                if (results[0].address_components[i].types[0] == "locality"){
                    window.sessionStorage.setItem(ourk+"_city", results[0].address_components[i].long_name);
                }

                window.sessionStorage.setItem(ourk+"_"+results[0].address_components[i].types[0], results[0].address_components[i].long_name);
                console.log(ourk+"_"+results[0].address_components[i].types[0])
                // cd[ourk+"_"+results[0].address_components[i].types[0]] = results[0].address_components[i].long_name
                // cd[ourk+"_"+results[0].address_components[i].types] = results[0].address_components[i].long_name
            }
      } else {
            alert('Hmm.. this doesnt seem quite right to me [' + status + ']');
      }
    });

    // return cd;
}
