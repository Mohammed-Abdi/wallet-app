export default function EyeOn({ size = 16 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 20 20"
    >
      <g fill="currentColor">
        <path d="M10 12a2 2 0 1 0 0-4a2 2 0 0 0 0 4"></path>
        <path
          fillRule="evenodd"
          d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10M14 10a4 4 0 1 1-8 0a4 4 0 0 1 8 0"
          clipRule="evenodd"
        ></path>
      </g>
    </svg>
  );
}
