import clsx from "clsx";
import React from "react";
interface Props {
  children: React.ReactNode;
  props?: string;
}
const ContentWrapper: React.FC<Props> = ({ children, props }) => {
  return (
    <div className={clsx("max-w-7xl mx-auto px-8 py-12 min-h-screen", props)}>
      {children}
    </div>
  );
};

export default ContentWrapper;
