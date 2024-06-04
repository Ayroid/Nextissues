"use client";

import {
  Avatar,
  Box,
  DropdownMenu,
  Flex,
  Skeleton,
  Text,
} from "@radix-ui/themes";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoBug } from "react-icons/io5";

const Navbar = () => {
  return (
    <div className="flex px-5 h-16 border-b mb-5 items-center">
      <Flex justify="between" className="w-full">
        <Flex align="center" gap="5">
          <Link href={"/"}>
            <IoBug />
          </Link>
          <NavLinks />
        </Flex>
        <AuthStatus />
      </Flex>
    </div>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === "loading")
    return <Skeleton className="h-8 w-8 !rounded-full" />;

  if (status === "unauthenticated") {
    return (
      <Box>
        <ul className="flex space-x-5">
          <li className="nav-link">
            <Link href="/api/auth/signin">Sign In</Link>
          </li>
        </ul>
      </Box>
    );
  }

  return (
    <Box>
      <ul className="flex space-x-5">
        <li className="transition-colors hover:text-zinc-800">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Avatar
                src={session!.user?.image!}
                fallback="?"
                size="2"
                radius="full"
                className="cursor-pointer"
              />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content className="min-w-56">
              <DropdownMenu.Label className="gap-2 mt-2 mb-4">
                <Avatar
                  src={session!.user?.image!}
                  fallback="?"
                  size="2"
                  radius="full"
                  className="cursor-pointer"
                />
                <Text className="font-bold text-zinc-800">
                  {session!.user?.name}
                </Text>
              </DropdownMenu.Label>
              <Link href="/api/auth/signout">
                <DropdownMenu.Item>Sign Out</DropdownMenu.Item>
              </Link>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </li>
      </ul>
    </Box>
  );
};

const NavLinks = () => {
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

  return (
    <ul className="flex space-x-5">
      {links.map((link) => (
        <li
          key={link.href}
          className={classnames("nav-link", {
            "!text-zinc-800": pathname === link.href,
          })}
        >
          <Link href={link.href}>{link.name}</Link>
        </li>
      ))}
    </ul>
  );
};

export default Navbar;
