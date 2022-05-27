var TablaDeJoc = document.getElementById('game');
var context = TablaDeJoc.getContext('2d');

var casuta = 16; //fiecare casuta are lungimea de 16 pixeli
var cnt = 0; //explicat mai jos
var pierdut = false;
var CPS = 0;
var EsteHardMode = false;

var sarpe = {
    x: 80, //pozitia de start a sarpelui
    y: 80,

    ox: casuta,
    oy: 0,

    pozitii: [], //retine toate spatiile ocupate de sarpe
    maxpozitii: 4 // lungimea sarpelui, initial 4
};

//pozitia pe care se afla marul
var mar = {
    x: getRandomInt(0, 25) * casuta,
    y: getRandomInt(0, 25) * casuta
};

//genereaza automat un numar int
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function PierdeJoc() {
    if (sarpe.maxpozitii === 5)
        alert("Ai murit. Ai acumulat " + ReturneazaScorFinal(sarpe.maxpozitii) + " punct.");
    else if (sarpe.maxpozitii >= 625)
        alert("Felicitari, ai castigat!");
    else
        alert("Ai murit. Ai acumulat " + ReturneazaScorFinal(sarpe.maxpozitii) + " puncte.");
    sarpe.x = 80;
    sarpe.y = 80;
    sarpe.pozitii = [];
    sarpe.maxpozitii = 4;
    sarpe.ox = casuta;
    sarpe.oy = 0;
    mar.x = getRandomInt(0, 25) * casuta;
    mar.y = getRandomInt(0, 25) * casuta;
    apari();
    pierdut = true;
    document.getElementById("textscor").innerHTML = AfiseazaScor(sarpe.maxpozitii);
}
//butonul de start 


function ReturneazaScorFinal(scor) {
    return scor - 4;
}

function AfiseazaScor(scor) {
    return ("Scor: " + (scor - 4)); //punctele totale - 4 (lungimea initiala a sarpelui)

}


function main() {
    requestAnimationFrame(main); // apeleaza functia main de 60 de ori in fiecare secunda.

    if (++cnt < CPS) // Cadrele pe secunda (60/6=10 C/s ) la care merge jocul (cate casute parcurge sarpele pe secunda)
    {
        return;
    }
    if (pierdut == true) {
        return;
    }
    cnt = 0; //numarul de cadre
    context.clearRect(0, 0, TablaDeJoc.width, TablaDeJoc.height); //curata canvasul

    //misca sarpele
    sarpe.x += sarpe.ox;
    sarpe.y += sarpe.oy;

    //In cazul in care sarpele trece prin peretele orizontal, se va duce in partea opusa.In cazul hard mode, pierzi jocul
    if (sarpe.x < 0) {
        if (EsteHardMode === false)
            sarpe.x = TablaDeJoc.width - casuta;
        else
            PierdeJoc();
    } else if (sarpe.x >= TablaDeJoc.width) {
        if (EsteHardMode === false)
            sarpe.x = 0;
        else
            PierdeJoc();
    }

    //la fel ca mai sus, doar ca pe verticala
    if (sarpe.y < 0) {
        if (EsteHardMode === false)
            sarpe.y = TablaDeJoc.height - casuta;
        else
            PierdeJoc();
    } else if (sarpe.y >= TablaDeJoc.height) {
        if (EsteHardMode === false)
            sarpe.y = 0;
        else
            PierdeJoc();
    }

    sarpe.pozitii.unshift({
        x: sarpe.x,
        y: sarpe.y
    }); //Retine pe unde a mers sarpele. Adauga pe prima element al vectorului pozitia capului sarpelui

    // sterge ultima pozitie
    if (sarpe.pozitii.length > sarpe.maxpozitii) {
        sarpe.pozitii.pop();
    }

    //aspectul marului
    context.fillStyle = 'red';
    context.beginPath();
    context.arc(mar.x + 8, mar.y + 8, 8, 0, 2 * Math.PI); //desenez un cerc pe pozitia mar.x + jumatate din latura unei casute cu diametru tot de jumatate de casuta
    context.fill();

    //codita marului
    context.fillStyle = 'green';
    context.fillRect(mar.x + 6, mar.y - 5, casuta - 12, casuta - 11);

    //initializez capul sarpelui
    context.fillStyle = 'lime';
    let schimbat = false;

    ///deseneaza sarpele
    sarpe.pozitii.forEach(function(cell, index) {
        if (schimbat === false) //daca e prima casuta (capul sarpelui, atunci modificam aspectul fata de restul corpului)
        {
            schimbat = true;

            context.fillStyle = 'lime';

            // cand sarpele mege spre dreapta
            if (sarpe.ox > 0) {
                //capul
                context.fillRect(cell.x, cell.y, casuta / 2, casuta);
                context.beginPath(); //incepe alt cerc
                context.arc(cell.x + 8, cell.y + 8, 8, 0, 2 * Math.PI);
                context.fill();
                //ochiul
                context.fillStyle = 'black';
                context.beginPath();
                context.arc(cell.x + 8, cell.y + 4, 2, 0, 2 * Math.PI);
                context.fill();
            } else if (sarpe.ox < 0) //stanga
            {
                //capul
                context.fillRect(cell.x + 8, cell.y, casuta / 2, casuta);
                context.beginPath();
                context.arc(cell.x + 8, cell.y + 8, 8, 0, Math.PI * 2);
                context.fill();
                //ochiul
                context.fillStyle = 'black';
                context.beginPath();
                context.arc(cell.x + 8, cell.y + 4, 2, 0, 2 * Math.PI);
                context.fill();
            } else if (sarpe.oy > 0) //jos
            {
                //capul
                context.fillRect(cell.x, cell.y, casuta, casuta / 2);
                context.beginPath();
                context.arc(cell.x + 8, cell.y + 8, 8, 0, Math.PI * 2);
                context.fill();
                //ochiul
                context.fillStyle = 'black';
                context.beginPath();
                context.arc(cell.x + 12, cell.y + 8, 2, 0, 2 * Math.PI);
                context.fill();
            } else //sus
            {
                //capul
                context.fillRect(cell.x, cell.y + 8, casuta, casuta / 2);
                context.beginPath();
                context.arc(cell.x + 8, cell.y + 8, 8, 0, Math.PI * 2);
                context.fill();
                //ochiul
                context.fillStyle = 'black';
                context.beginPath();
                context.arc(cell.x + 12, cell.y + 8, 2, 0, 2 * Math.PI);
                context.fill();
            }

        } else //restul corpului
        {
            context.fillStyle = 'cyan';
            context.fillRect(cell.x, cell.y, casuta, casuta);
        }
        // sarpele a luat marul, asadar sarpele va fi mai mare cu o casuta si marul va aparea in alta parte
        if (cell.x === mar.x && cell.y === mar.y) {
            sarpe.maxpozitii++;
            console.log(sarpe.maxpozitii); //afiseaza in consola lungimea sarpelui      
            mar.x = getRandomInt(0, 25) * casuta;
            mar.y = getRandomInt(0, 25) * casuta;
            document.getElementById("textscor").innerHTML = AfiseazaScor(sarpe.maxpozitii);
        }
        // verifica daca se termina jocul
        for (var i = index + 1; i < sarpe.pozitii.length; i++) {

            // daca sarpele a intrat in el insusi, incheie jocul
            if (cell.x === sarpe.pozitii[i].x && cell.y === sarpe.pozitii[i].y) {
                PierdeJoc();
            }
        }
    });
}

//functie pentru a controla sarpele (Se controleaza de pe sageti sau ASDW)
function controale(e) {
    //definim tastele cu care putem controla sarpele
    const Stanga = 37;
    const Dreapta = 39;
    const Sus = 38;
    const Jos = 40;
    const A = 65;
    const D = 68;
    const S = 83;
    const W = 87;

    //definim si verificam directiile
    const TastaApasata = e.which;
    const MergeInSusOriJos = sarpe.ox === 0;
    const MergeStangaOriDreapta = sarpe.oy === 0;

    while (cnt < CPS) //Dacă se ține apăsată tasta de mers, sarpele va merge mai repede
    {
        cnt++;
    }
    // sageata stanga sau tasta A
    if ((TastaApasata === Stanga || TastaApasata === A) && MergeInSusOriJos) {
        sarpe.ox = -casuta;
        sarpe.oy = 0;
    }
    // sageata sus sau tasta W
    else if ((TastaApasata === Sus || TastaApasata === W) && MergeStangaOriDreapta) {
        sarpe.oy = -casuta;
        sarpe.ox = 0;
    }
    // sageata dreapta sau D
    else if ((TastaApasata === Dreapta || TastaApasata === D) && MergeInSusOriJos) {
        sarpe.ox = casuta;
        sarpe.oy = 0;
    }
    // sageata jos sau S
    else if ((TastaApasata === Jos || TastaApasata === S) && MergeStangaOriDreapta) {
        sarpe.oy = casuta;
        sarpe.ox = 0;
    }
}

function forteazascor() //iti va da scorul maxim posibil (25*25). Poate fi activat doar din consola
{
    if(EsteHardMode===false)
        {
           sarpe.maxpozitii = 625;
            console.log("Teoretic ai castigat. Felicitari!"); 
        }
    else console.log("Nu poti trisa in Hard Mode!");
}

document.addEventListener('keydown', controale);