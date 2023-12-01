"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "./loading";
import useRegionsCountries from "../states/regions_and_country";
import Image from "next/image";

export default function Countries() {
  const [loading, setLoading] = useState(false);
  const stateCountries = useRegionsCountries((state) => state.countries);
  const selectedRegion = useRegionsCountries((state) => state.selectedRegions);
  const setStateCountries = useRegionsCountries((state) => state.setCountries);

  const loadRegions = async () => {
    if (!selectedRegion) {
      return;
    }

    setLoading(true);
    axios
      .get("http://localhost/api/regions/" + selectedRegion + "/countries", {
        headers: {
          Accept: "application/json",
        },
      })
      .then((data) => {
        setStateCountries(data.data.countries as []);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadRegions();
  }, [selectedRegion]);

  return (
    <>
      {loading && <Loading />}
      <section className="w-full p-10 mx-auto">
        <div className="flex flex-wrap gap-10 items-start justify-center">
          {stateCountries &&
            stateCountries.map((val: any, idx) => {
              return (
                <div
                  className="w-full lg:w-1/4 bg-white p-8 hover:scale-125 transition-all duration-400 cursor-pointer rounded-b-4xl hover:rounded-b-lg border-0 overflow-hidden grayscale hover:grayscale-0"
                  key={idx}
                >
                  <div className="w-full h-40 bg-slate-200/20">
                    <Image
                      src={val.flags}
                      alt={val.name}
                      width={500}
                      height={100}
                      className="object-contain w-full h-full p-3 shadow-inner border"
                    />
                  </div>
                  <div className="font-semibold text-2xl pt-4">{val.name}</div>
                  <div className="w-full gap-3 border-black mt-5 flex flex-wrap">
                    {val.currencies &&
                      val.currencies.map((valc: any, idxc: number) => {
                        return (
                          <div className="flex text-xs min-w-fit hover:scale-125 hover:z-10 duration-500 transition-all" key={idxc+"as"}>
                            <div className="px-2 py-1 border bg-black/20 text-black font-extrabold">
                              {valc.symbol}
                            </div>
                            <div className="px-2 py-1 border font-semibold text-slate-500">
                              {valc.name}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              );
            })}
        </div>
      </section>
    </>
  );
}
