import React, { Component } from 'react';
import Product from './ProductView';
import PlanOption from './planList';
import PlanMenu from './planMenu';
import { browserHistory } from 'react-router';
import axios from 'axios';
import _ from 'underscore';

function getProviders(providersName){
    const keys = Object.keys(providersName);
    const ProviderInfo = [];
    for(let i=0;i<keys.length;i++){
        const provider = providersName[keys[i]];
        ProviderInfo.push({
            providerName: provider[0].provider_name,
            providerId: provider[0].provider_id,
            provider_code: provider[0].provider_code
        });
    }
    return ProviderInfo;
}

class ProductHeading extends Component {
    constructor(props) {
        super(props);
        const groupedList = _.groupBy(props.items.results, 'category_code');
        let result = this.getProductInfo(groupedList);
        this.state = {
            productsArr: result
        };
        this.navigateToPrint = this.navigateToPrint.bind(this);
    }

    navigateToPrint(){
        browserHistory.push('/print');
    }

    getProductInfo(groupedProductList){
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
                price:items[0].cost,
                default_price: items[0].default_price,
                isRateable : items[0].is_rateable,
                //   imageUrl: 'app/components/eMenu/productView/img/car1.jpg'
                imageUrl: items[0].image_url
            });

        }
        return productList;
    }


    render() {
        let products = this.state.productsArr;

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
                    <div className="btn btn-primary pull-right" onClick={this.navigateToPrint}>Print</div>
                </div>
            </div>
        );
    }
}

export default ProductHeading;
