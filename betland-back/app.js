const firebaseConfig = require('./config');
const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const firebase = require("firebase");   

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();


app.get("/", (req, res) => {
    (async () => {
        try {
            let response =[];
            await db.collection('bets').get().then(querysnapshot => {
                let docs = querysnapshot.docs;
                for (let doc of docs){
                    response.push(doc.data())

                }
                return res.status(200).send(response);
            })
        } catch (error) {
            return res.status(500).send(error);
        }
    })()
    
});

const bets = []; // Stockage des paris

app.post("/", (req, res) => {
  const newBet = req.body;

  // Ajouter le nouveau pari à la base de données Firebase
  (async () => {
      try {
          const docRef = await db.collection('bets').add(newBet);
          console.log('Nouveau pari ajouté à Firebase avec l\'ID :', docRef.id);
          res.status(201).json({ message: 'Pari ajouté avec succès à Firebase', bet: newBet });
      } catch (error) {
          console.error('Erreur lors de l\'ajout du pari à Firebase :', error);
          res.status(500).json({ error: 'Erreur lors de l\'ajout du pari à Firebase' });
      }
  })();
});
const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
