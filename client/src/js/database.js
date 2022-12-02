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

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDB = async (content) => {
  console.log("PUT to the database");

  const contactDb = await openDB("jate", 1);

  //New transaction and specify the database and data privileges.
  const tx = contactDb.transaction("jate", "readandwrite");

  //Open up the desired object store
  const store = tx.objectStore("jate");

  //Use the .add() method on the store and pass in the content
  const request = store.put({ id: 1, value: content });

  //Confirmation of the request
  const result = await request;
  console.log("The data is saved to the database", result);
};

export const putDb = async (content) => console.error("putDb not implemented");

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => console.error("getDb not implemented");

initdb();
