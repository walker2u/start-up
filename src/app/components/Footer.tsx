import React from "react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
      <div className="container mx-auto text-center text-gray-500">
        <Link
          href="/privacy-policy"
          className="mx-2 hover:text-white transition-colors"
        >
          Privacy Policy
        </Link>
        <span className="mx-2">|</span>
        <Link
          href="/terms-of-service"
          className="mx-2 hover:text-white transition-colors"
        >
          Terms of Service
        </Link>
      </div>
    </footer>
  );
};
