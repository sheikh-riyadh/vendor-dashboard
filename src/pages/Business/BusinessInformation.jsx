import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../../components/Common/Input";
import { business } from "../../data/business/business";
import SelectInput from "../../components/Common/SelectInput";
import SubmitButton from "../../components/Common/SubmitButton";
import {
  useGetSellerDetailsQuery,
  useUpdateSellerMutation,
} from "../../store/service/seller/sellerApi";
import toast from "react-hot-toast";
import { useGetSeller } from "../../hooks/useGetSeller";
import LoadingSpinner from "../../components/Common/LoadingSpinner";

const BusinessInformation = () => {
  const [cities, setCities] = useState([]);
  const { handleSubmit, register, setValue, watch } = useForm();

  const { seller } = useGetSeller();

  const query = new URLSearchParams({
    sellerId: seller?._id,
    email: seller?.email,
  }).toString();

  const { data: sellerData, isLoading: sellerLoading } =
    useGetSellerDetailsQuery(query);
  const [updateSeller, { isLoading: updateSellerLoading }] =
    useUpdateSellerMutation();

  const handleUpdateBusinessInfo = async (data) => {
    try {
      const res = await updateSeller({
        _id: sellerData?._id,
        data: data,
        email: sellerData?.email,
      });
      if (!res?.error) {
        toast.success("Updated successfully", { id: "update_seller" });
      } else {
        toast.error(res?.error?.data?.message, { id: "update_error" });
      }
    } catch (error) {
      toast.error("Something went wrong 😓", { id: error });
    }
  };

  const name = watch("state");
  useEffect(() => {
    if (name) {
      const selectedDivision = business.countryInfoData.find(
        (division) =>
          division.name === name[0].toUpperCase() + name.substring(1)
      );
      setCities([...selectedDivision.districts]);
    }
  }, [name]);

  useEffect(() => {
    for (const key in sellerData) {
      if (Object.prototype.hasOwnProperty.call(sellerData, key)) {
        if (key === "_id") {
          continue;
        } else {
          setValue(key, sellerData[key]);
        }
      }
    }
  }, [sellerData, setValue]);

  return (
    <div>
      <form
        onSubmit={handleSubmit(handleUpdateBusinessInfo)}
        className="shadow-md m-5 p-5 bg-widget rounded-sm"
      >
        <div>
          {!sellerLoading ? (
            <div>
              <div className="grid gap-5">
                <Input
                  {...register("businessNumber")}
                  required
                  label="Business number"
                  className={"bg-[#1C2822] text-white rounded-sm"}
                  type="number"
                />

                <SelectInput
                  {...register("country")}
                  label="Country"
                  required
                  className={"bg-[#1C2822] text-white rounded-sm"}
                >
                  <option value="" selected disabled>
                    Select country
                  </option>
                  <option value="bangladesh">Bangladesh</option>
                </SelectInput>

                <SelectInput
                  {...register("state")}
                  label="State"
                  required
                  className={"bg-[#1C2822] text-white rounded-sm"}
                >
                  <option value="" selected disabled>
                    Select state
                  </option>
                  {business?.countryInfoData.map((state) => (
                    <option
                      value={state?.name?.toLowerCase()}
                      key={state.name}
                      selected={
                        state?.name?.toLowerCase() === sellerData?.state
                      }
                    >
                      {state.name}
                    </option>
                  ))}
                </SelectInput>

                <SelectInput
                  required
                  {...register("city")}
                  label="City"
                  className={"bg-[#1C2822] text-white rounded-sm"}
                >
                  <option value="" selected disabled>
                    Select city
                  </option>
                  {cities?.map((city) => (
                    <option
                      value={city?.toLowerCase()}
                      key={city}
                      selected={city.toLowerCase() === sellerData?.city}
                    >
                      {city}
                    </option>
                  ))}
                </SelectInput>

                <Input
                  {...register("policeStation")}
                  required
                  label="Police station"
                  className={"bg-[#1C2822] text-white rounded-sm"}
                  placeholder="Police station"
                />
                <Input
                  {...register("zipCode")}
                  required
                  label="Zipcode"
                  className={"bg-[#1C2822] text-white rounded-sm"}
                  placeholder="Zipcode"
                  type="number"
                />
                <Input
                  {...register("fullAddress")}
                  required
                  label="Full address"
                  className={"bg-[#1C2822] text-white rounded-sm"}
                  placeholder="Full address"
                />
              </div>
              <div className="mt-5 flex flex-col justify-end items-end">
                <SubmitButton
                  isLoading={updateSellerLoading}
                  className="py-2 w-40"
                >
                  Save
                </SubmitButton>
              </div>
            </div>
          ) : (
            <LoadingSpinner />
          )}
        </div>
      </form>
    </div>
  );
};

export default BusinessInformation;
