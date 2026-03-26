"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const usePathWithHash = () => {
  const pathname = usePathname();
  const [hash, setHash] = useState("");

  useEffect(() => {
    const updateHash = () => {
      setHash(window.location.hash);
    };

    updateHash();
    window.addEventListener("hashchange", updateHash);

    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  return {
    pathname,
    hash,
    fullPath: `${pathname}${hash}`,
  };
};
