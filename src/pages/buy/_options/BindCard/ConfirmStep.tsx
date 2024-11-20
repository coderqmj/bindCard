import React from "react";
import { useDispatch } from "react-redux";
import { Button, Form } from "tea-component";
import { useAppSelector } from "../../store";
import { buy, setInit } from "../../indexSlice";
import { getRandomStr } from "src/utils";

export default function ConfirmStep() {
  const dispatch = useDispatch();
  const { buyParams, cryptoCount, payType } = useAppSelector(buy);
  const handleClick = async () => {
    const risk = window.Risk.init("pk_sbox_oa3hhgigd27thnwvybubeia34al");
    const deviceSessionId = await risk.publishRiskData();
    console.log({
      ...buyParams,
      token: getRandomStr(),
      deviceSessionId: "dsid_35actk",
      cryptoAmount: cryptoCount,
    });
    dispatch(setInit());
  };
  return (
    <>
      <Form style={{ marginTop: "20px" }}>
        <Form.Item label="支付金额：">
          <Form.Text>{`${buyParams.amount} ${buyParams.fiat}`}</Form.Text>
        </Form.Item>
        <Form.Item label={payType !== "card" ? "实际获得：" : "预计获得："}>
          <Form.Text>{`${cryptoCount} ${buyParams.crypto}`}</Form.Text>
        </Form.Item>
      </Form>
      <Form.Action>
        <Button type="primary" onClick={handleClick} style={{ width: "80%" }}>
          {payType !== "card" ? "确认" : "提交"}
        </Button>
      </Form.Action>
    </>
  );
}
