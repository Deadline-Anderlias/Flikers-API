const express = require('express');
const axios = require('axios');
const path = require('path'); // Utilisé pour définir le chemin du fichier HTML
const app = express();

// Servir le fichier index.html situé dans le même répertoire
app.use(express.static(__dirname));

// Endpoint pour l'API
app.get('/api', async (req, res) => {
    const { link, type, cookie } = req.query;
    await axios.post("https://flikers.org/android/android_get_react.php", {
        post_id: link,
        react_type: type,
        version: "v1.7"
    }, {
        headers: {
            'User-Agent': "Dalvik/2.1.0 (Linux; U; Android 12; V2134 Build/SP1A.210812.003)",
            'Connection': "Keep-Alive",
            'Accept-Encoding': "gzip",
            'Content-Type': "application/json",
            'Cookie': cookie
        }
    })
    .then(dat => { res.json(dat.data); })
    .catch(e => {
        res.json({ error: e });
    });
});

// Servir le fichier index.html quand l'utilisateur accède à la racine "/"
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Lancement du serveur sur le port spécifié dans les variables d'environnement ou 3000 par défaut
app.listen(process.env.PORT || 3000, () => { 
    console.log('Server is live on port', process.env.PORT || 3000); 
});
