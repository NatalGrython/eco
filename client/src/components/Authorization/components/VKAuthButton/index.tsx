import React, { FC } from "react";
import { Vk } from "../../../../icons";
import { queryBuilder } from "../../utils/queryBuilder";
import classNames from "./index.module.scss";

const clientId = import.meta.env.ECO_VK_ID;

interface VkAuthButtonProps {}

const VkAuthButton: FC<VkAuthButtonProps> = () => {
  const vkLink = queryBuilder("https://oauth.vk.com/authorize", {
    client_id: clientId,
    display: "page",
    redirect_uri: "http://localhost:3000/auth/vk",
    scope: "email",
    response_type: "code",
    v: "5.131",
    state: JSON.stringify({ authModal: true }),
  });

  const onClick = () => {
    window.location.href = vkLink;
  };

  return (
    <button onClick={onClick} className={classNames.vk__button}>
      <Vk />
      <span>Войти через Вконтакте</span>
    </button>
  );
};

export default VkAuthButton;
