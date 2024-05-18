import { Handle, NodeProps, Position } from "reactflow";

export type TextMessageData = {
  message?: string,
}

export type TextMessageProps = NodeProps<TextMessageData>;

const TextMessageNode: React.FunctionComponent<TextMessageProps> = (props) => {
  return (
    <article className={`rounded-lg overflow-hidden w-96 shadow-xl ${props.selected ? "outline  outline-teal-200" : "outline-none"}`}>
      <Handle type={"target"} position={Position.Left} className="p-1 !-left-1.5" />

      <header className={`flex ${props.selected ? "bg-teal-200" : "bg-green-200"} px-4 py-1 items-center gap-4`}>
        <img src={"/chat.svg"} alt='chat.svg' className='h-4 w-4' />
        <span className="font-semibold flex-1 text-slate-800">Send Message</span>

        <div className="rounded-full bg-card w-5 h-5 flex items-center justify-center">
          <img src={"/whatsapp-icon.svg"} alt='whatsapp-icon.svg' className='h-6 w-6' />
          {/* <Image alt={"bubble"} src={""} width={16} height={16} /> */}
        </div>
      </header>

      <section className="bg-white px-4 py-4">
        <div>
          {props.data.message}
        </div>
      </section>

      <Handle type={"source"} position={Position.Right} className="p-1 !-right-1.5" />
    </article>
  );
}

export default TextMessageNode;
