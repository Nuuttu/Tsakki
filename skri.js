function alustus(){
    var lauta = document.getElementById("alusta");
    var ruudut = "";
    var aakkoset = ["A","B","C","D","E","F","G","H"];

    ruudut += "<table id='lauta'>";
    for (i=8; i>0; i--){
        ruudut += "<tr><th class='koordinaatti'>"+i+"</th>";
        
        for (j=1; j<9; j++){
            ruudut += "<td"
            if(j%2 == 0 && i%2 != 0 || j%2 != 0 && i%2 == 0){
                ruudut+= " class='musta'>";
            }else{
                ruudut +=" class='valkoinen'>";
            }
            ruudut += aakkoset[j-1] + ""+ i +"</td>";
        }
        ruudut += "</tr>";
    }
    ruudut += "<tr><th></th>"
        for (k=1; k<9; k++){
            ruudut += "<th class='koordinaatti'>"+aakkoset[k-1]+"</th>";
        }
        ruudut += "</tr>";
    ruudut += "</table>";
    lauta.innerHTML = ruudut;
   console.log(ruudut);
}