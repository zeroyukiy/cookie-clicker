import React, { Component } from "react";
import "./App.css";
import CookieClicker from "./components/CookieClicker";
import Item from "./components/Item";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currency: 0,
      amount: {
        toClick: 1,
        toSecond: 0
      }
    };
  }

  componentWillMount() {
    let initialState = JSON.parse(localStorage.getItem("cookie"));
    if (initialState) {
      // load the initial state from localStorage
      this.setState({
        currency: initialState.currency,
        amount: {
          toClick: initialState.amount.toClick,
          toSecond: initialState.amount.toSecond
        }
      });
    }
    this.getCurrency();
    this.saveCurrentState();
  }

  incrementCurrency = () => {
    this.setState({
      currency: this.state.currency + this.state.amount.toClick
    });
  };

  subtractCurrency = price => {
    if (this.state.currency >= price) {
      this.setState({
        currency: this.state.currency - price
      });
      return true;
    }
    return false;
  };

  incrementAmountToClick = (price, addAmount) => {
    if (this.subtractCurrency(price)) {
      this.setState({
        amount: {
          ...this.state.amount,
          toClick: this.state.amount.toClick + addAmount
        }
      });
    }
  };

  incrementAmountToSecond = (price, addAmount) => {
    if (this.subtractCurrency(price)) {
      this.setState({
        amount: {
          ...this.state.amount,
          toSecond: this.state.amount.toSecond + addAmount
        }
      });
    }
  };

  getCurrency = () => {
    setInterval(() => {
      if (this.state.amount.toSecond > 0) {
        this.setState({
          currency: this.state.currency + this.state.amount.toSecond / 5
        });
      }
    }, 200);
  };

  saveCurrentState = () => {
    setInterval(() => {
      localStorage.setItem("cookie", JSON.stringify(this.state));
    }, 3000);
  };

  render() {
    return (
      <main className="App">
        <div className="header">
          <div className="currency">
            {Math.round(this.state.currency)}{" "}
            <span> - {this.state.amount.toSecond}</span>
          </div>
          <CookieClicker
            time="200"
            incrementCurrency={this.incrementCurrency}
          />
        </div>
        <div className="menu">
          <Item
            amount="5"
            incrementAmount={() => this.incrementAmountToClick(5, 3)}
          />
          <Item
            amount="25"
            incrementAmount={() => this.incrementAmountToClick(25, 15)}
          />
          <Item
            amount="500"
            incrementAmount={() => this.incrementAmountToSecond(500, 5)}
          />
          <Item
            amount="8000"
            incrementAmount={() => this.incrementAmountToSecond(8000, 80)}
          />
        </div>
      </main>
    );
  }
}

export default App;
