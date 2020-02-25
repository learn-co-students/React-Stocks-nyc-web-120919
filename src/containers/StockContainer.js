import React, { Component } from 'react';
import Stock from '../components/Stock'

class StockContainer extends Component {
  
  render() {
    // console.log("add stock func", this.props.addStock)
    return (
      <div>
        <h2>Stocks</h2>
        {this.props.stocks.map(stock => 
        <Stock
        key={stock.id}
        stock={stock}
        addStock={this.props.addStock}
         />)
          //render the list of stocks here
        }
      </div>
    );
  }

}

export default StockContainer;
