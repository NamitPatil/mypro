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

document.getElementById('adminForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const busNumber = document.getElementById('busNumber').value;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;

            db.collection('buses').doc(busNumber).set({
                name,
                phone,
                email,
                busNumber,
                latitude,
                longitude,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
            .then(() => {
                alert('Location saved successfully!');
            })
            .catch((error) => {
                console.error('Error writing document: ', error);
            });
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
});
