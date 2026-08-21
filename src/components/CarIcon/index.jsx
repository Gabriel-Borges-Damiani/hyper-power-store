import styles from "./card.icon.module.css";
import { Link } from "react-router-dom";

export const CarIcon = () => {
  return (
    <Link to="#">
      <svg
        className={styles.svgCard}
        width="20px"
        height="20px"
        viewBox="0 -2.72 54.624 54.624"
        xmlns="http://www.w3.org/2000/svg"
        fill="#0097b2"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <g
            id="Group_38"
            data-name="Group 38"
            transform="translate(-150.273 -1577.233)"
          >
            {" "}
            <path
              id="Path_98"
              data-name="Path 98"
              d="M159.723,1596.869v13.651h32.746l6.107-13.651Z"
              fill="#0097b2d1d3d4"
            ></path>{" "}
            <path
              id="Path_99"
              data-name="Path 99"
              d="M152.273,1579.233h7.683v31.286h32.513l10.428-23.312h-39.26"
              fill="none"
              stroke="#0097b2"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="4"
            ></path>{" "}
            <path
              id="Path_100"
              data-name="Path 100"
              d="M167.668,1620.451a3.972,3.972,0,1,1-3.973-3.973A3.972,3.972,0,0,1,167.668,1620.451Z"
              fill="#0097b2ffffff"
              stroke="#0097b2"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="4"
            ></path>{" "}
            <path
              id="Path_101"
              data-name="Path 101"
              d="M187.532,1620.451a3.973,3.973,0,1,1-3.972-3.973A3.972,3.972,0,0,1,187.532,1620.451Z"
              fill="#0097b2ffffff"
              stroke="#0097b2"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="4"
            ></path>{" "}
          </g>{" "}
        </g>
      </svg>
    </Link>
  );
};
