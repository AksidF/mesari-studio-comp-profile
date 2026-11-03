import Icon from "./Icons";
import { waLink } from "@/content/site";

export default function Fab() {
  return (
    <a className="fab" href={waLink()} target="_blank" rel="noopener noreferrer" aria-label="Chat via WhatsApp">
      <Icon name="chat" />
    </a>
  );
}
