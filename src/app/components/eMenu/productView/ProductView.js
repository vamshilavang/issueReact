import React from 'react';
import {getDelarRates} from '../../../actions/actions';
import ExpandedProduct from './ExpandedProduct';
import {connect} from 'react-redux';


function getPrice(rateInfo) {

return  rateInfo.length ? getDealerCost(rateInfo[0]) : 0;
}

function getDealerCost(rateInfo) {
  let dealerCost = 0;
  let levelLookUp = rateInfo.Levels[0];
  while(levelLookUp){
    if(levelLookUp.RateInfo && levelLookUp.RateInfo.Rates[0] ){
      dealerCost = levelLookUp.RateInfo.Rates[0].DealerCost;
    }
    levelLookUp = levelLookUp.Levels[0];
  }
  return dealerCost;
}

class Product extends React.Component{
  constructor(props){
    super(props);
      getDelarRates(props.dispatch);
      this.state = {
          imageUrl: this.props.optType.imageUrl,
          title: this.props.optType.title,
          showMore: false,
          price: props.optType.isRateable ? getPrice(props.rateInfo) : this.props.optType.price,
          platinum: this.props.optType.platinum,
          gold: this.props.optType.gold,
          silver: this.props.optType.silver,
          basic: this.props.optType.basic,
          providerCode: props.optType.providerList[0].provider_code
      }

  }
  componentWillReceiveProps(nextProps){
    const price = getPrice(nextProps.rateInfo);
    if(nextProps.optType.isRateable) {
      this.setState({price: price});
    }
  }
  updateShowMore(event) {
    this.setState({ showMore: !this.state.showMore });
  }
  getRates(event){
   this.setState({providerCode :  this.props.optType.providerList[selectedIndex].provider_code});
  }
  render(){
    return(
      <div className="">
      <div className="row product">
        <div className="col-md-3 col-sm-3 col-xs-12">
          
        </div>
        <div className="col-xs-4 col-sm-3">
          <p className="r-no-bottom-margin"><b>{this.state.title}</b></p>
          <p className="r-gray">{this.state.price}</p>
          <p className="r-no-bottom-margin r-gray r-medium-text">Provider</p>
          <select className="form-control" onChange={(event) => this.getRates(event)}>
          {this.props.optType.providerList.map((provider, i) => <option key={provider.providerName+provider.providerId+i}>{provider.providerName}</option>)})}
          </select>
          <p className="r-small-bottom-margin r-small-top-margin"><a className="anchor-pointer" onClick={this.updateShowMore.bind(this)}>{this.state.showMore == false ? 'Show More' : 'Show Less'}</a></p>
        </div>
        <div className="col-xs-4 col-sm-30 r-checkbox-margin-top product-option">
          <span className="r-checkbox-span"><input type="checkbox" key="platinum" value={this.state.platinum} /></span>
          <span className="r-checkbox-span"><input type="checkbox" key="gold" value={this.state.gold} /></span>
          <span className="r-checkbox-span"><input type="checkbox" key="silver" value={this.state.silver} /></span>
          <span className="r-checkbox-span"><input type="checkbox" key="basic" value={this.state.basic} /></span>
        </div>
      </div>
      {
        this.state.showMore
          ? <ExpandedProduct key={"Expanded" + this.props.key} />
          : null
      }
      <hr/>

    </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({dispatch });
const mapStateToprops = state =>({
  rateInfo: state.rates.ratesInfo
});

export default connect(mapStateToprops, mapDispatchToProps)(Product);
