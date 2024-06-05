"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Flex, Button, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface Props {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
}

const Pagination = ({ currentPage, totalItems, itemsPerPage }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageCount = Math.ceil(totalItems / itemsPerPage);

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push("?" + params.toString());
  };

  return (
    <Flex align="center" gap="2">
      <Button
        color="gray"
        variant="outline"
        disabled={currentPage === 1}
        onClick={() => changePage(1)}
      >
        <DoubleArrowLeftIcon />
      </Button>
      <Button
        color="gray"
        variant="outline"
        disabled={currentPage === 1}
        onClick={() => changePage(currentPage - 1)}
      >
        <ChevronLeftIcon />
      </Button>

      <Text mx="5">
        Page {currentPage} of {pageCount}
      </Text>

      <Button
        color="gray"
        variant="outline"
        disabled={currentPage === pageCount}
        onClick={() => changePage(currentPage + 1)}
      >
        <ChevronRightIcon />
      </Button>
      <Button
        color="gray"
        variant="outline"
        disabled={currentPage === pageCount}
        onClick={() => changePage(pageCount)}
      >
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;
