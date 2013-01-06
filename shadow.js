//Recursive version

//Create canvas using document sizes
$('<div id="c"></div>').appendTo('body');


//outline or simply returns 


function outline(elem, maxr, maxb, onlyreturn) {
    //Do not handle non-visible elements
    //FIXME : lancer tt de meme le traitement sur les fils
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
    //w=;
    //h=(h>maxb)?(maxb-h):h;
    
  var rectangle = paper.rect(rl, rt, 
                             (rl+w>maxr)?(maxr-rl):w, 
                             (rt+h>maxb)?(maxb-h):h
                            ).attr({stroke: "yellow"}); //FIXME : du coup c ici que serait mieux le test sur valeur overflow  

    //draw content
    //ctx.strokeStyle = "#000000";
    //draw padding
    //var rectangle = paper.rect(l, t, ow, oh).attr({stroke: "red"});

    //FIXME : should calculate border
    //FIXME : should calculate margin
    elem.children().each(function() {
      outline($(this), (rl+w<maxr)?rl+w:maxr, (rt+h<maxb)?rt+h:maxb) //FIXME : presque mais c du position et pas du size qu'il faut passer, sinon le width ne veut rien dire (pas le même right)
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
