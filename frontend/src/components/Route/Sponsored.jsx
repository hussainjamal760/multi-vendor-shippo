import React from "react";
import styles from "../../styles/styles";

const Sponsored = () => {
  return (
    <div
      className={`${styles.section} hidden sm:block bg-white py-10 px-5 mb-12 cursor-pointer rounded-xl`}
    >
      <div className="flex justify-between w-full flex-wrap gap-6">
        
        {/* Sony */}
        <div className="flex items-center">
          <img
            src="https://images.seeklogo.com/logo-png/12/1/sony-logo-png_seeklogo-129420.png"
            alt="Sony"
            className="w-[150px] object-contain"
          />
        </div>

        {/* Dell */}
        <div className="flex items-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/48/Dell_Logo.svg"
            alt="Dell"
            className="w-[150px] object-contain"
          />
        </div>

        {/* LG */}
        <div className="flex items-center">
          <img
            src="https://images.seeklogo.com/logo-png/8/1/lg-electronics-logo-png_seeklogo-83711.png"
            alt="LG"
            className="w-[150px] object-contain"
          />
        </div>

        {/* Apple */}
        <div className="flex items-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
            alt="Apple"
            className="w-[150px] object-contain"
          />
        </div>

        {/* Samsung */}
        <div className="flex items-center">
          <img
            src="https://images.seeklogo.com/logo-png/12/1/samsung-logo-png_seeklogo-122019.png"
            alt="Samsung"
            className="w-[150px] object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Sponsored;
