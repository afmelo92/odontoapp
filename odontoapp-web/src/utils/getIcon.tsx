import { BanknotesIcon } from "@/assets/icons/bankNotes";
import { CalendarDaysIcon } from "@/assets/icons/calendarDays";
import { ChatBubbleLeftEllipsisIcon } from "@/assets/icons/chatBubbleLeftEllipsis";
import { ChevronLeftIcon } from "@/assets/icons/chevronLeft";
import { ChevronRightIcon } from "@/assets/icons/chevronRight";
import { DocumentTextIcon } from "@/assets/icons/document";
import { PlusCircleIcon } from "@/assets/icons/plusCircle";
import { ShoppingCartIcon } from "@/assets/icons/shoppingCart";
import { Squares2x2Icon } from "@/assets/icons/squares2x2";
import { StarIcon } from "@/assets/icons/star";
import { ToothIcon } from "@/assets/icons/tooth";
import { TrashIcon } from "@/assets/icons/trash";
import { UsersIcon } from "@/assets/icons/users";
import { UserGroupIcon } from "@/assets/icons/usersGroup";
import { VideoCameraIcon } from "@/assets/icons/videoCamera";
import { WrenchScrewdriverIcon } from "@/assets/icons/wrenchScrewdriver";
import { XCircleIcon } from "@/assets/icons/xcircle";

type Props = {
  name: string;
  className: string;
  strokeWidth: number;
};

export function getIcon({ name, ...rest }: Props) {
  switch (name) {
    case "calendar-days":
      return <CalendarDaysIcon {...rest} />;
    case "users":
      return <UsersIcon {...rest} />;
    case "squares2x2":
      return <Squares2x2Icon {...rest} />;
    case "tooth":
      return <ToothIcon {...rest} />;
    case "wrench-screwdriver":
      return <WrenchScrewdriverIcon {...rest} />;
    case "shopping-cart":
      return <ShoppingCartIcon {...rest} />;
    case "plus-circle":
      return <PlusCircleIcon {...rest} />;
    case "trash":
      return <TrashIcon {...rest} />;
    case "document-text":
      return <DocumentTextIcon {...rest} />;
    case "x-circle":
      return <XCircleIcon {...rest} />;
    case "chat-bubble-left-ellipsis":
      return <ChatBubbleLeftEllipsisIcon {...rest} />;
    case "chevron-left":
      return <ChevronLeftIcon {...rest} />;
    case "chevron-right":
      return <ChevronRightIcon {...rest} />;
    case "bank-notes":
      return <BanknotesIcon {...rest} />;
    case "users-group":
      return <UserGroupIcon {...rest} />;
    case "star":
      return <StarIcon {...rest} />;
    case "video-camera":
      return <VideoCameraIcon {...rest} />;
    default:
      break;
  }
}
