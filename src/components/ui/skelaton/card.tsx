import React from "react";
import { Card, Skeleton, Button } from "@nextui-org/react";

export default function CardSkelaton() {
  return (
    <div className="flex flex-col gap-3">
      <Card className="w-[200px] space-y-5 p-4 bg-modalColor" radius="lg">
        <Skeleton className="rounded-lg" style={{ background: "gray" }}>
          <div className="h-24 rounded-lg "></div>
        </Skeleton>
        <div className="space-y-3">
          <Skeleton
            className="w-3/5 rounded-lg "
            style={{ background: "gray" }}
          >
            <div className="h-3 w-full rounded-lg "></div>
          </Skeleton>
          <Skeleton className="w-4/5 rounded-lg" style={{ background: "gray" }}>
            <div className="h-3 w-full rounded-lg bg-black"></div>
          </Skeleton>
          <Skeleton className="w-2/5 rounded-lg" style={{ background: "gray" }}>
            <div className="h-3 w-full rounded-lg bg-black"></div>
          </Skeleton>
        </div>
      </Card>
    </div>
  );
}
