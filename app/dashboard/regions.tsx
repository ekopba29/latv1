"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "./loading";
import useRegionsCountries from "../states/regions_and_country";

export default function Regions() {
  const [loading, setLoading] = useState(false);

  const stateRegions = useRegionsCountries((state) => state.regions);
  const selectedRegion = useRegionsCountries((state) => state.selectedRegions);
  const setStateRegions = useRegionsCountries((state) => state.setRegions);
  const setSelectedRegion = useRegionsCountries(
    (state) => state.setSelectedRegions
  );

  const loadRegions = async () => {
    setLoading(true);
    axios
      .get("http://localhost/api/regions", {
        headers: {
          Accept: "application/json",
        },
      })
      .then((data) => {
        setStateRegions(Object.values(data.data.regions) as []);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadRegions();
  }, []);

  return (
    <>
      <div
        className={`min-h-full w-full flex flex-wrap justify-center transition-all duration-300 shadow-neutral-700/20 ${
          selectedRegion !== "" ? "items-start" : "items-center"
        }`}
      >
        {loading && <Loading />}
        <div
          className={`w-full mx-auto flex justify-center shadow-2xl ${
            selectedRegion ? "items-center" : "items-center"
          }`}
        >
          {stateRegions &&
            stateRegions?.map((val, i) => {
              return (
                <button
                  key={i}
                  onClick={() => setSelectedRegion(val)}
                  className={`${
                    selectedRegion == val
                      ? "bg-violet-500 text-white rounded-b-lg scale-125 px-20 py-10"
                      : "text-slate-500 py-5 px-20"
                  } font-extrabold text-2xl hover:scale-110 transition-all hover:rounded-lg duration-200 hover:text-3xl hover:shadow-md hover:bg-violet-500/60 hover:text-white`}
                >
                  {val}
                </button>
              );
            })}
        </div>
      </div>
    </>
  );
}
