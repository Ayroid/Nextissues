"use client";

import classnames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoBug } from "react-icons/io5";
import { Box } from "@radix-ui/themes";
import { useSession } from "next-auth/react";

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

  const pathname = usePathname();
  const { status, data: session } = useSession();

  return (
    <div className="flex px-5 h-16 border-b mb-5 space-x-5 items-center">
      <Link href={"/"}>
        <IoBug />
      </Link>
      <ul className="flex space-x-5">
        {links.map((link) => (
          <li
            key={link.href}
            className={classnames("transition-colors", "hover:text-zinc-800", {
              "text-zinc-800": pathname === link.href,
              "text-zinc-500": pathname !== link.href,
            })}
          >
            <Link href={link.href}>{link.name}</Link>
          </li>
        ))}
      </ul>
      <Box>
        <ul className="flex space-x-5">
          {status === "authenticated" ? (
            <li className="transition-colors hover:text-zinc-800">
              <Link href="/api/auth/signout">Sign Out</Link>
            </li>
          ) : (
            <li className="transition-colors hover:text-zinc-800">
              <Link href="/api/auth/signin">Sign In</Link>
            </li>
          )}
        </ul>
      </Box>
    </div>
  );
};

export default Navbar;
