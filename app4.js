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
        document.getElementById("tableheader").innerHTML += table;
        }
        
    }}



document.getElementById("ajaxbutton").addEventListener("click", searchData);


    function searchData() {
    var xmlhttp2 = new XMLHttpRequest();

// send request
    xmlhttp2.open("GET","https://www.finnkino.fi/xml/Schedule",true);
    xmlhttp2.send();

    xmlhttp2.onreadystatechange=function() {
        if (xmlhttp2.readyState==4 && xmlhttp2.status==200){
// save the response data in a variable
        var xmlDoc = xmlhttp2.responseXML;  
        
// clear table before getting new one
        document.getElementById("table").innerHTML = "";
        document.getElementById("showData").innerHTML ="";
// use getElementsByTagName to find titles in data 
    let input = document.getElementById("search").value;
    let allTitles = xmlDoc.getElementsByTagName("Show");
    let table = "";
    var inputString = String(input);
    var lowInputString = inputString.toLowerCase();

    for (let i=0;i<allTitles.length;i++){
       
        let titleString = xmlDoc.getElementsByTagName("Title")[i].childNodes[0].nodeValue;
        var lowTitleString = titleString.toLowerCase();

        if (lowTitleString.includes(lowInputString)){  
            image = "<img src='"+ xmlDoc.getElementsByTagName("EventSmallImagePortrait")[i].childNodes[0].nodeValue+"'>";

            let tableheader="<tr><th>" + titleString +"</th></tr>";
            tableheader += "<tr><td>"+image + "</td>"
            tableheader += "<td>"
            tableheader += "Ikäraja: "
            tableheader += allTitles[i].getElementsByTagName("Rating")[0].childNodes[0].nodeValue;
            tableheader += "<br>"
            tableheader += "Genre: " +
            allTitles[i].getElementsByTagName("Genres")[0].childNodes[0].nodeValue +
                "<br>Kesto: " +
            allTitles[i].getElementsByTagName("LengthInMinutes")[0].childNodes[0].nodeValue +
                " min"
            tableheader += "</td></tr>"
            
            table = "<td>" + allTitles[i].getElementsByTagName("TheatreAndAuditorium")[0].childNodes[0].nodeValue  + "<br>"
            
            var timestring = allTitles[i].getElementsByTagName("dttmShowStart")[0].childNodes[0].nodeValue;
            var bits = timestring.split("T");
            var bits2 = bits[1].split(":")
            var time = bits2[0]+":"+ bits2[1];

            table += "Alkaa klo: " +time;
            table += "<br><br>"

            document.getElementById("tableheader").innerHTML = tableheader;
            document.getElementById("table").innerHTML += table;
        }
          
      
            
        }
    }
}}
