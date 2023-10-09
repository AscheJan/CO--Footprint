["Country", "Company", "Emission"].forEach((type) => {
  document
    .getElementById(`sort${type}`)
    .addEventListener("click", () => handleSort(type.toLowerCase()));
});

["filterCountry", "filterCompany", "filterEmission"].forEach((type) => {
  document.getElementById(type).addEventListener("input", handleFilter);
});

document.getElementById("resetButton").addEventListener("click", resetFilters);

const data = [
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
function resetFilters() {
  document.getElementById("filterCountry").value = "";
  document.getElementById("filterCompany").value = "";
  document.getElementById("filterEmission").value = "";

  filteredData = [...data]; // Set filteredData back to the original data
  renderTable(data); // Rerender the table with the original data
}
function handleFilter() {
  const filterCountry = document
    .getElementById("filterCountry")
    .value.toLowerCase();
  const filterCompany = document
    .getElementById("filterCompany")
    .value.toLowerCase();
  const filterEmission = document.getElementById("filterEmission").value;

  filteredData = data.filter(
    (item) =>
      item.country.toLowerCase().includes(filterCountry) &&
      item.company.toLowerCase().includes(filterCompany) &&
      (!filterEmission || item.emission <= Number(filterEmission)) // Convert filterEmission to Number
  );

  renderTable(filteredData);
}

let isAscending = true;

function handleSort(key) {
  filteredData.sort((a, b) => {
    if (typeof a[key] === "string") {
      return isAscending
        ? a[key].localeCompare(b[key])
        : b[key].localeCompare(a[key]);
    }
    return isAscending ? a[key] - b[key] : b[key] - a[key];
  });
  isAscending = !isAscending;
  renderTable(filteredData);
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

function renderTable(data) {
  const tableBody = document.getElementById("dataBody");
  tableBody.innerHTML = "";
  data.forEach((item) => {
    tableBody.innerHTML += `
            <tr>
                <td>${escapeHtml(item.country)}</td>
                <td>${escapeHtml(item.company)}</td>
                <td>${escapeHtml(item.emission.toString())}</td>
            </tr>
        `;
  });
}

renderTable(data);
