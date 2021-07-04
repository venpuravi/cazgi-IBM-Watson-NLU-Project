const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

function getNLUInstance(){
    let api_key=process.env.API_KEY;
    let api_url=process.env.API_URL;

    const NLUV1 = require('ibm-watson/natural-language-understanding/v1');
    const {IamAuthenticator} = require('ibm-watson/auth');

    const nlu = new NLUV1({
        version: '2020-08-01',
        authenticator: new IamAuthenticator({
            apikey:api_key
        }),
        serviceUrl:api_url
    });
    return nlu;
}
const app = new express();

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {
console.log(req.query.url);
    const analyzeParams = {
  'url': req.query.url,
  'features': {
      'emotion':{}//,
     // 'sentiment':{}

      
   
  },
};

getNLUInstance().analyze(analyzeParams)
  .then(analysisResults => {
    console.log(JSON.stringify(analysisResults, null, 2));
    return res.send(analysisResults);
  })
  .catch(err => {
    console.log('error:', err);
    return res.send(err);
  });



    
});

app.get("/url/sentiment", (req,res) => {
   // return res.send("url sentiment for "+req.query.url);
    console.log(req.query.url);
    const analyzeParams = {
  'url': req.query.url,
  'features': {
     // 'emotion':{}//,
     'sentiment':{}

      
   
  },
};

getNLUInstance().analyze(analyzeParams)
  .then(analysisResults => {
    console.log(JSON.stringify(analysisResults, null, 2));
     return res.send(analysisResults.result.sentiment.document.label);
  })
  .catch(err => {
    console.log('error:', err);
    return res.send(err);
  });
});

app.get("/text/emotion", (req,res) => {

      console.log(req.query.text);
    const analyzeParams = {
  'text': req.query.text,
  'features': {
      'emotion':{}//,
     //'sentiment':{}

      
   
  },
};

getNLUInstance().analyze(analyzeParams)
  .then(analysisResults => {
    console.log(JSON.stringify(analysisResults, null, 2));
    return res.send(analysisResults);
  })
  .catch(err => {
    console.log('error:', err);
    return res.send(err);
  });
   
});

app.get("/text/sentiment", (req,res) => {

        console.log(req.query.text);
    const analyzeParams = {
  'text': req.query.text,
  'features': {
     // 'emotion':{}//,
     'sentiment':{}

      
   
  },
};

getNLUInstance().analyze(analyzeParams)
  .then(analysisResults => {
    console.log(JSON.stringify(analysisResults, null, 2));
    return res.send(analysisResults.result.sentiment.document.label);
  })
  .catch(err => {
    console.log('error:', err);
    return res.send(err);
  });
 //   return res.send("text sentiment for "+req.query.text);
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

