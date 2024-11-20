import React, { useEffect } from "react";
import Pay from "@pay-com/js";
export default function PayCom() {
  useEffect(() => {
    getInstance();
  }, []);

  const getInstance = async () => {
    const pay = await Pay.com({
      // identifier: "453112418311078912",
      identifier: "453112418311078912",
    });
    const checkout = pay.checkout({
      clientSecret:
        "eyJhbGciOiJIUzUxMiJ9.eyJtaWQiOiI0NTMxMTI0MTgzMTEwNzg5MTIiLCJzaWQiOiIxMTExMTExMTExMTExMTExMTEiLCJjaWQiOiI1MTE4MzU5MTQ0MzYwODQ3MzYiLCJhaWQiOiIwMUpDSkRYQTc0NzM4QVc2R1hIMDJBSzcxUyIsInB5bW50IjoiVkVSSUZJQ0FUSU9OIiwidHlwIjoiSldUIiwibWF0Ijo1LCJqdGkiOiIwMUpDSkRYQThWU0VOWkpDR0hOMEVQRzhYMCIsInN1YiI6IjUxMTgzNTkxNzkwODk2OTQ3MiIsImF1ZCI6IjQ1MzExMjQxNzAyMzQyODYwOCIsImlzcyI6IkBwYXktY29tL3BheW1lbnQtZ2F0ZXdheSIsImlhdCI6MTczMTQ5MDM5MiwiZXhwIjoxNzMxNDkzOTkyfQ.3F8dFilzS26SPLhOyB2o1WJPJVFO35sZHDeDgqA1T8i12uzzT-Lc9Vpa3HbLpm-xTmBjPkkyiX1wbdyTvd5zCA",
      // "eyJhbGciOiJIUzUxMiJ9.eyJtaWQiOiI0NTMxMTI0MTgzMTEwNzg5MTIiLCJzaWQiOiIxMTExMTExMTExMTExMTExMTEiLCJjaWQiOiI0Nzg3NjI0ODMyNDMyODk2MDAiLCJhaWQiOiIwMUpDRldOU1ZQWEQ3NkVEVkFCR1cyNjU3OSIsInB5bW50IjoiU0FMRSIsInR5cCI6IkpXVCIsIm1hdCI6NSwianRpIjoiMDFKQ0ZXTlRGTTdXR0RXVkVCUjRNWUJHTVciLCJzdWIiOiI1MTE0Nzg2NDM4MTg0OTYwMDAiLCJhdWQiOiI0NTMxMTI0MTcwMjM0Mjg2MDgiLCJpc3MiOiJAcGF5LWNvbS9wYXltZW50LWdhdGV3YXkiLCJpYXQiOjE3MzE0MDUyMTIsImV4cCI6MTczMTQwODgxMn0.ZUKCNe3R9MLtdCRLWmNB41u4QOO4j9ladoM98Ui5bzzy60BaRyT94kuf5OLe9SZm02o9_0bCypMsumVA0IZG9Q",

      onFailure: (error) => {
        console.log("checkout error", error);
      },
      onSuccess: (payment) => {
        console.log("checkout payment", payment);
      },
    });

    // checkout
    //   .universal({
    //     container: "#paycom_checkout",
    //   })
    //   .then((res) => {
    //     console.log("res", res);
    //   })
    //   .catch((err) => {
    //     console.log("err", err);
    //   });

    //只能使用一个
    // checkout
    //   .paypal({
    //     container: "#paycom_checkout",
    //     onClickValidation: () => Promise.resolve(true),
    //   })
    //   .then((res) => {
    //     console.log("rrr", res);
    //   });

    checkout
      .render({ container: "#paycom_checkout", button: true })
      .then((res) => {
        console.log("1212121", res);
      })
      .catch((err) => {
        console.log("errrr", err);
      });

    // 也需要token授权才行 https://js.dev.pay.com/api/internal/update-details
    checkout
      .updateTransactionDetails({
        successUrl: "www.baidu.com",
        failureUrl: "wwww.google.com",
      })
      .then((res) => {
        console.log("updateTransactionDetails", res);
      })
      .catch((err) => {
        console.log("updateTransactionDetails err", err);
      });

    console.log("checkout", checkout);

    console.log("pay", pay);
  };
  return (
    <div id="paycom_checkout">
      <div id="card-number"></div>
      <div id="expiry-date"></div>
      <div id="cvv"></div>
    </div>
  );
}
