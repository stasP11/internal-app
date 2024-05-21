import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "../services/storageInterection";

type UserInfo = {
  isAdmin: boolean;
  countries: string[];
  selectedCountry: string;
};

function getUserInfo(roles: Array<string>): UserInfo {
  let selectedCountry: string;
  const countries = roles
    .filter((item) => typeof item === "string" && item.includes("Country"))
    .map((item) => item.replace(/_Country/g, "").replace(/_/g, " "));

  if (getFromLocalStorage("selectedCountry")) {
    selectedCountry = getFromLocalStorage("selectedCountry");
  } else {
    selectedCountry = countries[0];
    saveToLocalStorage("selectedCountry", selectedCountry);
  }

  return {
    isAdmin: roles.includes("Admin"),
    countries,
    selectedCountry,
  };
}

export default getUserInfo;
