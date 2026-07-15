import styles from "./Loader.module.css";

const pegtopPath =
  "M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z";

function Pegtop({ name }: { name: string }) {
  const id = (suffix: string) => `${suffix}-${name}`;

  return (
    <svg id={`pegtop${name}`} viewBox="0 0 100 100" aria-hidden="true">
      <defs>
        <filter id={id("shine")}><feGaussianBlur stdDeviation="3" /></filter>
        <mask id={id("mask")}><path d={pegtopPath} fill="white" /></mask>
        <radialGradient id={id("gradient-1")} cx="50" cy="66" r="30" gradientTransform="translate(0 35) scale(1 .5)" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="black" stopOpacity=".3" /><stop offset="50%" stopColor="black" stopOpacity=".1" /><stop offset="100%" stopColor="black" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={id("gradient-2")} cx="55" cy="20" r="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="white" stopOpacity=".3" /><stop offset="50%" stopColor="white" stopOpacity=".1" /><stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={id("gradient-3")} cx="85" cy="50" r="30" href={`#${id("gradient-2")}`} />
        <radialGradient id={id("gradient-4")} cx="50" cy="58" r="60" gradientTransform="translate(0 47) scale(1 .2)" href={`#${id("gradient-3")}`} />
        <linearGradient id={id("gradient-5")} x1="50" y1="90" x2="50" y2="10" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="black" stopOpacity=".2" /><stop offset="40%" stopColor="black" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g>
        <path d={pegtopPath} fill="currentColor" />
        <path d={pegtopPath} fill={`url(#${id("gradient-1")})`} />
        <path d={pegtopPath} fill="none" stroke="white" opacity=".3" strokeWidth="3" filter={`url(#${id("shine")})`} mask={`url(#${id("mask")})`} />
        <path d={pegtopPath} fill={`url(#${id("gradient-2")})`} />
        <path d={pegtopPath} fill={`url(#${id("gradient-3")})`} />
        <path d={pegtopPath} fill={`url(#${id("gradient-4")})`} />
        <path d={pegtopPath} fill={`url(#${id("gradient-5")})`} />
      </g>
    </svg>
  );
}

export default function Loader() {
  return (
    <div className={styles.screen} role="status" aria-live="polite">
      <div className={styles.loader}>
        <Pegtop name="one" />
        <Pegtop name="two" />
        <Pegtop name="three" />
      </div>
      <span className={styles.visuallyHidden}>Loading</span>
    </div>
  );
}
