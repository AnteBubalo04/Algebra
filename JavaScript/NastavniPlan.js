// učitava sve i grupira za lakse racunanje,

$(document).ready(() => {
  let ects = [];
  let sati = [];
  let predavanja = [];
  let vjezbe = [];
  let ukupno = [ects, sati, predavanja, vjezbe];



// pomocu ucitajKolegije() dohvaća popis kolegija i sprema ih
  let kolegijiData = [];
  ucitajKolegije().then((data) => {
    kolegijiData = data;
  });
//autocomplete ON - HTML
  $("#odabirKolegija").autocomplete({
    // Filtrira kolegije na temelju unesenog
    source: (request, response) => {
      const filteredData = kolegijiData.filter((item) =>
        item.kolegij.toLowerCase().startsWith(request.term.toLowerCase())
      );
      response(filteredData.map((item) => item.kolegij));
    },
    // Kad korisnik odabere kolegij,
    //dodaje se redak sa informacijama o kolegiju.
    select: (e, ui) => {
      const ucitaniKolegij = kolegijiData.find(
        (item) => item.kolegij === ui.item.label
      );
      // dodaje se u tablicu
      if (ucitaniKolegij) {
        $("tbody").append(`<tr>
                    <td>${ucitaniKolegij.kolegij}</td>
                    <td>${ucitaniKolegij.ects}</td>
                    <td>${ucitaniKolegij.sati}</td>
                    <td>${ucitaniKolegij.predavanja}</td>
                    <td>${ucitaniKolegij.vjezbe}</td>
                    <td>${ucitaniKolegij.tip}</td>
                    <td><button type='button' class='btn btn-danger'>Delete</button></td>
                </tr>`);
               
                
               
        UpdateUkupnoNakonSelect(ukupno, ucitaniKolegij);
        
        $("thead").show();
      //  Prazni footer i stavlja nove vrijednost iz ukupno
        $("tfoot").empty();
        $("tfoot").append(`<tr>
                    <td>Ukupno</td>
                    <td>${Sum(ects)}</td>
                    <td>${Sum(sati)}</td>
                    <td>${Sum(predavanja)}</td>
                    <td>${Sum(vjezbe)}</td>
                </tr>`);             
        $("#odabirKolegija").val("");
        //postavlja prazan string nakon odabira unesenog kolegija
        $("#odabirKolegija")="";
      }
    },
  });
//DELETE  -  SPLICE BRISE PODATKE 
  $("table").on("click", "button", function () {
    const tr = $(this).closest("tr");
    const index = $("tbody tr").index(tr);
    ukupno.forEach((value) => {
      value.splice(index, 1);
    });
    tr.remove();
  //SKRIVA TABLICU AKO NEMA KOLEGIJA
  //ELSE POSTAVLJA PODATKE IZ UKUPNO 
    if ($("tbody tr").length == 0) {
      $("thead").hide();
      $("tfoot").empty();
    } else {
      $("tfoot").empty();
      $("tfoot").append(`<tr>
                <td>Ukupno</td>
                <td>${Sum(ects)}</td>
                <td>${Sum(sati)}</td>
                <td>${Sum(predavanja)}</td>
                <td>${Sum(vjezbe)}</td>
            </tr>`);
    }
  });
});
//STRANICA VIDLJIVA TEK NAKON LOGINA,GET,Pretvara u JSON i nazad
const ucitajKolegije = async () => {
  try {
    const response = await fetch(
      "https://www.fulek.com/data/api/supit/curriculum-list/hr",
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
          "content-type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error loading kolegiji data:", error);
    return [];
  }
};

function UpdateUkupnoNakonSelect(ukupno, kolegij) {
  ukupno[0].push(kolegij.ects);
  ukupno[1].push(kolegij.sati);
  ukupno[2].push(kolegij.predavanja);
  ukupno[3].push(kolegij.vjezbe);
}

function Sum(arr) {
  return arr.reduce((acc, curr) => acc + curr, 0);
}
