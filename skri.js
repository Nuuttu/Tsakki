// AAKKOSIA KÄYTETÄÄN KOORDINAATEISSA
var aakkoset = ["0", "A", "B", "C", "D", "E", "F", "G", "H"];
// STRING-MUUTTUJA, JOKA SAA ARVOKSEEN VIIMEISEN LIIKKEEN MUODOSSA "A2 A3"
var viimenenliike = "";
var ruutuxy = [];
var kummanvuoro = "v";
// LINNOITUSTARKISTUSMUUTTUJAT
var kuningasliikkunutv = "n";
var kuningasliikkunutm = "n";
var torniliikkunutav = "n";
var torniliikkunuthv = "n";
var torniliikkunutam = "n";
var torniliikkunuthm = "n";
// KAIKKIA UHATUT RUUDUT PIDETÄÄN ARRAYSSA
var uhkaruudutm = new Array(64);
for (i = 0; i < 64; i++) {
    uhkaruudutm[i] = 0;
}
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

    kuningasliikkunutv = "n";
    kuningasliikkunutm = "n";
    torniliikkunutav = "n";
    torniliikkunuthv = "n";
    torniliikkunutam = "n";
    torniliikkunuthm = "n";
    kummanvuoro = "v";
    viimenenliike = "";
    lauta2.innerHTML = ruudut2;
    liikelukukerroin = 0;
}




// LIIKKEEN FUNKTIOT
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
    console.log(ev.dataTransfer.getData("text") + " _dataTransfer.getData('text')");
    */
    if (saannot(lahtoruutu, r, tyyppi)) {

        console.log("Säännöt palauttivat toden")
        if (kummanvuoro == "v") {
            kummanvuoro = "m";
        } else { kummanvuoro = "v" }
        // SYÖNTI
        if ((ev.target.id).includes('drag') && (ev.target.id != ev.dataTransfer.getData("text"))) {
            ev.currentTarget.innerHTML = "";
            ev.currentTarget.appendChild(document.getElementById(data));
            document.getElementById("liikkeet").innerHTML += "s";
            liikealku(lahtoruutu);
            r = Number(document.getElementById(ev.dataTransfer.getData("text")).parentElement.id.replace('ruutu', ''));
            liikeloppu(r);
            // JOS RUUTU ON SAMA
        } else if ((ev.target.id == ev.dataTransfer.getData("text"))) {
        } else {
            // JOS EI SYÖNYT JA ON TYHJÄ RUUTU
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




// SAANNOT LÄHES KAIKKI
// TARKISTAA LIIKKEEN OIKEELLISUUDEN JA KÄY LÄPI SÄÄNTÖJÄ

function saannot(a, l, tyyppi) {

    uhat();

    for (i = 0; i < 64; i++) {
        //console.log(uhkaruudutm[i]);
        if (uhkaruudutm[i] == 1) {
            //document.getElementById("ruutu" + i).style.backgroundColor = "red";
           
        }
    }

    for (i = 0; i < 64; i++) {
        uhkaruudutm[i] = 0;
    }

    // VUOROT
    // VALKOINEN
    console.log(document.getElementById("ruutu" + a).firstChild.id);
    if (kummanvuoro == "v" && document.getElementById("ruutu" + a).firstChild.id.includes('m')) {
        return (false);
    }

    // MUSTA
    if (kummanvuoro == "m" && document.getElementById("ruutu" + a).firstChild.id.includes('v')) {
        return (false);
    }

    // OMAN SYÖNTI
    // MUSTA
    if (document.getElementById("ruutu" + l).hasChildNodes() && tyyppi.includes('m')) {
        if ((document.getElementById("ruutu" + l).firstChild).id.includes('m')) {
            return (false);
        }
    }

    // VALKOINEN
    if (document.getElementById("ruutu" + l).hasChildNodes() && tyyppi.includes('v')) {
        if ((document.getElementById("ruutu" + l).firstChild).id.includes('v')) {
            return (false);
        }
    }


    //console.log(rtox(a) + "," + rtoy(a) + " " + rtox(l) + "," + rtoy(l));
    //console.log(( a- l ) % 8 == 0);
    //console.log(Math.abs(rtoy(a) - rtoy(l)));

    // ALAS
    if (((a - l) % 8 == 0) && (a - l < 0)) {
        for (i = 1; i < (Math.abs(rtoy(a) - rtoy(l))); i++) {
            //console.log("ruutu" + (a + (i) * 8) + " ___Ruutu käyty läpi");
            if (document.getElementById("ruutu" + ((a + (i) * 8))).hasChildNodes()) {
                return (false);
            }
        }
    }

    // YLÖS
    if (((a - l) % 8 == 0) && (a - l > 0)) {
        for (i = 1; i < (Math.abs(rtoy(a) - rtoy(l))); i++) {
            if (document.getElementById("ruutu" + ((a + (-i) * 8))).hasChildNodes()) {
                return (false);
            }
        }
    }

    // OIKEA
    if (rtoy(a) == rtoy(l) && (a < l)) {
        for (i = 1; i < (Math.abs(rtox(a) - rtox(l))); i++) {
            if (document.getElementById("ruutu" + ((a + (i)))).hasChildNodes()) {
                return (false);
            }
        }
    }

    // VASEN
    if (rtoy(a) == rtoy(l) && (l < a)) {
        for (i = 1; i < (Math.abs(rtox(a) - rtox(l))); i++) {
            if (document.getElementById("ruutu" + ((a + (-i)))).hasChildNodes()) {
                return (false);
            }
        }
    }

    // VIISTOT  KOILLINEN
    //if (Math.abs(rtoy(a)) - Math.abs(rtoy(l)) == Math.abs(rtox(a)) - Math.abs(rtox(l))) {
    //console.log( ((rtox(a) + " " + rtox(l)) ) + " " + ((rtoy(a) + " " +  rtoy(l)) ));
    //console.log( ((rtox(a) - rtox(l)) == 1) + " " + ((rtoy(a) - rtoy(l)) == 1 ));
    //console.log( ((a - l) > 0) && ((a - l) % 7) == 0);
    //console.log((Math.abs(Math.abs(rtoy(a)) - Math.abs(rtoy(l))) + Math.abs(Math.abs(rtox(a)) - Math.abs(rtox(l)))) / 2);


    // VIISTOT KOILLINEN
    if (((a - l) > 0) && ((a - l) % 7) == 0 && a != 64 && (Math.abs(Math.abs(rtoy(a)) - Math.abs(rtoy(l))) + Math.abs(Math.abs(rtox(a)) - Math.abs(rtox(l)))) % 2 == 0) {
        for (i = 1; i < (Math.abs(Math.abs(rtoy(a)) - Math.abs(rtoy(l))) + Math.abs(Math.abs(rtox(a)) - Math.abs(rtox(l)))) / 2; i++) {
            if (document.getElementById("ruutu" + (a + (-i) * 7)).hasChildNodes()) {
                return (false);
            }
        }
    }

    // VIISTOT LOUNAS
    if (((a - l) < 0) && ((a - l) % 7) == 0 && a != 1 && (Math.abs(Math.abs(rtoy(a)) - Math.abs(rtoy(l))) + Math.abs(Math.abs(rtox(a)) - Math.abs(rtox(l)))) % 2 == 0) {
        for (i = 1; i < (Math.abs(Math.abs(rtoy(a)) - Math.abs(rtoy(l))) + Math.abs(Math.abs(rtox(a)) - Math.abs(rtox(l)))) / 2; i++) {
            if (document.getElementById("ruutu" + (a + i * 7)).hasChildNodes()) {
                return (false);
            }
        }
    }

    // VIISTOT KAAKKO
    if (((a - l) < 0) && ((a - l) % 9) == 0 && (Math.abs(Math.abs(rtoy(a)) - Math.abs(rtoy(l))) + Math.abs(Math.abs(rtox(a)) - Math.abs(rtox(l)))) % 2 == 0) {
        for (i = 1; i < (Math.abs(Math.abs(rtoy(a)) - Math.abs(rtoy(l))) + Math.abs(Math.abs(rtox(a)) - Math.abs(rtox(l)))) / 2; i++) {
            if (document.getElementById("ruutu" + (a + i * 9)).hasChildNodes()) {
                return (false);
            }
        }
    }

    // VIISTOT LUODE
    if (((a - l) > 0) && ((a - l) % 9) == 0 && (Math.abs(Math.abs(rtoy(a)) - Math.abs(rtoy(l))) + Math.abs(Math.abs(rtox(a)) - Math.abs(rtox(l)))) % 2 == 0) {
        for (i = 1; i < (Math.abs(Math.abs(rtoy(a)) - Math.abs(rtoy(l))) + Math.abs(Math.abs(rtox(a)) - Math.abs(rtox(l)))) / 2; i++) {
            if (document.getElementById("ruutu" + (a + (-i) * 9)).hasChildNodes()) {
                return (false);
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

    //console.log(kuningasliikkunutv + " " + kuningasliikkunutm + " " + torniliikkunutav + " " + torniliikkunuthv + " " + torniliikkunutam + " " + torniliikkunuthm);

    // KUNINGAS
    if (((document.getElementById("ruutu" + a).firstChild).classList).contains("kuningasv") || ((document.getElementById("ruutu" + a).firstChild).classList).contains("kuningasm")) {
        // LINNOITUS
        // VALKOINEN H TORNI LINNOITUS
        if ((a - l) == -2 && (((document.getElementById("ruutu" + a).firstChild).classList).contains("kuningasv")) && kuningasliikkunutv == "n" && torniliikkunuthv == "n") {
            if (!((document.getElementById("ruutu" + (a + 1)).hasChildNodes()) || (document.getElementById("ruutu" + (a + 2)).hasChildNodes()) || (document.getElementById("ruutu" + (a + 3)).hasChildNodes())) && (document.getElementById("ruutu64").firstChild.classList.contains("torniv"))) {
                document.getElementById("ruutu64").innerHTML = "";
                document.getElementById("ruutu" + (a + 1)).innerHTML = "<img src='torni_v.png' class='torniv' draggable='true' ondragstart='drag(event)' id='drag_tv2'></img>";
                kuningasliikkunutv = "y";
                torniliikkunuthv = "y";
                return (true);
            } else { return (false); }
        }

        // VALKOINEN A TORNI LINNOITUS
        if ((a - l) == 2 && (((document.getElementById("ruutu" + a).firstChild).classList).contains("kuningasv")) && kuningasliikkunutv == "n" && torniliikkunutav == "n") {
            if (!((document.getElementById("ruutu" + (a - 1)).hasChildNodes()) || (document.getElementById("ruutu" + (a - 2)).hasChildNodes())) && (document.getElementById("ruutu57").firstChild.classList.contains("torniv"))) {
                document.getElementById("ruutu57").innerHTML = "";
                document.getElementById("ruutu" + (a - 1)).innerHTML = "<img src='torni_v.png' class='torniv' draggable='true' ondragstart='drag(event)' id='drag_tv1'></img>";
                kuningasliikkunutv = "y";
                torniliikkunutav = "y";
                return (true);
            } else { return (false); }
        }

        // MUSTA A TORNI LINNOITUS
        if ((a - l) == 2 && (((document.getElementById("ruutu" + a).firstChild).classList).contains("kuningasm")) && kuningasliikkunutm == "n" && torniliikkunutam == "n") {
            if (!((document.getElementById("ruutu" + (a - 1)).hasChildNodes()) || (document.getElementById("ruutu" + (a - 2)).hasChildNodes())) && (document.getElementById("ruutu1").firstChild.classList.contains("tornim"))) {
                document.getElementById("ruutu1").innerHTML = "";
                document.getElementById("ruutu" + (a - 1)).innerHTML = "<img src='torni_m.png' class='torniv' draggable='true' ondragstart='drag(event)' id='drag_tm1'></img>";
                kuningasliikkunutm = "y";
                torniliikkunutam = "y";
                return (true);
            } else { return (false); }
        }

        // MUSTA H TORNI LINNOITUS
        if ((a - l) == -2 && (((document.getElementById("ruutu" + a).firstChild).classList).contains("kuningasm")) && kuningasliikkunutm == "n" && torniliikkunuthm == "n") {
            if (!((document.getElementById("ruutu" + (a + 1)).hasChildNodes()) || (document.getElementById("ruutu" + (a + 2)).hasChildNodes()) || (document.getElementById("ruutu" + (a + 3)).hasChildNodes())) && (document.getElementById("ruutu8").firstChild.classList.contains("tornim"))) {
                document.getElementById("ruutu8").innerHTML = "";
                document.getElementById("ruutu" + (a + 1)).innerHTML = "<img src='torni_m.png' class='torniv' draggable='true' ondragstart='drag(event)' id='drag_tm2'></img>";
                kuningasliikkunutm = "y";
                torniliikkunuthm = "y";
                return (true);
            } else { return (false); }
        }

        if ((Math.abs((a - l)) == 1) || (Math.abs((a - l)) == 8) || (Math.abs((a - l)) == 9) || (Math.abs((a - l)) == 7)) {
            if ((((document.getElementById("ruutu" + a).firstChild).classList).contains("kuningasv")) && kuningasliikkunutv == "n") {
                kuningasliikkunutv = "y";
            }
            if ((((document.getElementById("ruutu" + a).firstChild).classList).contains("kuningasm")) && kuningasliikkunutm == "n") {
                kuningasliikkunutm = "y";
            }
            return (true);
        } else { return (false); }
    }

    //KUNINGATAR
    if (((document.getElementById("ruutu" + a).firstChild).classList).contains("kuningatarv") || ((document.getElementById("ruutu" + a).firstChild).classList).contains("kuningatarm")) {
        if (((a - l) % 7) == 0 && Math.abs((Math.abs(rtoy(a)) - Math.abs(rtoy(l)))) == Math.abs(Math.abs(rtox(a)) - Math.abs(rtox(l)))) {
            return (true);
        } else if (((a - l) % 9) == 0 && Math.abs((Math.abs(rtoy(a)) - Math.abs(rtoy(l)))) == Math.abs(Math.abs(rtox(a)) - Math.abs(rtox(l)))) {
            return (true);
        } else if (rtoy(a) == rtoy(l)) {
            return (true);
        } else if (rtox(a) == rtox(l)) {
            return (true);
        } else { return (false); }
    }

    // HEVONEN
    if (((document.getElementById("ruutu" + a).firstChild).classList).contains("hevonenv") || ((document.getElementById("ruutu" + a).firstChild).classList).contains("hevonenm")) {
        if ((Math.abs((a - l)) == 15) || (Math.abs((a - l)) == 17) || (Math.abs((a - l)) == 6) || (Math.abs((a - l)) == 10)) {
            return (true);
        } else { return (false); }
    }

    // LÄHETTI
    if (((document.getElementById("ruutu" + a).firstChild).classList).contains("lahettiv") || ((document.getElementById("ruutu" + a).firstChild).classList).contains("lahettim")) {
        if (((a - l) % 7) == 0 && Math.abs((Math.abs(rtoy(a)) - Math.abs(rtoy(l)))) == Math.abs(Math.abs(rtox(a)) - Math.abs(rtox(l)))) {
            return (true);
        } else if (((a - l) % 9) == 0 && Math.abs((Math.abs(rtoy(a)) - Math.abs(rtoy(l)))) == Math.abs(Math.abs(rtox(a)) - Math.abs(rtox(l)))) {
            return (true);
        } else { return (false); }
    }

    // TORNI
    if (((document.getElementById("ruutu" + a).firstChild).classList).contains("torniv") || ((document.getElementById("ruutu" + a).firstChild).classList).contains("tornim")) {
        if (rtoy(a) == rtoy(l)) {
            if (a == 64) { torniliikkunuthv = "y"; }
            if (a == 57) { torniliikkunutav = "y"; }
            if (a == 8) { torniliikkunuthm = "y"; }
            if (a == 1) { torniliikkunutam = "y"; }
            return (true);
        } else if (rtox(a) == rtox(l)) {
            if (a == 64) { torniliikkunuthv = "y"; }
            if (a == 57) { torniliikkunutav = "y"; }
            if (a == 8) { torniliikkunuthm = "y"; }
            if (a == 1) { torniliikkunutam = "y"; }
            return (true);
        } else {
            return (false);
        }
    }

    // SOTILAS MUSTA
    if (((document.getElementById("ruutu" + a).firstChild).classList).contains("sotilasm")) {
        // ETEEN JA YLENNYSCHECK
        if (((a - l) == -8)) {
            if (document.getElementById("ruutu" + (l)).hasChildNodes()) {
                return (false);
            } else if (rtoy(l) == 1) {
                ylennysm(a, l, tyyppi);
            } else { return (true); }
            // SYÖNTI JA YLENNYS
         // ( i - 1 > 0 && j + 1 < 9 && !(document.getElementById("ruutu" + xy(j + 1, i - 1)).hasChildNodes()))
        } else if ((((a - l) == -7) || ((a - l) == -9)) && (document.getElementById("ruutu" + (l)).hasChildNodes()) && (rtoy(l)) == 1 && (rtoy(a) != rtoy(l)) ) {
            ylennysm(a, l, tyyppi);
            return (true);
            // SYÖNTI
        } else if ((((a - l) == -7) || ((a - l) == -9)) && (document.getElementById("ruutu" + (l)).hasChildNodes()) && (rtoy(a) != rtoy(l)) ) {
            return (true);
            // OHESTALYÖNTI
        } else if ((((a - l) == -7) || ((a - l) == -9)) && (document.getElementById("ruutu" + (l - 8)).hasChildNodes()) && xy(viimenenliike.charAt(0), viimenenliike.charAt(1)) == l + 8 && xy(viimenenliike.charAt(3), viimenenliike.charAt(4)) == l - 8 && (rtoy(a) != rtoy(l)) ) {
            if (((document.getElementById("ruutu" + (l - 8)).firstChild).classList).contains("sotilasv") && xy(viimenenliike.charAt(0), viimenenliike.charAt(1)) == l + 8) {
                document.getElementById("ruutu" + (l - 8)).innerHTML = "";
                document.getElementById("liikkeet").innerHTML += "s";
                return (true);
            } else { return (false); }
            // EKA LIIKE 1 TAI 2 Y-ETEENPÄIN
        } else if ((rtoy(a) == 7) && ((a - l) == -16)) {
            return (true);
        } else { return (false); }
    }


    // SOTILAS VALKOINEN
    if (((document.getElementById("ruutu" + a).firstChild).classList).contains("sotilasv")) {
        //console.log("viimesen liikkeen koordinaatit: " + xy(viimenenliike.charAt(0),viimenenliike.charAt(1)) + " " + xy(viimenenliike.charAt(3),viimenenliike.charAt(4)));
        if (((a - l) == 8)) {
            if (document.getElementById("ruutu" + (l)).hasChildNodes()) {
                return (false);
            } else if (rtoy(l) == 8) {
                ylennysv(a, l, tyyppi);
            } else { return (true); }
        } else if ((((a - l) == 7) || ((a - l) == 9)) && document.getElementById("ruutu" + (l)).hasChildNodes() && rtoy(l) == 8 && (rtoy(a) != rtoy(l)) ) {
            ylennysv(a, l, tyyppi);
            return (true);
        } else if ((((a - l) == 7) || ((a - l) == 9)) && document.getElementById("ruutu" + (l)).hasChildNodes() && (rtoy(a) != rtoy(l)) ) {
            return (true);
        } else if ((((a - l) == 7) || ((a - l) == 9)) && (document.getElementById("ruutu" + (l + 8)).hasChildNodes()) && xy(viimenenliike.charAt(0), viimenenliike.charAt(1)) == l - 8 && xy(viimenenliike.charAt(3), viimenenliike.charAt(4)) == l + 8 && (rtoy(a) != rtoy(l)) ) {
            if (((document.getElementById("ruutu" + (l + 8)).firstChild).classList).contains("sotilasm") && xy(viimenenliike.charAt(0), viimenenliike.charAt(1)) == l - 8) {
                document.getElementById("ruutu" + (l + 8)).innerHTML = "";
                document.getElementById("liikkeet").innerHTML += "s";
                return (true);
            } else { return (false); }
        } else if ((rtoy(a) == 2) && ((a - l) == 16)) {
            return (true);
        } else { return (false); }
    }



    return (true);
}


// YLENNYS
// VALKOINEN
function ylennysv(a, l, tyyppi) {
    (document.getElementById("ruutu" + a).firstChild).classList.remove("sotilasv");
    (document.getElementById("ruutu" + a).firstChild).classList.add("kuningatarv");
    document.getElementById("ruutu" + a).firstChild.src = "kuningatar_v.png";
}

// YLENNYS
// MUSTA
function ylennysm(a, l, tyyppi) {
    (document.getElementById("ruutu" + a).firstChild).classList.remove("sotilasm");
    (document.getElementById("ruutu" + a).firstChild).classList.add("kuningatarm");
    document.getElementById("ruutu" + a).firstChild.src = "kuningatar_m.png";
}

/*
// XY RAJAT
function xyrajat(r, k) {
    //console.log((xy((rtox(r)), (rtoy(r)))) + " " + (xy((rtox(k)), (rtoy(k)))) + " sSSSSSSSSSSSS");
    //console.log(((rtox(r) < rtox(k)) && (rtox(k)) < 9));
    //console.log(((rtox(r) > rtox(k)) && (rtox(k)) > 0));
    //console.log(((rtoy(r) > rtoy(k)) && (rtoy(k)) > 9));
    //console.log(((rtoy(r) > rtoy(k)) && (rtoy(k)) > 0));
    if ((xy((rtox(r)), (rtoy(r))) > 0 && xy((rtox(r)), (rtoy(r))) < 65) && ((rtox(r) + rtox(k)) < 8) && ((rtox(r) - rtox(k)) > 0) && ((rtoy(r) + rtoy(k)) < 8) && ((rtoy(r) - rtoy(k)) > 0)) {
        return (true);
    } else { return (false); }
}
*/

// UHKARUUDUT
function uhat() {
    // MUSTAN UHKAAMAT RUUDUT
    for (i = 1; i <= 8; i++) {
        for (j = 1; j <= 8; j++) {
            //console.log(xy(j, i) + " Tarkistettava ruutu");
            // SOTILAS MUSTA UHAT
            if (document.getElementById("ruutu" + xy(j, i)).hasChildNodes()) {
                if (((document.getElementById("ruutu" + xy(j, i)).firstChild).classList).contains("sotilasm")) {
                    //console.log("ruutu JAA JAA " + xy(j - 1, i - 1));
                    //console.log("ruutu JAA JAA " + xy(j + 1, i - 1));
                    //console.log("i = " + i + " j on = " + j);
                    if (i - 1 > 0 && j - 1 > 0 && !(document.getElementById("ruutu" + xy(j - 1, i - 1)).hasChildNodes())) {
                        uhkaruudutm[xy(j - 1, i - 1)] = 1;
                    }
                    if (i - 1 > 0 && j + 1 < 9 && !(document.getElementById("ruutu" + xy(j + 1, i - 1)).hasChildNodes())) {
                        uhkaruudutm[xy(j + 1, i - 1)] = 1;
                    }
                }
            }


            // TORNI MUSTA UHAT
            /*if (document.getElementById("ruutu" + xy(j, i)).hasChildNodes()) {
                if (((document.getElementById("ruutu" + xy(j, i)).firstChild).classList).contains("tornim")) {
                    // x - n
                    for (xn = j-1; xn <= 0 ; xn--) {
                        if (i - 1 > 0 && xn - 1 > 0 && !(document.getElementById("ruutu" + xy(xn, i)).hasChildNodes())) {
                            uhkaruudutm[xy(xn, i)] = 1;
                        }
                    }
                }
            }*/

        }
    }
}

/*
// UHKAFUNKTIO
function onkouhattu(a, l) {
    if ((document.getElementById("ruutu" + a).firstChild).classList.includes('kuningasm')) {
        console.log((document.getElementById("ruutu" + l) + " tyyppi"));

    }
}
*/

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
    viimenenliike = lruutu + aakkoset[rtox(ruutu)] + "" + rtoy(ruutu) + "; ";
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