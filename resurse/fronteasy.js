function hard()
{
    let butonstart = document.getElementById("start");
    let textjoc = document.getElementById("tipdejoc");
    let margini = document.getElementById("game");
        if (window.getComputedStyle(butonstart).display != "none")
            {
                if(textjoc.innerHTML=="Hard Mode")
                {
                    margini.style.borderColor="red";
                    EsteHardMode=true;
                    textjoc.innerHTML="Easy Mode";
                }
                else
                {
                    margini.style.borderColor="white";
                    EsteHardMode=false;
                    textjoc.innerHTML="Hard Mode";
                }
                    
            }
        else alert("Nu poti schimba dificultatea in timpul jocului.");
}
function apari() {
    document.getElementById("start").style.display = "block";
}

function dispari() {
    document.getElementById("start").style.display = "none";
    pierdut = false;
    CPS = CPS + 6;
    requestAnimationFrame(main);
}
function informatii()
{
    alert("Sarpele se poate controla cu ajutorul tastelor WASD. Pentru a putea merge mai repede, tine apasata tasta.\n\nIn modul de joc 'Easy Mode', poti trece prin pereti.\nIn modul de joc `Hard Mode`, daca vei intra in coliziune cu un perete, jocul se va incheia.");
}

var elem = document.documentElement;
var esteFullScreen = false;

function deschideFullscreen() 
{
    if (elem.requestFullscreen) 
        elem.requestFullscreen();
    else if (elem.webkitRequestFullscreen)
        elem.webkitRequestFullscreen();
    else if (elem.msRequestFullscreen)
        elem.msRequestFullscreen();
}

function inchideFullscreen() 
{
    if (document.exitFullscreen) 
        document.exitFullscreen();
    else if (document.webkitExitFullscreen)
        document.webkitExitFullscreen();
    else if (document.msExitFullscreen)
        document.msExitFullscreen();
}

function FullScreen() 
{
    if (esteFullScreen == true) 
    {
      	esteFullScreen = false;
        inchideFullscreen();
    } 
  	else 
    {
        esteFullScreen = true;
        deschideFullscreen();
    }
}