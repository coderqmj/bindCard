import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { BuyParams } from "../../common/interface";

const init = {
  loading: false,
  isShow: false,
  steps: [
    { id: "step1", label: "绑卡第一步" },
    { id: "step2", label: "绑卡第二步" },
    { id: "step3", label: "确认信息" },
  ],
  currentStep: "step1",
  isCardValid: false,
  cardholder: {
    firstName: "",
    lastName: "",
    address: "",
  },
  cardholderValid: {
    firstName: {
      status: null,
      errorMessage: "",
    },
    lastName: {
      status: null,
      errorMessage: "",
    },
    address: {
      status: null,
      errorMessage: "",
    },
  },
  buyParams: { fiat: "EUR", amount: "", crypto: "USDT" } as BuyParams,
  cryptoCount: "",
  fetchId: 1,
};

export const indexSlice = createSlice({
  name: "indexSlice",
  initialState: {
    loading: false,
    isShow: false,
    steps: [
      { id: "step1", label: "绑卡第一步", payTypes: ["card"] },
      { id: "step2", label: "绑卡第二步", payTypes: ["card"] },
      { id: "step3", label: "确认信息", payTypes: ["card", "google", "apple"] },
    ],
    currentStep: "step1",
    isCardValid: false,
    cardholder: {
      firstName: "",
      lastName: "",
      address: "",
    },
    cardholderValid: {
      firstName: {
        status: null,
        errorMessage: "",
      },
      lastName: {
        status: null,
        errorMessage: "",
      },
      address: {
        status: null,
        errorMessage: "",
      },
    },
    buyParams: { fiat: "EUR", amount: "", crypto: "USDT" } as BuyParams,
    cryptoCount: "",
    fetchId: 1,
    googlePayConfig: {
      apiVersion: 2,
      apiVersionMinor: 0,
      allowedPaymentMethods: [
        {
          type: "CARD",
          parameters: {
            allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
            allowedCardNetworks: ["MASTERCARD", "VISA"],
          },
          tokenizationSpecification: {
            type: "PAYMENT_GATEWAY",
            parameters: {
              gateway: "checkoutltd",
              gatewayMerchantId: "your_checkout_com_merchant_id",
            },
          },
        },
      ],
      merchantInfo: {
        merchantId: "your_google_pay_merchant_id",
        merchantName: "Your Business Name",
      },
      transactionInfo: {
        totalPriceStatus: "FINAL",
        totalPrice: "10.00",
        currencyCode: "EUR",
      },
    },
    // Apple Pay
    isShowApplePay: false,
    payType: "card" as "apple" | "google" | "card",
    showTokenized: false,
  },
  reducers: {
    setIsShow: (state, action) => {
      state.isShow = action.payload;
    },
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    setIsCardValid: (state, action) => {
      state.isCardValid = action.payload;
    },
    setCardholder: (state, action) => {
      state.cardholder = action.payload;
    },
    setBuyParams: (state, action) => {
      state.buyParams = action.payload;
    },
    setCryptoCount: (state, action) => {
      state.cryptoCount = action.payload;
    },
    setFetchId: (state, action) => {
      state.fetchId = action.payload;
    },
    setCardholderValid: (state, action) => {
      state.cardholderValid = action.payload;
    },
    setGooglePayConfig: (state, action) => {
      state.googlePayConfig = action.payload;
    },
    setInit: (state) => {
      state.isShow = false;
      state.currentStep = "step1";
      state.buyParams = init.buyParams;
      state.cryptoCount = init.cryptoCount;
    },
    setShowApplePay: (state, action) => {
      state.isShowApplePay = action.payload;
    },
    setPayType: (state, action) => {
      state.payType = action.payload;
    },
    setShowTokenized: (state, action) => {
      state.showTokenized = action.payload;
    },
  },
  selectors: {
    isCardholderValid: ({ cardholder }) => {
      const { address, firstName, lastName } = cardholder;
      return address && firstName && lastName;
    },
  },
});

export const buy = (state: RootState) => state.buy;

export const {
  setIsShow,
  setIsCardValid,
  setCurrentStep,
  setCardholder,
  setBuyParams,
  setCryptoCount,
  setFetchId,
  setCardholderValid,
  setInit,
  setGooglePayConfig,
  setShowApplePay,
  setPayType,
  setShowTokenized,
} = indexSlice.actions;

export const buyReducer = indexSlice.reducer;
