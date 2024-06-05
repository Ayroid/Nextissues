"use client";

import {
  QueryClient,
  QueryClientProvider as ReactQueryClientProvider,
} from "@tanstack/react-query";
const queryClient = new QueryClient();

interface Props {
  children: React.ReactNode;
}

const QueryClientProvider = ({ children }: Props) => {
  return (
    <ReactQueryClientProvider client={queryClient}>
      {children}
    </ReactQueryClientProvider>
  );
};

export default QueryClientProvider;
