export async function createCollection(collection) {
  return window.canister.collectionManager.addCollection(collection);
}

export async function updateCollection(collection) {
  return window.canister.collectionManager.updateCollection(collection);
}

//  request collection
export async function requestCollection(userId) {
  return window.canister.collectionManager.requestCollection(userId);
}

export async function getCollections() {
  try {
    return await window.canister.collectionManager.getCollections();
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}
