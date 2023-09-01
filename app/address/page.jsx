"use client";

import TextInput from "../components/Adress/TextInput";
import MainLayout from "../layouts/MainLayout";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { useUser } from "../context/UserContext";
import { useEffect, useState } from "react";
import useIsLOading from "../hooks/useIsLoading";
import useUserAddress from "../hooks/useUserAddress";
import { toast } from "react-toastify";
import CLientOnly from "../components/ClientOnly/ClientOnly";
import useCreateAddress from '../hooks/useCreateAddress';

const Adress = () => {
  const { user } = useUser();
  const router = useRouter();

  const [addressId, setAddressId] = useState(null);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [isUpdatingAddress, setIsUpdatingAddress] = useState(false);
  const [error, setError] = useState({});

  const showError = (type) => {
    if (Object.entries(error).length > 0 && error.type === type) {
      return error.message;
    }
    return "";
  };

  const getAddress = async () => {
    if (user?.id === null || user?.id === undefined) {
      useIsLOading(false);
      return;
    }

    const res = await useUserAddress();

    if (res) {
      setCurrentAddress(res);
      useIsLOading(false);
      return;
    }
     if (!res) {
      console.log('No data address')
     }

    useIsLOading(false);
  };
 
  useEffect(() => {
    useIsLOading(true);
    getAddress();
  }, [user]);

  const setCurrentAddress = (result) => {
    setAddressId(result.id);
    setName(result.name);
    setAddress(result.address);
    setZipcode(result.zipcode);
    setCity(result.city);
    setCountry(result.country);
  };

  const validate = () => {
    setError(null);
    setError({});
    let isError = false;

    if (!name) {
      setError({ type: "name", message: "A name is required" });
      isError = true;
    } else if (!address) {
      setError({ type: "address", message: "An address is required" });
      isError = true;
    } else if (!zipcode) {
      setError({ type: "zipcode", message: "A zipcode is required" });
      isError = true;
    } else if (!city) {
      setError({ type: "city", message: "A city is required" });
      isError = true;
    } else if (!country) {
      setError({ type: "country", message: "A country is required" });
      isError = true;
    }
    return isError;
  };

  const submit = async (e) => {
    e.preventDefault();
    let isError = validate();
    if (isError) {
      toast.error(error.message, { autoClose: 2000 });
      return;
    }
    try {
      setIsUpdatingAddress(true);
      const response = await useCreateAddress({
        addressId,
        name,
        address,
        zipcode,
        city,
        country,
      });

      setCurrentAddress(response);
      toast.success("Address was updated", { autoClose: 2000 });
      router.push("/checkout");
    } catch (err) {
      toast.error(err.message);
      console.log(err)
    } finally {
      setIsUpdatingAddress(false);
    }
  };

  const clearFieds = () => {
    setAddressId("");
    setName("");
    setAddress("");
    setZipcode("");
    setCity("");
    setCountry("");
  };

  return (
    <MainLayout>
      <div id="AdressPage" className="mt-4 md:max-w-[600px] mx-auto px-2">
        <div className="mx-auto bg-white rounded-lg p-3">
          <div className="text-xl font-bold mb-2 ">Adress Details</div>
          <form onSubmit={submit}>
            <div className="mb-4">
              <CLientOnly>
                <TextInput
                  className="w-full"
                  string={name}
                  onUpdate={setName}
                  placeholder="Name"
                  error={showError("name")}
                />
              </CLientOnly>
            </div>
            <div className="mb-4">
              <CLientOnly>
                <TextInput
                  className="w-full"
                  string={address}
                  onUpdate={setAddress}
                  placeholder="Address"
                  error={showError("address")}
                />
              </CLientOnly>
            </div>
            <div className="mb-4">
              <CLientOnly>
                <TextInput
                  className="w-full"
                  string={zipcode}
                  onUpdate={setZipcode}
                  placeholder="Zip code"
                  error={showError("zipcode")}
                />
              </CLientOnly>
            </div>
            <div className="mb-4">
              <CLientOnly>
                <TextInput
                  className="w-full"
                  string={city}
                  onUpdate={setCity}
                  placeholder="City"
                  error={showError("city")}
                />
              </CLientOnly>
            </div>
            <div className="mb-4">
              <CLientOnly>
                <TextInput
                  className="w-full"
                  string={country}
                  onUpdate={setCountry}
                  placeholder="Country"
                  error={showError("country")}
                />
              </CLientOnly>
            </div>

            <div className="flex gap-2  mt-6">
              <button
                type="submit"
                disabled={isUpdatingAddress}
                className={`
                  w-full
                  text-white
                  md:text-lg
                  text-md
                  font-semibold
                  p-3
                  rounded
                  bg-sky-400
                  ${isUpdatingAddress ? "opacity-60" : "opacity-100"}
                  `}
              >
                {isUpdatingAddress ? (
                  <div className="flex items-center justify-center">
                    <AiOutlineLoading3Quarters
                      size={20}
                      className="text-center text-slate-200 animate-spin"
                    />
                  </div>
                ) : (
                  <div>Update Address</div>
                )}
              </button>
              <button
                onClick={clearFieds}
                type="button"
                disabled={isUpdatingAddress}
                className="
                  w-full
                  text-white
                  md:text-lg
                  text-md
                  font-semibold
                  p-3
                  rounded
                  bg-red-400
                  "
              >
                Clear all
              </button>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default Adress;
