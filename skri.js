function alustus(){
    var lauta = document.getElementById("alusta");
    var ruudut = "";

    ruudut += "<table id='lauta'>";
    for (i=1; i<9; i++){
        ruudut += "<tr>";
        
        for (j=1; j<9; j++){
            ruudut += "<td"
            if(j%2 == 0 && i%2 != 0 || j%2 != 0 && i%2 == 0){
                ruudut+= " class='musta'>";
            }else{
                ruudut +=" class='valkoinen'>";
            }
            ruudut += j +"</td>";
        }
        ruudut += "</tr>";
    }
    ruudut += "</table>";
    lauta.innerHTML = ruudut;
   console.log(ruudut);
}