function alustus(){
    var lauta = document.getElementById("alusta");
    var ruudut = "";

    ruudut += "<table id='lauta'>";
    for (i=1; i<9; i++){
        ruudut += "<tr>";
        for (j=1; j<9; j++){
            ruudut += "<td>"+j+"</td>";
        }
        ruudut += "</tr>";
    }
    ruudut += "</table>";
    lauta.innerHTML = ruudut;
    console.log(ruudut);
}