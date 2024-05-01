import * as React from "react";

export default function FadeAnimate({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="animate-fade-down">{children}</div>;
}
