import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
 
class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: props.destination || '', draft_address: props.destination || ''};
  }
 
  handleChange = draft_address => {
    this.setState(state => ({ address: state.address, draft_address }));
    this.props.onChange(draft_address);
  };
 
  handleSelect = address => {
    this.setState({ draft_address: address, address });
    this.props.onChange(address);
  };

  handleBlur = () => {
    if (this.state.address !== this.state.draft_address) {
      this.setState({ draft_address: this.state.address, address: this.state.address });
      this.props.onChange(this.state.address);
    }
  };
 
  render() {
    return (
      <PlacesAutocomplete
        value={this.state.draft_address || this.props.destination}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        highlightFirstSuggestion={true}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className='location_search_container'>
            <label htmlFor='location_search'>Location</label>
            <input
              {...getInputProps({
                id: 'location_search',
                placeholder: 'Search Places ...',
                className: 'location_search_input',
                onBlur: () => this.handleBlur(),
                required: true,
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { color: 'white', backgroundColor: 'black', cursor: 'pointer' }
                  : { color: 'white', backgroundColor: 'grey', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

export default LocationSearchInput;