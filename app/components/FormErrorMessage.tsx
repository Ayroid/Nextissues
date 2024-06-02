import React, { ReactNode } from "react";
import { Text } from "@radix-ui/themes";

interface Props {
  children: ReactNode;
}

const FormErrorMessage = ({ children }: Props) => {
  if (!children) return null;
  return (
    <Text color="red" as="p">
      {children}
    </Text>
  );
};

export default FormErrorMessage;
