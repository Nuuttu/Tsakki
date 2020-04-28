var aakkoset = ["A","B","C","D","E","F","G","H"];
var xy = [];
for(i=0; i<8; i++) {
    xy[i] = [i+1];
    for( j=0; j<8; j++){
        xy[i][j] = [j+1];
    }
}

function alustus2(){
    var lauta2 = document.getElementById("alustansisys");
    var ruudut2 ="";
    var ruutuid = 1;
    
    for (i=1; i<9; i++){
        ruudut2 += "<div class='rivi'>";
        for (j=1; j<9; j++){
            ruudut2 += "<div class='laatikko "
            if(j%2 == 0 && i%2 != 0 || j%2 != 0 && i%2 == 0){
                ruudut2 += "musta'";
            }else{
                ruudut2 +="valkoinen'";
            }
            
            ruudut2 += " id='ruutu"+ruutuid+"' onclick='liike("+ruutuid+")'>"+ruutuid+"</div>";
            ruutuid++;

        }
        ruudut2 += "</div>";
    }
    
    
    lauta2.innerHTML = ruudut2;
    console.log(ruudut2);
    
} 

function liike(ruutu) {
    var liikkeet = document.getElementById("liikkeet");
    liikkeet.innerHTML += " " +ruutu;
}


function alustus(){
    var lauta = document.getElementById("alusta");
    var ruudut = "";
   

    ruudut += "<table id='lauta'>";
    for (i=8; i>0; i--){
        ruudut += "<tr><th class='koordinaatti'>"+i+"</th>";
        
        for (j=1; j<9; j++){
            ruudut += "<td"
            if(j%2 == 0 && i%2 != 0 || j%2 != 0 && i%2 == 0){
                ruudut+= " class='valkoinen'>";
            }else{
                ruudut +=" class='musta'>";
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
  
}

