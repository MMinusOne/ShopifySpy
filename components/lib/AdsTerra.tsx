"use client";

import { useEffect, useRef } from "react";

interface AdsterraAdProps {
  atOptions: {
    key: string;
    format: string;
    height: number;
    width: number;
    params: Record<string, unknown>;
  };
}

const AdsterraAd: React.FC<AdsterraAdProps> = ({ atOptions }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const script1 = document.createElement("script");
      script1.innerHTML = `atOptions = ${JSON.stringify(atOptions)};`;
      containerRef.current.appendChild(script1);

      const script2 = document.createElement("script");
      script2.src = `//www.topcpmcreativeformat.com/${atOptions.key}/invoke.js`;
      script2.async = true;
      containerRef.current.appendChild(script2);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [atOptions]);

  return <div ref={containerRef} />;
};

export default AdsterraAd;
