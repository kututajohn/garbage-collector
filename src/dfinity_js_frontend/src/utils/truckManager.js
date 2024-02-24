//  add truck
export async function createTruck(truck) {
  return window.canister.collectionManager.addTruck(truck);
}

//  get trucks
export async function getTrucks() {
  return window.canister.collectionManager.getTrucks();
}

// update truck
export async function updateTruck(truck) {
  return window.canister.collectionManager.updateTruck(truck);
}

// get Users By TruckId
export async function getUsersByTruckId(truckId) {
  return window.canister.collectionManager.getUsersByTruckId(truckId);
}
