const LoadingIcon = ({width = 30, height = 30}) => {
  return (
    <svg
      width={`${width}px`}
      height={`${height}px`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      className="lds-bars"
    >
      <rect
        ng-attr-x="{{config.x1}}"
        y="30"
        ng-attr-width="{{config.width}}"
        height="40"
        fill="#182731"
        x="15"
        width="10"
      >
        <animate
          attributeName="opacity"
          calcMode="spline"
          values="1;0.2;1"
          keyTimes="0;0.5;1"
          dur="1"
          keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
          begin="-0.6s"
          repeatCount="indefinite"
        ></animate>
      </rect>
      <rect
        ng-attr-x="{{config.x2}}"
        y="30"
        ng-attr-width="{{config.width}}"
        height="40"
        fill="#a7d4ec"
        x="35"
        width="10"
      >
        <animate
          attributeName="opacity"
          calcMode="spline"
          values="1;0.2;1"
          keyTimes="0;0.5;1"
          dur="1"
          keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
          begin="-0.4s"
          repeatCount="indefinite"
        ></animate>
      </rect>
      <rect
        ng-attr-x="{{config.x3}}"
        y="30"
        ng-attr-width="{{config.width}}"
        height="40"
        fill="#182731"
        x="55"
        width="10"
      >
        <animate
          attributeName="opacity"
          calcMode="spline"
          values="1;0.2;1"
          keyTimes="0;0.5;1"
          dur="1"
          keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
          begin="-0.2s"
          repeatCount="indefinite"
        ></animate>
      </rect>
      <rect
        ng-attr-x="{{config.x4}}"
        y="30"
        ng-attr-width="{{config.width}}"
        height="40"
        fill="#a7d4ec"
        x="75"
        width="10"
      >
        <animate
          attributeName="opacity"
          calcMode="spline"
          values="1;0.2;1"
          keyTimes="0;0.5;1"
          dur="1"
          keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
          begin="0s"
          repeatCount="indefinite"
        ></animate>
      </rect>
    </svg>
  );
};

export {LoadingIcon};
