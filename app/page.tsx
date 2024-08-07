"use client"

import React from "react";
    import {Image} from "@nextui-org/react";
    import NextImage from "next/image";

export default function App() {
      return (
        <Image
          as={NextImage}
          width={300}
          height={200}
          src="/logo.png"
          alt="Logo"
        />
      );
    }
