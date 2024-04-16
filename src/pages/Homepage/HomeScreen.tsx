import { Button } from "../../components/ui/button";
import React from "react";
import banner from "../../assets/images/banner.jpeg";
import about from "../../assets/images/about.png";
import CheckCircleIcon from "@/icons/Checkicon";
import ContactUS from "@/components/ContactUS";
import Pricing from "@/components/Pricing";
import { ArrowRightIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
const HomeScreen = () => {
  const navigate = useNavigate();
  return (
    <>
      {/* Banner */}
      <section className="flex flex-col lg:flex-row items-center justify-around  w-full min-h-[90vh]">
        <div className="max-w-xl mb-8 lg:mb-0">
          <h1 className="text-5xl font-bold mb-6">
            TypeSight: The Ultimate Typing Test
          </h1>
          <p className="text-gray-700 mb-6 dark:text-gray-200">
            Welcome to TypeSight, the premier destination for typing speed and
            accuracy tests. Whether you’re a professional typist or just looking
            to improve your skills, we’ve got you covered.
          </p>
          <Button
            className="bg-blue-600 text-white"
            onClick={() => navigate("/test")}
          >
            Explore now <ArrowRightIcon />
          </Button>
        </div>
        <img
          alt="Typing illustration"
          className="object-contain"
          height="400"
          src={banner}
          style={{
            aspectRatio: "600/400",
            objectFit: "cover",
          }}
          width="600"
        />
      </section>
      {/* About */}
      <section id="about" className="flex w-full items-center justify-center">
        <div className="flex w-full flex-wrap items-center justify-around">
          <div className="w-full lg:w-1/2">
            <img
              alt="Person typing on a keyboard with code on the screen"
              className="h-auto w-full rounded-lg object-cover"
              height="400"
              src={about}
              style={{
                aspectRatio: "600/400",
                objectFit: "cover",
              }}
              width="600"
            />
          </div>
          <div className="mb-8 w-full lg:mb-0 lg:w-1/2 pl-5 text-justify">
            <h2 className="text-4xl font-bold">About TypeSight</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-200">
              At TypeSight, we are committed to helping individuals enhance
              their typing skills and improve their productivity. Our platform
              offers a range of services, including typing tests, keyboard speed
              checks, and typing accuracy checks, that help users achieve their
              goals and reach their full potential. Our team of dedicated
              experts is here to support you every step of the way, and we are
              committed to providing exceptional service and delivering
              outstanding results.
            </p>
          </div>
        </div>
      </section>
      {/* Featues */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8">
            <div className="space-y-6 lg:col-span-2">
              <h2 className="text-3xl font-extrabold tracking-tight">
                Features
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircleIcon className="h-6 w-6 text-green-500" />
                  <p className="ml-3 text-lg leading-6 text-gray-700">
                    Easy-to-Use Interface
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircleIcon className="h-6 w-6 text-green-500" />
                  <p className="ml-3 text-lg leading-6 text-gray-700">
                    Accurate Results
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircleIcon className="h-6 w-6 text-green-500" />
                  <p className="ml-3 text-lg leading-6 text-gray-700">
                    Detailed Reports
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-extrabold tracking-tight">
                Features & Benefits
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircleIcon className="h-6 w-6 text-green-500" />
                  <p className="ml-3 text-lg leading-6 text-gray-700">
                    Improved Typing Speed
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircleIcon className="h-6 w-6 text-green-500" />
                  <p className="ml-3 text-lg leading-6 text-gray-700">
                    Increased Typing Accuracy
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircleIcon className="h-6 w-6 text-green-500" />
                  <p className="ml-3 text-lg leading-6 text-gray-700">
                    Detailed Reports
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Pricing */}
      <Pricing />
      {/* Contact */}
      <ContactUS />
    </>
  );
};

export default HomeScreen;
// https://upcdn.io/FW25bx6/raw/Gemini_Generated_Image%20(1).jpeg
