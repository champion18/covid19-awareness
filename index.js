// fix size of window
// add gap at top

const form = document.querySelector("#searchForm");

const initialData = async () => {
  const res = await axios.get("https://api.covid19api.com/summary");
  const globalData = res.data.Global;

  const initialUpdated = document.getElementById("lastUpdated");
  lastUpdated.textContent = globalData.Date.substring(0, 10);

  const totalConfirmed = document.getElementById("totalConfirmed");
  totalConfirmed.textContent = globalData.TotalConfirmed;

  const newConfirmed = document.getElementById("newConfirmed");
  newConfirmed.textContent = globalData.NewConfirmed;

  const totalDeaths = document.getElementById("totalDeaths");
  totalDeaths.textContent = globalData.TotalDeaths;

  const newDeaths = document.getElementById("newDeaths");
  newDeaths.textContent = globalData.NewDeaths;
};

initialData();

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  //console.dir(form);
  const countryName = form.elements["country"].value;
  form.elements["country"].value = "";
  //console.log(countryName)
  const res = await axios.get("https://api.covid19api.com/summary");
  showData(res.data.Countries, countryName);
  console.log(res.data.Countries);
});

const showData = (countries, countryName) => {
  var flag = 0;
  for (let country of countries) {
    const name = country.Country;
    if (name.toLowerCase() == countryName.toLowerCase()) {
      console.log(`foundCountry ${name}`);
      console.log(country);
      //console.log(country.TotalConfirmed);
      setData(country);
      flag = 1;
    }
    //const foundCountry = countries.find((name) => name == countryName);
  }
  if (flag == 0) handleInvalid();
};

const handleInvalid = () => {
  const heading2 = document.getElementById("heading2");
  alert(
    "The country you entered is either invalid or not supported by this app. Please try again."
  );
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
