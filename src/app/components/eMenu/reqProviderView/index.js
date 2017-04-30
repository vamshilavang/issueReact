import React, { Component } from 'react';
import _ from 'underscore';
import {connect} from 'react-redux';

import {updateView,createView} from '../../../actions/requiredProviderAction'

import Question from './question';

class RequiredProvider extends Component {
    constructor(props){
        super(props);
        this.events ={};
        this.events.eMenuOptionselect = this.eMenuOptionselect.bind(this);
        //this.events.eMenuOnsave = this.eMenuOnsave.bind(this);
    }


    componentDidMount() {

    }


    eMenuOptionselect(ClientProductId, qid, catname, optvalue, caption) {
        //console.log(qid + " " +optvalue);
        let questiondata = this.state.reqFieldResponseUI.Products;
        let insertIndex = -1;
        if (questiondata.length > 0) {
            _.map(questiondata, function (category, idx) {
                if (category.ClientProductId + "-" + qid.split('-')[1] == qid) {
                    return (_.map(category.GroupedCategory, function (qs, i) {
                        if (i == catname) {
                            return _.map(qs, function (q, i) {
                                if (q.Required == 'Y' && q.Caption == caption && (q.ControlType != 'NA' && q.ControlType != 'Calendar' && (q.FieldValues !== undefined && q.FieldValues.length > 0 && q.FieldValues.length <= 4))) {
                                    return q.Value = optvalue.Code;
                                }else if (q.Required == 'Y' && q.Caption == caption && (q.ControlType != 'NA' && q.ControlType != 'Calendar' && (q.FieldValues !== undefined && q.FieldValues.length > 4))) {
                                    return q.Value = optvalue.target == undefined ? optvalue.Code : optvalue.target.value;
                                }else if(q.Required == 'Y' && q.Caption == caption && (q.ControlType != 'NA' && q.ControlType != 'Calendar')&& (q.FieldValues !== undefined &&  q.FieldValues.length == 0)){
                                    q.Value = optvalue.target.value;
                                }
                            })
                        }
                    }))
                }
            })
        }
        this.setState({ "reqFieldResponseUI": this.state.reqFieldResponseUI });
    }


    editEMenu() {
        this.setState({ "saveEMenu": true });
        //this.setState({"questions":this.data.eMenusecOne})
    }

    render() {
        if(this.props.Products){
        const questiondata = this.props.Products;
        let checkprovideridList = [];
        let checkExistinCaption = [];
        let showCaption = false;
        return (
            <div className="row">
                {questiondata.length > 0?
                    <div className="row rootborder">

                        {props.IsEdit == false ? (<div className="col-xs-12 emenucol-head" style={{paddingTop:'0px'}}>
                            <span className="emenuHead">Required Provider Question</span><strong style={{ float: 'right', cursor: 'pointer', textDecoration: 'underline', color: '#3f3fb5' }}
                                                                                                 onClick={props.events.editEMenu}>Edit</strong>
                        </div>) :
                            (<section className="acc">
                                <p className="emenuHead">Required Provider Question</p>
                                <div className="col-xs-12" style={{ marginLeft: '5px', paddingBottom: '25px',paddingTop:'5px' }}>
                                    {
                                        _.map(questiondata, function (category, idx) {
                                            if (checkprovideridList.length <= 0 || checkprovideridList.indexOf(category.ProviderId) == -1) {
                                                checkprovideridList.push(category.ProviderId);
                                                checkExistinCaption = [];
                                            }
                                            return (_.map(category.GroupedCategory, function (qs, catname) {
                                                return _.map(qs, function (q, i) {
                                                    if (checkExistinCaption.length < 0 || checkExistinCaption.indexOf(q.Caption) == -1) {
                                                        checkExistinCaption.push(q.Caption);
                                                        showCaption = true;
                                                    } else {
                                                        showCaption = false;
                                                    }
                                                    return (showCaption == true && q.Required == 'Y' && (q.ControlType != 'NA' && q.ControlType != 'Calendar' || (q.FieldValues !== undefined )) ?
                                                        (<Question key={category.ClientProductId.toString() + i + 'q'} categoryName={catname} clientproductId={category.ClientProductId} data={q} qId={i + 'q'} events={props.events} />) : null)
                                                })
                                            }))
                                        })
                                    }
                                    {/* <div className="btn btn-primary pull-right" onClick={props.events.eMenuOnsave}>Save</div>*/}
                                </div>
                            </section>)}
                    </div>:null}
            </div>
        )}else{
            return null
        }
    }
}

const mapStateToProps = (state) =>{
    return{
        products:state.products
    }
}

const mapDispatchToProps =(dispatch) =>{
    return{
        updateview:(data)=>{
            dispatch(updateView(data));
        },
        createview:(data)=>{
            dispatch(createView(data));
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(RequiredProvider)