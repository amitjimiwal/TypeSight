import { Button } from "../../components/ui/button";
import React from "react";
import banner from "../../assets/images/banner.jpeg";
const HomeScreen = () => {
  return (
    <section className="flex flex-col lg:flex-row items-center justify-around px-8 py-12">
      <div className="max-w-xl mb-8 lg:mb-0">
        <h1 className="text-5xl font-bold mb-6">
          TypeSight: The Ultimate Typing Test
        </h1>
        <p className="text-gray-700 mb-6">
          Welcome to TypeSight, the premier destination for typing speed and
          accuracy tests. Whether you’re a professional typist or just looking
          to improve your skills, we’ve got you covered.
        </p>
        <Button className="bg-blue-600 text-white">View All Services</Button>
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
  );
};

export default HomeScreen;
// https://upcdn.io/FW25bx6/raw/Gemini_Generated_Image%20(1).jpeg
