import React, { useEffect, useState } from "react";
import { Button, Card, Form, Input, Select, message } from "tea-component";
import { CRYPTO_LIST, FIAT_LIST, RATES } from "../../common/constants";
import { RateType } from "../../common/interface";
import { fiatToCrypto } from "../../utils";
import {
  buy,
  setBuyParams,
  setCryptoCount,
  setCurrentStep,
  setFetchId,
  setIsShow,
  setShowApplePay,
  setPayType,
} from "./indexSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "./store";
import Decimal from "decimal.js";
import PayCom from "./payCom";

const googlePayConfig = {
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
    merchantName: "测试商户",
  },
  transactionInfo: {
    totalPriceStatus: "FINAL",
    totalPrice: "10.00",
    currencyCode: "EUR",
  },
};
function Buy() {
  const dispatch = useDispatch();
  const { buyParams, cryptoCount, fetchId, isShowApplePay } =
    useAppSelector(buy);
  const [paymentsClient, setPaymentsClient] = useState<any>(null);
  const [isSupportGooglePay, setIsSupportGooglePay] = useState(false);

  useEffect(() => {
    const { fiat, amount, crypto } = buyParams;
    if (amount) {
      const rateKey: RateType = `${crypto}_${fiat}`;
      const cryptoAmount = fiatToCrypto(amount, RATES[rateKey]);
      dispatch(setCryptoCount(String(cryptoAmount)));
    }
  }, [fetchId]);

  useEffect(() => {
    const paymentsClient = new (window.google &&
      window.google.payments.api.PaymentsClient)({
      environment: "TEST", // 'PRODUCTION' for production use
    });
    setPaymentsClient(paymentsClient);
    paymentsClient
      .isReadyToPay(googlePayConfig)
      .then((response: { result: boolean }) => {
        if (response.result) {
          setIsSupportGooglePay(response.result);
        }
      })
      .catch((err: any) =>
        console.log("Error checking Google Pay readiness1111", err)
      );
  }, [buyParams.amount, googlePayConfig]);

  useEffect(() => {
    if (isSupportGooglePay) {
      const button = paymentsClient.createButton({
        onClick: () => console.log(111),
      });
      if (document.getElementById("gpay-button-online-api-id")) {
        document.getElementById("gpay-button-online-api-id")?.remove();
      }
      document?.getElementById("google-button")?.appendChild(button);
    }
  }, [isSupportGooglePay]);

  const onGooglePaymentButtonClicked = () => {
    message.success({ content: "1111", duration: 1000000 });
    if (buyParams.amount) {
      // 设置支付方式
      dispatch(setPayType("google"));
      paymentsClient
        ?.loadPaymentData(googlePayConfig)
        .then((res: any) => {
          console.log("支付结果", res);
          dispatch(setIsShow(true));
          dispatch(setCurrentStep("step3"));
          // 将 token 发送到后端进行处理
          // handlePayment(
          //   paymentData.paymentMethodData.tokenizationData.token
          // );
        })
        .catch((err: any) =>
          console.log("Error loading Google Pay payment data11:", err)
        );
    } else {
      message.warning({
        content: "请先输入法币数量",
        style: { top: "10%", position: "absolute" },
      });
    }
  };

  useEffect(() => {
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const merchantIdentifier = "your.merchant.identifier"; // 这里需要一个商家标识符
    // window.ApplePaySession.canMakePaymentsWithActiveCard(merchantIdentifier)
    //   .then((canPay: boolean) => {
    //     console.log("canPay", canPay);
    //   })
    //   .catch((err: any) => {
    //     console.log(err);
    //   });

    if (
      isSafari &&
      window.ApplePaySession &&
      window.ApplePaySession.canMakePayments()
    ) {
      // console.log(111);
      // 显示Apple Pay按钮
      dispatch(setShowApplePay(true));
    }
  }, [window.ApplePaySession]);

  return (
    <>
      <Card>
        <Card.Body title="获取报价">
          <Form>
            <Form.Item label="法币">
              <Input
                value={buyParams.amount}
                onBlur={() => {
                  if (!buyParams.amount) return;
                  const amount = new Decimal(buyParams.amount);
                  dispatch(
                    setBuyParams({
                      ...buyParams,
                      amount: amount.toFixed(2),
                    })
                  );
                  googlePayConfig.transactionInfo.totalPrice =
                    amount.toFixed(2);

                  dispatch(setFetchId(fetchId + 1));
                }}
                onChange={(value) =>
                  dispatch(
                    setBuyParams({
                      ...buyParams,
                      amount: value,
                    })
                  )
                }
                placeholder="输入法币数量"
              />

              <Select
                style={{ marginLeft: "5px" }}
                appearance="button"
                options={FIAT_LIST.map((fiat) => ({ text: fiat, value: fiat }))}
                value={buyParams.fiat}
                onChange={(value: any) => {
                  dispatch(setBuyParams({ ...buyParams, fiat: value }));
                  googlePayConfig.transactionInfo.currencyCode = value;
                  // dispatch(
                  //   setGooglePayConfig({
                  //     ...googlePayConfig,
                  //     transactionInfo: {
                  //       ...googlePayConfig.transactionInfo,
                  //       currencyCode: value,
                  //     },
                  //   })
                  // );
                }}
              />
            </Form.Item>

            <Form.Item label="数字货币">
              <Input disabled value={cryptoCount} placeholder="输入法币数量" />
              <Select
                style={{ marginLeft: "5px" }}
                appearance="button"
                options={CRYPTO_LIST.map((crypto) => ({
                  text: crypto,
                  value: crypto,
                }))}
                value={buyParams.crypto}
                onChange={(value: any) =>
                  dispatch(setBuyParams({ ...buyParams, crypto: value }))
                }
              />
            </Form.Item>
          </Form>
          <Form.Action>
            {/* <Button
              onClick={() => {
                paymentsClient
                  ?.loadPaymentData(googlePayConfig)
                  .then((res: any) => {
                    console.log(res);
                    // 将 token 发送到后端进行处理
                    // handlePayment(
                    //   paymentData.paymentMethodData.tokenizationData.token
                    // );
                  })
                  .catch((err: any) =>
                    console.error("Error loading Google Pay payment data:", err)
                  );
              }}
              style={{ display: isSupportGooglePay ? "block" : "none" }}
            >
              Google Pay
            </Button> */}
            <div
              style={{ width: "240px" }}
              onClick={onGooglePaymentButtonClicked}
              id="google-button"
            ></div>
            {isShowApplePay && (
              <button
                id="apple-pay-button"
                onClick={() => {
                  const paymentRequest = {
                    countryCode: "US",
                    currencyCode: "USD",
                    supportedNetworks: ["visa", "masterCard", "amex"],
                    merchantCapabilities: ["supports3DS"],
                    total: {
                      label: "商品名称",
                      amount: "10.00",
                    },
                  };

                  const session = new window.ApplePaySession(3, paymentRequest);

                  // 商家验证
                  session.onvalidatemerchant = (event: any) => {
                    // 发送 event.validationURL 到服务器端进行验证
                    console.log("onvalidatemerchant", event);
                  };

                  // 支付授权
                  session.onpaymentauthorized = (event: any) => {
                    // 处理支付事件，发送支付数据到服务器
                    console.log("onpaymentauthorized", event);
                  };

                  session.begin();
                }}
              ></button>
            )}
            <PayCom />
            <Button
              style={{ marginTop: "20px" }}
              disabled={!buyParams.amount}
              tooltip={!buyParams.amount ? "请输入法币数量" : ""}
              type="primary"
              onClick={() => {
                dispatch(setIsShow(true));
                dispatch(setPayType("card"));
              }}
            >
              添加支付方式
            </Button>
          </Form.Action>
        </Card.Body>
      </Card>
    </>
  );
}

export default Buy;
