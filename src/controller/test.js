import * as firebase from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js';
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-analytics.js';
import {
  getFirestore,
  runTransaction,
  query,
  where,
  collection,
  collectionGroup,
  addDoc,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  Firestore,
} from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore-lite.js';
import * as firestore from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore-lite.js';

const firebaseConfig = {
  apiKey: 'AIzaSyDqfIGBn6gNF8BRk-6epBYZ_gxoAWBRZ9U',
  authDomain: 'linkbio-6b079.firebaseapp.com',
  projectId: 'linkbio-6b079',
  storageBucket: 'linkbio-6b079.appspot.com',
  messagingSenderId: '447376538446',
  appId: '1:447376538446:web:ab228f97dafee248497c1f',
  measurementId: 'G-KQT111WS5Z',
};

const app = firebase.initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);
const id = new Date().toDateString();
let uid = 'FmpKtGvM0gMF80jJWqBWJNSV6582';
let tid = null;

async function addDailyVisit(visitor) {
  console.log(`templeteId: ${tid}`);

  const device_type = {
    desktop: { user: 0, visits: 0 },
    phone: { user: 0, visits: 0 },
    tablet: { user: 0, visits: 0 },
  };
  const system = {};
  const source = {};

  device_type[visitor.device_type] = { user: 1, visits: 1 };
  system[visitor.os] = { user: 1, visits: 1 };
  source[visitor.source] = { user: 1, visits: 1 };

  const sfDocRef = doc(db, `Users_data/${uid}/Insight/`, tid);

  try {
    await runTransaction(db, async (transaction) => {
      const sfDoc = await transaction.get(sfDocRef);

      if (!sfDoc.exists()) {
        throw 'Document does not exist!';
      }

      if (sfDoc.data().Data.findIndex((x) => x.id === id) === -1) {
        const addData = {
          Total_visit: sfDoc.data().Total_visit + 1,
          Total_user: sfDoc.data().Total_user + 1,
          Data: [
            ...sfDoc.data().Data,
            {
              id,
              City: [
                {
                  user: 1,
                  name: visitor.city,
                  country: visitor.country,
                  visits: 1,
                },
              ],
              Urls: [],
              Click_today: 0,
              Date: firestore.Timestamp.fromDate(new Date()),
              Device: {
                ...device_type,
              },
              System: {
                ...system,
              },
              Source: {
                ...source,
              },
              User_today: 1,
              visits_today: 1,
            },
          ],
        };

        transaction.update(sfDocRef, addData);
      } else {
        const arrayData = sfDoc.data().Data;
        const rootProperty = arrayData.filter((item) => item.id === id)[0];

        rootProperty.visits_today += 1;
        rootProperty.User_today += 1;

        if (rootProperty.System[visitor.os]) {
          rootProperty.System[visitor.os].user = rootProperty.System[visitor.os].user + 1;
          rootProperty.System[visitor.os].visits = rootProperty.System[visitor.os].visits + 1;
        } else {
          rootProperty.System[visitor.os] = { user: 1, visits: 1 };
        }

        if (rootProperty.Source[visitor.source]) {
          rootProperty.Source[visitor.source].user = rootProperty.Source[visitor.source].user + 1;
          rootProperty.Source[visitor.source].visits = rootProperty.Source[visitor.source].visits + 1;
        } else {
          rootProperty.Source[visitor.source] = { user: 1, visits: 1 };
        }

        if (rootProperty.Device[visitor.device_type]) {
          rootProperty.Device[visitor.device_type].user = rootProperty.Device[visitor.device_type].user + 1;
          rootProperty.Device[visitor.device_type].visits = rootProperty.Device[visitor.device_type].visits + 1;
        } else {
          rootProperty.Device[visitor.device_type] = { user: 1, visits: 1 };
        }

        if (rootProperty.City.findIndex((x) => x.name === visitor.city) === -1) {
          rootProperty.City = [
            ...rootProperty.City,
            {
              user: 1,
              name: visitor.city,
              country: visitor.country,
              visits: 1,
            },
          ];
        } else {
          rootProperty.City.map((el) => {
            if (el.name === visitor.city) {
              el.user += 1;
              el.visits += 1;
              return el;
            }
            return el;
          });
        }

        const updateData = {
          Total_visit: sfDoc.data().Total_visit + 1,
          Total_user: sfDoc.data().Total_visit + 1,
          Data: arrayData,
        };

        transaction.update(sfDocRef, updateData);
      }
    });

    window.localStorage.setItem(id, true);
  } catch (e) {
    console.log(e);
  }
}

async function updateDailyVisit(visitor) {
  const sfDocRef = doc(db, `Users_data/${uid}/Insight/`, tid);
  try {
    await runTransaction(db, async (transaction) => {
      const sfDoc = await transaction.get(sfDocRef);
      if (!sfDoc.exists()) {
        throw 'Document does not exist!';
      }

      const arrayData = sfDoc.data().Data;
      const rootProperty = arrayData.filter((item) => item.id === id)[0];

      rootProperty.visits_today += 1;

      if (rootProperty.System[visitor.os]) {
        rootProperty.System[visitor.os].visits = rootProperty.System[visitor.os].visits + 1;
      } else {
        rootProperty.System[visitor.os] = { user: 1, visits: 1 };
      }

      if (rootProperty.Source[visitor.source]) {
        rootProperty.Source[visitor.source].visits = rootProperty.Source[visitor.source].visits + 1;
      } else {
        rootProperty.Source[visitor.source] = { user: 1, visits: 1 };
      }

      if (rootProperty.Device[visitor.device_type]) {
        rootProperty.Device[visitor.device_type].visits = rootProperty.Device[visitor.device_type].visits + 1;
      } else {
        rootProperty.Device[visitor.device_type] = { user: 1, visits: 1 };
      }

      if (rootProperty.City.findIndex((x) => x.name === visitor.city) === -1) {
        rootProperty.City = [
          ...rootProperty.City,
          {
            user: 1,
            name: visitor.city,
            country: visitor.country,
            visits: 1,
          },
        ];
      } else {
        rootProperty.City.map((el) => {
          if (el.name === visitor.city) {
            el.visits += 1;
            return el;
          }
          return el;
        });
      }

      const updateData = {
        Total_visit: sfDoc.data().Total_visit + 1,
        Data: arrayData,
      };

      transaction.update(sfDocRef, updateData);
    });
    window.localStorage.setItem(id, true);
  } catch (e) {
    console.log(e);
  }
}

async function updateCounter() {
  const sfDocRef = doc(db, `Users_data/${uid}/Insight/`, tid);
  try {
    await runTransaction(db, async (transaction) => {
      const sfDoc = await transaction.get(sfDocRef);

      const arrayData = sfDoc.data().Data;
      const rootProperty = arrayData.filter((item) => item.id === id)[0];

      rootProperty.Click_today += 1;

      if (!sfDoc.exists()) {
        throw 'Document does not exist!';
      }
      const updateData = {
        Total_Click: sfDoc.data().Total_Click + 1,
        Data: arrayData,
      };
      transaction.update(sfDocRef, updateData);
    });
  } catch (e) {
    console.log(e);
  }
}

async function updateUrl(url, name) {
  const sfDocRef = doc(db, `Users_data/${uid}/Insight/`, tid);
  try {
    await runTransaction(db, async (transaction) => {
      const sfDoc = await transaction.get(sfDocRef);

      const arrayData = sfDoc.data().Data;
      const rootProperty = arrayData.filter((item) => item.id === id)[0];

      if (!sfDoc.exists()) {
        throw 'Document does not exist!';
      }

      if (rootProperty.Urls.findIndex((x) => x.url_name === url) === -1) {
        rootProperty.Urls = [
          ...rootProperty.Urls,
          {
            user: 1,
            name,
            url_name: url,
            visits: 1,
          },
        ];
      } else {
        rootProperty.Urls.map((el) => {
          if (el.url_name === url) {
            el.visits += 1;
            return el;
          }
          return el;
        });
      }

      const updateData = {
        Data: arrayData,
      };
      transaction.update(sfDocRef, updateData);
    });
  } catch (e) {
    console.log(e);
  }
}

async function GFG_Fun() {
  let userAgent = {};
  const host = window.location.origin;

  const source = !document.referrer || document.referrer.startsWith(host) ? 'direct' : document.referrer.split('.')[1];

  const user = window.localStorage.getItem('user');

  if (!user || window.localStorage.getItem(id) === null) {
    fetch('https://api.ipregistry.co/?key=tryout')
      .then((response) => response.json())
      .then((payload) => {
        userAgent.city = payload.location.city;
        userAgent.country = payload.location.country.name;
        userAgent.os = payload.user_agent.os.name;
        userAgent.device_type = payload.user_agent.device.type;

        addDailyVisit({
          city: userAgent.city,
          country: userAgent.country,
          os: userAgent.os,
          device_type: userAgent.device_type,
          browser_name: userAgent.browser_name,
          source,
        });

        window.localStorage.setItem('user', JSON.stringify(userAgent));
      });
  } else {
    userAgent = JSON.parse(user);
    updateDailyVisit({
      city: userAgent.city,
      os: userAgent.os,
      device_type: userAgent.device_type,
      browser_name: userAgent.browser_name,
      country: userAgent.country,
      source,
    });
  }
}

document.addEventListener('click', (e) => {
  updateCounter();
});

document.querySelectorAll('a').forEach((el) => {
  el.addEventListener('click', (e) => {
    if (
      e.currentTarget.getAttribute('href') === '#' ||
      e.currentTarget.getAttribute('href') === '#/' ||
      e.currentTarget.getAttribute('href') === ''
    ) {
    } else {
      const dataName = e.currentTarget.getAttribute('data-name');
      updateUrl(e.currentTarget.getAttribute('href'), dataName);
    }
  });
});

window.addEventListener('load', async () => {
  const myReviews = collectionGroup(db, 'pages');
  const q = query(myReviews, where('templateid', '==', 'hiDxRIaqLcf'));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    uid = doc.data().userId;
    const { search } = window.location;
    if (search) {
      tid = window.location.search.split('?tid=')[1];
    } else {
      tid = 'Template_id';
    }
    GFG_Fun();
  });
});
