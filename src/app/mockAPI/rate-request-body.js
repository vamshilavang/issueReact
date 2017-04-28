export const data ={
   "_errors": [],
   "keydata": {
      "EchoData": "64763",
      "ClientId": "DEM",
      "ClientDealerId": "104334",
      "DTDealerId": "104334",
      "RequestDate": "\/Date(1472097614353)\/",
      "ContractDate": "\/Date(1472097614353)\/"
   },
   "Products": [

      {
         "ClientProductId": "648086",
         "ProviderProductId": [],
         "ProductTypeCode": "VSC",
         "ProviderId": "APC",
         "Fields": [

          {
               "ControlType": "Dropdown",
               "Comment": [],
               "Value": "N",
               "MaxLength": "6",
               "FieldValues": {
                  "FieldValue": {
                     "Code": "N",
                     "Desc": "Normal"
                  }
               },
               "Required": "Y",
               "Name": "aspiration_code",
               "Caption": "Aspiration Code",
               "DataType": "Alphanumeric",
               "MaxValue": [],
               "MinValue": [],
               "Category": "Collateral"
            },

          {
               "ControlType": "Dropdown",
               "Comment": [],
               "Value": "6",
               "MaxLength": "6",
               "FieldValues": {
                  "FieldValue": {
                     "Code": "6",
                     "Desc": "6"
                  }
               },
               "Required": "Y",
               "Name": "cylinders",
               "Caption": "Cylinders",
               "DataType": "Alphanumeric",
               "MaxValue": [],
               "MinValue": [],
               "Category": "Collateral"
            },
            {
               "ControlType": "Dropdown",
               "Comment": [],
               "Value": "F",
               "MaxLength": "20",
               "FieldValues": {
                  "FieldValue": {
                     "Code": "F",
                     "Desc": "Front"
                  }
               },
               "Required": "Y",
               "Name": "driving_wheels",
               "Caption": "Driving Wheels",
               "DataType": "Alphanumeric",
               "MaxValue": [],
               "MinValue": [],
               "Category": "Collateral"
            },
            {
               "ControlType": "Dropdown",
               "Comment": [],
               "Value": "G",
               "MaxLength": "6",
               "FieldValues": {
                  "FieldValue": {
                     "Code": "G",
                     "Desc": "Gas"
                  }
               },
               "Required": "Y",
               "Name": "fuel_type",
               "Caption": "Fuel Type",
               "DataType": "Alphanumeric",
               "MaxValue": [],
               "MinValue": [],
               "Category": "Collateral"
            },
            {
               "ControlType": "Dropdown",
               "Comment": [],
               "Value": "H",
               "MaxLength": "6",
               "FieldValues": {
                  "FieldValue": {
                     "Code": "H",
                     "Desc": "Full Size Van (Cargo)"
                  }
               },
               "Required": "Y",
               "Name": "segmentation_code",
               "Caption": "Segmentation Code",
               "DataType": "Alphanumeric",
               "MaxValue": [],
               "MinValue": [],
               "Category": "Collateral"
            },
            {
               "ControlType": "Dropdown",
               "Comment": [],
               "Value": "N/A",
               "MaxLength": "10",
               "FieldValues": {
                  "FieldValue": {
                     "Code": "EMPTY",
                     "Desc": "N/A"
                  }
               },
               "Required": "Y",
               "Name": "ton_rating",
               "Caption": "Ton Rating",
               "DataType": "Alphanumeric",
               "MaxValue": [],
               "MinValue": [],
               "Category": "Collateral"
            },
            {
               "ControlType": "Calendar",
               "Comment": "In Service Date is required for Maximum Mileage Vehicle Plans.",
               "Value": "01/18/2017",
               "MaxLength": [],
               "FieldValues": [],
               "Required": "N",
              "Name": "in_service_date",
               "Caption": "In Service Date",
               "DataType": "Date",
               "MaxValue": [],
               "MinValue": [],
               "Category": "Collateral"
            },
            {
               "ControlType": "RadioButton",
               "Comment": [],
               "Value": "Y",
               "MaxLength": [],
               "FieldValues": [
                  {
                     "Code": "Y",
                     "Desc": "Yes"
                  },
                  {
                     "Code": "N",
                     "Desc": "No"
                  }
               ],
               "Required": "Y",
               "Name": "extended_power_train_warranty",
               "Caption": "Extended PowerTrain Warranty",
               "DataType": [],
               "MaxValue": [],
               "MinValue": [],
               "Category": "Collateral"
            },
            {
               "ControlType": "RadioButton",
               "Comment": [],
               "Value": "N",
               "MaxLength": [],
               "FieldValues": [
                  {
                     "Code": "Y",
                     "Desc": "Yes"
                  },
                  {
                     "Code": "N",
                     "Desc": "No"
                  }
               ],
               "Required": "Y",
               "Name": "manufactured_certified",
               "Caption": "Manufacture Certified",
               "DataType": "Alphanumeric",
               "MaxValue": [],
               "MinValue": [],
               "Category": "Collateral"
            },
            {
               "ControlType": "Dropdown",
               "Comment": [],
               "Value": "Personal",
               "MaxLength": [],
               "FieldValues": [
                  {
                     "Code": "Personal",
                     "Desc": "Personal"
                  },
                  {
                     "Code": "Commercial",
                     "Desc": "Commercial"
                  },
                  {
                     "Code": "SnowPlow",
                     "Desc": "SnowPlow"
                  }
               ],
               "Required": "Y",
               "Name": "usage",
               "Caption": "Usage",
               "DataType": "Alphanumeric",
               "MaxValue": [],
               "MinValue": [],
               "Category": "Vehicle"
            },
            {
               "ControlType": "NA",
               "Comment": [],
               "Value": "",
               "MaxLength": "30",
               "FieldValues": [],
               "Required": "N",
               "Name": "vin",
               "Caption": [],
               "DataType": "Alphanumeric",
               "MaxValue": [],
               "MinValue": [],
               "Category": "Vehicle"
            },
            {
               "ControlType": "NA",
               "Comment": [],
               "Value": "12000",
               "MaxLength": "11",
               "FieldValues": [],
               "Required": "Y",
               "Name": "odometer",
               "Caption": [],
               "DataType": "Numeric",
               "MaxValue": "99999999.99",
               "MinValue": [],
               "Category": "Vehicle"
            },
            {
               "ControlType": "NA",
               "Comment": [],
               "Value": "2016",
               "MaxLength": [],
               "FieldValues": [],
               "Required": "Y",
               "Name": "year",
               "Caption": [],
               "DataType": "Alphanumeric",
               "MaxValue": [],
               "MinValue": [],
               "Category": "Vehicle"
            },
            {
               "ControlType": "NA",
               "Comment": [],
               "Value": "Finance",
               "MaxLength": [],
               "FieldValues": [
                  {
                     "Code": "Finance",
                     "Desc": "Finance"
                  },
                  {
                     "Code": "Lease",
                     "Desc": "Lease"
                 },
                  {
                     "Code": "Balloon",
                     "Desc": "Balloon"
                  },
                  {
                     "Code": "Cash",
                     "Desc": "Cash"
                  }
               ],
               "Required": "Y",
               "Name": "deal_type",
               "Caption": [],
               "DataType": "Alphanumeric",
               "MaxValue": [],
               "MinValue": [],
               "Category": "Financing"
            },
            {
               "ControlType": "NA",
               "Comment": [],
               "Value": "ACCORD EXL",
               "MaxLength": "30",
               "FieldValues": [],
               "Required": "Y",
               "Name": "model",
               "Caption": [],
               "DataType": "Alphanumeric",
               "MaxValue": [],
               "MinValue": [],
               "Category": "Vehicle"
            },
            {
               "ControlType": "NA",
               "Comment": [],
               "Value": "000006",
               "MaxLength": [],
               "FieldValues": [],
               "Required": "Y",
               "Name": "provider_dealer_id",
               "Caption": [],
               "DataType": "Alphanumeric",
               "MaxValue": [],
               "MinValue": [],
               "Category": "Product"
            },
            {
               "ControlType": "NA",
               "Comment": [],
               "Value": "New",
               "MaxLength": [],
               "FieldValues": [
                  {
                     "Code": "N",
                     "Desc": "New"
                  },
                  {
                     "Code": "U",
                     "Desc": "Used"
                  }
              ],
               "Required": "Y",
               "Name": "type",
               "Caption": [],
               "DataType": "Alphanumeric",
               "MaxValue": [],
               "MinValue": [],
               "Category": "Vehicle"
            },
            {
               "ControlType": "NA",
               "Comment": [],
               "Value": "POLK",
               "MaxLength": [],
               "FieldValues": [
                  {
                     "Code": "NADA",
                     "Desc": "NADA"
                  },
                  {
                     "Code": "CHROME",
                     "Desc": "CHROME"
                  },
                  {
                     "Code": "POLK",
                     "Desc": "POLK"
                  }
               ],
               "Required": "Y",
               "Name": "book_type",
               "Caption": "Book Type",
               "DataType": "Alphanumeric",
               "MaxValue": [],
               "MinValue": [],
               "Category": "Vehicle"
            },
            {
               "ControlType": "NA",
               "Comment": [],
               "Value": "HONDA",
               "MaxLength": "30",
               "FieldValues": [],
               "Required": "Y",
               "Name": "make",
               "Caption": [],
               "DataType": "Alphanumeric",
               "MaxValue": [],
               "MinValue": [],
               "Category": "Vehicle"
            }
         ],
         "Errors": []
      }
   ],
   "Errors": [],
   "ConsolidatedFields": []
};
