import React from "react";
import { CiSquarePlus } from "react-icons/ci";

const AdditionalInfoSection = () => {
  return (
    <div className="text-richblack-800 px-6 md:px-12 lg:px-20 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16">
      <div className="w-full max-w-md mx-auto text-justify">
        <div>
          <h6 className="text-lg font-semibold pb-5">What we really do?</h6>
          <p className="text-sm pb-10">
            Donec libero dolor, tincidunt id laoreet vitae, ullamcorper eu
            tortor. Maecenas pellentesque, dui vitae iaculis mattis, tortor nisi
            faucibus magna, vitae ultrices lacus purus vitae metus.
          </p>
        </div>
        <div>
          <h6 className="text-lg font-semibold pb-5">Our vision</h6>
          <p className="text-sm pb-10">
            Donec libero dolor, tincidunt id laoreet vitae, ullamcorper eu
            tortor. Maecenas pellentesque, dui vitae iaculis mattis, tortor nisi
            faucibus magna, vitae ultrices lacus purus vitae metus.
          </p>
        </div>
      </div>

      <div className="w-full max-w-md mx-auto text-justify">
        <div>
          <h6 className="text-lg font-semibold pb-5">History of the Company</h6>
          <p className="text-sm pb-10">
            Donec libero dolor, tincidunt id laoreet vitae, ullamcorper eu
            tortor. Maecenas pellentesque, dui vitae iaculis mattis, tortor nisi
            faucibus magna, vitae ultrices lacus purus vitae metus.
          </p>
        </div>

        <div>
          <h6 className="text-lg font-semibold pb-5">Cooperate with Us!</h6>
          <p className="text-sm pb-10">
            Donec libero dolor, tincidunt id laoreet vitae, ullamcorper eu
            tortor. Maecenas pellentesque, dui vitae iaculis mattis, tortor nisi
            faucibus magna, vitae ultrices lacus purus vitae metus.
          </p>
        </div>
      </div>

      <div className="w-full max-w-md mx-auto text-xl pl-0 lg:pl-12">
        <div className="flex items-center gap-3 mb-4">
          <CiSquarePlus className="h-11 w-11" />
          <p>Support 24/7</p>
        </div>
        <div className="flex items-center gap-3 mb-4">
          <CiSquarePlus className="h-11 w-11" />
          <p>Best Quality</p>
        </div>
        <div className="flex items-center gap-3 mb-4">
          <CiSquarePlus className="h-11 w-11" />
          <p>Fastest Delivery</p>
        </div>
        <div className="flex items-center gap-3 mb-4">
          <CiSquarePlus className="h-11 w-11" />
          <p>Customer Care</p>
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfoSection;
