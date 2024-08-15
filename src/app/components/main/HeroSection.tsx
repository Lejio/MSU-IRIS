import React from "react";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";

type Iris = {
    letter: string;
    description: string;
}

export default function HeroSection() {
    const iris: Iris[] = [
        {
            letter: "I",
            description: "rrigation"
        },
        {
            letter: "R",
            description: "esearch"
        },
        {
            letter: "I",
            description: "nterface"
        },
        {
            letter: "S",
            description: "ystem"
        }
    ];
  return (
    <BackgroundGradientAnimation>
      <div className="absolute z-50 inset-0 flex items-center justify-center text-white font-bold px-4 pointer-events-none text-4xl md:text-6xl lg:text-8xl text-start">
        <div className=" flex flex-col">
            <p className="bg-clip-text my-5 text-emerald-100 drop-shadow-xl text-6xl md:text-8xl lg:text-9xl">MSU</p>
            <div className=" flex flex-col items-start">
                {iris.map((letter, index) => (
                    <div className=" inline-flex gap-1" key={index}>
                        <p className="bg-clip-text drop-shadow-xl text-2xl md:text-4xl lg:text-6xl text-emerald-100 bg-gradient-to-b from-white/70 to-white/20">{letter.letter}</p>
                        <p className="bg-clip-text text-transparent h-full drop-shadow-xl text-2xl md:text-5xl lg:text-large lg:leading-[1.45] bg-gradient-to-b from-white/70 to-white/20">{letter.description}</p>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </BackgroundGradientAnimation>
  );
}
