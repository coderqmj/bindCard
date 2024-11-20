import "./App.css";
import { Layout } from "tea-component";
import RoutesRegister from "./app.routes";
import React from "react";
import { MantineProvider } from "@mantine/core";

const { Body, Content } = Layout;

function App() {
  return (
    <MantineProvider>
      <Layout className="demo-layout">
        <Body>
          <Content>
            <Content.Header title="卡买币"></Content.Header>
            <Content.Body>
              <RoutesRegister />
            </Content.Body>
          </Content>
        </Body>
      </Layout>
    </MantineProvider>
  );
}

export default App;
