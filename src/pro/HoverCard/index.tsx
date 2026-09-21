import { Button } from '../../components/Button';
import {
  HoverCardComp,
  HoverCardContent,
  HoverCardTrigger,
} from './HoverCardComp';

interface iHoverCard {
  hoverCardTrigger: string | JSX.Element;
  hoverCardContent: string | JSX.Element;
}

function HoverCard({ hoverCardTrigger, hoverCardContent }: iHoverCard) {
  return (
    <HoverCardComp>
      <HoverCardTrigger asChild>
        <Button variant="ghost">{hoverCardTrigger}</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">{hoverCardContent}</HoverCardContent>
    </HoverCardComp>
  );
}

export { HoverCard, HoverCardComp, HoverCardContent, HoverCardTrigger };
