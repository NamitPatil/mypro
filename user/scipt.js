// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAMn7IaS1ttRAD4am7RSkEL9vcXe15jbZg",
    authDomain: "bus-tracking-dkte.firebaseapp.com",
    databaseURL: "https://bus-tracking-dkte-default-rtdb.firebaseio.com/",
    projectId: "bus-tracking-dkte",
    storageBucket: "bus-tracking-dkte.appspot.com",
    messagingSenderId: "939719508769",
    appId: "1:939719508769:web:1e4989dcbe15c5bac57460",
    measurementId: "G-1F49JSBEC8"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const map = L.map('map').setView([0, 0], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

const buttonsContainer = document.getElementById('buttons');
const busMarkers = {};

for (let i = 1; i <= 30; i++) {
    const button = document.createElement('button');
    button.textContent = `Bus ${i}`;
    button.addEventListener('click', () => trackBus(i));
    buttonsContainer.appendChild(button);
}

function trackBus(busNumber) {
    db.collection('buses').doc(busNumber.toString()).onSnapshot((doc) => {
        if (doc.exists) {
            const data = doc.data();
            const latLng = [data.latitude, data.longitude];

            if (busMarkers[busNumber]) {
                busMarkers[busNumber].setLatLng(latLng);
            } else {
                busMarkers[busNumber] = L.marker(latLng).addTo(map)
                    .bindPopup(`Bus ${busNumber}`)
                    .openPopup();
            }

            map.setView(latLng, 15);
        } else {
            alert(`No data available for Bus ${busNumber}`);
        }
    });
}
