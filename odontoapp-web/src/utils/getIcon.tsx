import { BanknotesIcon } from "@/assets/icons/bankNotes";
import { BellIcon } from "@/assets/icons/bell";
import { CalendarDaysIcon } from "@/assets/icons/calendarDays";
import { ChatBubbleLeftEllipsisIcon } from "@/assets/icons/chatBubbleLeftEllipsis";
import { CheckIcon } from "@/assets/icons/check";
import { CheckCircleIcon } from "@/assets/icons/checkCircle";
import { ChevronLeftIcon } from "@/assets/icons/chevronLeft";
import { ChevronRightIcon } from "@/assets/icons/chevronRight";
import { DocumentTextIcon } from "@/assets/icons/document";
import { EnvelopeIcon } from "@/assets/icons/envelope";
import { MagnifyingGlassIcon } from "@/assets/icons/magnifier";
import { MapPinIcon } from "@/assets/icons/mapPin";
import { PencilIcon } from "@/assets/icons/pencil";
import { PhoneIcon } from "@/assets/icons/phone";
import { PlusCircleIcon } from "@/assets/icons/plusCircle";
import { ShoppingCartIcon } from "@/assets/icons/shoppingCart";
import { Squares2x2Icon } from "@/assets/icons/squares2x2";
import { StarIcon } from "@/assets/icons/star";
import { ToothIcon } from "@/assets/icons/tooth";
import { TrashIcon } from "@/assets/icons/trash";
import { UserIcon } from "@/assets/icons/user";
import { UsersIcon } from "@/assets/icons/users";
import { UserGroupIcon } from "@/assets/icons/usersGroup";
import { VideoCameraIcon } from "@/assets/icons/videoCamera";
import { WrenchScrewdriverIcon } from "@/assets/icons/wrenchScrewdriver";
import { XCircleIcon } from "@/assets/icons/xcircle";
import { XMarkIcon } from "@/assets/icons/xmark";
import { T11 } from "@/assets/toothMap/t11";
import { T12 } from "@/assets/toothMap/t12";
import { T13 } from "@/assets/toothMap/t13";
import { T14 } from "@/assets/toothMap/t14";
import { T21 } from "@/assets/toothMap/t21";
import { T22 } from "@/assets/toothMap/t22";
import { T23 } from "@/assets/toothMap/t23";
import { T24 } from "@/assets/toothMap/t24";
import { T15 } from "@/assets/toothMap/t15";
import { T16 } from "@/assets/toothMap/t16";
import { T17 } from "@/assets/toothMap/t17";
import { T18 } from "@/assets/toothMap/t18";
import { T25 } from "@/assets/toothMap/t25";
import { T26 } from "@/assets/toothMap/t26";
import { T27 } from "@/assets/toothMap/t27";
import { T28 } from "@/assets/toothMap/t28";
import { T31 } from "@/assets/toothMap/t31";
import { T41 } from "@/assets/toothMap/t41";
import { T32 } from "@/assets/toothMap/t32";
import { T42 } from "@/assets/toothMap/t42";
import { T43 } from "@/assets/toothMap/t43";
import { T33 } from "@/assets/toothMap/t33";
import { T34 } from "@/assets/toothMap/t34";
import { T44 } from "@/assets/toothMap/t44";
import { T35 } from "@/assets/toothMap/t35";
import { T36 } from "@/assets/toothMap/t36";
import { T37 } from "@/assets/toothMap/t37";
import { T38 } from "@/assets/toothMap/t38";
import { T45 } from "@/assets/toothMap/t45";
import { T46 } from "@/assets/toothMap/t46";
import { T47 } from "@/assets/toothMap/t47";
import { T48 } from "@/assets/toothMap/t48";
import { BuildingOfficeIcon } from "@/assets/icons/buildingOffice";
import { LockClosedIcon } from "@/assets/icons/lockClosed";

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
    case "magnifier":
      return <MagnifyingGlassIcon {...rest} />;
    case "bell":
      return <BellIcon {...rest} />;
    case "check":
      return <CheckIcon {...rest} />;
    case "check-circle":
      return <CheckCircleIcon {...rest} />;
    case "xmark":
      return <XMarkIcon {...rest} />;
    case "user":
      return <UserIcon {...rest} />;
    case "phone":
      return <PhoneIcon {...rest} />;
    case "envelope":
      return <EnvelopeIcon {...rest} />;
    case "map-pin":
      return <MapPinIcon {...rest} />;
    case "pencil":
      return <PencilIcon {...rest} />;
    case "building-office":
      return <BuildingOfficeIcon {...rest} />;
    case "lock-closed":
      return <LockClosedIcon {...rest} />;
    case "t11":
      return <T11 {...rest} />;
    case "t12":
      return <T12 {...rest} />;
    case "t13":
      return <T13 {...rest} />;
    case "t14":
      return <T14 {...rest} />;
    case "t15":
      return <T15 {...rest} />;
    case "t16":
      return <T16 {...rest} />;
    case "t17":
      return <T17 {...rest} />;
    case "t18":
      return <T18 {...rest} />;
    case "t21":
      return <T21 {...rest} />;
    case "t22":
      return <T22 {...rest} />;
    case "t23":
      return <T23 {...rest} />;
    case "t24":
      return <T24 {...rest} />;
    case "t25":
      return <T25 {...rest} />;
    case "t26":
      return <T26 {...rest} />;
    case "t27":
      return <T27 {...rest} />;
    case "t28":
      return <T28 {...rest} />;
    case "t31":
      return <T31 {...rest} />;
    case "t32":
      return <T32 {...rest} />;
    case "t33":
      return <T33 {...rest} />;
    case "t34":
      return <T34 {...rest} />;
    case "t35":
      return <T35 {...rest} />;
    case "t36":
      return <T36 {...rest} />;
    case "t37":
      return <T37 {...rest} />;
    case "t38":
      return <T38 {...rest} />;
    case "t41":
      return <T41 {...rest} />;
    case "t42":
      return <T42 {...rest} />;
    case "t43":
      return <T43 {...rest} />;
    case "t44":
      return <T44 {...rest} />;
    case "t45":
      return <T45 {...rest} />;
    case "t46":
      return <T46 {...rest} />;
    case "t47":
      return <T47 {...rest} />;
    case "t48":
      return <T48 {...rest} />;
    default:
      break;
  }
}
