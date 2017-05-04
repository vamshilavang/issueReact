import React, { Component } from 'react';
import _ from 'underscore';
import moment from 'moment';

import HttpHelper from '../../Helper/httpHelper';
import RequireProvider from './reqProvider/requiredField';
import TermRate from './termAndRateOption/termRate';
import ProductHeading from './productView/productHeading';

export default class eMenu extends Component {

    constructor(props) {
        super(props)
        window.isSaved = false;
        this.state = {
            saveEMenu: true,
            products: [],
            active: true,
            datevalue:moment(),
            isError :false,
            VechileInfo_data:'',
            financialInfo_data:''
        };
        this.events = {};
        this.data = {};
        this.data.eMenusecOne = [];
        this.data.eMenusecOneObject = {};
        this.events.eMenuOptionselect = this.eMenuOptionselect.bind(this);
        this.events.editEMenu = this.editEMenu.bind(this);
        this.events.eMenuOnsave = this.eMenuOnsave.bind(this);
        this.events.eMenuSelect = this.eMenuSelect.bind(this);
        this.events.opendatepicker = this.opendatepicker.bind(this);
        //this.events.handleChange = this.handleChange.bind(this);
        this.getDealerproduct = this.getDealerproduct.bind(this);
        this.fetchDealtype = this.fetchDealtype.bind(this);
        this.returnRequiredFieldResponse = this.returnRequiredFieldResponse.bind(this);
        this.getMappedRequiredField = this.getMappedRequiredField.bind(this);
        this.getRenderdataFields = this.getRenderdataFields.bind(this);
        this.createReqFieldResponse = this.createReqFieldResponse.bind(this);
        this.createRequestdataTosend = this.createRequestdataTosend.bind(this);

    }

    //  componentDidMount() {
    //    //this.state.financialInfo_data = require('../../mockAPI/financialInfo.json'); // for mappedfield fiels is financial set value in requiredFiieldResponseUI
    //    this.state.VechileInfo_data = require('../../mockAPI/Vehicle.json');
    //   //  HttpHelper('http://10.117.36.20:6110/api/mobile/v1/deal/deal-jackets/310200000002397200/deals/310200000002397201/vehicle/', 'get').then(function (data) {
    //   //        this.state.VechileInfo_data = data;
    //   //
    //   //
    //   //  }.bind(this));
    //    HttpHelper('http://sfidsvl001.devtest1.qts.fni:6125/api/deal/v1/deal-jackets/310200000002513901/deals/310200000002513902/deal-finance-summary/', 'get').then(function (data) {
    //          this.state.financialInfo_data = data;
    //
    //
    //    }.bind(this));
    //    //console.log(HttpHelper("https://jsonplaceholder.typicode.com/posts/1",'get'))
    //    this.getDealerproduct();
    //    //this.state.dealerProduct = require('../../mockAPI/dealerProducts.json');
    //
    //    // plz fetch SendRequestToBE
    //    //this.state.responseTomap = require('../../mockAPI/SendRequestToBE.json');
    //
    //    //let mapppedval = _.omit(this.data.responseTomap,'Vehicle');
    //
    //
    //    //this.state.reqFieldResponseUI = require('../../mockAPI/reqFieldResponseUI.json');
    // /**uncomment it to fetch data from server for reqFieldResponseUI */
    //
    //  }

    componentDidMount() {

        let hiddenInputElement = document.getElementById("example-datepicker");
        console.log(hiddenInputElement);
        //console.log(HttpHelper("https://jsonplaceholder.typicode.com/posts/1",'get'))

        this.state.financialInfo_data = require('../../mockAPI/financialInfo.json'); // for mappedfield fiels is financial set value in requiredFiieldResponseUI
        this.state.VechileInfo_data = require('../../mockAPI/Vehicle.json');// for mappedfield fiels is vechile set value in requiredFiieldResponseUI

        this.state.dealerProduct = require('../../mockAPI/dealerProducts.json');
        //this.state.responseTosend = this.createReqFieldResponse();
        // plz fetch SendRequestToBE
        this.state.responseTomap = require('../../mockAPI/SendRequestToBE.json');
        this.state.reqFieldResponseUI = require('../../mockAPI/reqFieldResponseUI.json');
        //this.state.responseTomap.Products = this.returnRequiredFieldResponse();
        //this.state.reqFieldResponseUI.Products = this.setValueMapping();
        //let mapppedval = _.omit(this.data.responseTomap,'Vehicle');
        this.state.reqFieldResponseUI.Products = this.getMappedRequiredField();


        this.state.reqFieldResponseUI.Products = this.getRenderdataFields();
        this.setState({ "products": this.state.reqFieldResponseUI.Products });

    }

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
        //     this.fetchDealtype(dataTosend)
        //   //  this.returnRequiredFieldResponse(this.fetchDealtype(dataTosend))
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
        let responseTomap = this.state.reqFieldResponseUI.Products;
        let dealerProductData = this.state.dealerProduct.results;
        let mappedData = [];
        _.each(responseTomap, function (childitem, i) {

                _.each(dealerProductData, function (item, idx) {
                    // if (('VSC' == childitem['ProductTypeCode'])
                    //     && (item['provider_code'] == childitem['ProviderId'])) {
                    //     mappedData.push(childitem);
                    // }
                    //comment for API
                    if (item['is_rateable'] && !item['is_deleted']) {
                        if ((item['category_code'] == childitem['ProductTypeCode'])
                            && (item['provider_code'] == childitem['ProviderId']) && (item['provider_code'] != null && item['product_id'])) {
                            childitem['ClientProductId'] = item['product_id']
                            mappedData.push(childitem);
                        }
                    }
                });

        });
        return mappedData;
    }

    getRenderdataFields() {
        let grpResponseObj = {};
        let RequiredFieldResponseProduct = this.state.reqFieldResponseUI.Products;
        let VehicleInfodata = this.state.VechileInfo_data;
        let financialInfo_data = this.state.financialInfo_data;
        _.each(RequiredFieldResponseProduct, function (item, idx) {
            _.each(item.Fields, function (childitem, index) {
                if(childitem.MappingAPI != '' && childitem.MappingField != ''){
                    if(childitem.MappingAPI == 'Vehicle'){
                        childitem.Value = _.pick(VehicleInfodata,childitem.MappingField)
                    }else if(childitem.MappingAPI == 'Finance'){
                        childitem.Value = _.pick(financialInfo_data,childitem.MappingField)
                    }
                }
                if (Object.keys(grpResponseObj).indexOf(childitem.Category) == -1) {
                    grpResponseObj[childitem.Category] = [];
                }
                if (childitem.DisplayOnUI && childitem.ControlType != 'NA' && childitem.ControlType != 'Calendar') {
                    if (childitem.FieldValues && childitem.FieldValues.length > 4) {
                        grpResponseObj[childitem.Category].push(childitem)
                    }
                    else {
                        grpResponseObj[childitem.Category].push(childitem)
                    }
                }else if(childitem.DisplayOnUI && childitem.ControlType == 'Calendar'){
                    if(childitem.Value)
                    childitem.Value = moment(new Date(childitem.Value));
                    grpResponseObj[childitem.Category].push(childitem)
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
        let isFilled = true;
        if (questiondata.length > 0) {
            _.map(questiondata, function (category, idx) {
                if (category.ClientProductId + "-" + qid.split('-')[1] == qid) {
                    return (_.map(category.GroupedCategory, function (qs, i) {
                        if (i == catname) {
                            return _.map(qs, function (q, i) {
                                if (q.DisplayOnUI && q.Caption == caption && (q.ControlType != 'NA' && q.ControlType != 'Calendar' && (q.FieldValues !== undefined && q.FieldValues.length > 0 && q.FieldValues.length <= 4))) {
                                    q['isValid'] = true;
                                    isFilled = true;
                                    return q.Value = optvalue.Code;
                                }else if (q.DisplayOnUI && q.Caption == caption && (q.ControlType != 'NA' && q.ControlType != 'Calendar' && (q.FieldValues !== undefined && q.FieldValues.length > 4))) {
                                    if(optvalue.target && optvalue.target.value) {
                                        q['isValid'] = true;
                                        isFilled = true;
                                        return q.Value = optvalue.target.value;
                                    }else if(optvalue.Code != undefined)
                                        q['isValid'] = true;
                                    isFilled = true;
                                        q.Value = optvalue.Code;
                                }else if(q.DisplayOnUI && q.Caption == caption && (q.ControlType != 'NA' && q.ControlType != 'Calendar')&& (q.FieldValues !== undefined &&  q.FieldValues.length == 0)){
                                    q['isValid'] = true;
                                    isFilled = true;
                                    q.Value = optvalue.target.value;
                                }else{
                                    if(q['isValid']) {
                                        isFilled = true;
                                    }
                                }
                            })
                        }
                    }))
                }
            })
        }
        if(isFilled) {
          isSaved = true;
            this.setState({"isError": false});
        }
        else{
            this.setState({"isError":true});
        }
        this.setState({ "reqFieldResponseUI": this.state.reqFieldResponseUI });
    }

    eMenuSelect(ClientProductId, qid, catname, optvalue) {
        console.log("called");
    }

    eMenuOnsave() {
        let isvalidData = true;
        let questiondata = this.state.reqFieldResponseUI.Products;
        _.map(questiondata, function (category, idx) {

            return (_.map(category.GroupedCategory, function (qs, i) {

                return _.map(qs, function (q, i) {
                    if (q.DisplayOnUI && (!q.Value || q.Value=='please select')  && (q.ControlType != 'NA' && q.ControlType != 'Calendar' && (q.FieldValues !== undefined && q.FieldValues.length > 0 && q.FieldValues.length <= 4))) {
                        isvalidData =false;
                        return q['isValid'] = false;
                    }else if (q.DisplayOnUI && (!q.Value || q.Value=='please select') && (q.ControlType != 'NA' && q.ControlType != 'Calendar' && (q.FieldValues !== undefined && q.FieldValues.length > 4))) {
                        isvalidData = false;
                        return q['isValid'] = false;
                    }else if(q.DisplayOnUI && (!q.Value || q.Value=='please select') && (q.ControlType != 'NA' && q.ControlType != 'Calendar')&& (q.FieldValues !== undefined &&  q.FieldValues.length == 0)){
                        isvalidData = false;
                        q['isValid'] = false;
                    }else if(q.DisplayOnUI && (!q.Value || q.Value=='please select') && (q.ControlType != 'NA' && q.ControlType == 'Calendar')&& (q.FieldValues !== undefined &&  q.FieldValues.length == 0)){
                        isvalidData = false;
                        q['isValid'] = false;
                    }
                })

            }))

        })

        if(isvalidData) {
            isSaved = true;
            this.setState({"isError":false});
            this.setState({"saveEMenu": false});
        }else{
            isSaved = false;
            this.setState({"isError":true});
            this.setState({"saveEMenu": true});
        }



        // HttpHelper('http://10.117.36.20:6126/api/deal/v1/deal-jackets/310200000000000502/deals/310200000000000502/required-fields/',
        //     'post',this.state.reqFieldResponseUI).then(function (data) {
        //
        // }.bind(this));
        //let data = HttpHelper('https://jsonplaceholder.typicode.com/posts/1','get')
    }

    editEMenu() {
        this.setState({ "saveEMenu": true });
        //this.setState({"questions":this.data.eMenusecOne})
    }

    opendatepicker(date) {
        let questiondata = this.state.reqFieldResponseUI.Products;
        let isFilled = true;
        if (questiondata.length > 0) {
            _.map(questiondata, function (category, idx) {
                    return (_.map(category.GroupedCategory, function (qs, i) {

                            return _.map(qs, function (q, i) {
                                if (q.ControlType == 'Calendar') {
                                    q['isValid'] = true;
                                    return q.Value = date.toDate().toString();
                                }
                                if(q.ControlType != 'Calendar' && q.isValid == false){
                                    isFilled = false;
                                }
                            })

                    }))

            })
        }
        if(isFilled) {
            this.setState({"isError": false});
        }
        else{
            this.setState({"isError":true});
        }
        this.setState({ "reqFieldResponseUI": this.state.reqFieldResponseUI });
    }

    render() {
        return (
            <div>
                {this.state.reqFieldResponseUI ?

                    <RequireProvider header='eMenu' error={this.state.isError} IsEdit={this.state.saveEMenu} data={this.state.reqFieldResponseUI} events={this.events} />
                    :
                    null}
                <TermRate events={this.events.eMenuOnsave}/>
                {!this.state.saveEMenu?

                    <ProductHeading items={this.state.dealerProduct}/>
                    :null}
            </div>
        );
    }
}
