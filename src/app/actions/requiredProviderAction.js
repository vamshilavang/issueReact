import HttpHelper from '../Helper/httpHelper'
import _ from 'underscore';
debugger;
export function updateView(data) {
    return{
        type:"UPDATE_VIEW",
        payload:data
    }
}

export function createView(data) {
    return{
        type:"CREATE_VIEW",
        payload:data
    }
}

// default loading of courses

export default function dummyView() {
    return function (dispatch) {
        // return loadviewfromDummydata().then(data =>{
        //     dispatch(data)
        // })
       dispatch(createView(loadviewfromDummydata()))
    };
}


// For getting the product data and showing in UI --- real Api call
function createReqFieldResponse(dealerProduct) {
    let dataTosend = {};
    dataTosend["KeyData"] = {"ClientId": "DEM", "ClientDealerId": this.state.dealerProduct.results[0].dealer_id,
        "DTDealerId": dealerProduct.results[0].dealer_id, "RequestDate": "\/Date(1472097614353)\/"};
    // HttpHelper('http://10.117.36.20:6110/api/mobile/v1/deal/deal-jackets/310200000002397200/deals/310200000002397201/vehicle/', 'get').then(function (data) {
    //     dataTosend["Vehicle"] =  { "BookType": "2",  "Type": data.certified_used == 'N'?1:2 };
    //     this.returnRequiredFieldResponse(this.fetchDealtype(dataTosend))
    // }.bind(this));
    dataTosend["Vehicle"] =  { "BookType": "2",  "Type": "1" };
    //fetchDealtype(dataTosend);
}

function fetchDealtype(dataTosend){
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
        returnRequiredFieldResponse(dataTosend)
        //return dataTosend;
    }.bind(this));

}

function returnRequiredFieldResponse(dataTosend){
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

function createRequestdataTosend(){
    HttpHelper('http://10.117.18.27:6220/Rating/RatingRESTAPI/json/requiredfields_json', 'post', this.state.responseTosend).then(function (data) {
        this.state.responseTomap = data;
        this.state.reqFieldResponseUI = data;
        this.state.reqFieldResponseUI.Products = this.getMappedRequiredField();
        this.state.reqFieldResponseUI.Products = this.getRenderdataFields();
        this.setState({ "products": this.state.reqFieldResponseUI.Products });
        //this.createRequiredJson();
    }.bind(this));
}

// From dummy Api 

function loadviewfromDummydata() {
    debugger;
    let productdata = require('../mockAPI/dealerProducts.json');
    let responseToend = createReqFieldResponsedummy(productdata);
    let responseTomap =  require('../mockAPI/SendRequestToBE.json');
    responseTomap.Products = getMappedRequiredField(responseTomap,productdata);
    let reqFieldResponseUI = require('../mockAPI/reqFieldResponseUI.json');
    reqFieldResponseUI.Products = getRenderdataFields(reqFieldResponseUI);
    return reqFieldResponseUI
}

function createReqFieldResponsedummy(dealerProduct) {
    let dataTosend = {};
    dataTosend["KeyData"] = {"ClientId": "DEM", "ClientDealerId": dealerProduct.results[0].dealer_id,
        "DTDealerId": dealerProduct.results[0].dealer_id, "RequestDate": "\/Date(1472097614353)\/"};
    // HttpHelper('http://10.117.36.20:6110/api/mobile/v1/deal/deal-jackets/310200000002397200/deals/310200000002397201/vehicle/', 'get').then(function (data) {
    //     dataTosend["Vehicle"] =  { "BookType": "2",  "Type": data.certified_used == 'N'?1:2 };
    //     this.returnRequiredFieldResponse(this.fetchDealtype(dataTosend))
    // }.bind(this));
    dataTosend["Vehicle"] =  { "BookType": "2",  "Type": "1" };
    //this.fetchDealtype(dataTosend);
}

function getMappedRequiredField(responseTomap,dealerProduct) {
    let responseTomap1 = responseTomap.Products;
    let mappedData = [];
    _.each(dealerProduct.results, function (item, i) {
        if (item['is_rateable']) {
            _.each(responseTomap1, function (childitem, idx) {
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

function getRenderdataFields(reqFieldResponseUI) {
    let grpResponseObj = {};
    let RequiredFieldResponseProduct = reqFieldResponseUI.Products;
    _.each(RequiredFieldResponseProduct, function (item, idx) {
        _.each(item.Fields, function (childitem, index) {
            if (Object.keys(grpResponseObj).indexOf(childitem.Category) == -1) {
                grpResponseObj[childitem.Category] = [];
            }
            if (childitem.ControlType != 'NA') {
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