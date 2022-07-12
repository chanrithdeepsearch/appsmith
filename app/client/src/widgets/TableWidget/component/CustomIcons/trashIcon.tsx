import React from "react";

const ptIconWrapper = (
  path: React.SVGProps<SVGPathElement>,
  viewboxDefault = 24,
) => {
  return (
    <span className="bp3-icon">
      <svg
        className="pt-icon"
        height="16px"
        id="Capa_1"
        version="1.1"
        viewBox={`0 0 ${viewboxDefault} ${viewboxDefault}`}
        width="16px"
        x="0px"
        xmlns="http://www.w3.org/2000/svg"
        y="0px"
      >
        {path}
      </svg>
    </span>
  );
};

export const trashIcon = ptIconWrapper(
  <path
    clipRule="evenodd"
    d="M8.5 0H4.5V1H8.5V0ZM0.5 2V3H1.5V13C1.5 13.6 1.9 14 2.5 14H10.5C11.1 14 11.5 13.6 11.5 13V3H12.5V2H0.5ZM2.5 13V3H10.5V13H2.5ZM4.5 5H5.5V11H4.5V5ZM8.5 5H7.5V11H8.5V5Z"
    fillRule="evenodd"
  />,
  14,
);
