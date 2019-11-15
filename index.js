const axios = require('axios')
exports.orderHandler = async(req, res) => {
  console.log(req);

  const orderID = req.id

  const orderItems = await axios.get('https://www.bluepeaks.biz/api/v1/orders/' + orderID + '/items',{
    headers: {
      "X-AC-Auth-Token": "512cf4799d9ab8cdbdcb6c74ce2444b4",
    }
  })

  const promiseArray = orderItems.items.map(item => axios.get('https://www.bluepeaks.biz/api/v1/product/' + item.id + '/items',{
      headers: {
        "X-AC-Auth-Token": "512cf4799d9ab8cdbdcb6c74ce2444b4",
      }
    })
  )

  const productArray = (
    await Promise.all(promiseArray)
  ).map(prodRes => prodRes.data)

  const orderProducts = {}
//get the product information for each order item
  for (var i = 0; i < productArray.length; i++) {
    const product = productArray[i].
    orderProducts[product.item_number] = product
  }
 return orderProducts
}

exports.helloGET = (req, res) => {
  res.send('Hello from Cloud Functions and Cloud Source Repositories');
};
