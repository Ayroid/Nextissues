import { link } from "fs";
import Link from "next/link";
import React from "react";
import { IoBug } from "react-icons/io5";

const Navbar = () => {
  const links = [
    {
      name: "Dashboard",
      href: "/",
    },
    {
      name: "Issues",
      href: "/issues",
    },
  ];

  return (
    <div className="flex px-5 h-16 border-b mb-5 space-x-5 items-center">
      <Link href={"/"}>
        <IoBug />
      </Link>
      <ul className="flex space-x-5">
        {links.map((link) => (
          <li
            key={link.href}
            className="text-zinc-500 hover:text-zinc-800 transition-colors"
          >
            <Link href={link.href}>{link.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
