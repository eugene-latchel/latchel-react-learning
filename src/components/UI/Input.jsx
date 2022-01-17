import React from "react";
import debounce from "lodash/debounce";
import PropTypes from "prop-types";

class SearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { delay: props.delay || 300, callback: props.onChangeValue };
    this.onInputChange = this.onInputChange.bind(this);
  }

  componentDidMount() {
    const { delay, callback } = this.state;
    this.delayedCallback = debounce(callback, delay);
  }

  componentWillUnmount() {
    this.delayedCallback.cancel();
  }

  onInputChange(e) {
    e.persist();
    this.delayedCallback(e);
  }

  render() {
    return (
      <input
        type="search"
        name="name"
        id="name"
        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
        placeholder="Enter Name..."
        autoComplete="off"
        autosuggest="off"
        onChange={this.onInputChange}
      />
    );
  }
}

SearchInput.defaultProps = {
  delay: 300,
};

SearchInput.propTypes = {
  delay: PropTypes.number,
  onChangeValue: PropTypes.func.isRequired,
};

export default SearchInput;