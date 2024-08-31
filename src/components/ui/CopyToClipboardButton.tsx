import { Button, message } from "antd";
import { BiCopy } from "react-icons/bi";

const CopyToClipboardButton = ({ content }: { content: string }) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      message.success("Copied to clipboard");
    } catch (error) {
      message.error("Unable to copy to clipboard");
      console.error("Unable to copy to clipboard:", error);
    }
  };

  return (
    <Button icon={<BiCopy />} onClick={handleCopy} className="">
      Copy
    </Button>
  );
};

export default CopyToClipboardButton;
