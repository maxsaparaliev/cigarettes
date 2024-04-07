import { Container, Flex, MantineProvider } from "@mantine/core";
import "../styles/globals.css";
import React, { useEffect } from "react";
import { AppProps } from "next/app";
import "@mantine/core/styles.css";
import { Header } from "@/components/header/header";
import { Sidebar } from "@/components/sidebar/sidebar";
import { Provider, useDispatch } from "react-redux";
import { store } from "@/store/store";

type NextPageComponent<P = {}> = React.FC<P> & {
  getInitialProps?: (ctx: any) => Promise<any>;
};

type PageProps = Record<string, any>; // Define your specific types for pageProps if needed

type MyAppProps = AppProps & {
  Component: NextPageComponent<PageProps>;
  pageProps: PageProps;
};

function MyApp({ Component, pageProps }: MyAppProps) {
  return (
    <Provider store={store}>
      <MantineProvider>
        <Container size="xl" style={{ minHeight: "100vh" }}>
          <Header />
          <Flex justify={"space-between"} direction={"row"}>
            <Sidebar />
            <Container
              fluid
              style={{ width: "100%", paddingTop: 16, paddingBottom: 16 }}
            >
              <Component {...pageProps} />
            </Container>
          </Flex>
        </Container>
      </MantineProvider>
    </Provider>
  );
}

export default MyApp;
