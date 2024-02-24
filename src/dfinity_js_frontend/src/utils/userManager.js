export async function createUser(user) {
  return window.canister.collectionManager.addUser(user);
}

export async function updateUser(user) {
  return window.canister.collectionManager.updateUser(user);
}

export async function getUsers() {
  try {
    return await window.canister.collectionManager.getUsers();
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}

// getCollectionsByUserId
export async function getUsersByUserId(userId) {
  return window.canister.collectionManager.getUser(userId);
}
