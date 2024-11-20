import React from "react";
import { Status, Card } from "tea-component";

export default function LoadingComponent() {
  return (
    <>
      <div className="example-stage">
        <Card>
          <Status
            // @ts-ignore
            icon="loading"
            // @ts-ignore
            size="m"
            title={"加载中..."}
            description="该状态的详细描述"
          />
        </Card>
      </div>
    </>
  );
}
