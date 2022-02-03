import React from 'react';

export default ({ label, value, keyboardType, placeholder, stateFn}) => (
  <FilterContainer>
    <FilterLabel>{label} </FilterLabel>
    <Filter 
      onChangeText={stateFn}
      value={value}
      placeholder={placeholder}
      keyboardType={keyboardType} 
    />
  </FilterContainer>
)