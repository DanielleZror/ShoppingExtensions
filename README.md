# Shopping Extensions
This extension will find the product with the lowest price in one of the following sites: **amazon**, **ebay** or **bestbuy**.

## How it works
The extension listens to updates in the browser. When the user views one of the product pages (according to the keywords), the extension send a request to the server to check if there is a same product with a lower price at the other sites.

The server works with ebay api (search with keywords) and for amazon and bestbuy it works with static data (amazon's affiliate asks for a site and a payment and bestbuy's register to the developer tools return an error). The server will return **false** if the product that the user is looking on is at the best price, otherwise, it returns the **best product** from a different site. In the latter case, the extension will popup with all the details about the best product. 

## How to run
1. Clone the project
2. load unpacked extension (extensions folder in the project)
3. run the server.js file
4. browse to amazon/ebay/bestbuy
5. search for one of the product in the list (acordding to the keywords in the table in the next paragraph)
6. choose a product that contains all of the keywords
7. if the product does not have the lowest price, the extension will popup with a link to the product with the lowest price

## The result for the products in the list right now

|  keywords | amazon  | ebay  | bestbuy  |   
|---|---|---|---|---|
|  xbox one x | V  |   |   |
| apple macbook air  |  V |   |   |
|  sony playstation 4 |   |   | V  |
| apple airpods pro  |   | V  |   |
| dell xps 13  |   |   | V  |

\* Where **V** stands for the site with the lowest price for each keywords

## How to add product for check
Enter to the file '**data.json**', add to products array the following text (change the fields in the brackets):

```
{
    "keywords": [array-of-strings],
    "sites":[{
            "api": "amazon",
            "price":[product-price-at-amazon],
            "url": [link-to-the-product-at-amazon] 
        },
        {
            "api": "bestbuy",
            "price":[product-price-at-bestbuy],
            "url":[link-to-the-product-at-bestbuy] 
        }
    ]
}
```