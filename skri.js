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

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);

    console.log(ev.target.id + " ????");
    console.log(document.getElementById(ev.target.id).parentElement.id);

    var r = Number(document.getElementById(ev.target.id).parentElement.id.replace('ruutu', ''));
    liikealku(r);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");

    console.log(ev.target.id + " !!!!");
    console.log(ev.target.parentElement.id + " !?!?");
    console.log((ev.target.id).includes('drag'));
    if( (ev.target.id).includes('drag') ) {
        ev.target.parentElement.innerHTML = "";
    }  else {
        ev.target.appendChild(document.getElementById(data));
    }
    ev.target.appendChild(document.getElementById(data));
    
    var r = Number(document.getElementById(ev.dataTransfer.getData("text")).parentElement.id.replace('ruutu', ''));
    liikeloppu(r);

    /*console.log(ev.dataTransfer.getData("text"));
    console.log(ev.target.appendChild(document.getElementById(data)));
    console.log(document.getElementById(ev.dataTransfer.getData("text")).parentElement.id);*/
}





// SYÖNTI JA EHKÄ MUITA LIIKKUMISRAJOITUKSIA
// wip

function syonti() {

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

function r_to_y(r) {
    var x = 8;
    while (r > 8) {
        x--;
        r -= 8;
    }
    return (x);
}

function r_to_x(r) {
    var y = 1;
    while (r > 8) {
        r -= 8;
    }
    y = r;
    return (y);
}





// LIIKKUMISEN TEKSTIKSI MUUTTAMINEN
// LIIKKUMISJUTUT

var lruutu = "";
var liikelukukerroin = 0;

function liikealku(ruutu) {
    var liikkeet = document.getElementById("liikkeet");
    lruutu += aakkoset[r_to_x(ruutu)] + "" + r_to_y(ruutu) + " ";
    liikelukukerroin++;

    /*console.log(ruutu + " " + r_to_x(ruutu) + " " + r_to_y(ruutu) + " " + xy(r_to_x(ruutu), r_to_y(ruutu)));*/
}

function liikeloppu(ruutu) {
    var liikkeet = document.getElementById("liikkeet");
    liikkeet.innerHTML += lruutu + aakkoset[r_to_x(ruutu)] + "" + r_to_y(ruutu) + "; ";
    lruutu = "";
    if ( liikelukukerroin >= 3 ){
        liikkeet.innerHTML += "<br>";
        liikelukukerroin = 0;
    }
    

    /*console.log(ruutu + " " + r_to_x(ruutu) + " " + r_to_y(ruutu) + " " + xy(r_to_x(ruutu), r_to_y(ruutu)));*/
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