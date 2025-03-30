import React from "react";
import { getProgressColor } from "../../utils/Helper";

const AccesibilitySmallCircle = ({product = {}}) => {
  return (
    <div className="accessbilityIcon">
      {/* <img src={smallAccessibilityNumber} alt="Accessibility Score" /> */}
      <div
        class="smallAccessibilityCircle"
        style={{
          background: `conic-gradient(${getProgressColor(
            product.accessibility_score
          )} 0% ${product.accessibility_score}%, #e0e0e0 ${
            product.accessibility_score
          }% 100%)`,
        }}
      >
        <div class="smallAccessibilityCircle-text ">
          <span class="number">{product.accessibility_score}%</span>
        </div>
      </div>
    </div>
  );
};

export default AccesibilitySmallCircle;
