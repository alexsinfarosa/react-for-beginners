import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import SampleFishes from '../sample-fishes';
import base from '../base';

class App extends React.Component {

  constructor() {
    super();

    this.addFish = this.addFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
    this.updateFish = this.updateFish.bind(this);
    this.removeFish = this.removeFish.bind(this);
    this.removeFromOrder = this.removeFromOrder.bind(this);

    // GetInitialState
    this.state = {
      fishes: {},
      order: {}
    };
  }

  componentWillMount() {
    // this runs before the <App> is rendered
    this.ref = base.syncState(`${this.props.params.storeId}/fishes`
      ,{
      context: this,
      state: 'fishes'
    });

    // check if there is any order in localStorage
    const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);

    if(localStorageRef) {
      // update our <App> component's order state
      this.setState({
        order: JSON.parse(localStorageRef)
      })
    }
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem(`order-${this.props.params.storeId}`,
      JSON.stringify(nextState.order));
  }

  addFish(fish) {
    // take a copy of our state
    const fishes = {...this.state.fishes};

    const timestamp = Date.now();
    fishes[`fish-${timestamp}`] = fish;
    // update our state
    this.setState({fishes: fishes});

  }

  updateFish(key, updatedFish) {
    const fishes = {...this.state.fishes};
    fishes[key] = updatedFish;
    this.setState({ fishes });
  }

  removeFish(key) {
    const fishes = {...this.state.fishes};
    // because of firebase we do:
    fishes[key] = null;
    this.setState({ fishes });

  }

  loadSamples() {
    this.setState({
      fishes: SampleFishes
    })
  }

  addToOrder(key) {
    // take a copy of our state
    const order = {...this.state.order};
    // update or add the new number of fish state
    order[key] = order[key] + 1 || 1;
    // update our state
    this.setState({order: order});
  }

  removeFromOrder(key) {
    const order = {...this.state.order};
    delete order[key];
    this.setState({ order: order});
  }

  render() {
    return (
      <div className="catch-of-the-day">

        <div className="menu">
          <Header tagline="fesh seafood market"/>

          <ul className="list-of-fishes">
            {
              Object
                .keys(this.state.fishes)
                .map(key => <Fish key={key} index={key} details={this.state.fishes[key]}
                  addToOrder={this.addToOrder}/>)
            }
          </ul>

        </div>

        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          params={this.props.params}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          addFish={this.addFish}
          loadSamples={this.loadSamples}
          fishes={this.state.fishes}
          updateFish={this.updateFish}
          removeFish={this.removeFish}
        />
      </div>
    )
  }
}

export default App;
