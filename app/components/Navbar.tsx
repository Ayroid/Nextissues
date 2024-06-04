"use client";

import {
  Avatar,
  Box,
  DropdownMenu,
  Flex,
  Text
} from "@radix-ui/themes";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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

  const pathname = usePathname();
  const { status, data: session } = useSession();

  return (
    <div className="flex px-5 h-16 border-b mb-5 items-center">
      <Flex justify="between" className="w-full">
        <Flex align="center" gap="5">
          <Link href={"/"}>
            <IoBug />
          </Link>
          <ul className="flex space-x-5">
            {links.map((link) => (
              <li
                key={link.href}
                className={classnames(
                  "transition-colors",
                  "hover:text-zinc-800",
                  {
                    "text-zinc-800": pathname === link.href,
                    "text-zinc-500": pathname !== link.href,
                  }
                )}
              >
                <Link href={link.href}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </Flex>
        <Box>
          <ul className="flex space-x-5">
            {status === "authenticated" ? (
              <li className="transition-colors hover:text-zinc-800">
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger>
                    <Avatar
                      src={session.user?.image!}
                      fallback="?"
                      size="2"
                      radius="full"
                      className="cursor-pointer"
                    />
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content>
                    <DropdownMenu.Label className="gap-2 mt-2 mb-4">
                      <Avatar
                        src={session.user?.image!}
                        fallback="?"
                        size="2"
                        radius="full"
                        className="cursor-pointer"
                      />
                      <Text>{session.user?.name}</Text>
                    </DropdownMenu.Label>
                    <DropdownMenu.Item>
                      <Link href="/api/auth/signout">Sign Out</Link>
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>

                {/* <Link href="/api/auth/signout">Sign Out</Link> */}
              </li>
            ) : (
              <li className="transition-colors hover:text-zinc-800">
                <Link href="/api/auth/signin">Sign In</Link>
              </li>
            )}
          </ul>
        </Box>
      </Flex>
    </div>
  );
};

export default Navbar;
