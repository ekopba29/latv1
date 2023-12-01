import create from "zustand";

type ActionStateRegionsCountries = {
  setRegions: (regions: string[]) => void; // Specify the type for setRegions argument
  setCountries: (countries: string[]) => void; // Specify the type for setCountries argument
  setSelectedRegions: (regions: string) => void;
};

interface StateRegionsCountries {
  regions: string[]; // Specify the type for regions and countries
  countries: string[]; // Specify the type for regions and countries
  selectedRegions: string;
}

const useRegionsCountries = create<
  StateRegionsCountries & ActionStateRegionsCountries
>((set) => ({
  countries: [],
  regions: [],
  selectedRegions: "",
  setRegions: (regions: string[]) => set({ regions }), // Update the state correctly
  setCountries: (countries: string[]) => set({ countries }), // Update the state correctly
  setSelectedRegions: (regions: string) => set({ selectedRegions: regions }),
}));

export default useRegionsCountries;
