const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()
var PORT = process.env.PORT || 3000;

const apiKey = 'a31a00da522540e5b5ec034ba594c631'; // News API Key

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index',
    {
      article: null,
      content: null,
      author: null,
      description: null,
      date: null,
      link: null,
      error: null
    });
})

app.post('/', function (req, res) {
  let search = req.body.search;

  let url = `https://newsapi.org/v2/top-headlines?q=${search}&country=us&apiKey=${apiKey}`

  request(url, function (err, response, body) {
    if(err){
      res.render('index',
        {
          article: null,
          content: null,
          author: null,
          description: null,
          date: null,
          link: null,
          error: 'Error, please try again'
        });
    } else {
      let article = JSON.parse(body)
      if(article == undefined){
        res.render('index',
          {
            article: null,
            content: null,
            author: null,
            description: null,
            date: null,
            link: null,
            error: 'Error, please try again'
          });
      } else {
          let title = `${article.articles[0].title}`;
          let content = `${article.articles[0].content}`;
          let author = `${article.articles[0].author}`;
          let description = `${article.articles[0].description}`;
          let date = `${article.articles[0].publishedAt}`;
          let link = `${article.articles[0].url}`;

          res.render('index',
            {
              article: title,
              content: content,
              author: author,
              description: description,
              date: date,
              link: link,
              error: null
            });
      }
    }
  });
})

app.listen(PORT, function () {
  console.log(`Application running @ http://localhost:${PORT}`)
})