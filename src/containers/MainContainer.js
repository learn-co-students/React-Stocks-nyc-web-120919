import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {

  state = {
    stocks: [],
    portfolio: [],
    isSortAlpha: false,
    isSortPrice: false,
    filter: 'Tech'
  }

  render() {
    return (
      <div>
        <SearchBar sortAlpha={this.sortAlpha} sortPrice={this.sortPrice} filter={this.filter}
                    isSortAlpha={this.state.isSortAlpha} isSortPrice={this.state.isSortPrice}/>

          <div className="row">
            <div className="col-8">

              <StockContainer stocks={this.sorted(this.state.stocks)} buyOrSell={this.buyOrSell} />

            </div>
            <div className="col-4">

              <PortfolioContainer stocks={this.sorted(this.state.portfolio)} buyOrSell={this.buyOrSell} />

            </div>
          </div>
      </div>
    );
  }

  componentDidMount() {
    fetch('http://localhost:3000/stocks')
    .then(resp => resp.json())
    .then(data => this.setState({
      stocks: data
    }))
  }

  buyOrSell = (id) => {
    let index = this.state.stocks.findIndex(stock => stock.id === id);

    if (index >= 0) {
      const stock = this.state.stocks.splice(index, 1)[0]
      this.state.portfolio = [...this.state.portfolio, stock]
    } else {
      index = this.state.portfolio.findIndex(stock => stock.id === id);
      const stock = this.state.portfolio.splice(index, 1)[0]
      this.state.stocks =  [...this.state.stocks, stock]  
    }

    this.forceUpdate();
  }

  sortAlpha = () => {
    this.setState(oldState => ({isSortAlpha: !oldState.isSortAlpha}))
  }

  sortPrice = () => {
    this.setState(oldState => ({isSortPrice: !oldState.isSortPrice}))
  }

  filter = (event) => {
    this.setState({filter: event.target.value})
  }

  sorted = (stocks) => {
    const filteredStocks = stocks.filter(stock => stock.type === this.state.filter)
    if (this.state.isSortAlpha) {
      filteredStocks.sort((stock1, stock2) => stock1.name.localeCompare(stock2.name))
    }
    if (this.state.isSortPrice) {
      filteredStocks.sort((stock1, stock2) => stock1.price - stock2.price)
    }
    return filteredStocks;
  }
  
}

export default MainContainer;
