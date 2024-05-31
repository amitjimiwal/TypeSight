import { useAuthStatus } from "@/hooks/useAuthStatus";
import { SVGProps } from "react";
import { useNavigate } from "react-router-dom";

const DashboardIcon = () => {
  const navigate = useNavigate();
  const { status, user } = useAuthStatus();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      id="dashboard"
      onClick={() => {
          if(!status){
              navigate("/login");
          }else{
                 navigate(`/dashboard/${user?.id}`);
          }
      }}
      className="cursor-pointer bg-white"
    >
      <path fill="none" d="M0 0h48v48H0z"></path>
      <path d="M6 26h16V6H6v20zm0 16h16V30H6v12zm20 0h16V22H26v20zm0-36v12h16V6H26z"></path>
    </svg>
  );
};

export default DashboardIcon;
