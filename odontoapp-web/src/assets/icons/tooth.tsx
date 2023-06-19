import { SVGAttributes } from "react";

export function ToothIcon(props: SVGAttributes<SVGElement>) {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16 3a3.84 3.84 0 0 0-2.32.74 2.88 2.88 0 0 1-3.36 0A3.84 3.84 0 0 0 8 3c-3 0-5 2-4 7s1 11 4 11 2-6.76 4-6.76S13 21 16 21s3-6 4-11-1-7-4-7Z"
      />
    </svg>
  );
}
