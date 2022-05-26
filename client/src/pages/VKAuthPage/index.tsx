import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "../../hooks/useQuery";
import { RootState } from "../../store";
import { vkAuthStartedAction } from "../../store/auth/actions";

interface VKAuthPageProps {}

const selector = (state: RootState) => state.auth.token;

const VKAuthPage: FC<VKAuthPageProps> = () => {
  const code = useQuery("code");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(selector);

  useEffect(() => {
    if (code) {
      dispatch(vkAuthStartedAction(code));
    }
  }, []);

  useEffect(() => {
    navigate("/", { replace: true });
  }, [token]);

  return <div>VKAuthPage</div>;
};

export default VKAuthPage;
