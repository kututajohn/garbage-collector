import {
  query,
  update,
  text,
  Record,
  StableBTreeMap,
  Variant,
  Vec,
  Ok,
  Err,
  nat64,
  Result,
  Canister,
} from "azle";
// Importing UUID v4 for generating unique identifiers
// @ts-ignore
import { v4 as uuidv4 } from "uuid";

/**
 * This type represents an collection that can be listed on an collection manager.
 * It contains basic properties needed to define an collection.
 */
const Collection = Record({
  id: text,
  userId: text,
  userName: text,
  truckId: text,
  date: text,
  time: text,
  address: text,
  district: text,
  weight: nat64,
});

// Payload structure for creating an collection
const CollectionPayload = Record({
  userId: text,
  truckId: text,
  weight: nat64,
});

// Structure representing a user
const User = Record({
  id: text,
  name: text,
  email: text,
  phone: text,
  address: text,
  district: text,
});

// Payload structure for creating a user
const UserPayload = Record({
  name: text,
  email: text,
  phone: text,
  address: text,
  district: text,
});

// Payload structure for updating a user
const UpdateUserPayload = Record({
  id: text,
  email: text,
  phone: text,
  address: text,
  district: text,
});

// Record structure representing truck information
const Truck = Record({
  id: text,
  registration: text,
  driverName: text,
  district: text,
  capacity: nat64,
  assignedUsersIds: Vec(text),
});

// Payload structure for adding truck
const TruckPayload = Record({
  registration: text,
  driverName: text,
  district: text,
  capacity: nat64,
});

// Payload structure for updating truck
const UpdateTruckPayload = Record({
  id: text,
  driverName: text,
  district: text,
  capacity: nat64,
});

// Variant representing different error types
const ErrorType = Variant({
  NotFound: text,
  InvalidPayload: text,
  CreationFailed: text,
});

// Structure representing a truck return object
const TruckReturn = Record({
  userId: text,
  truckId: text,
  address: text,
  truckRegistration: text,
});

/**
 * `collectionsStorage` - a key-value data structure used to store collections by sellers.
 * {@link StableBTreeMap} is a self-balancing tree that acts as durable data storage across canister upgrades.
 * For this contract, `StableBTreeMap` is chosen for the following reasons:
 * - `insert`, `get`, and `remove` operations have constant time complexity (O(1)).
 * - Data stored in the map survives canister upgrades, unlike using HashMap where data is lost after an upgrade.
 *
 * Breakdown of the `StableBTreeMap(text, Collection)` data structure:
 * - The key of the map is an `collectionId`.
 * - The value in this map is an collection (`Collection`) related to a given key (`collectionId`).
 *
 * Constructor values:
 * 1) 0 - memory id where to initialize a map.
 * 2) 16 - maximum size of the key in bytes.
 * 3) 1024 - maximum size of the value in bytes.
 * Values 2 and 3 are not used directly in the constructor but are utilized by the Azle compiler during compile time.
 */
const collectionsStorage = StableBTreeMap(0, text, Collection);
const trucksStorage = StableBTreeMap(2, text, Truck);
const usersStorage = StableBTreeMap(3, text, User);

// Exporting default Canister module
export default Canister({
  // Function to add an collection
  addCollection: update(
    [CollectionPayload],
    Result(Collection, ErrorType),
    (payload) => {
      // Check if the payload is a valid object
      if (typeof payload !== "object" || Object.keys(payload).length === 0) {
        return Err({ InvalidPayload: "invalid payload" });
      }

      // get user
      const userOpt = usersStorage.get(payload.userId);
      if ("None" in userOpt) {
        return Err({ NotFound: `user with id=${payload.userId} not found` });
      }

      // Create an collection with a unique id generated using UUID v4
      const collection = {
        id: uuidv4(),
        time: new Date().toLocaleTimeString(),
        date: new Date().toLocaleDateString(),
        userName: userOpt.Some.name,
        address: userOpt.Some.address,
        district: userOpt.Some.district,
        ...payload,
      };

      console.log("collection", collection);
      // Insert the collection into the collectionsStorage
      try {
        collectionsStorage.insert(collection.id, collection);
      } catch (error) {
        console.log("error", error);
        return Err({ CreationFailed: "creation failed due to" + error });
      }
      return Ok(collection);
    }
  ),

  // truck collection, assigns user to truck
  requestCollection: update(
    [text],
    Result(TruckReturn, ErrorType),
    (userId) => {
      // get user
      const userOpt = usersStorage.get(userId);
      if ("None" in userOpt) {
        return Err({ NotFound: `user with id=${userId} not found` });
      }

      // get truck using filter
      const trucksOpt = trucksStorage
        .values()
        .filter((truck) => truck.district === userOpt.Some.district);

      let truckOpt = trucksOpt[0];

      if (!truckOpt) {
        truckOpt = trucksStorage.values()[0];
      }

      // assign user to truck
      if (truckOpt) {
        const truck = truckOpt;
        const updatedTruck = {
          ...truck,
          assignedUsersIds: truck.assignedUsersIds.concat(userId),
        };
        trucksStorage.insert(truck.id, updatedTruck);

        // Insert the collection into the collectionsStorage
        return Ok({
          userId: userId,
          truckId: truck.id,
          address: userOpt.Some.address,
          truckRegistration: truck.registration,
        });
      } else {
        return Err({ NotFound: `no trucks found` });
      }
    }
  ),

  // Function to retrieve all collections
  getCollections: query([], Vec(Collection), () => {
    return collectionsStorage.values();
  }),

  // Function to retrieve a specific collection by id
  getCollection: query([text], Result(Collection, ErrorType), (id) => {
    const collectionOpt = collectionsStorage.get(id);
    if ("None" in collectionOpt) {
      return Err({ NotFound: `collection with id=${id} not found` });
    }
    return Ok(collectionOpt.Some);
  }),

  // get collections by truck id
  getCollectionsByTruckId: query([text], Vec(Collection), (truckId) => {
    return collectionsStorage
      .values()
      .filter((collection) => collection.truckId === truckId);
  }),

  // search collections by district, address, user id (lowercase)
  searchCollections: query([text], Vec(Collection), (searchText) => {
    const search = searchText.toLowerCase();
    return collectionsStorage
      .values()
      .filter(
        (collection) =>
          collection.district.toLowerCase().includes(search) ||
          collection.address.toLowerCase().includes(search) ||
          collection.userId.toLowerCase().includes(search)
      );
  }),

  // Function to add a user
  addUser: update([UserPayload], Result(User, ErrorType), (payload) => {
    // Check if the payload is a valid object
    if (typeof payload !== "object" || Object.keys(payload).length === 0) {
      return Err({ NotFound: "invalid payload" });
    }
    // Create a user with a unique id generated using UUID v4
    const user = {
      id: uuidv4(),
      trucks: [],
      ...payload,
    };
    // Insert the user into the usersStorage
    usersStorage.insert(user.id, user);
    return Ok(user);
  }),

  // Function to retrieve all users
  getUsers: query([], Vec(User), () => {
    return usersStorage.values();
  }),

  // Function to retrieve a specific user by id
  getUser: query([text], Result(User, ErrorType), (id) => {
    const userOpt = usersStorage.get(id);
    if ("None" in userOpt) {
      return Err({ NotFound: `user with id=${id} not found` });
    }
    return Ok(userOpt.Some);
  }),

  // Function to retrieve collections by user id
  getCollectionsByUserId: query([text], Vec(Collection), (userId) => {
    return collectionsStorage
      .values()
      .filter((collection) => collection.userId === userId);
  }),

  // Function to update a user
  updateUser: update(
    [UpdateUserPayload],
    Result(User, ErrorType),
    (payload) => {
      const userOpt = usersStorage.get(payload.id);
      if ("None" in userOpt) {
        return Err({ NotFound: `user with id=${payload.id} not found` });
      }
      const user = userOpt.Some;
      const updatedUser = {
        ...user,
        ...payload,
      };
      usersStorage.insert(user.id, updatedUser);
      return Ok(updatedUser);
    }
  ),

  // Function to create a truck
  addTruck: update([TruckPayload], Result(Truck, ErrorType), (payload) => {
    if (typeof payload !== "object" || Object.keys(payload).length === 0) {
      return Err({ InvalidPayload: "invalid payload" });
    }
    const truck = {
      id: uuidv4(),
      assignedUsersIds: [],
      ...payload,
    };
    trucksStorage.insert(truck.id, truck);
    return Ok(truck);
  }),

  // Function to retrieve all trucks
  getTrucks: query([], Vec(Truck), () => {
    return trucksStorage.values();
  }),

  // Function to retrieve a specific truck by id
  getTruck: query([text], Result(Truck, ErrorType), (id) => {
    const truckOpt = trucksStorage.get(id);
    if ("None" in truckOpt) {
      return Err({ NotFound: `truck with id=${id} not found` });
    }
    return Ok(truckOpt.Some);
  }),

  // Function to retrieve trucks by district
  getTrucksByDistrict: query([nat64], Vec(Truck), (district) => {
    return trucksStorage
      .values()
      .filter((truck) => truck.district === district);
  }),

  // Function to retrieve users assigned to a truck
  getUsersByTruckId: query([text], Vec(User), (truckId) => {
    const truckOpt = trucksStorage.get(truckId);
    if ("None" in truckOpt) {
      return Err({ NotFound: `truck with id=${truckId} not found` });
    }
    const truck = truckOpt.Some;
    return truck.assignedUsersIds.map((userId: string) => {
      const userOpt = usersStorage.get(userId);
      if ("None" in userOpt) {
        return Err({ NotFound: `user with id=${userId} not found` });
      }
      return Ok(userOpt.Some);
    });
  }),

  // Function to update a truck
  updateTruck: update(
    [UpdateTruckPayload],
    Result(Truck, ErrorType),
    (payload) => {
      const truckOpt = trucksStorage.get(payload.id);
      if ("None" in truckOpt) {
        return Err({ NotFound: `truck with id=${payload.id} not found` });
      }
      const truck = truckOpt.Some;
      const updatedTruck = {
        ...truck,
        ...payload,
      };
      trucksStorage.insert(truck.id, updatedTruck);
      return Ok(updatedTruck);
    }
  ),
});

// A workaround to make the uuid package work with Azle
globalThis.crypto = {
  // @ts-ignore
  getRandomValues: () => {
    let array = new Uint8Array(32);
    for (let i = 0; i < array.length; i++) {
      array[i] = Math.floor(Math.random() * 256);
    }
    return array;
  },
};
