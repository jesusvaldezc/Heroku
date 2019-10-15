//How to install server
//npm init -y
//npm install express

const express = require('express')
const omdb = require('./movies.js')
const port = process.env.PORT || 3000
const app = express()



app.get('/', function (req, res) {
    res.send({
        greeting: "Hola mundo"

    })
})

app.get('/omdb', function (req, res) {
    if (!req.query.search) {
        res.send({
            error: "Debes de enviar un titulo de una pelicula o serie"
        })
    }

    omdb.omdbMovie(req.query.search, function (error, movieData) {
        if (error) {
            return res.send({
                error: error
            })
        }
        
        if (movieData.season) {
            var title = movieData.title
            omdb.omdbSeason(title, movieData.season, function (error, seriesData) {
                if (error) {
                    return res.send({
                        error: error
                    })
                }
                res.send({
                    title: title,
                    season: seriesData.season,
                    episodes: seriesData.episodes
                })
                
            })

        } else {
            res.send(movieData)
        }
    })
})

app.get('/*', function (req, res) {
    res.send({
        error: "Ruta no es valida"
    })

})

app.listen(port, function () {
    console.log('Up and running!')
})

/* const path = require('path')

const publicDir = path.join(__dirname,'public')
app.use(express.static(publicDir))

app.get('/', function (request, response) {
    response.send('Hola mundo')
})

//about section
/* app.get('/about', function (request, response) {
    response.send('<h1>Un about muy interesante</h1>')

})
//JSON
app.get('/misc', function (request, response) {
    response.send({
        dia: 'jueves',
        description: 'casi viernes'
    })
})

//contact section
app.get('/contact', function (request, response) {
    response.send('Contact me :)')

})

//Start server
app.listen(3000, function () {
    console.log('Up and running!')
})

//no section found
app.get('/*', function (request, response) {
    response.send('OOOPS!')

}) */