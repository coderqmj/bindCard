import React from "react";
import { Modal, Stepper } from "tea-component";
import { useAppDispatch, useAppSelector } from "../../store";
import { buy, setIsShow } from "../../indexSlice";
import BindCard from "./BindCard";
import Step2 from "./Step2";
import ConfirmStep from "./ConfirmStep";

interface BindCardProps {
  title?: string;
  cardHoldConfig?: "address" | "firstName" | "lastName"[];
}
export default function BindCardIndex(props: BindCardProps) {
  const dispatch = useAppDispatch();
  const { title = "输入卡片信息", cardHoldConfig } = props;

  const { isShow, steps, currentStep, payType } = useAppSelector(buy);
  const filterSteps = steps.filter((item) => item.payTypes.includes(payType));

  if (!isShow) return <div></div>;
  return (
    <Modal
      caption={title}
      visible={isShow}
      onClose={() => dispatch(setIsShow(false))}
    >
      <Stepper steps={filterSteps} current={currentStep} />
      {currentStep === "step1" && <BindCard />}
      {currentStep === "step2" && <Step2 />}
      {currentStep === "step3" && <ConfirmStep />}
    </Modal>
  );
}
