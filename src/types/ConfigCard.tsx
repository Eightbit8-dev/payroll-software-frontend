export interface ConfigCardtype {
img: string;
  /** Title displayed at the top of the card */
  title: string;

  /** Short description under the title */
  desc: string;

  /** Badge label in the top-right corner (e.g., "Organisation") */
  label: string;

  /** Tailwind CSS class for the badge color (e.g., "bg-red-500") */
  labelColor: string;

  /** Text for the CTA button (e.g., "Configure") */
  btnText: string;

  /** Callback function when the button is clicked */
  onAction: () => void;
}
