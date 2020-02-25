import React, { Component } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "../components/SearchBar";

class MainContainer extends Component {
  state = {
    stocks: [],
    portfolio: [],
    displayStocks: []
  };

  addStock = stock => {
    this.setState({ portfolio: [...this.state.portfolio, stock] });
  };

  removeStock = stock => {
    this.setState({
      portfolio: this.state.portfolio.filter(stockItem => stockItem !== stock)
    });
  };

  filterStocks = type => {
    // console.log("filter in main?");

    if (type !== "All") {
      this.setState({
        displayStocks: this.state.stocks.filter(stock => stock.type === type)
      });
    } else {
      this.setState({
        displayStocks: this.state.stocks
      });
    }
  };

  sortStocks = sortBy => {
    let arr = [];
    switch(sortBy) {
      case "Alphabetically":
        arr = this.state.displayStocks.sort((a, b) => a.name > b.name ? 1 : -1)
        break;
      case "Price":
        arr = this.state.displayStocks.sort((a, b) => a.price > b.price ? 1 : -1
        )
        break;
      default: 
    }
    this.setState({ displayStocks: arr });
  };



  componentDidMount() {
    fetch("http://localhost:3000/stocks")
      .then(response => response.json())
      .then(data => this.setState({ stocks: data, displayStocks: data }));
  }

  render() {
    return (
      <div>
        <SearchBar
          filterStocks={this.filterStocks}
          sortStocks={this.sortStocks}
        />

        <div className="row">
          <div className="col-8">
            <StockContainer
              stocks={this.state.displayStocks}
              addStock={this.addStock}
            />
          </div>
          <div className="col-4">
            <PortfolioContainer
              stocks={this.state.portfolio}
              removeStock={this.removeStock}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MainContainer;
