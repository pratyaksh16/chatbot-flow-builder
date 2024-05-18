import TextMessage from "./text-message";
import { TextMessageProps } from "./text-message/TextNode";
import { SettingsPanelProps } from "./text-message/TextNodeSettings";

export type MessageNode = {
  key: string;
  name: string;
  image: string;
  generate: () => {
    type: string;
    data: {
      message: string;
    };
  };
  Node: React.FunctionComponent<TextMessageProps>;
  Settings: React.FunctionComponent<SettingsPanelProps>;
};

const NODE_TYPES: { [key: string]: MessageNode } = {};

// add all custom nodes here
NODE_TYPES[TextMessage.key] = TextMessage;

export default NODE_TYPES;
