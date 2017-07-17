import React from 'react'
import ReactDOM from 'react-dom'
import { Button, FormGroup, ControlLabel, FormControl, Form, Col,
        } from 'react-bootstrap'
import _ from 'lodash'

class OrderPage extends React.Component{

  submitOrder = (event, onRequest) => {
    event.preventDefault()
    const amount = ReactDOM.findDOMNode(this.refs.deposit).value
    const buying = ReactDOM.findDOMNode(this.refs.currency).value
    const tally = ReactDOM.findDOMNode(this.refs.tally).value
    const bitfinexLimit = ReactDOM.findDOMNode(this.refs.bitfinexFloat).value
    const btceLimit = ReactDOM.findDOMNode(this.refs.btceFloat).value
    const bitstampLimit = ReactDOM.findDOMNode(this.refs.bitstampFloat).value
    onRequest({ buying, tally, amount, bitfinexLimit, btceLimit, bitstampLimit })
  }



  render() {
    const dollarSymbolStyle = {
    position: 'relative',
    left: '26%'
    }
    return (
      <div style={{display: 'flex'}}>
        <div style={{display: 'flex', flexDirection: 'row', width: '50%'}}>
          <div style={{ marginRight: '3em' }}>
            <h1 style={{ marginLeft: '6%' }}>Floats</h1>
            <Form horizontal>

              <FormGroup controlId="formHorizontalName">
                <Col componentClass={ ControlLabel } sm={5}>
                Deposit<span style={ dollarSymbolStyle }>$</span>
                </Col>
                <Col sm={5}>
                  <FormControl type="text" ref="deposit"/>
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalName">
                <Col componentClass={ ControlLabel } sm={5}>
                  Coin
                </Col>
                <Col sm={5}>
                  <FormControl
                    componentClass="select"
                    placeholder="select"
                    ref="currency"
                  >
                    <option value="btc">Bitcoin</option>
                    <option value="eth">Ethereum</option>
                  </FormControl>
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalName">
                <Col componentClass={ ControlLabel } sm={5}>
                  Currency
                </Col>
                <Col sm={5}>
                  <FormControl
                    componentClass="select"
                    placeholder="select"
                    ref="tally"
                  >
                    <option value="usd">USD</option>
                    <option value="aud">AUD</option>
                  </FormControl>
                </Col>
              </FormGroup>

              <FormControl type="hidden" ref="bitfinexFloat" defaultValue={ `${this.props.settings.bitfinexFloat}` }/>

              <FormControl type="hidden" ref="btceFloat" defaultValue={ 
              `${this.props.settings.btceFloat}` }/>

              <FormControl type="hidden" ref="bitstampFloat" defaultValue={ 
              `${this.props.settings.bitstampFloat}` }/>

            </Form>
            <Button 
              className={ "updateBtn" } 
              bsSize="large"
              bsStyle="primary" type="submit" 
              onClick={(event) => this.submitOrder(event, this.props.onRequest)}>
              Query Order
            </Button>
          </div>
        </div>

        <div style={{flexDirection: 'row', width: '50%'}}>
          <h1 style={{  }}>Best Order</h1>
          {
          !_.isEmpty(this.props.tempOrder) ? ( 
            <div>
              <p>Bitfinex: $
                {this.props.tempOrder.exchanges.bitfinex.usdSpent}
        
                {'  '}
                coins: 
                {this.props.tempOrder.exchanges.bitfinex.coinBought}
              </p>
              <p>Bitstamp: $
                {this.props.tempOrder.exchanges.bitstamp.usdSpent}

                {'  '}
                coins: 
                {this.props.tempOrder.exchanges.bitstamp.coinBought}
              </p>
              <p>BTC-e: $ 
                {this.props.tempOrder.exchanges.btce.usdSpent}

                {'  '}
                coins: 
                {this.props.tempOrder.exchanges.btce.coinBought}
              </p>
              <p>Total Gained:&nbsp;   
                { this.props.tempOrder.totalUsdSpent }

                {'  '}
                coins: 
                { this.props.tempOrder.totalCoinBought }
              </p>
            </div>
            ) : ''
          }
        </div>
      </div>
    )
  }
}

export default OrderPage


  //  <FormGroup controlId="formHorizontalName">
  //               <Col componentClass={ ControlLabel } sm={5}>
  //               Buying
  //               </Col>
  //               <Col sm={5}>
  //                 <FormControl type="text" ref="currency"/>
  //               </Col>
  //             </FormGroup>