import React from 'react';

const ProductTypeSelector = React.memo(({ 
  serviceTypes, 
  selectedType, 
  onTypeChange, 
  disabled 
}) => (
  <div className="col-12 mb-4">
    <h3>Select Your Product</h3>
    <div className="checkBoxOptionContainer w-75">
      {serviceTypes.length > 0 ? (
        serviceTypes.map((type, idx) => (
          <div 
            className={`form-check${idx < serviceTypes.length - 1 ? " me-5" : ""}`} 
            key={type.type_id}
          >
            <input
              className="form-check-input"
              type="radio"
              name="accessibilityOptions"
              id={`serviceType_${type.type_id}`}
              value={type.key}
              checked={selectedType === type.key}
              onChange={(e) => onTypeChange(e.target.value)}
              disabled={disabled}
            />
            <label
              className="form-check-label"
              htmlFor={`serviceType_${type.type_id}`}
            >
              {type.name}
            </label>
          </div>
        ))
      ) : (
        <div>Loading service types...</div>
      )}
    </div>
  </div>
));

export default ProductTypeSelector;