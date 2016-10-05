import React from 'react';
import { getFunName } from '../helpers.js';

class StorePicker extends React.Component {

  goToStore(event) {
    event.preventDefault();
    const storeId = this.storeInput.value;
    this.context.router.transitionTo(`/store/${storeId}`);
  }

  render() {
    return (
      <form className="store-selector" onSubmit={(e) => this.goToStore(e)}>
        <h2>Please enter a store</h2>
        <input type="text"
          placeholder="Get Fun Name"
          defaultValue={getFunName()}
          required
          ref={(input) => {this.storeInput = input}}
          />
        <button type="submit">Visit Store -></button>
      </form>
    )
  }
}

StorePicker.contextTypes = {
  router: React.PropTypes.object
}

export default StorePicker;
