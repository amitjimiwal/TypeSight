import handleCheckout from "@/api/payment/handleCheckout";
import { useAuthStatus } from "@/hooks/useAuthStatus";
import { useSubscription } from "@/hooks/useSubscription";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SubscribeButton = () => {
  const { isProUser } = useSubscription();
  const { status } = useAuthStatus();
  const [sessionUrl, setSessionUrl] = useState<string>("");
  const navigate = useNavigate();
  useEffect(() => {
    if (status) {
      handleCheckout()
        .then((redirect_url) => {
          console.log(redirect_url);
          setSessionUrl(redirect_url);
        })
        .catch(() => {
          toast.error("Error in Generating you session Url");
        });
    }
  }, [status]);
  return (
    <Button
      className="w-full bg-gradient-to-r from-pink-500 to-purple-500"
      onClick={() => {
        if (!status) {
          navigate("/login");
        } else {
          window.location.href = sessionUrl;
        }
      }}
    >
      {status && isProUser ? "Manage Subscription" : "Subscribe Now"}
    </Button>
  );
};

const SubscriptionButton = React.memo(SubscribeButton);
export default SubscriptionButton;
