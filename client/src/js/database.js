import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// Add logic to a method that accepts some content and adds it to the database
export const putDB = async (content) => {
  console.log("PUT to the database");

  //Connects to the versionof the database that we want to use.
  const contactDb = await openDB("jate", 1);

  //New transaction and specify the database and data privileges.
  const tx = contactDb.transaction("jate", "readandwrite");

  //Open up the desired object store
  const store = tx.objectStore("jate");

  //Use the .add() method on the store and pass in the content
  const request = store.put({ id: 1, value: content });

  //Confirm request
  const result = await request;
  console.log("The data is saved to the database", result);
};

//GETS all content from the database
export const getDB = async () => {
  console.log("GET from the database");

  //Create a connection to the database and version we want to use.
  const contactDb = await openDB("jate", 1);

  //Create transaction and specify the database and priviliges.
  const tx = contactDb.transaction("jate", "readonly");

  //Open up the desired object store.
  const store = tx.objectStore("jate");

  //Use the .getAll() method to get all data in the database.
  const request = store.getAll();

  //Get confirmation of the request.
  const result = await request;
  console.log("result.value", result);
  return result?.value;
};

initdb();
