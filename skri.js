var aakkoset = ["0", "A", "B", "C", "D", "E", "F", "G", "H"];
var ruutuxy = [];
for (i = 0; i < 8; i++) {
    ruutuxy[i] = [i + 1];
    for (j = 0; j < 8; j++) {
        ruutuxy[i][j] = [j + 1];
    }
}

// ALUSTAN ALUSTUS
// Luodaan HTML elementtejä, joista muodostuu lauta
// elementeille annetaan omat ID:t ja muut

function alustus() {
    var lauta2 = document.getElementById("alustansisys");
    var ruudut2 = "";
    var ruutuid = 1;

    document.getElementById("liikkeet").innerHTML = "";
    for (i = 8; i > 0; i--) {
        ruudut2 += "<div class='rivi'>";
        for (j = 1; j < 9; j++) {
            ruudut2 += "<div class='laatikko "
            if (j % 2 == 0 && i % 2 != 0 || j % 2 != 0 && i % 2 == 0) {
                ruudut2 += "musta'";
            } else {
                ruudut2 += "valkoinen'";
            }

            ruudut2 += " id='ruutu" + ruutuid + "' ondrop='drop(event)' ondragover='allowDrop(event)'></div>";
            ruutuid++;

        }
        ruudut2 += "</div>";
    }


    lauta2.innerHTML = ruudut2;
    liikelukukerroin = 0;
}





// DRAG & DROP PAIKKA
// DROP AND DRAG
var lahtoruutu;

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    /*
        console.log(ev.target.id + " ????");
        console.log(document.getElementById(ev.target.id).parentElement.id);
    */
    var r = Number(document.getElementById(ev.target.id).parentElement.id.replace('ruutu', ''));
    lahtoruutu = r;
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var r = Number(Number(ev.currentTarget.id.replace('ruutu', '')));
    var tyyppi = ev.dataTransfer.getData("text");

    console.log(lahtoruutu);
    console.log(Number(ev.currentTarget.id.replace('ruutu', '')));
    /*
    console.log(ev.target.id + " _target.id");
    console.log(ev.target.parentElement.id + " _target.parentElement.id");
    console.log(ev.dataTransfer.getData("text") + " _dataTransfer.getData('text')");*/

    if (saannot(lahtoruutu, r, tyyppi)) {

        console.log("Säännöt olivat totta!")


        if ((ev.target.id).includes('drag') && (ev.target.id != ev.dataTransfer.getData("text"))) {
            ev.currentTarget.innerHTML = "";
            ev.currentTarget.appendChild(document.getElementById(data));
            liikealku(lahtoruutu);
            r = Number(document.getElementById(ev.dataTransfer.getData("text")).parentElement.id.replace('ruutu', ''));
            liikeloppu(r);
        } else if ((ev.target.id == ev.dataTransfer.getData("text"))) {
        } else {
            ev.target.appendChild(document.getElementById(data));
            liikealku(lahtoruutu);
            r = Number(document.getElementById(ev.dataTransfer.getData("text")).parentElement.id.replace('ruutu', ''));
            liikeloppu(r);
        }
    }

    /*
    console.log(ev.dataTransfer.getData("text"));
    console.log(ev.target.appendChild(document.getElementById(data)));
    console.log(document.getElementById(ev.dataTransfer.getData("text")).parentElement.id);
    */
}





// SYÖNTI JA EHKÄ MUITA LIIKKUMISRAJOITUKSIA
// wip

function saannot(a, l, tyyppi) {
    
    //console.log(rtox(a) + "," + rtoy(a) + " " + rtox(l) + "," + rtoy(l));
    //console.log(( a- l ) % 8 == 0);
    //console.log(Math.abs(rtoy(a) - rtoy(l)));
    // ALAS
    if ((( a - l) % 8 == 0) && (a - l < 0)) {
        for ( i = 1; i < ( Math.abs(rtoy(a) - rtoy(l))) ; i++) {
            //console.log("ruutu" + (a + (i)*8));
            if (document.getElementById("ruutu" + ((a + (i)*8))).hasChildNodes()) {
                console.log(" EI ONNISTU ");
                return(false);
            }
        }
    }
    // YLÖS
    if ((( a - l) % 8 == 0) && (a - l > 0)) {
        for ( i = 1; i < ( Math.abs(rtoy(a) - rtoy(l))) ; i++) {
            if (document.getElementById("ruutu" + ((a + (-i)*8))).hasChildNodes()) {
                console.log(" EI ONNISTU ");
                return(false);
            }
        }
    }
    // OIKEA
    if (rtoy(a) == rtoy(l) && ( a < l )) {
        for ( i = 1; i < ( Math.abs(rtox(a) - rtox(l))) ; i++) {
            if (document.getElementById("ruutu" + ((a + (i)))).hasChildNodes()) {
                console.log(" EI ONNISTU ");
                return(false);
            }
        }
    }
    // VASEN
    if (rtoy(a) == rtoy(l) && ( l < a)) {
        for ( i = 1; i < ( Math.abs(rtox(a) - rtox(l))) ; i++) {
            if (document.getElementById("ruutu" + ((a + (-i)))).hasChildNodes()) {
                console.log(" EI ONNISTU ");
                return(false);
            }
        }
    }
    // suoraa ylös      y++ =   r - 8

    // suoraa oikee     x++ =   r + 1

    // suoraa alas      y-- =   r + 8

    // suoraa vasen     x-- =   r - 1


    // viisto koillinen     x++ y++  =  r - 7 

    // viisto kaakko        x++ y--  =  r + 9

    // viisto lounas        x-- y--  =  r + 7

    // viisto luode         x-- y++  =  r - 9

    // tyyppi = TORNI
    
    console.log(tyyppi.includes('t'));
    if ( tyyppi.includes('t')) {
        if(rtoy(a) == rtoy(l)){
            return(true);
        } else if(rtox(a) == rtox(l)){
            return(true);
        } else {
            return(false);
        }
    }

    return (true);
}


    function tyyppitarkistus(tyyppi){
        
    }

    // OMAA EI VOI SYÖDÄ SÄÄNTÖ
    function puoli(){

    }




// Ruutu ja koordinaatti vaihdokset
// ruutujen ID muutetaan x ja y , ja toistepäin

function xy(x, y) {
    if (typeof x == 'number') {
        return (64 + (x - (y * 8)));
    }
    else {
        x = x.toUpperCase();
        return (64 + (aakkoset.indexOf(x) - (y * 8)));
    }
}

function rtoy(r) {
    var y = 8;
    while (r > 8) {
        y--;
        r -= 8;
    }
    return (y);
}

function rtox(r) {
    var x = 1;
    while (r > 8) {
        r -= 8;
    }
    x = r;
    return (x);
}





// LIIKKUMISEN TEKSTIKSI MUUTTAMINEN
// LIIKKUMISJUTUT

var lruutu = "";
var liikelukukerroin = 0;

function liikealku(ruutu) {
    var liikkeet = document.getElementById("liikkeet");
    lruutu += aakkoset[rtox(ruutu)] + "" + rtoy(ruutu) + " ";
    liikelukukerroin++;

    /*
    console.log(ruutu + " " + r_to_x(ruutu) + " " + r_to_y(ruutu) + " " + xy(r_to_x(ruutu), r_to_y(ruutu)));
    */
}

function liikeloppu(ruutu) {
    var liikkeet = document.getElementById("liikkeet");
    liikkeet.innerHTML += lruutu + aakkoset[rtox(ruutu)] + "" + rtoy(ruutu) + "; ";
    lruutu = "";
    if (liikelukukerroin >= 3) {
        liikkeet.innerHTML += "<br>";
        liikelukukerroin = 0;
    }


    /*
    console.log(ruutu + " " + r_to_x(ruutu) + " " + r_to_y(ruutu) + " " + xy(r_to_x(ruutu), r_to_y(ruutu)));
    */
}




// NAPPULA-ALUSTUKSET
// määritellään ruudut, mihin nappulat laitetaan
// määritellään luokat, joista saadaan nappuloiden ominaisuudet

function nappulaalustus() {

    //tornit
    document.getElementById("ruutu" + xy("a", 8)).innerHTML = "<img src='torni_m.png' class='tornim' draggable='true' ondragstart='drag(event)' id='drag_tm1'></img>";
    document.getElementById("ruutu" + xy("h", 8)).innerHTML = "<img src='torni_m.png' class='tornim' draggable='true' ondragstart='drag(event)' liike()' id='drag_tm2'></img>";
    document.getElementById("ruutu" + xy("a", 1)).innerHTML = "<img src='torni_v.png' class='torniv' draggable='true' ondragstart='drag(event)' id='drag_tv1'></img>";
    document.getElementById("ruutu" + xy("h", 1)).innerHTML = "<img src='torni_v.png' class='torniv' draggable='true' ondragstart='drag(event)' id='drag_tv2'></img>";

    //hepat
    document.getElementById("ruutu" + xy("b", 8)).innerHTML = "<img src='hevonen_m.png' class='hevonenm' draggable='true' ondragstart='drag(event)' id='drag_hm1'></img>";
    document.getElementById("ruutu" + xy("g", 8)).innerHTML = "<img src='hevonen_m.png' class='hevonenm' draggable='true' ondragstart='drag(event)' id='drag_hm2'></img>";
    document.getElementById("ruutu" + xy("b", 1)).innerHTML = "<img src='hevonen_v.png' class='hevonenv' draggable='true' ondragstart='drag(event)' id='drag_hv1'></img>";
    document.getElementById("ruutu" + xy("g", 1)).innerHTML = "<img src='hevonen_v.png' class='hevonenv' draggable='true' ondragstart='drag(event)' id='drag_hv2'></img>";

    //lähetit
    document.getElementById("ruutu" + xy("c", 8)).innerHTML = "<img src='lahetti_m.png' class='lahettim' draggable='true' ondragstart='drag(event)' id='drag_lm1'></img>";
    document.getElementById("ruutu" + xy("f", 8)).innerHTML = "<img src='lahetti_m.png' class='lahettim' draggable='true' ondragstart='drag(event)' id='drag_lm2'></img>";
    document.getElementById("ruutu" + xy("c", 1)).innerHTML = "<img src='lahetti_v.png' class='lahettiv' draggable='true' ondragstart='drag(event)' id='drag_lv1'></img>";
    document.getElementById("ruutu" + xy("f", 1)).innerHTML = "<img src='lahetti_v.png' class='lahettiv' draggable='true' ondragstart='drag(event)' id='drag_lv2'></img>";

    //kuningas
    document.getElementById("ruutu" + xy("d", 8)).innerHTML = "<img src='kuningas_m.png' class='kuningasm' draggable='true' ondragstart='drag(event)' id='drag_km'></img>";
    document.getElementById("ruutu" + xy(4, 1)).innerHTML = "<img src='kuningas_v.png' class='kuningasv' draggable='true' ondragstart='drag(event)' id='drag_kv'></img>";

    //kuningatar
    document.getElementById("ruutu" + xy("e", 8)).innerHTML = "<img src='kuningatar_m.png' class='kuningatarm' draggable='true' ondragstart='drag(event)' id='drag_qm'></img>";
    document.getElementById("ruutu" + xy("e", 1)).innerHTML = "<img src='kuningatar_v.png' class='kuningatarv' draggable='true' ondragstart='drag(event)' id='drag_qv'></img>";

    //sotilaat
    for (i = 1; i <= 8; i++) {
        document.getElementById("ruutu" + xy(i, 7)).innerHTML = "<img src='sotilas_m.png' class='sotilasm' draggable='true' ondragstart='drag(event)' id='drag_sm" + i + "'></img>";
        document.getElementById("ruutu" + xy(i, 2)).innerHTML = "<img src='sotilas_v.png' class='sotilasv' draggable='true' ondragstart='drag(event)' id='drag_sv" + i + "'></img>";
    }
}


/*
function alustusvanha() {
    var lauta = document.getElementById("alusta");
    var ruudut = "";


    ruudut += "<table id='lauta'>";
    for (i = 8; i > 0; i--) {
        ruudut += "<tr><th class='koordinaatti'>" + i + "</th>";

        for (j = 1; j < 9; j++) {
            ruudut += "<td"
            if (j % 2 == 0 && i % 2 != 0 || j % 2 != 0 && i % 2 == 0) {
                ruudut += " class='valkoinen'>";
            } else {
                ruudut += " class='musta'>";
            }
            ruudut += aakkoset[j - 1] + "" + i + "</td>";
        }
        ruudut += "</tr>";
    }
    ruudut += "<tr><th></th>"
    for (k = 1; k < 9; k++) {
        ruudut += "<th class='koordinaatti'>" + aakkoset[k - 1] + "</th>";
    }
    ruudut += "</tr>";
    ruudut += "</table>";
    lauta.innerHTML = ruudut;

}
*/