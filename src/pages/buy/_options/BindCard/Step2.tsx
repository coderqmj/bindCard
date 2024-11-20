import React, { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Button, Col, Form, Input, Row } from "tea-component";
import { useAppSelector } from "../../store";
import {
  buy,
  setCardholder,
  setCardholderValid,
  setCurrentStep,
  setShowTokenized,
} from "../../indexSlice";
import { hasXSSRisk } from "src/utils";
import { Notification, rem } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";

export default function Step2() {
  const dispatch = useDispatch();
  const { cardholder, cardholderValid, showTokenized } = useAppSelector(buy);

  const isCardholderValid = useMemo(
    () =>
      Boolean(
        cardholder.address && cardholder.firstName && cardholder.lastName
      ),
    [cardholder]
  );

  const isRisk = useMemo(
    () =>
      Boolean(
        cardholderValid.address.errorMessage ||
          cardholderValid.firstName.errorMessage ||
          cardholderValid.lastName.errorMessage
      ),
    [cardholderValid]
  );

  useEffect(() => {
    // if (!showTokenized) {
    setTimeout(() => {
      dispatch(setShowTokenized(false));
    }, 2000);
  }, []);

  return (
    <>
      {showTokenized && (
        <Notification
          icon={<IconCheck style={{ width: rem(20), height: rem(20) }} />}
          color="teal"
          style={{
            position: "absolute",
            top: 100,
            left: "50%",
            width: "333px",
            transform: "translateX(-50%)",
          }}
          withCloseButton={false}
          title="卡片验证"
        >
          您的卡片已经卡片验证通过
        </Notification>
      )}
      <Form layout="vertical" style={{ marginTop: "20px" }}>
        <Row>
          <Col span={12}>
            <Form.Item
              label="First name"
              status={cardholderValid.firstName.status || undefined}
              message={cardholderValid.firstName.errorMessage || undefined}
            >
              <Input
                value={cardholder.firstName}
                onChange={(value) => {
                  dispatch(setCardholder({ ...cardholder, firstName: value }));
                  const isRisk = hasXSSRisk(value);
                  const firstNameValid = {
                    status: isRisk ? "error" : null,
                    errorMessage: isRisk
                      ? "您输入的字符串可能有XSS风险，请重新输入"
                      : null,
                  };
                  dispatch(
                    setCardholderValid({
                      ...cardholderValid,
                      firstName: firstNameValid,
                    })
                  );
                }}
                placeholder="Please enter first name"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Last name"
              status={cardholderValid.lastName.status || undefined}
              message={cardholderValid.lastName.errorMessage || undefined}
            >
              <Input
                value={cardholder.lastName}
                onChange={(value) => {
                  dispatch(setCardholder({ ...cardholder, lastName: value }));
                  const isRisk = hasXSSRisk(value);
                  const lastNameValid = {
                    status: isRisk ? "error" : null,
                    errorMessage: isRisk
                      ? "您输入的字符串可能有XSS风险，请重新输入"
                      : null,
                  };
                  dispatch(
                    setCardholderValid({
                      ...cardholderValid,
                      lastName: lastNameValid,
                    })
                  );
                }}
                placeholder="Please enter first name"
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Address"
              status={cardholderValid.address.status || undefined}
              message={cardholderValid.address.errorMessage || undefined}
            >
              <Input
                value={cardholder.address}
                onChange={(value) => {
                  dispatch(setCardholder({ ...cardholder, address: value }));
                  const isRisk = hasXSSRisk(value);
                  const addressValid = {
                    status: isRisk ? "error" : null,
                    errorMessage: isRisk
                      ? "您输入的字符串可能有XSS风险，请重新输入"
                      : null,
                  };
                  dispatch(
                    setCardholderValid({
                      ...cardholderValid,
                      address: addressValid,
                    })
                  );
                }}
                size="l"
                placeholder="Please enter address"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Form.Action>
        <Button
          type="primary"
          disabled={!isCardholderValid || isRisk}
          tooltip={
            !isCardholderValid
              ? "请输入完整表单"
              : isRisk
              ? "您输入的字符串可能有XSS风险，请重新输入"
              : ""
          }
          style={{ width: "80%" }}
          onClick={() => {
            dispatch(setCurrentStep("step3"));
          }}
        >
          下一步
        </Button>
      </Form.Action>
    </>
  );
}
