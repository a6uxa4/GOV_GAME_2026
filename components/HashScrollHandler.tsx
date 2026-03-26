"use client";

import { useEffect } from "react";

function getNormalizedHash(rawHash: string) {
  const parts = rawHash.split("#").filter(Boolean);

  if (parts.length === 0) {
    return "";
  }

  return `#${parts[parts.length - 1]}`;
}

export const HashScrollHandler = () => {
  useEffect(() => {
    const scrollToHashTarget = () => {
      const normalizedHash = getNormalizedHash(window.location.hash);

      if (!normalizedHash) {
        return;
      }

      const id = decodeURIComponent(normalizedHash.slice(1));
      const target = document.getElementById(id);

      if (!target) {
        return;
      }

      if (window.location.hash !== normalizedHash) {
        window.history.replaceState(null, "", `${window.location.pathname}${normalizedHash}`);
      }

      target.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    scrollToHashTarget();
    window.addEventListener("hashchange", scrollToHashTarget);

    return () => {
      window.removeEventListener("hashchange", scrollToHashTarget);
    };
  }, []);

  return null;
};
