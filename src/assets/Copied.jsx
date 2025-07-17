export default function Copied(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeDasharray={24}
        strokeDashoffset={24}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 11l6 6l10 -10"
      >
        <animate
          fill="freeze"
          attributeName="stroke-dashoffset"
          dur="0.4s"
          values="24;0"
        ></animate>
      </path>
    </svg>
  );
}
