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

    for (i = 8; i>0; i--) {
        ruudut2 += "<div class='rivi'>";
        for (j = 1; j < 9; j++) {
            ruudut2 += "<div class='laatikko "
            if (j % 2 == 0 && i % 2 != 0 || j % 2 != 0 && i % 2 == 0) {
                ruudut2 += "musta'";
            } else {
                ruudut2 += "valkoinen'";
            }

            ruudut2 += " id='ruutu" + ruutuid + "' onclick='liike(" + ruutuid + ")'>" + aakkoset[j] + i + "</div>";
            ruutuid++;

        }
        ruudut2 += "</div>";
    }


    lauta2.innerHTML = ruudut2;
    console.log();
}

function xy(x, y) {
    console.log( 64 - (x + (y * 8 ) - 8));
    return (65 - ( x + (y * 8) - 8));
    
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

    //sotilaat
    for (i = 1; i <= 8; i++) {
        document.getElementById("ruutu" + xy(i, 7)).innerHTML = "<img src='sotilas_musta.png'></img>";
        document.getElementById("ruutu" + xy(i, 2)).innerHTML = "<img src='sotilas_valkoinen.png'></img>";
    }



}

function liike(ruutu) {
    var liikkeet = document.getElementById("liikkeet");
    liikkeet.innerHTML += aakkoset[r_to_x(ruutu)] + "" + r_to_y(ruutu) + "; ";
    console.log(ruutu + " " + r_to_x(ruutu) + " " + r_to_y(ruutu));
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

