//no use const countryName = document.querySelector("#country");
const form = document.querySelector("#searchForm");

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  //console.dir(form);
  const countryName = form.elements["country"].value;
  //console.log(countryName)
  const res = await axios.get("https://api.covid19api.com/summary");
  showData(res.data.Countries, countryName);
  //console.log(res.data.Countries);
});

const showData = (countries, countryName) => {
  for (let country of countries) {
    const name = country.Country;
    if (name.toLowerCase() == countryName.toLowerCase()) {
      console.log(`foundCountry ${name}`);
      console.log(country);
      //console.log(country.TotalConfirmed);
      setData(country);
    }
    //const foundCountry = countries.find((name) => name == countryName);
  }
};

const setData = (country) => {
  const lastUpdated = document.getElementById("lastUpdated");
  lastUpdated.textContent = country.Date.substring(0, 10);
  const heading2 = document.getElementById("heading2");
  heading2.textContent = country.Country;

  const totalConfirmed = document.getElementById("totalConfirmed");
  totalConfirmed.textContent = country.TotalConfirmed;

  const newConfirmed = document.getElementById("newConfirmed");
  newConfirmed.textContent = country.NewConfirmed;

  const totalDeaths = document.getElementById("totalDeaths");
  totalDeaths.textContent = country.TotalDeaths;
  const newDeaths = document.getElementById("newDeaths");
  newDeaths.textContent = country.NewDeaths;
  //   const totalRecovered = document.getElementById("totalRecovered");
  //   totalRecovered.textContent = country.TotalConfirmed - country.TotalDeaths;
  //   const newRecovered = document.getElementById("newRecovered");
  //   newRecovered.textContent = country.NewConfirmed - country.NewDeaths;
};
