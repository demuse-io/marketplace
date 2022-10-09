import Heading from "components/Heading/Heading";
import { nftsAbstracts } from "contains/fakeData";
import React, { FC } from "react";
import CardNFTMusic from "./CardNFTMusic";
import CardNFTMusic2 from "./CardNFTMusic2";
import berto from "../images/artists/BertoRojo.jpeg";
import nat from "../images/artists/NatSimons.jpeg";

export interface SectionMagazine8Props {
  className?: string;
}

const SectionMagazine8: FC<SectionMagazine8Props> = ({ className = "" }) => {
  return (
    <div className={`nc-SectionMagazine8 relative ${className}`}>
      <Heading className="mb-14 text-neutral-900 dark:text-neutral-50">Check out the latest releases</Heading>
      <div className={`grid grid-cols-1 sm:grid-cols-6 gap-6 2xl:gap-8`}>
        <CardNFTMusic featuredImage={berto} className="sm:col-span-3 xl:col-span-2" />
        <CardNFTMusic featuredImage={nat} className="sm:col-span-3 xl:col-span-2" />
        <div className="grid grid-rows-3 gap-6 xl:gap-8 sm:col-span-6 xl:col-span-2">
          {[nftsAbstracts[2], nftsAbstracts[4], nftsAbstracts[7]].map((p, index) => (
            <CardNFTMusic2 featuredImage={p} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionMagazine8;
