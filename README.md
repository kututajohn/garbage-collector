# Collection Management Canister

The Collection Management Canister is a backend system designed to manage collections made by users. It provides functionalities for adding, retrieving, updating, and deleting collections, users, and trucks.

## Features

- **Collection Management**: Add, retrieve, update, and delete collection information including user details, truck information, date, time, address, district, and weight.
- **User Management**: Add, retrieve, and update user information including name, email, phone, address, and district.
- **Truck Management**: Add, retrieve, and update truck information including registration, driver name, district, capacity, and assigned users.
- **Request Collection**: Automatically assign a truck to a user based on their district when requesting a collection.
- **Search Functionality**: Search for collections based on district, address, or user ID.
- **Error Handling**: Handle various error types such as NotFound, InvalidPayload, and CreationFailed using Result types.

## Usage

### Installation

To use the Collection Management Canister in your project, you can install it via npm:

```bash
npm install azle
```

### Importing

You can import the necessary functions and data structures from the "azle" library:

```javascript
import { query, update, text, Record, StableBTreeMap, Variant, Vec, Ok, Err, nat64, Result, Canister } from "azle";
// @ts-ignore
import { v4 as uuidv4 } from "uuid";
```

### Data Structures

The Collection Management Canister defines the following data structures:

- **Collection**: Represents a collection with properties such as id, userId, userName, truckId, date, time, address, district, and weight.
- **User**: Represents a user with properties id, name, email, phone, address, and district.
- **Truck**: Represents a truck with properties id, registration, driverName, district, capacity, and assignedUsersIds.

### Functions

The Collection Management Canister provides the following functions:

#### Collection Management

- **addCollection**: Add a new collection to the system.
- **requestCollection**: Automatically assign a truck to a user based on their district when requesting a collection.
- **getCollections**: Retrieve all collections stored in the system.
- **getCollection**: Retrieve a specific collection by its ID.
- **getCollectionsByTruckId**: Retrieve collections associated with a specific truck.
- **searchCollections**: Search for collections by district, address, or user ID.

#### User Management

- **addUser**: Add a new user to the system.
- **getUsers**: Retrieve all users stored in the system.
- **getUser**: Retrieve a specific user by their ID.
- **getCollectionsByUserId**: Retrieve collections associated with a specific user.
- **updateUser**: Update an existing user with new information.

#### Truck Management

- **addTruck**: Add a new truck to the system.
- **getTrucks**: Retrieve all trucks stored in the system.
- **getTruck**: Retrieve a specific truck by its ID.
- **getTrucksByDistrict**: Retrieve trucks based on district.
- **getUsersByTruckId**: Retrieve users assigned to a specific truck.
- **updateTruck**: Update an existing truck with new information.

### Error Handling

The system utilizes `Result` types to handle errors. Possible error types include NotFound, InvalidPayload, and CreationFailed.

### UUID Workaround

A workaround is provided to make the UUID package compatible with Azle. This enables the generation of unique identifiers for collections, users, and trucks.

## Contributing

Contributions to the Collection Management Canister are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request on the GitHub repository.

## More

### Ledger canister

`./deploy-local-ledger.sh` - deploys a local Ledger canister. IC works differently when run locally so there is no default network token available and you have to deploy it yourself. Remember that it's not a token like ERC-20 in Ethereum, it's a native token for ICP, just deployed separately.
This canister is described in the `dfx.json`:

```json
 "ledger_canister": {
   "type": "custom",
   "candid": "https://raw.githubusercontent.com/dfinity/ic/928caf66c35627efe407006230beee60ad38f090/rs/rosetta-api/icp_ledger/ledger.did",
   "wasm": "https://download.dfinity.systems/ic/928caf66c35627efe407006230beee60ad38f090/canisters/ledger-canister.wasm.gz",
   "remote": {
     "id": {
       "ic": "ryjl3-tyaaa-aaaaa-aaaba-cai"
     }
   }
 }
```

`remote.id.ic` - that is the principal of the Ledger canister and it will be available by this principal when you work with the ledger.

Also, in the scope of this script, a minter identity is created which can be used for minting tokens
for the testing purposes.
Additionally, the default identity is pre-populated with 1000_000_000_000 e8s which is equal to 10_000 * 10**8 ICP.
The decimals value for ICP is 10**8.

List identities:
`dfx identity list`

Switch to the minter identity:
`dfx identity use minter`

Transfer ICP:
`dfx ledger transfer <ADDRESS>  --memo 0 --icp 100 --fee 0`
where:

- `--memo` is some correlation id that can be set to identify some particular transactions (we use that in the marketplace canister).
- `--icp` is the transfer amount
- `--fee` is the transaction fee. In this case it's 0 because we make this transfer as the minter idenity thus this transaction is of type MINT, not TRANSFER.
- `<ADDRESS>` is the address of the recipient. To get the address from the principal, you can use the helper function from the marketplace canister - `getAddressFromPrincipal(principal: Principal)`, it can be called via the Candid UI.

### Internet identity canister

`dfx deploy internet_identity` - that is the canister that handles the authentication flow. Once it's deployed, the `js-agent` library will be talking to it to register identities. There is UI that acts as a wallet where you can select existing identities
or create a new one.

### Marketplace canister

`dfx deploy dfinity_js_backend` - deploys the marketplace canister where the business logic is implemented.
Basically, it implements functions like add, view, update, delete, and buy products + a set of helper functions.

Do not forget to run `dfx generate dfinity_js_backend` anytime you add/remove functions in the canister or when you change the signatures.
Otherwise, these changes won't be reflected in IDL's and won't work when called using the JS agent.

### Marketplace frontend canister

`dfx deploy dfinity_js_frontend` - deployes the frontend app for the `dfinity_js_backend` canister on IC.
