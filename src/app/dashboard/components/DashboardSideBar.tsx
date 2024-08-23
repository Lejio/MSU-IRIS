"use client";
import Link from "next/link";
import React, { useState, useContext, createContext } from "react";
import { IconChevronLeft } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const OpenContext = createContext(false);

export function DashboardSideBar({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleIconClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <OpenContext.Provider value={isOpen}>
      <div
        className={`flex flex-col justify-between h-full bg-slate-300 px-2 py-2 transition-all ease-in-out duration-300 ${
          isOpen
            ? "w-[25vw] lg:w-[15vw]" // Fixed widths for open state
            : "w-[65px] lg:w-[70px]" // Fixed widths for closed state
        }`}
      >
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between p-2">
            {isOpen && <IpsumLogo />}
            <IconChevronLeft
              onClick={handleIconClick}
              className={`cursor-pointer transition-transform duration-300 ${
                isOpen ? "" : "rotate-180"
              }`}
              size={30}
            />
          </div>
          <div className={`flex flex-col gap-1`}>{children}</div>
        </div>

        <Footer />
      </div>
    </OpenContext.Provider>
  );
}

export function DashboardSideBarItem({
  className,
  logo,
  title,
  link,
}: {
  className?: string;
  logo: React.ReactNode;
  title: string;
  link: string;
}) {
  const isOpen = useContext(OpenContext);

  return (
    <HoverCard openDelay={400} closeDelay={100}>
      <HoverCardTrigger
        className={cn("w-full rounded-md p-2 hover:bg-slate-400 flex items-center", className)}
        href={link}
      >
        <div className="flex-shrink-0">{logo}</div>
        <div
          className={`overflow-hidden transition-all duration-300 ${
            isOpen ? "w-auto opacity-100 ml-2" : "w-0 opacity-0"
          }`}
        >
          <p className="text-sm whitespace-nowrap">{title}</p>
        </div>
      </HoverCardTrigger>
      {isOpen ? null : (
        <HoverCardContent
          className=" bg-slate-300 px-3 py-2"
          sideOffset={10}
          side="right"
        >
          {title}
        </HoverCardContent>
      )}
    </HoverCard>
  );
}

export function DashboardSideBarGroup({
  children,
  logo,
  title,
}: {
  children: React.ReactNode;
  logo: React.ReactNode;
  title: string;
}) {
  const [isLowered, setIsLowered] = useState(false);
  const isOpen = useContext(OpenContext);

  return (
    <div
      className="hover:bg-slate-400 rounded-md"
      onMouseEnter={() => setIsLowered(true)}
      onMouseLeave={() => setIsLowered(false)}
    >
      <DashboardSideBarItem className=" p-0" logo={logo} title={title} link="#" />
      <div
        className={`flex flex-col transition-max-height duration-500 ease-in-out overflow-hidden ${
          isLowered ? "max-h-screen" : "max-h-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export function Footer() {
  return <div>Footer</div>;
}

function IpsumLogo() {
  return (
    <svg
      width="85"
      height="20"
      viewBox="0 0 169 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.0148 2.5V40H0V2.5H10.0148Z"
        fill="#283841"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.0222 2.5H36.3037C43.2175 2.5 48.8222 8.09644 48.8222 15C48.8222 21.9036 43.2175 27.5 36.3037 27.5H25.037V40H15.0222V2.5ZM25.037 17.5H36.3037C37.6865 17.5 38.8074 16.3807 38.8074 15C38.8074 13.6193 37.6865 12.5 36.3037 12.5H25.037V17.5Z"
        fill="#283841"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M86.3778 2.5V21.875C86.3778 26.3623 90.0208 30 94.5148 30C99.0088 30 102.652 26.3623 102.652 21.875V2.5H112.667V21.875C112.667 31.8852 104.54 40 94.5148 40C84.4898 40 76.363 31.8852 76.363 21.875V2.5H86.3778Z"
        fill="#283841"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M52.5778 20C52.5778 10.335 60.4244 2.5 70.1037 2.5H72.6074V12.5H70.1037C65.9554 12.5 62.5926 15.8579 62.5926 20V21.25C62.5926 31.6053 54.1855 40 43.8148 40H42.563V30H43.8148C48.6545 30 52.5778 26.0825 52.5778 21.25V20Z"
        fill="#283841"
      ></path>
      <path
        d="M169 3.75C169 5.82107 167.319 7.5 165.244 7.5C163.17 7.5 161.489 5.82107 161.489 3.75C161.489 1.67893 163.17 0 165.244 0C167.319 0 169 1.67893 169 3.75Z"
        fill="#283841"
      ></path>
      <path
        d="M123.42 40L128.199 20.0181L131.752 32.0393C133.87 39.2091 144.041 39.2091 146.16 32.0393L149.712 20.0181L154.491 40H164.787L157.273 8.57949C155.486 1.10744 144.941 0.830781 142.763 8.19891L138.956 21.0833L135.148 8.19892C132.971 0.830824 122.425 1.1074 120.638 8.57948L113.124 40H123.42Z"
        fill="#283841"
      ></path>
    </svg>
  );
}
