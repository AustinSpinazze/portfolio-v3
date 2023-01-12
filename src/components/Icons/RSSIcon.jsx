export default function RSSIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke=""
      {...props}
    >
      <g strokeWidth="0" />
      <g strokeLinecap="round" strokeLinejoin="round" />
      <g>
        <path
          className="stroke-zinc-400 dark:stroke-zinc-500"
          strokeLinecap="round"
          strokeWidth="2"
          d="M13 19a8 8 0 00-8-8"
        />
        <path
          className="stroke-zinc-400 dark:stroke-zinc-500"
          strokeLinecap="round"
          strokeWidth="2"
          d="M19 19c0-7.732-6.268-14-14-14"
        />
        <circle
          cx="6"
          cy="18"
          r="2"
          className="fill-zinc-400 dark:fill-zinc-500"
        />
      </g>
    </svg>
  );
}