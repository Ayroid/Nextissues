import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Flex, Button, Text } from "@radix-ui/themes";
import React from "react";

interface Props {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
}

const Pagination = ({ currentPage, totalPages, itemsPerPage }: Props) => {
  const pageCount = Math.ceil(totalPages / itemsPerPage);
  return (
    <Flex align="center" gap="2">
      <Text>
        Page {currentPage} of {pageCount}
      </Text>
      <Button color="gray" variant="outline" disabled={currentPage === 1}>
        <DoubleArrowLeftIcon />
      </Button>
      <Button color="gray" variant="outline" disabled={currentPage === 1}>
        <ChevronLeftIcon />
      </Button>

      <Button
        color="gray"
        variant="outline"
        disabled={currentPage === pageCount}
      >
        <ChevronRightIcon />
      </Button>
      <Button
        color="gray"
        variant="outline"
        disabled={currentPage === pageCount}
      >
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;
