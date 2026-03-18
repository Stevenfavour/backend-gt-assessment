## 1. Validation
### Data Validation 
Is the data correct and in correct format
* #### userId
 The user creating a request must have an Id and must be a positive integer.
* #### items
Items must exust and can not be empty,

And each selected item must have a `ProductId` and `quantity` which they both have to be positive intergers. Quantity can't be zero it is either is 1 and above or `item` array do exist. 

### Business Logic  Validation.

This speaks to the fact and aswerss the question, does the data actually make sense and can be be worked on/with?

* The user (hypothetically 25) with id 25 must exist in the database.

* The Product with `productId: 5` must exist. 
* The Product must be available in stock in order to fufil the order.  

## 2. Possible Errors

    1. Invalid User: userId 22 doesn't exist in the database
    2. Product does not exist: productId 44  does not exist
    3. Insufficient stock: Requested quantity exceeds what available on the database
    4. Invalid Qauntity: Quantity specified is not a positive integer.
    5. Inactive/suspended userUser exists but account is not allowed to place orders

## 3. HTTP response codes

| Scenario                         | Status Code                     | Reasoning |
| ---------------                  |-----------------------          | -------- |
| Successful order creation        | 201 Created                     | A new resource (the order) was successfully created. 201 for a POST REQUEST   |
| Invalid request body             | 400 Bad Request                 | The client sent malformed or missing data    |
| Product not found                | 404 Not Found                   | The requested product doesn't exist on the server    |
| Server Error                     | 500 Internal Server Error       | Something went wrong on the backend    |
