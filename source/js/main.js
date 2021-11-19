import { storage } from "./storage.js";

window.addEventListener("DOMContentLoaded",init);


/**
 * Initializes everything. It all begins here.
 */
async function init() {
  // obtain userInfo from storage
  storage.getUserInfo();
}