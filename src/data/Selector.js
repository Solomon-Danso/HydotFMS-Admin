import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import styled from 'styled-components';
import { colors } from './Colors';

const SelectorWrapper = styled.div`
  width: 26vw;
  margin-top: 10px;

  @media (max-width: 768px) {
    width: 80vw;
  }
`;

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    padding: '15px 10px',
    border: `1px solid ${localStorage.getItem("colorMode")}`,
    color: localStorage.getItem("colorMode"),
    backgroundColor: 'white',
    borderRadius: '5px',
    fontSize: '16px',
    outline: 'none',
    transition: 'all 0.5s ease-in-out',
    '&:hover': {
      border: `0.5px solid ${colors.primary}`,
    },
    '&:focus': {
      border: `0.5px solid ${colors.primary}`,
    }
  }),
  menu: (provided) => ({
    ...provided,
    color: localStorage.getItem("colorMode"),
    backgroundColor: 'white',
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? colors.primary : localStorage.getItem("colorMode"),
    backgroundColor: state.isSelected ? 'white' : 'white',
    '&:hover': {
      backgroundColor: colors.primary,
      color: 'white',
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: localStorage.getItem("colorMode"),
  }),
  input: (provided) => ({
    ...provided,
    color: localStorage.getItem("colorMode"),
  })
};

const Selector = ({ setMethod, dataList, placeholder, dataKey, dataValue }) => {
  const handleChange = (selectedOption) => {
    setMethod(selectedOption.value);
  };

  const options = Array.isArray(dataList) ? dataList.map((data) => ({
    value: data[dataKey],
    label: data[dataValue]
  })) : [];

  return (
    <SelectorWrapper>
      <Select
        styles={customStyles}
        options={options}
        placeholder={placeholder}
        onChange={handleChange}
        isSearchable
      />
    </SelectorWrapper>
  );
};

Selector.propTypes = {
  setMethod: PropTypes.func.isRequired,
  dataList: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
  dataKey: PropTypes.string.isRequired,
  dataValue: PropTypes.string.isRequired,
};

Selector.defaultProps = {
  placeholder: 'Select an option',
};

export default Selector;
