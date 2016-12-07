$(function() {
      $('button#q1').bind('click', function(e) {
          var clickedButton = e.target;
          var v = clickedButton.value;

    if (v == 'q01.0') {
        eles = document.getElementsByName("main");
        var arrayLength = eles.length;
        for (var ix = 0; ix < arrayLength; ix++) {
            $(eles[ix]).fadeIn(10);
        }
        eles = document.getElementsByName("alt");
        var arrayLength = eles.length;
        for (var ix = 0; ix < arrayLength; ix++) {
            $(eles[ix]).fadeOut(10);
        }
    }
});
return false;
});
