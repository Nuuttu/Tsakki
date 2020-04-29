var aakkoset = ["0", "A", "B", "C", "D", "E", "F", "G", "H"];
var ruutuxy = [];
for (i = 0; i < 8; i++) {
    ruutuxy[i] = [i + 1];
    for (j = 0; j < 8; j++) {
        ruutuxy[i][j] = [j + 1];
    }
}

function alustus() {
    var lauta2 = document.getElementById("alustansisys");
    var ruudut2 = "";
    var ruutuid = 1;

    for (i = 8; i > 0; i--) {
        ruudut2 += "<div class='rivi'>";
        for (j = 1; j < 9; j++) {
            ruudut2 += "<div class='laatikko "
            if (j % 2 == 0 && i % 2 != 0 || j % 2 != 0 && i % 2 == 0) 
            {
                ruudut2 += "musta'";
            } else {
                ruudut2 += "valkoinen'";
            }

            ruudut2 += " id='ruutu" + ruutuid + "' onclick='liike(" + ruutuid + ")'></div>";
            ruutuid++;

        }
        ruudut2 += "</div>";
    }


    lauta2.innerHTML = ruudut2;
    
}

function xy(x, y) {
    if (typeof x == 'number') {
        return (64 + (x - (y * 8) ));
    }
    else {
        x = x.toUpperCase();
        return(64 + (aakkoset.indexOf(x) - (y * 8)));
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

function nappulaalustus() {

    //tornit
    document.getElementById("ruutu" + xy("a", 8)).innerHTML = "<img src='torni_m.png'></img>";
    document.getElementById("ruutu" + xy("h", 8)).innerHTML = "<img src='torni_m.png'></img>";
    document.getElementById("ruutu" + xy("a", 1)).innerHTML = "<img src='torni_v.png'></img>";
    document.getElementById("ruutu" + xy("h", 1)).innerHTML = "<img src='torni_v.png'></img>";

    //hepat
    document.getElementById("ruutu" + xy("b",8)).innerHTML = "<img src='hevonen_m.png'></img>";
    document.getElementById("ruutu" + xy("g",8)).innerHTML = "<img src='hevonen_m.png'></img>";
    document.getElementById("ruutu" + xy("b",1)).innerHTML = "<img src='hevonen_v.png'></img>";
    document.getElementById("ruutu" + xy("g",1)).innerHTML = "<img src='hevonen_v.png'></img>";

    //lähetit
    document.getElementById("ruutu" + xy("c",8)).innerHTML = "<img src='lahetti_m.png'></img>";
    document.getElementById("ruutu" + xy("f",8)).innerHTML = "<img src='lahetti_m.png'></img>";
    document.getElementById("ruutu" + xy("c",1)).innerHTML = "<img src='lahetti_v.png'></img>";
    document.getElementById("ruutu" + xy("f",1)).innerHTML = "<img src='lahetti_v.png'></img>";

    //kuningas
    document.getElementById("ruutu" + xy("d", 8)).innerHTML = "<img src='kuningas_m.png'></img>";
    document.getElementById("ruutu" + xy(4, 1)).innerHTML = "<img src='kuningas_v.png'></img>";

    //kuningatar
    document.getElementById("ruutu" + xy("e",8)).innerHTML = "<img src='kuningatar_m.png'></img>";
    document.getElementById("ruutu" + xy("e",1)).innerHTML = "<img src='kuningatar_v.png'></img>";

    //sotilaat
    for (i = 1; i <= 8; i++) {
        document.getElementById("ruutu" + xy(i, 7)).innerHTML = "<img src='sotilas_m.png'></img>";
        document.getElementById("ruutu" + xy(i, 2)).innerHTML = "<img src='sotilas_v.png'></img>";
    }


}

function liike(ruutu) {
    var liikkeet = document.getElementById("liikkeet");
    liikkeet.innerHTML += aakkoset[r_to_x(ruutu)] + "" + r_to_y(ruutu) + "; ";
    console.log(ruutu + " " + r_to_x(ruutu) + " " + r_to_y(ruutu) + " " + xy(r_to_x(ruutu),r_to_y(ruutu)));
}


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

