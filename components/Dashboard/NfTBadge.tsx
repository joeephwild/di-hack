import Image from "next/image";
import React from "react";
import { badges } from "../../assets/images";

const NfTBadge = () => {
  return (
    <div>
      <Image
        src={badges}
        alt="badge"
        className="w-[124px] h-[155px] object-contain"
      />
    </div>
  );
};

export default NfTBadge;
