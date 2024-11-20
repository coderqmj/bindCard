import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import Buy from "./mian";
import BindCardIndex from "./_options/BindCard";

export const BuyRoute = () => {
  return (
    <Provider store={store}>
      <Buy />
      <BindCardIndex />
    </Provider>
  );
};
