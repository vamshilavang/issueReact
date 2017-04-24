  import React, { Component } from 'react';
  import Product from './ProductView';
  import PlanOption from './planList';
  import PlanMenu from './planMenu';
  import axios from 'axios';
  import _ from 'underscore';

  function getProviders(providersName){
    const keys = Object.keys(providersName);
    console.log('keys',keys);
    const ProviderInfo = [];
    for(let i=0;i<keys.length;i++){
      const provider = providersName[keys[i]];
        ProviderInfo.push({
          providerName: provider[0].provider_name,
          providerId: provider[0].provider_id
        });
    }
    return ProviderInfo;
  }

  class ProductHeading extends Component {
    constructor() {
      super();
      this.getInitialValues = this.getInitialValues.bind(this);
      this.state = {
       productsArr: []
      };
      this.getInitialValues(this)
   }
  getInitialValues(that){

      var config = {
        method: 'get',
        url: 'http://192.168.17.32:6100/api/deal/v1/dealer-products/',
        headers: {
              'CORELATION-ID': '337fb81b-ef9a-4c1d-8f7e-e5f3ea2f6cb5',
              'TENANT-CODE': 'DTCOM',
              'FUSION-PROD-CODE': 'DTCOM',
              'DEALER-CODE': '1111132'
            },
        responseType: 'json'
      };
      axios.request(config).then(function(res){
          console.log('Result products', res);
          let {data} = res;
          const groupedList = _.groupBy(data.results, 'category_code');
         let result = that.getProductInfo(groupedList);

      that.setState({ productsArr: result});

      });
     }

    getProductInfo(groupedProductList){
      console.log('groupedProductList',groupedProductList);
      const keys =Object.keys(groupedProductList);
      const productList = [];
      for (let i =0; i<keys.length; i++){
        let items =groupedProductList[keys[i]];
        let providersName =_.groupBy(items,'provider_name');
        productList.push({
           id: items[0].product_id,
           title: items[0].name,
           providerList: getProviders(providersName),
           catCode:items[0].category_code,
           price: '$500.00',
           imageUrl: 'http://localhost:8080/src/app/components/eMenu/productView/img/car1.jpg'
        });

     }
      return productList;
  }


    render() {
      let products = this.state.productsArr;
       console.log('state',this.state.productsArr);

      return (
        <div className="container-fluid">
          <div className="row">
          <PlanMenu showRates={true} />
          <div>
            <h3 className="r-bottom" key={"productsHeading"+products.length}>Products</h3>
            <hr className="r-top-no-margin" />
            {
              products.map((product, i) =>
              <Product key={"product_" + product.id} optType={product} />
            )
              }
          </div>
          <div>
          <PlanOption />
          </div>
        </div>
        </div>
      );
    }
  }

  export default ProductHeading;
