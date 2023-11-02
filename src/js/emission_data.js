/*
Author: Jan Asche
Version: 1.6
Letzte Änderung: 02.11.2023 - Kommentare gesetzt für ein besseres Verständnis des codes
*/

/*------------------------------------------*/
// Iteriert durch das Array ["Land", "Unternehmen", "Ausgabe", "Jahr"] und für jeden Typ
["Country", "Company", "Emission", "Year"].forEach((type) => {
  document
    .getElementById(`sort${type}`)
    .addEventListener("click", () => handleSort(type.toLowerCase()));
});

// Iteriert durch das erweiterte Array und für jeden Typ
["filterCountry", "filterCompany", "filterEmission", "filterYear"].forEach(
  (type) => {
    // es fügt einen Input Event Listener hinzu, der handleFilter aufruft, wenn sich der Eingabewert ändert.
    document.getElementById(type).addEventListener("input", handleFilter);
  }
);

// Fügt der Reset-Schaltfläche einen Click-Event-Listener hinzu, der resetFilters aufruft, wenn er angeklickt wird.
document.getElementById("resetButton").addEventListener("click", resetFilters);

/*------------------------------------------*/
// Definiert ein Datenfeld, das Objekte mit den Attributen Land, Unternehmen und Emission enthält.
//Verbesserte Version könnte mit APIs, die MongoDB verwendet werden um dort die Daten aus zu laden.
const data = [
  //Datenobjekte
  // 2023
  {
    country: "Deutschland",
    company: "Unternehmen A",
    emission: 100,
    year: 2023,
  },
  { country: "USA", company: "Unternehmen B", emission: 150, year: 2023 },
  { country: "Kanada", company: "Unternehmen C", emission: 120, year: 2023 },
  { country: "Indien", company: "Unternehmen D", emission: 180, year: 2023 },
  { country: "Brasilien", company: "Unternehmen E", emission: 130, year: 2023 },
  {
    country: "Australien",
    company: "Unternehmen F",
    emission: 170,
    year: 2023,
  },
  { country: "Südafrika", company: "Unternehmen G", emission: 160, year: 2023 },
  {
    country: "Großbritannien",
    company: "Unternehmen H",
    emission: 110,
    year: 2023,
  },
  {
    country: "Frankreich",
    company: "Unternehmen I",
    emission: 140,
    year: 2023,
  },
  { country: "Italien", company: "Unternehmen J", emission: 150, year: 2023 },
  { country: "Russland", company: "Unternehmen K", emission: 180, year: 2023 },
  { country: "China", company: "Unternehmen L", emission: 200, year: 2023 },
  { country: "Japan", company: "Unternehmen M", emission: 90, year: 2023 },
  { country: "Südkorea", company: "Unternehmen N", emission: 150, year: 2023 },
  { country: "Singapur", company: "Unternehmen O", emission: 130, year: 2023 },
  { country: "Neuseeland", company: "Unternehmen P", emission: 80, year: 2023 },
  { country: "Mexiko", company: "Unternehmen Q", emission: 100, year: 2023 },
  {
    country: "Argentinien",
    company: "Unternehmen R",
    emission: 140,
    year: 2023,
  },
  { country: "Ägypten", company: "Unternehmen S", emission: 160, year: 2023 },
  { country: "Indonesien", company: "Unternehmen T", emission: 90, year: 2023 },
  { country: "Schweden", company: "Unternehmen U", emission: 120, year: 2023 },
  { country: "Norwegen", company: "Unternehmen V", emission: 130, year: 2023 },
  { country: "Dänemark", company: "Unternehmen W", emission: 110, year: 2023 },
  { country: "Finnland", company: "Unternehmen X", emission: 100, year: 2023 },
  { country: "Irland", company: "Unternehmen Y", emission: 150, year: 2023 },
  { country: "Portugal", company: "Unternehmen Z", emission: 130, year: 2023 },

  //2022
  {
    country: "Deutschland",
    company: "Unternehmen A1",
    emission: 90,
    year: 2022,
  },
  { country: "USA", company: "Unternehmen B1", emission: 140, year: 2022 },
  { country: "Kanada", company: "Unternehmen C1", emission: 110, year: 2022 },
  { country: "Indien", company: "Unternehmen D1", emission: 170, year: 2022 },
  {
    country: "Brasilien",
    company: "Unternehmen E1",
    emission: 120,
    year: 2022,
  },
  {
    country: "Australien",
    company: "Unternehmen F1",
    emission: 160,
    year: 2022,
  },
  {
    country: "Südafrika",
    company: "Unternehmen G1",
    emission: 150,
    year: 2022,
  },
  {
    country: "Großbritannien",
    company: "Unternehmen H1",
    emission: 100,
    year: 2022,
  },
  {
    country: "Frankreich",
    company: "Unternehmen I1",
    emission: 130,
    year: 2022,
  },
  { country: "Italien", company: "Unternehmen J1", emission: 140, year: 2022 },
  { country: "Russland", company: "Unternehmen K1", emission: 170, year: 2022 },
  { country: "China", company: "Unternehmen L1", emission: 190, year: 2022 },
  { country: "Japan", company: "Unternehmen M1", emission: 80, year: 2022 },
  { country: "Südkorea", company: "Unternehmen N1", emission: 140, year: 2022 },
  { country: "Singapur", company: "Unternehmen O1", emission: 120, year: 2022 },
  {
    country: "Neuseeland",
    company: "Unternehmen P1",
    emission: 70,
    year: 2022,
  },
  { country: "Mexiko", company: "Unternehmen Q1", emission: 90, year: 2022 },
  {
    country: "Argentinien",
    company: "Unternehmen R1",
    emission: 130,
    year: 2022,
  },
  { country: "Ägypten", company: "Unternehmen S1", emission: 150, year: 2022 },
  {
    country: "Indonesien",
    company: "Unternehmen T1",
    emission: 80,
    year: 2022,
  },
  { country: "Schweden", company: "Unternehmen U1", emission: 110, year: 2022 },
  { country: "Norwegen", company: "Unternehmen V1", emission: 120, year: 2022 },
  { country: "Dänemark", company: "Unternehmen W1", emission: 100, year: 2022 },
  { country: "Finnland", company: "Unternehmen X1", emission: 90, year: 2022 },
  { country: "Irland", company: "Unternehmen Y1", emission: 140, year: 2022 },
  { country: "Portugal", company: "Unternehmen Z1", emission: 120, year: 2022 },
];

/*------------------------------------------*/
let filteredData = [...data];
// Funktion zum Zurücksetzen der Filter
function resetFilters() {
  // Setzt den Wert des Länderfilters zurück
  document.getElementById("filterCountry").value = "";
  // Setzt den Wert des Unternehmensfilters zurück
  document.getElementById("filterCompany").value = "";
  // Setzt den Wert des Emissionsfilters zurück
  document.getElementById("filterEmission").value = "";
  document.getElementById("filterYear").value = "";

  // Setzt filteredData zurück auf die Originaldaten
  filteredData = [...data];
  // Zeichnet die Tabelle mit den Originaldaten neu
  renderTable(data);
}

/*------------------------------------------*/
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

  const filterYear = document.getElementById("filterYear").value;

  filteredData = data.filter(
    (item) =>
      item.country.toLowerCase().includes(filterCountry) &&
      item.company.toLowerCase().includes(filterCompany) &&
      (!filterEmission || item.emission <= Number(filterEmission)) &&
      (!filterYear || item.year === Number(filterYear)) // Überprüft, ob das Jahr dem Filterwert entspricht
  );

  // Zeichnet die Tabelle mit den gefilterten Daten neu
  renderTable(filteredData);
}

/*------------------------------------------*/
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
    tableBody.innerHTML += `
            <tr>
                <td>${escapeHtml(item.country)}</td>
                <td>${escapeHtml(item.company)}</td>
                <td>${escapeHtml(item.emission.toString())}</td>
                <td>${escapeHtml(
                  item.year.toString()
                )}</td> <!-- Zeigt das Jahr an -->
            </tr>
        `;
  });
}

// Rendert die Tabelle mit den Originaldaten beim Laden der Webseite.
renderTable(data);

/*------------------------------------------*/
// Download Filter Button
// Funktion, die ein Datenobjekt in eine CSV-Zeile konvertiert
function convertToCSVRow(item) {
  return `"${item.country}","${item.company}",${item.emission},${item.year}`;
}

// Funktion, die den Download der CSV-Datei handhabt
function downloadCSV() {
  // Erstellt den CSV-String durch Zusammenführen der Datenzeilen,
  // getrennt durch Zeilenumbrüche
  const csvContent =
    "Land,Unternehmen,Emission,Jahr\n" +
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
document
  .getElementById("downloadButton")
  .addEventListener("click", downloadCSV);

/*------------------------------------------*/
// Verlauf der Emmision

// Eine Liste von Farben
const colors = [
  "rgba(75, 192, 192, 0.2)",
  "rgba(255, 99, 132, 0.2)",
  "rgba(255, 205, 86, 0.2)",
  "rgba(54, 162, 235, 0.2)",
];

// Funktion rendert ein Balkendiagramm für Emissionsdaten
function renderBarChart() {
  // Der Kontext des Canvas-Elements wird abgerufen, auf dem das Diagramm gezeichnet wird.
  const ctx = document.getElementById("emissionChart").getContext("2d");

  // Überprüft, ob bereits ein Diagramm existiert und zerstört es, um ein neues zu erstellen.
  if (window.myChart) {
    window.myChart.destroy();
  }

  // Erstellt ein Array von einzigartigen Ländern aus den gefilterten Daten.
  const uniqueCountries = [
    ...new Set(filteredData.map((item) => item.country)),
  ];

  // Erstellt ein Array von einzigartigen Jahren aus den gefilterten Daten und sortiert es.
  const years = [...new Set(filteredData.map((item) => item.year))].sort();

  // Erstellt Datensätze für das Diagramm, einen für jedes Jahr.
  const datasets = years.map((year, index) => {
    // Filtert die Daten für das aktuelle Jahr.
    const dataForYear = filteredData.filter((item) => item.year === year);

    // Erstellt ein Array von Emissionswerten für jedes Land im aktuellen Jahr.
    const emissionsForCountries = uniqueCountries.map((country) => {
      // Findet den Eintrag für das aktuelle Land im aktuellen Jahr.
      const entry = dataForYear.find((item) => item.country === country);
      // Gibt den Emissionswert zurück, oder 0 falls kein Eintrag existiert.
      return entry ? entry.emission : 0;
    });

    // Gibt das Datenset-Objekt für das aktuelle Jahr zurück.
    return {
      label: `Emissionen ${year}`, // Beschriftung des Datensatzes
      data: emissionsForCountries, // Datenpunkte des Datensatzes
      backgroundColor: colors[index % colors.length], // Hintergrundfarbe der Balken
      borderColor: colors[index % colors.length], // Rahmenfarbe der Balken
      borderWidth: 1, // Rahmenbreite der Balken
    };
  });

  // Erstellt ein neues Chart-Objekt mit den vorbereiteten Daten und Optionen.
  window.myChart = new Chart(ctx, {
    type: "bar", // Diagrammtyp
    data: {
      labels: uniqueCountries, // Beschriftungen der X-Achse
      datasets: datasets, // Datensätze für das Diagramm
    },
    options: {
      scales: {
        y: {
          beginAtZero: true, // Beginnt die Y-Achse bei 0
        },
      },
    },
  });
}

// Zeichnet das Diagramm beim Laden der Seite und bei Größenänderungen
renderBarChart();
window.addEventListener("resize", renderBarChart);

/*------------------------------------------*/
// Elemente für die Paginierung und Anzeige von Informationen werden aus dem DOM abgerufen.
const rowsPerPageSelect = document.getElementById("rowsPerPage");
const prevPageButton = document.getElementById("prevPage");
const nextPageButton = document.getElementById("nextPage");
const pageInfo = document.getElementById("pageInfo");

// Initialisierung der aktuellen Seite und der Anzahl der Zeilen pro Seite.
let currentPage = 1;
let rowsPerPage = parseInt(rowsPerPageSelect.value);

/**
 * Aktualisiert die Tabelle basierend auf der aktuellen Seite und der Anzahl der Zeilen pro Seite.
 */
function updateTable() {
  // Berechnet den Start- und Endindex der Daten für die aktuelle Seite.
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  // Schneidet die Daten für die aktuelle Seite aus den gefilterten Daten heraus.
  const paginatedData = filteredData.slice(startIndex, endIndex);

  // Ruft die Funktion auf, die die Tabelle mit den paginierten Daten rendert.
  renderTable(paginatedData);

  // Aktualisiert die Seiteninformationen für den Benutzer.
  pageInfo.textContent = `Anzeige von Seite ${currentPage} von ${Math.ceil(
    filteredData.length / rowsPerPage
  )}.`;

  // Deaktiviert den Button für die vorherige Seite, wenn die erste Seite erreicht ist.
  prevPageButton.disabled = currentPage === 1;
  // Deaktiviert den Button für die nächste Seite, wenn die letzte Seite erreicht ist.
  nextPageButton.disabled =
    currentPage === Math.ceil(filteredData.length / rowsPerPage);
}

// Fügt einen Event-Listener hinzu, der die Seite erhöht und die Tabelle aktualisiert, wenn der "Nächste"-Button geklickt wird.
nextPageButton.addEventListener("click", () => {
  currentPage++;
  updateTable();
});

// Fügt einen Event-Listener hinzu, der die Seite verringert und die Tabelle aktualisiert, wenn der "Vorherige"-Button geklickt wird.
prevPageButton.addEventListener("click", () => {
  currentPage--;
  updateTable();
});

// Fügt einen Event-Listener hinzu, der die Anzahl der Zeilen pro Seite aktualisiert und die Tabelle zurücksetzt, wenn eine neue Anzahl ausgewählt wird.
rowsPerPageSelect.addEventListener("change", () => {
  rowsPerPage = parseInt(rowsPerPageSelect.value);
  currentPage = 1; // Setzt die Ansicht zurück auf die erste Seite
  updateTable();
});

// Initialisiert die Tabelle mit den paginierten Daten beim ersten Laden der Seite.
updateTable();

/*------------------------------------------*/
