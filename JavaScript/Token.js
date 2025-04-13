setTimeout(() => {
  zadnjiTekst.style.borderRight = "none";
  zaiskri.style.display = "contents";
}, 5000);

if (sessionStorage.getItem("token")) {
  //maknut ce token iz sessionStorage-a
  function OdjaviSe() {
    sessionStorage.removeItem("token");
    window.location.href = "/HTML/home_page.html";
  }
//PRIKAZUJE NASTAVNI PLAN
  const a1 = document.querySelector("#NastavniPlan");
  a1.style.display = "block";

  const a2 = document.querySelector("#Prijavise");

  a2.innerHTML = `
            <a onclick="OdjaviSe()" href="/HTML/Index.html">
                <i class="fa-solid fa-right-to-bracket" style="color: lightblue"></i> Odjavi se
            </a>`;
} else {
  //mice nastavni plan ako nije korisnik ulogiran
  const a1 = document.querySelector("#NastavniPlan");
  if (a1) {
    a1.style.display = "none";
  }
}
