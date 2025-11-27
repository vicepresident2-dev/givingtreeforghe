// seed.js

const admin = require('firebase-admin');
const serviceAccount = require('./studio-5465966901-bc5e2-firebase-adminsdk-fbsvc-7eac6a042b.json'); 
// NOTE: Make sure the path to your key is correct, often just './keyfile.json'

// 1. Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://studio-5465966901-bc5e2-default-rtdb.firebaseio.com/" 
});

const db = admin.database();
const ref = db.ref('gifts'); // The main node where the items will live

// 🛑 STEP 1: DEFINE ONLY THE *NEW* ITEMS 
// Ensure all original items (like "LEGOs" or "Soccer balls") are removed from this list!
const rawNewItems = [
    "Costume for 5-7 year old girl", "Veterinarian Play Set", "Play Makeup", 
    "Science Kit for 8-10 year old", "Playmobile toy for 5 year old",
    "Costume for 5-7 year old boy", "Pajamas for 5-7 year old girl", "Pajamas for 3-5 year old boy",
    "Duplos for 3-5 year old", "Pajamas for 5-7 year old boy", "Pajamas for 3-5 year old girl",
    "Pajamas for 10-12 year old boy", "Pajamas for 10-12 year old girl", "Crayola Light Board", 
    "Crayola Arctic Color Chemistry Set", "Crayola Double Doodle Board", "Legos for 12 year old boy"
    "Legos for 12 year old girl", "Legos for 10 year old girl",  "Legos for 10 year old boy",
    "Pajamas for 8-10 year old boy", "Pajamas for 8-10 year old girl",
];

// 2. Prepare the data structure for ONLY the new items
const itemsToPush = rawNewItems.map(name => ({
    name: name,
    is_fulfilled: false, // Always set new items to not fulfilled
    timestamp: Date.now() 
}));

// 3. Push the data to the database using ref.push()
function seedNewItemsSafely() {
    console.log(`Starting safe data push for ${itemsToPush.length} new items...`);
    
    if (itemsToPush.length === 0) {
        console.log("No new items to add. Exiting.");
        process.exit(0);
    }
    
    // We use Promise.all to ensure we wait for ALL push operations to finish
    const pushPromises = itemsToPush.map(item => {
        // 🔥 CRITICAL CHANGE: ref.push() creates a new unique key for each item
        return ref.push(item);
    });

    Promise.all(pushPromises)
      .then(() => {
        console.log(`✅ Successfully added ${itemsToPush.length} new items without erasing old data.`);
        process.exit(0);
      })
      .catch(error => {
        console.error("❌ Data seeding failed:", error);
        process.exit(1);
      });
}

seedNewItemsSafely();
