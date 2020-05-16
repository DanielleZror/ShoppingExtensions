# Shopping Extensions
This extension will find the product with the lowest price in one of the following sites: **amazon**, **ebay** or **bestbuy**.

## How it works
The extension listens to updates in the browser. When the user views one of the product pages (according to the keywords), the extension send a request to the server to check if there is a same product with a lower price at the other sites.

The server works with ebay api (search with keywords) and for amazon and bestbuy it works with static data (amazon's affiliate asks for a site and a payment and bestbuy's register to the developer tools return an error). The server will return **false** if the product that the user is looking on is at the best price, otherwise, it returns the **best product** from a different site. In the latter case, the extension will popup with all the details about the best product. 

## How to run
1. Clone the project

<code>
    git clone https://github.com/DanielleZror/ShoppingExtensions.git
</code>

2. load unpacked extension to chrome (extensions folder in the project)
3. install node modules

<code>
npm instll
</code>

3. run the server.js file

<code>
    node server/server.js
</code>

4. browse to amazon/ebay/bestbuy
5. search for one of the product in the list (acordding to the keywords in the table in the next paragraph) 
6. choose a product that contains all of the keywords

*for example:* [apple macbook air in ebay ](https://www.ebay.com/itm/Apple-MacBook-Air-13-3-Intel-i5-8GB-128GB-Silver-2017/254594285792?epid=238216545&hash=item3b470080e0:g:dF4AAOSwdNlesFNt "apple macbook air") will popup this product at amazon.

7. if the product does not have the lowest price, the extension will popup with a link to the product with the lowest price

## The result for the products in the list right now

<table>
    <thead>
        <th>keywords</th>
        <th>amazon</th>
        <th>ebay</th>
        <th>bestbuy</th>
    </thead>
    <tbody>
        <tr>
            <td>xbox one x</td>
            <td>&#x2611</td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td>apple macbook air</td>
            <td>&#x2611</td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td>sony playstation 4</td>
            <td></td>
            <td></td>
            <td>&#x2611</td>
        </tr>
        <tr>
            <td>apple airpods pro</td>
            <td></td>
            <td>&#x2611</td>
            <td></td>
        </tr>
        <tr>
            <td>dell xps 13</td>
            <td></td>
            <td>&#x2611</td>
            <td></td>
        </tr>
    </tbody>
    
</table>


\* Where check mark stands for the site with the lowest price for each keywords (acoording to ebay prices right now)

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