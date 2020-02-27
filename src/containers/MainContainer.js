import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {

  state = {
    stocks: [],
    sortBy: '',
    filter: '',
    portfolioStocks: []
  }

  componentDidMount() {
    fetch('http://localhost:3000/stocks')
    .then(resp => resp.json())
    .then(stocks => this.setState({ stocks }))
  }

  handleSort = (e) => {
    this.setState({sortBy: e.target.value})
  }

  handleFilter = (e) => {
    this.setState({filter: e.target.value})
  }

  buyStock = (id) => {
    const foundStock = this.state.stocks.find( stock => stock.id === id)
    if (!this.state.portfolioStocks.includes(foundStock)){
    this.setState({
      portfolioStocks: [...this.state.portfolioStocks, foundStock]
    })}
  } 

  sellStock = (id) => {
    this.setState({
      portfolioStocks: this.state.portfolioStocks.filter(stock => stock.id !== id)
    })
  }

  render() {
    let displayStocks = [...this.state.stocks]
    if (this.state.filter) {
      displayStocks = displayStocks.filter(stock => stock.type === this.state.filter)
    }
    if (this.state.sortBy === "Alphabetically") {
      displayStocks.sort((a,b) => (a.name > b.name) ? 1 : -1)
    }
    else if (this.state.sortBy === "Price") {
      displayStocks.sort((a,b) => (a.price > b.price) ? 1 : -1)
    }




    return (
      <div>
        <SearchBar handleSort={this.handleSort} handleFilter={this.handleFilter}/>

          <div className="row">
            <div className="col-8">

              <StockContainer stocks={displayStocks} buyStock={this.buyStock}/>

            </div>
            <div className="col-4">

              <PortfolioContainer stocks={this.state.portfolioStocks} sellStock={this.sellStock}/>

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
