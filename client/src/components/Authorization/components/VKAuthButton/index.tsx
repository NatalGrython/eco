import React, { FC } from "react";
import { Vk } from "../../../../icons";
import { queryBuilder } from "../../utils/queryBuilder";
import classNames from "./index.module.scss";

const clientId = import.meta.env.ECO_VK_ID;
const clientHost = import.meta.env.ECO_CLIENT_HOST;
const clientPort = import.meta.env.ECO_CLIENT_PORT;

interface VkAuthButtonProps {}

const VkAuthButton: FC<VkAuthButtonProps> = () => {
  const vkLink = queryBuilder("https://oauth.vk.com/authorize", {
    client_id: clientId,
    display: "page",
    redirect_uri: `http://${clientHost}:${clientPort}/auth/vk`,
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
