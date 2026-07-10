export function Logo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1200"
      height="300"
      viewBox="0 0 1200 300"
      role="img"
      aria-labelledby="title desc"
      className={className}
      style={{ display: "block" }}
    >
      <title id="title">Eurobit logo</title>
      <desc id="desc">Eurobit wordmark in navy and orange on a transparent background.</desc>
      <g transform="translate(40,40)">
        <text
          x="0"
          y="190"
          fontFamily="Arial, Helvetica, sans-serif"
          fontSize="220"
          fontWeight="700"
          letterSpacing="-12"
          fill="currentColor"
        >
          euro
        </text>
        <text
          x="488"
          y="190"
          fontFamily="Arial, Helvetica, sans-serif"
          fontSize="220"
          fontWeight="700"
          letterSpacing="-12"
          fill="#F68B1F"
        >
          b
        </text>
        <text
          x="620"
          y="190"
          fontFamily="Arial, Helvetica, sans-serif"
          fontSize="220"
          fontWeight="700"
          letterSpacing="-12"
          fill="currentColor"
        >
          it
        </text>
        <circle cx="695" cy="18" r="16" fill="#F68B1F" />
        <text
          x="835"
          y="55"
          fontFamily="Arial, Helvetica, sans-serif"
          fontSize="38"
          fontWeight="700"
          fill="currentColor"
        >
          ®
        </text>
      </g>
    </svg>
  );
}
