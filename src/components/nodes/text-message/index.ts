import TextMessageNode from "./TextNode";
import SettingsPanel from "./TextNodeSettings";

const TextMessage = {
  key: "textMessage",
  name: "Message",
  image: "/chat.svg",

  Node: TextMessageNode,
  Settings: SettingsPanel,

  generate: () => {
    const node = {
      type: "textMessage",
      data: { message: "Default Message" },
    };

    return node;
  },
};

export default TextMessage;
