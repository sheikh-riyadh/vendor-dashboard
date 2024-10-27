import { useForm } from "react-hook-form";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import Button from "../../Common/Button";
import Input from "../../Common/Input";
import { business } from "../../../data/business/business";
import { useState } from "react";
import BusinessInfo from "./BusinessInfo";

const Registrastion = () => {
  const { handleSubmit, register } = useForm();
  const [isNext, setIsNext] = useState(false);

  const handleRegistration = (data) => {
    console.log(data);
  };

  const handleNext = () => {
    setIsNext(true);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full my_container">
      <div className="md:w-4/5 lg:w-4/6 xl:w-7/12 bg-white border shadow-lg rounded-xl grid grid-cols-1 md:grid-cols-2 overflow-hidden md:h-2/5 lg:h-[420px] xl:h-4/6">
        <div className="bg-secondary md:rounded-r-[30%] flex flex-col gap-5 items-center justify-center p-7 text-center text-white relative ltr-animation">
          <Link to="/" title="Return main website">
            <FaHome className="text-5xl border p-2 rounded-full" />
          </Link>
          <h2 className="font-bold text-3xl capitalize">Welcome Back!</h2>
          <span>
            Enter your personal details to use all of the site features
          </span>
          <Link to="/sign-in">
            <Button className="uppercase w-32">Sign In</Button>
          </Link>
        </div>

        <form
          onSubmit={handleSubmit(handleRegistration)}
          className="flex flex-col items-center justify-center gap-5 w-full p-7"
        >
          <h1 className="font-bold text-3xl capitalize">Create Account</h1>
          <div className="w-full">
            {!isNext ? (
              <div className="w-full flex flex-col gap-5 ltr-animation">
                {business.registrationData.map(
                  ({ isRequired, placeholder, registerName, type }) => (
                    <Input
                      key={registerName}
                      {...register(registerName)}
                      placeholder={placeholder}
                      type={type}
                      required={isRequired}
                    />
                  )
                )}
              </div>
            ) : (
              <BusinessInfo register={register} setIsNext={setIsNext} />
            )}
          </div>
          {!isNext && (
            <div
              onClick={handleNext}
              className="font-medium uppercase text-sm border w-full text-center p-2.5 rounded-md bg-stech text-white cursor-pointer"
            >
              Next
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Registrastion;