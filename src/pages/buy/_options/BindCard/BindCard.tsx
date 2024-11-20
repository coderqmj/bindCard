import React, { useEffect, useState } from "react";
import { CardNumber, Cvv, ExpiryDate, Frames } from "frames-react";
import { Button, message } from "tea-component";
import { useDispatch } from "react-redux";
import {
  buy,
  setCurrentStep,
  setIsCardValid,
  setShowTokenized,
} from "../../indexSlice";
import { useAppSelector } from "../../store";
import { LoadingOverlay, Notification, rem } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";

export default function BindCard() {
  const dispatch = useDispatch();
  const { isCardValid } = useAppSelector(buy);
  const [isLoading, setIsLoading] = useState(true);
  const [messageInfo, setMessageInfo] = useState({
    submitting: false,
    showTokenized: false,
  });

  // const [showTokenized, setShowTokenized] = useState(false);
  // console.log("showTokenized", showTokenized);

  console.log("messageInfo", messageInfo);

  useEffect(() => {
    Frames.addEventHandler("ready", () => {
      setIsLoading(false);
    });
    return () => {
      Frames.removeAllEventHandlers("ready");
    };
  }, [Frames]);

  // if (isLoading) return <LoadingComponent />;

  return (
    <>
      {messageInfo.submitting && (
        <Notification
          style={{ position: "absolute", top: 100, width: "333px" }}
          loading
          withCloseButton={false}
          title="绑定卡片"
        >
          正在绑定卡片中
        </Notification>
      )}

      <LoadingOverlay
        visible={isLoading}
        loaderProps={{ children: "初始化信息中..." }}
      />
      <div
        style={{
          marginTop: "40px",
          // visibility: isLoading ? "hidden" : "visible",
          // height: isLoading ? 0 : "auto",
        }}
      >
        <Frames
          config={{
            publicKey: "pk_sbox_oa3hhgigd27thnwvybubeia34al",
            modes: ["cvv_optional"],
            acceptedPaymentMethods: [
              "Visa",
              "Maestro",
              "Mastercard",
              "American Express",
              "Diners Club",
              "Discover",
              "JCB",
              "Mada",
            ],
            localization: {
              cardNumberPlaceholder: "Card number",
              expiryMonthPlaceholder: "MM",
              expiryYearPlaceholder: "YY",
              cvvPlaceholder: "CVV",
            },
            style: {
              base: {
                fontSize: "17px",
              },
            },
          }}
          ready={() => {}}
          frameActivated={(e) => {}}
          frameFocus={(e) => {}}
          frameBlur={(e) => {}}
          frameValidationChanged={(e) => {
            console.log("frameValidationChanged", e);
          }}
          paymentMethodChanged={(e) => {
            console.log("EEEE", e);
          }}
          cardValidationChanged={(e) => {
            const { isValid } = e;
            console.log("cardValidationChanged", e);
            // 监听卡的校验
            console.log("cardValidationChanged", isValid);
            dispatch(setIsCardValid(isValid));
          }}
          cardSubmitted={() => {
            setMessageInfo({ ...messageInfo, submitting: true });
          }}
          cardTokenized={(e) => {
            console.log("cardTokenized", e);
            // message.success({ content: `cardTokenized: ${e.token}` });
            // setMessageInfo({ ...messageInfo, showTokenized: true });
            // setTimeout(() => {
            //   setMessageInfo({ ...messageInfo, showTokenized: false });
            // }, 2000);
            dispatch(setShowTokenized(true));
            dispatch(setCurrentStep("step2"));
          }}
          cardTokenizationFailed={(e) => {
            console.log("cardTokenizationFailed", e);
          }}
          cardBinChanged={(e) => {}}
        >
          <label htmlFor="card-number">Card number</label>
          <CardNumber />
          <div className="date-and-code" style={{ marginTop: "20px" }}>
            <ExpiryDate />
            <Cvv />
          </div>
          {/* Or if you want to   use single frames: */}
          {/* <CardFrame /> */}

          {/* <button
          id="pay-button"
          disabled={!isCardValid}
          // disabled={!Frames.isCardValid}
          onClick={(e) => {}}
        >
          下一步
        </button> */}
        </Frames>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            marginTop: "20px",
          }}
        >
          <Button
            type="primary"
            style={{ width: "80%" }}
            disabled={!isCardValid}
            onClick={() => {
              // message.loading({ content: "提交中" });
              setMessageInfo({ ...messageInfo, submitting: true });
              // e.preventDefault();
              Frames.submitCard();
            }}
          >
            下一步
          </Button>
        </div>
      </div>
    </>
  );
}
