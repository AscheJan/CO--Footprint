// Iteriert durch das Array ["Country", "Company", "Emission"] und für jeden Typ...
["Country", "Company", "Emission"].forEach((type) => {
  // ... fügt es einen Click-Event-Listener zu dem entsprechenden Sortierbutton hinzu...
  document
    .getElementById(`sort${type}`)
    .addEventListener("click", () => handleSort(type.toLowerCase()));
});

// Iteriert durch das Array ["filterCountry", "filterCompany", "filterEmission"] und für jeden Typ...
["filterCountry", "filterCompany", "filterEmission"].forEach((type) => {
  // ... fügt es einen Input-Event-Listener hinzu, der handleFilter aufruft, wenn sich der Eingabewert ändert.
  document.getElementById(type).addEventListener("input", handleFilter);
});

// Fügt einen Click-Event-Listener zum Zurücksetzen-Button hinzu, der resetFilters aufruft, wenn geklickt wird.
document.getElementById("resetButton").addEventListener("click", resetFilters);

// Definiert ein Daten-Array, das Objekte mit den Attributen country, company und emission enthält.
const data = [
  //Datenobjekte
  { country: "Deutschland", company: "Unternehmen A", emission: 100 },
  { country: "USA", company: "Unternehmen B", emission: 150 },
  { country: "Kanada", company: "Unternehmen C", emission: 120 },
  { country: "Indien", company: "Unternehmen D", emission: 180 },
  { country: "Brasilien", company: "Unternehmen E", emission: 130 },
  { country: "Australien", company: "Unternehmen F", emission: 170 },
  { country: "Südafrika", company: "Unternehmen G", emission: 160 },
  { country: "Großbritannien", company: "Unternehmen H", emission: 110 },
  { country: "Frankreich", company: "Unternehmen I", emission: 140 },
  { country: "Italien", company: "Unternehmen J", emission: 150 },
  { country: "Russland", company: "Unternehmen K", emission: 180 },
  { country: "China", company: "Unternehmen L", emission: 200 },
  { country: "Japan", company: "Unternehmen M", emission: 90 },
  { country: "Südkorea", company: "Unternehmen N", emission: 150 },
  { country: "Singapur", company: "Unternehmen O", emission: 130 },
  { country: "Neuseeland", company: "Unternehmen P", emission: 80 },
  { country: "Mexiko", company: "Unternehmen Q", emission: 100 },
  { country: "Argentinien", company: "Unternehmen R", emission: 140 },
  { country: "Ägypten", company: "Unternehmen S", emission: 160 },
  { country: "Indonesien", company: "Unternehmen T", emission: 90 },
  { country: "Schweden", company: "Unternehmen U", emission: 120 },
  { country: "Norwegen", company: "Unternehmen V", emission: 130 },
  { country: "Dänemark", company: "Unternehmen W", emission: 110 },
  { country: "Finnland", company: "Unternehmen X", emission: 100 },
  { country: "Irland", company: "Unternehmen Y", emission: 150 },
  { country: "Portugal", company: "Unternehmen Z", emission: 130 },
];

let filteredData = [...data];
// Funktion zum Zurücksetzen der Filter
function resetFilters() {
  // Setzt den Wert des Länderfilters zurück
  document.getElementById("filterCountry").value = "";
  // Setzt den Wert des Unternehmensfilters zurück
  document.getElementById("filterCompany").value = "";
  // Setzt den Wert des Emissionsfilters zurück
  document.getElementById("filterEmission").value = "";

  // Setzt filteredData zurück auf die Originaldaten
  filteredData = [...data];
  // Zeichnet die Tabelle mit den Originaldaten neu
  renderTable(data);
}

// Funktion zur Handhabung der Filterung
function handleFilter() {
  // Holt den Wert des Länderfilters und konvertiert ihn in Kleinbuchstaben,
  // um eine nicht case-sensitive Suche zu ermöglichen
  const filterCountry = document
    .getElementById("filterCountry")
    .value.toLowerCase();
  // Holt den Wert des Unternehmensfilters und konvertiert ihn in Kleinbuchstaben,
  // um eine nicht case-sensitive Suche zu ermöglichen
  const filterCompany = document
    .getElementById("filterCompany")
    .value.toLowerCase();
  // Holt den Wert des Emissionsfilters ohne Konvertierung,
  // da wir eine numerische Filterung vornehmen
  const filterEmission = document.getElementById("filterEmission").value;

  // Setzt filteredData gleich einem gefilterten Datensatz, basierend auf den eingestellten Filtern
  filteredData = data.filter(
    (item) =>
      // Überprüft, ob der Ländername den Filterstring enthält
      item.country.toLowerCase().includes(filterCountry) &&
      // Überprüft, ob der Unternehmensname den Filterstring enthält
      item.company.toLowerCase().includes(filterCompany) &&
      // Überprüft, ob die Emission kleiner oder gleich dem Filterwert ist
      // Wenn kein Emissionsfilter gesetzt ist, wird dieser Bedingungsteil ignoriert
      (!filterEmission || item.emission <= Number(filterEmission)) // Konvertiert filterEmission in eine Zahl
  );

  // Zeichnet die Tabelle mit den gefilterten Daten neu
  renderTable(filteredData);
}

// Definiert eine Variable, um den Sortierstatus (aufsteigend/absteigend) zu speichern.
let isAscending = true;

// Definiert eine Funktion zum Sortieren des 'filteredData' Arrays basierend auf einem bestimmten Schlüssel.
function handleSort(key) {
  // Sortiert 'filteredData'...
  filteredData.sort((a, b) => {
    // ...alphabetisch, wenn der Wert eine Zeichenkette ist.
    if (typeof a[key] === "string") {
      return isAscending
        ? // Vergleicht zwei Zeichenketten und sortiert sie lexikographisch in auf- oder absteigender Reihenfolge basierend auf 'isAscending'.
          a[key].localeCompare(b[key])
        : b[key].localeCompare(a[key]);
    }
    // ...numerisch, wenn der Wert eine Zahl ist.
    return isAscending
      ? a[key] - b[key] // Für aufsteigende Reihenfolge.
      : b[key] - a[key]; // Für absteigende Reihenfolge.
  });
  // Kehrt den Wert von 'isAscending' um, um bei der nächsten Sortierung die Reihenfolge zu ändern.
  isAscending = !isAscending;
  // Rendert die Tabelle nach dem Sortieren neu.
  renderTable(filteredData);
}

// Definiert eine Funktion zum Umwandeln von potenziell unsicherem Text in sicher, darstellbaren HTML.
function escapeHtml(str) {
  // Erstellt ein 'div'-Element.
  const div = document.createElement("div");
  // Fügt dem 'div' eine Textknoten mit dem zu sichernden Text hinzu.
  div.appendChild(document.createTextNode(str));
  // Gibt die sicheren HTML-Inhalte zurück.
  return div.innerHTML;
}

// Definiert eine Funktion zum Rendern der Daten als Tabelle im HTML.
function renderTable(data) {
  // Ruft das Tabellenkörper-Element aus dem HTML ab.
  const tableBody = document.getElementById("dataBody");
  // Setzt den Inhalt des Tabellenkörpers zurück.
  tableBody.innerHTML = "";
  // Iteriert durch jedes Datenobjekt...
  data.forEach((item) => {
    // ... und fügt eine neue Zeile zum Tabellenkörper hinzu. Verwendet 'escapeHtml' zur Sicherung des Textes.
    tableBody.innerHTML += `
            <tr>
                <td>${escapeHtml(item.country)}</td>
                <td>${escapeHtml(item.company)}</td>
                <td>${escapeHtml(item.emission.toString())}</td>
            </tr>
        `;
  });
}

// Rendert die Tabelle mit den Originaldaten beim Laden der Webseite.
renderTable(data);


// Download Filter Button
// Funktion, die ein Datenobjekt in eine CSV-Zeile konvertiert
function convertToCSVRow(item) {
  return `"${item.country}","${item.company}",${item.emission}`;
}

// Funktion, die den Download der CSV-Datei handhabt
function downloadCSV() {
  // Erstellt den CSV-String durch Zusammenführen der Datenzeilen,
  // getrennt durch Zeilenumbrüche
  const csvContent =
    "Land,Unternehmen,Emission\n" +
    filteredData.map(convertToCSVRow).join("\n");

  // Erstellt einen Blob aus dem CSV-String
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  
  // Erstellt einen Link-Element und setzt es auf den Blob und gibt ihm einen Dateinamen
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", "emissionsdaten.csv");
  
  // Löst den Download aus und räumt auf
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Fügt einen Click-Event-Listener zum Download-Button hinzu, der downloadCSV aufruft, wenn geklickt wird.
document.getElementById("downloadButton").addEventListener("click", downloadCSV);
