var theatres = document.getElementsByTagName("li");

for(var i = 0;i<theatres.length;i++){
    theatres[i].addEventListener("click", getMovies);
}

function getMovies(){
    var xmlhttp2 = new XMLHttpRequest();
// save id of event target element in variable
    var id = this.id;
    var theatrename =this.innerHTML;
    console.log(id);
// add event target id variable to end of url and send request
    xmlhttp2.open("GET","https://www.finnkino.fi/xml/Schedule?area=" + id,true);
    xmlhttp2.send();

    xmlhttp2.onreadystatechange=function() {
        if (xmlhttp2.readyState==4 && xmlhttp2.status==200){
// save the response data in a variable
        var xmlDoc = xmlhttp2.responseXML;  
        alltitles = xmlDoc.getElementsByTagName("Show")
// clear table before getting new one
        document.getElementById("table").innerHTML = "";
// use getElementsByTagName to find titles in data 
document.getElementById("table").innerHTML = "";
document.getElementById("tableheader").innerHTML = "";
let table="<tr><th>Valittu teatteri:</th><th>"+theatrename+"</th></tr>";

for (let i = 0; i < alltitles.length; i++) { 
  table += "<tr onclick='displayData(" + i + ")'><td>";


  table += "<img src='"+ alltitles[i].getElementsByTagName("EventSmallImagePortrait")[0].childNodes[0].nodeValue+"'>";
  table += "</td><td>";
  table += alltitles[i].getElementsByTagName("Title")[0].childNodes[0].nodeValue;
  table += "<br>"
  //table += alltitles[i].getElementsByTagName("dttmShowStart")[0].childNodes[0].nodeValue;
  var timestring = alltitles[i].getElementsByTagName("dttmShowStart")[0].childNodes[0].nodeValue;
  var bits = timestring.split("T");
  var bits2 = bits[1].split(":")
  var time = bits2[0]+":"+ bits2[1];


  table += "Alkaa klo: " +time;
  
  table += "<br>"
  table += "Ikäraja: "
  table += alltitles[i].getElementsByTagName("Rating")[0].childNodes[0].nodeValue;
  table += "<br>"
  table += "Genre: " +
  alltitles[i].getElementsByTagName("Genres")[0].childNodes[0].nodeValue +
  "<br>Kesto: " +
  alltitles[i].getElementsByTagName("LengthInMinutes")[0].childNodes[0].nodeValue +
  " min<br>Paikka: " + 
  alltitles[i].getElementsByTagName("TheatreAuditorium")[0].childNodes[0].nodeValue;
  table += "</td></tr>";
}
        document.getElementById("table").innerHTML += table;
        }
        
    }}

    //function displayData(i) {
        //document.getElementById("showData").innerHTML =
        //"Genre: " +
        //alltitles[i].getElementsByTagName("Genres")[0].childNodes[0].nodeValue +
        //"<br>Kesto: " +
        //alltitles[i].getElementsByTagName("LengthInMinutes")[0].childNodes[0].nodeValue +
        //" min<br>Paikka: " + 
        //alltitles[i].getElementsByTagName("TheatreAuditorium")[0].childNodes[0].nodeValue;
      //}




document.getElementById("ajaxbutton").addEventListener("click", searchData);


    function searchData() {
    var xmlhttp2 = new XMLHttpRequest();
// save id of event target element in variable
    //var id = this.id;
    //var theatrename =this.innerHTML;
    //console.log(id);
// add event target id variable to end of url and send request
    xmlhttp2.open("GET","https://www.finnkino.fi/xml/Schedule",true);
    xmlhttp2.send();

    xmlhttp2.onreadystatechange=function() {
        if (xmlhttp2.readyState==4 && xmlhttp2.status==200){
// save the response data in a variable
        var xmlDoc = xmlhttp2.responseXML;  
        //allTitles = xmlDoc.getElementsByTagName("Show")
// clear table before getting new one
        document.getElementById("table").innerHTML = "";
        document.getElementById("showData").innerHTML ="";
// use getElementsByTagName to find titles in data 

    let input = document.getElementById("search").value;
    
    let allTitles = xmlDoc.getElementsByTagName("Show");
    
    let table = "";
    var inputString = String(input);
    var lowInputString = inputString.toLowerCase();
    
    //table="<tr><th>Valittu leffa:</th><th>"+titleString+"</th></tr>";
   console.log(inputString);
   console.log(xmlDoc);

    for (let i=0;i<allTitles.length;i++){
       
        let titleString = xmlDoc.getElementsByTagName("Title")[i].childNodes[0].nodeValue;
        var lowTitleString = titleString.toLowerCase();

        if (lowTitleString.includes(lowInputString)){  
            tableheader = "<hr><td>"+titleString+"</td></hr>";
            
            table = "<tr><td><img src='"+ xmlDoc.getElementsByTagName("EventSmallImagePortrait")[i].childNodes[0].nodeValue+"'>";
            table += "</td><td>"

            table += "<br>"
            table += "<td>" + allTitles[i].getElementsByTagName("TheatreAndAuditorium")[0].childNodes[0].nodeValue  + "<br>"
            
            //table += "<td>" + allTitles[i].getElementsByTagName("dttmShowStart")[0].childNodes[0].nodeValue + "</td></tr>";
        
            var timestring = allTitles[i].getElementsByTagName("dttmShowStart")[0].childNodes[0].nodeValue;
  var bits = timestring.split("T");
  var bits2 = bits[1].split(":")
  var time = bits2[0]+":"+ bits2[1];


  table += "Alkaa klo: " +time;
  
  table += "<br>"
  table += "Ikäraja: "
  table += allTitles[i].getElementsByTagName("Rating")[0].childNodes[0].nodeValue;
  table += "</td></tr>";
            
            console.log(titleString);
            console.log(xmlDoc.getElementsByTagName("TheatreAndAuditorium")[i].childNodes[0].nodeValue);
            console.log(table);
            document.getElementById("tableheader").innerHTML = tableheader;
            document.getElementById("table").innerHTML += table;
        }
          
      
            
        }
    }
}}
