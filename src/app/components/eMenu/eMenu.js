import React, { Component } from 'react';
import _ from 'underscore';

import HttpHelper from '../../Helper/httpHelper';
import RequireProvider from './reqProvider/requiredField';
import TermRate from './termAndRateOption/termRate';
import ProductHeading from './productView/productHeading';

export default class eMenu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            saveEMenu: true,
            products: [],
            active: true
        };
        this.events = {};
        this.data = {};
        this.data.eMenusecOne = [];
        this.data.eMenusecOneObject = {};
        this.events.eMenuOptionselect = this.eMenuOptionselect.bind(this);
        this.events.editEMenu = this.editEMenu.bind(this);
        this.events.eMenuOnsave = this.eMenuOnsave.bind(this);
        this.events.eMenuSelect = this.eMenuSelect.bind(this);
        //this.events.handleChange = this.handleChange.bind(this);
        this.getDealerproduct = this.getDealerproduct.bind(this);
        this.fetchDealtype = this.fetchDealtype.bind(this);
        this.returnRequiredFieldResponse = this.returnRequiredFieldResponse.bind(this);
        this.getMappedRequiredField = this.getMappedRequiredField.bind(this);
        this.getRenderdataFields = this.getRenderdataFields.bind(this);
        this.createReqFieldResponse = this.createReqFieldResponse.bind(this);
        this.createRequestdataTosend = this.createRequestdataTosend.bind(this);
    }

     componentDidMount() {
       //console.log(HttpHelper("https://jsonplaceholder.typicode.com/posts/1",'get'))
       this.getDealerproduct();
       //this.state.dealerProduct = require('../../mockAPI/dealerProducts.json');

       // plz fetch SendRequestToBE
       //this.state.responseTomap = require('../../mockAPI/SendRequestToBE.json');

       //let mapppedval = _.omit(this.data.responseTomap,'Vehicle');


       //this.state.reqFieldResponseUI = require('../../mockAPI/reqFieldResponseUI.json');
    /**uncomment it to fetch data from server for reqFieldResponseUI */

     }

    // componentDidMount() {
    //     //console.log(HttpHelper("https://jsonplaceholder.typicode.com/posts/1",'get'))
    //
    //     this.state.dealerProduct = require('../../mockAPI/dealerProducts.json');
    //     this.state.responseTosend = this.createReqFieldResponse();
    //     // plz fetch SendRequestToBE
    //     this.state.responseTomap = require('../../mockAPI/SendRequestToBE.json');
    //
    //     //let mapppedval = _.omit(this.data.responseTomap,'Vehicle');
    //     this.state.responseTomap.Products = this.getMappedRequiredField();
    //
    //     this.state.reqFieldResponseUI = require('../../mockAPI/reqFieldResponseUI.json');
    //     this.state.reqFieldResponseUI.Products = this.getRenderdataFields();
    //     this.setState({ "products": this.state.reqFieldResponseUI.Products });
    //
    // }

    getDealerproduct(){
        HttpHelper('http://192.168.17.32:6100/api/deal/v1/dealer-products/', 'get').then(function (data) {
            this.state.dealerProduct = data;
           this.createReqFieldResponse();

        }.bind(this));
    }


    createRequestdataTosend(){
        HttpHelper('http://10.117.18.27:6220/Rating/RatingRESTAPI/json/requiredfields_json', 'post', this.state.responseTosend).then(function (data) {
            this.state.responseTomap = data;
            this.state.reqFieldResponseUI = data;
            this.state.reqFieldResponseUI.Products  = this.getMappedRequiredField();
            this.state.reqFieldResponseUI.Products = this.getRenderdataFields();
            this.setState({ "products": this.state.reqFieldResponseUI.Products });
            //this.createRequiredJson();
        }.bind(this));
    }

    createReqFieldResponse() {
        let dataTosend = {};
        dataTosend["KeyData"] = {"ClientId": "DEM", "ClientDealerId": this.state.dealerProduct.results[0].dealer_id,
            "DTDealerId": this.state.dealerProduct.results[0].dealer_id, "RequestDate": "\/Date(1472097614353)\/"};
        // HttpHelper('http://10.117.36.20:6110/api/mobile/v1/deal/deal-jackets/310200000002397200/deals/310200000002397201/vehicle/', 'get').then(function (data) {
        //     dataTosend["Vehicle"] =  { "BookType": "2",  "Type": data.certified_used == 'N'?1:2 };
        //     this.returnRequiredFieldResponse(this.fetchDealtype(dataTosend))
        // }.bind(this));
        dataTosend["Vehicle"] =  { "BookType": "2",  "Type": "1" };
        this.fetchDealtype(dataTosend);
    }

    fetchDealtype(dataTosend){
        HttpHelper('http://sfidsvl001.devtest1.qts.fni:6125/api/deal/v1/deal-jackets/310200000002513901/deals/310200000002513902/deal-finance-summary/', 'get').then(function (data) {
            if(data.finance_method == 'RETL')
            dataTosend["Finance"] = { "DealType": "1"};
            else if(data.finance_method == 'Lease'){
                dataTosend["Finance"] = { "DealType": "2"};
            }
            else if(data.finance_method == 'Balloon'){
                dataTosend["Finance"] = { "DealType": "3"};
            }
            else if(data.finance_method == 'Cash'){
                dataTosend["Finance"] = { "DealType": "4"};
            }
              this.returnRequiredFieldResponse(dataTosend)
            //return dataTosend;
        }.bind(this));

    }

    returnRequiredFieldResponse(dataTosend){
        debugger;
        let productArray = [];
        let productObject = {};
        let returnResponse;
        _.each(this.state.dealerProduct.results, function (item, index) {
            productObject = {
                "ProductTypeCode": item.category_code,
                "ProviderId": item.provider_code,
                "ProviderDealerId": ""
            }
            productArray.push(productObject);
        })
        dataTosend['Products'] = productArray;
          this.state.responseTosend  = dataTosend;
        this.createRequestdataTosend();
      //  return dataTosend;
    }

    getMappedRequiredField() {
        let responseTomap = this.state.responseTomap.Products;
        let mappedData = [];
        _.each(this.state.dealerProduct.results, function (item, i) {
            if (item['is_rateable']) {
                _.each(responseTomap, function (childitem, idx) {
                    // if (('VSC' == childitem['ProductTypeCode'])
                    //     && (item['provider_code'] == childitem['ProviderId'])) {
                    //     mappedData.push(childitem);
                    // }
                    //comment for API
                    childitem['ClientProductId'] = item['product_id']
                    if ((item['category_code'] == childitem['ProductTypeCode'])
                        && (item['provider_code'] == childitem['ProviderId'])) {
                        mappedData.push(childitem);
                    }
                });
            }
        });
        return mappedData;
    }

    getRenderdataFields() {
        let grpResponseObj = {};
        let RequiredFieldResponseProduct = this.state.reqFieldResponseUI.Products;
        _.each(RequiredFieldResponseProduct, function (item, idx) {
            _.each(item.Fields, function (childitem, index) {
                if (Object.keys(grpResponseObj).indexOf(childitem.Category) == -1) {
                    grpResponseObj[childitem.Category] = [];
                }
                if (childitem.Required == 'Y' && childitem.Category != 'Vehicle'
                    && childitem.ControlType != 'NA') {
                    if (childitem.FieldValues && childitem.FieldValues.length > 4) {
                        grpResponseObj[childitem.Category].push(childitem)
                    }
                    else {
                        grpResponseObj[childitem.Category].push(childitem)
                    }
                }
            });
            RequiredFieldResponseProduct[idx]['GroupedCategory'] = grpResponseObj;
            grpResponseObj = {};
        })
        return RequiredFieldResponseProduct
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

    eMenuSelect(ClientProductId, qid, catname, optvalue) {
        console.log("called");
    }

    eMenuOnsave() {
        this.setState({ "saveEMenu": false });
        HttpHelper('http://10.117.36.20:6126/api/deal/v1/deal-jackets/310200000000000502/deals/310200000000000502/required-fields/',
            'post',this.state.reqFieldResponseUI).then(function (data) {

        }.bind(this));
        //let data = HttpHelper('https://jsonplaceholder.typicode.com/posts/1','get')
    }

    editEMenu() {
        this.setState({ "saveEMenu": true });
        //this.setState({"questions":this.data.eMenusecOne})
    }

    render() {
        return (
            <div>
                {this.state.reqFieldResponseUI ?

                    <RequireProvider header='eMenu' IsEdit={this.state.saveEMenu} data={this.state.reqFieldResponseUI} events={this.events} />
                    :
                    null}
                <TermRate events={this.events.eMenuOnsave}/>
                {!this.state.saveEMenu?

                    <ProductHeading/>
                    :null}
            </div>
        );
    }
}
