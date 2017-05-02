import React from 'react';
import {connect} from 'react-redux';

class ExpandedProduct extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    if(this.props.rateInfo && !this.props.rateInfo.length){
      return <span/>;
    }
    const rates = this.props.rateInfo[0];
    const programs = (
      <div className="row r-small-bottom-margin">
        <p className="r-gray r-bottom-no-margin r-small-text">Program</p>
        <select className="form-control">
        {rates.Levels.map(item => {
            return <option key={ 1+item.Code+item.Desc}>{item.Desc}</option>
        })}
        </select>
      </div>
    );
    return(
      <div className="row">
        <div className="col-xs-3 r-small-right-left-margin">
          <div className="rcorners">
            <div className="row r-small-bottom-margin"><b>PLATINUM</b></div>
            <div className="row r-small-bottom-margin">
              <p className="r-gray r-bottom-no-margin r-small-text">Program</p>
              <select className="form-control">
              {rates.Levels.map(item => {
                  return <option key={ 1+item.Code+item.Desc}>{item.Desc}</option>
              })}
              </select>
            </div>
            <div className="row r-small-bottom-margin">
              <p className="r-gray r-bottom-no-margin r-small-text">Term/Miles</p>
              <select className="form-control">
                <option>48/48,000</option>
              </select>
            </div>
            <div className="row r-small-bottom-margin">
              <p className="r-gray r-bottom-no-margin r-small-text">Deductible</p>
              <select className="form-control">
                <option>$250</option>
              </select>
            </div>
            <div className="row r-small-bottom-margin">
              <p className="r-gray r-small-text">Options</p>
              <p><input type="checkbox" /><span className="r-small-left-padding">Option 1</span></p>
              <p><input type="checkbox" /><span className="r-small-left-padding">Option 2</span></p>
              <p><input type="checkbox" /><span className="r-small-left-padding">Option 3</span></p>
              <p><input type="checkbox" /><span className="r-small-left-padding">Option 4</span></p>
            </div>
            <h6>Cost</h6>
     <div className="input-group default-margin-tp-btm">
      <span className="input-group-addon" id="sizing-addon2">$</span>
      <input type="text" className="form-control"/>
     </div>
     <h6>Price</h6>
     <div className="input-group default-margin-tp-btm">
      <span className="input-group-addon" id="sizing-addon2">$</span>
      <input type="text" className="form-control"/>
     </div>
          </div>
        </div>
        <div className="col-xs-3 r-small-right-left-margin">
          <div className="rcorners">
            <div className="row r-small-bottom-margin"><b>GOLD</b></div>
            <div className="row r-small-bottom-margin">
              <p className="r-gray r-bottom-no-margin r-small-text">Program</p>
              <select className="form-control">
              {rates.Levels.map(item => {
                  return <option key={ 2+item.Code+item.Desc}>{item.Desc}</option>
              })}
              </select>
            </div>
            <div className="row r-small-bottom-margin">
              <p className="r-gray r-bottom-no-margin r-small-text">Term/Miles</p>
              <select className="form-control">
                <option>48/48,000</option>
              </select>
            </div>
            <div className="row r-small-bottom-margin">
              <p className="r-gray r-bottom-no-margin r-small-text">Deductible</p>
              <select className="form-control">
                <option>$250</option>
              </select>
            </div>
            <div className="row r-small-bottom-margin">
              <p className="r-gray r-small-text">Options</p>
              <p><input type="checkbox" /><span className="r-small-left-padding">Option 1</span></p>
              <p><input type="checkbox" /><span className="r-small-left-padding">Option 2</span></p>
              <p><input type="checkbox" /><span className="r-small-left-padding">Option 3</span></p>
              <p><input type="checkbox" /><span className="r-small-left-padding">Option 4</span></p>
            </div>
            <h6>Cost</h6>
     <div className="input-group default-margin-tp-btm">
      <span className="input-group-addon" id="sizing-addon2">$</span>
      <input type="text" className="form-control"/>
     </div>
     <h6>Price</h6>
     <div className="input-group default-margin-tp-btm">
      <span className="input-group-addon" id="sizing-addon2">$</span>
      <input type="text" className="form-control"/>
     </div>
          </div>
       </div>
        <div className="col-xs-3 r-small-right-left-margin">
          <div className="rcorners">
            <div className="row r-small-bottom-margin"><b>SILVER</b></div>
            <div className="row r-small-bottom-margin">
              <p className="r-gray r-bottom-no-margin r-small-text">Program</p>
              <select className="form-control">
              {rates.Levels.map(item => {
                  return <option key={ 3+item.Code+item.Desc}>{item.Desc}</option>
              })}
              </select>
            </div>
            <div className="row r-small-bottom-margin">
              <p className="r-gray r-bottom-no-margin r-small-text">Term/Miles</p>
              <select className="form-control">
                <option>48/48,000</option>
              </select>
            </div>
            <div className="row r-small-bottom-margin">
              <p className="r-gray r-bottom-no-margin r-small-text">Deductible</p>
              <select className="form-control">
                <option>$250</option>
              </select>
            </div>
            <div className="row r-small-bottom-margin">
              <p className="r-gray r-small-text">Options</p>
              <p><input type="checkbox" /><span className="r-small-left-padding">Option 1</span></p>
              <p><input type="checkbox" /><span className="r-small-left-padding">Option 2</span></p>
              <p><input type="checkbox" /><span className="r-small-left-padding">Option 3</span></p>
              <p><input type="checkbox" /><span className="r-small-left-padding">Option 4</span></p>
            </div>
            <h6>Cost</h6>
     <div className="input-group default-margin-tp-btm">
      <span className="input-group-addon" id="sizing-addon2">$</span>
      <input type="text" className="form-control"/>
     </div>
     <h6>Price</h6>
     <div className="input-group default-margin-tp-btm">
      <span className="input-group-addon" id="sizing-addon2">$</span>
      <input type="text" className="form-control"/>
     </div>
          </div>
        </div>
        <div className="col-xs-3 r-small-right-left-margin">
          <div className="rcorners">
            <div className="row r-small-bottom-margin"><b>BASIC</b></div>
            <div className="row r-small-bottom-margin">
              <p className="r-gray r-bottom-no-margin r-small-text">Program</p>
              <select className="form-control">
              {rates.Levels.map(item => {
                  return <option key={ 4+item.Code+item.Desc}>{item.Desc}</option>
              })}
              </select>
            </div>
            <div className="row r-small-bottom-margin">
              <p className="r-gray r-bottom-no-margin r-small-text">Term/Miles</p>
              <select className="form-control">
                <option>48/48,000</option>
              </select>
            </div>
            <div className="row r-small-bottom-margin">
              <p className="r-gray r-bottom-no-margin r-small-text">Deductible</p>
              <select className="form-control">
                <option>$250</option>
              </select>
            </div>
            <div className="row r-small-bottom-margin">
              <p className="r-gray r-small-text">Options</p>
              <p><input type="checkbox" /><span className="r-small-left-padding">Option 1</span></p>
              <p><input type="checkbox" /><span className="r-small-left-padding">Option 2</span></p>
              <p><input type="checkbox" /><span className="r-small-left-padding">Option 3</span></p>
              <p><input type="checkbox" /><span className="r-small-left-padding">Option 4</span></p>
            </div>
            <h6>Cost</h6>
     <div className="input-group default-margin-tp-btm">
      <span className="input-group-addon" id="sizing-addon2">$</span>
      <input type="text" className="form-control"/>
     </div>
     <h6>Price</h6>
     <div className="input-group default-margin-tp-btm">
      <span className="input-group-addon" id="sizing-addon2">$</span>
      <input type="text" className="form-control"/>
     </div>
          </div>
        </div>

      </div>
    );
  }
}
const mapStateToprops = state =>({
  rateInfo: state.rates.ratesInfo
});

export default connect(mapStateToprops,null)(ExpandedProduct);
