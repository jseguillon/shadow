//Recursive version

//Create canvas using document sizes
$('<div id="c"></div>').appendTo('body');

jQuery.ajaxSetup({ cache: true });

//outline or simply returns 
function outline(elem, maxr, maxb, onlyreturn) {
    //Do not handle non-visible elements
    if (!elem.is(":visible")) return false;

    l = elem.offset().left;
    t = elem.offset().top;

    //some elements maybe out of visibility => don't show
    if (l < 0 || t < 0) return false;

    //FIXME : check case of overflow : get parent block size
    w = elem.width();
    h = elem.height();

    ow = elem.outerWidth();
    oh = elem.outerHeight();

    padding = elem.padding();
    pdt = padding.top;
    pdr = padding.right;
    pdl = padding.left;
    pdb = padding.bottom;

    //Real Left position calculated taking care of padding
    rl = l + pdl;
    rt = t + pdt;

    //if overflow
    drawWidth = Math.min(w,maxr-rl);
    drawHeight= Math.min(h,maxb-rt);
    drawWidth = drawWidth<0?0:drawWidth;
    drawHeight = drawHeight<0?0:drawHeight; 

  var rectangle = paper.rect(rl, rt, 
                             drawWidth, 
                             drawHeight 
                            ).attr({stroke: "yellow"}); //FIXME : du coup c ici que serait mieux le test sur valeur overflow  

    //var rectangle = paper.rect(l, t, ow, oh).attr({stroke: "red"});

    //FIXME : should calculate border
    //FIXME : should calculate margin
    function doChild (child, maxr, maxb) { outline(child,maxr, maxb)};
    //process = doChild($(this), Math.min(rl+w,maxr), Math.min(t+h, maxb));
    elem.children().each(function() {
        doChild($(this), Math.min(rl+w,maxr), Math.min(t+h, maxb));
    });
}

var paper;

$.getScript("https://raw.github.com/bramstein/jsizes/master/lib/jquery.sizes.js").done(function(script, textStatus) {
    $.getScript("https://raw.github.com/DmitryBaranovskiy/raphael/master/raphael-min.js").done(function(script, textStatus)  {
        paper = new Raphael(document.getElementById('c'), $(document).width(), $(document).height());  
        //$('div, span, a, p, h1, h2, ol, ul, li, img')
        //    $('body').children().each(function() {
        //    outline($(this), $(document).width(), $(document).height())
        //    }); //FIXME : manque une conf pour pouvoir fitrer les éléments a display

        //FIXME : nécessiterait plutôt un bouton pour lancer ou pas cette action 
        /*$('*').css({
            opacity: 0.7
        });*/
        $('#c').css({
            opacity: 1
        });

        $.getScript('http://www.nihilogic.dk/labs/canvas2image/base64.js').done(function(script, textStatus) {
            $.getScript('http://www.nihilogic.dk/labs/canvas2image/canvas2image.js').done(function(script, textStatus) {
                //Canvas2Image.saveAsPNG(document.getElementById("c"));
            });
        });
    });
});

//Mesure live clavier et plot et frequence de séparation, taille image, polices, adéquation taille vs class, recouvrements, fréquence h/article/section...
