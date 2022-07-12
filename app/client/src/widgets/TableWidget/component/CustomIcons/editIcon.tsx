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

export const editIcon = ptIconWrapper(
  <path
    clipRule="evenodd"
    d="M0.5 12H14.5V13H0.5V12ZM12.2 3.5C12.6 3.1 12.6 2.5 12.2 2.1L10.4 0.3C10 -0.1 9.4 -0.1 9 0.3L1.5 7.8V11H4.7L12.2 3.5ZM9.7 1L11.5 2.8L10 4.3L8.2 2.5L9.7 1ZM2.5 10V8.2L7.5 3.2L9.3 5L4.3 10H2.5Z"
    fillRule="evenodd"
  />,
  15,
);
