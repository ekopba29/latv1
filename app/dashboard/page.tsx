import React, { Suspense } from "react";
import Regions from "./regions";
import Countries from "./countries";

export default function page() {
  return (
    <div className="w-full h-full min-h-screen">
      <Regions />
      <Countries />
    </div>
  );
}
