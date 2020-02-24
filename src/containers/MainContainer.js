import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

const URL = 'http://localhost:3000/stocks'
class MainContainer extends Component {
  state = {
    stocks: [],
    portfolio: [],
    filterBy: null,
    sortBy: null
  }

  componentDidMount() {
    fetch(URL)
      .then(resp => resp.json())
      .then(stocks => this.setState({ stocks }))
  }

  addToPortfolio = (stock) => {
    this.setState((state, props) => ({
      portfolio: [...state.portfolio, stock]
    }))
  }

  removeFromPortfolio = (targetStock) => {
    this.setState((state, props) => ({
      portfolio: state.portfolio.filter(stock => stock.id != targetStock.id)
    }))
  }

  updateFilterBy = (filterBy) => {
    this.setState((state) => ({ filterBy }))
  }

  updateSortBy = (sortBy) => {
    this.setState((state) => ({ sortBy }))
  }

  filterStocks = () => {
    let stocks = this.state.stocks
    if(this.state.filterBy) {
      stocks = stocks.filter(stock => stock.type === this.state.filterBy)
    }
    if(this.state.sortBy){
      if(this.state.sortBy === 'Alphabetically') {
        stocks = stocks.sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1)
      } else if(this.state.sortBy === 'Price') {
        stocks = stocks.sort((a, b) => a.price - b.price)
      }
    }
    return stocks
  }

  render() {
    return (
      <div>
        <SearchBar updateFilterBy={this.updateFilterBy} updateSortBy={this.updateSortBy} sortByValue={this.state.sortBy} />
        <div className="row">
          <div className="col-8">
            <StockContainer stocks={this.filterStocks()} handleClick={this.addToPortfolio} />
          </div>
          <div className="col-4">
            <PortfolioContainer portfolio={this.state.portfolio} handleClick={this.removeFromPortfolio} />
          </div>
        </div>
      </div>
    );
  }
}

export default MainContainer;
