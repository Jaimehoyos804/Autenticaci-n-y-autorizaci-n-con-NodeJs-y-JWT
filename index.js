const express = require('express')
const { getConnection } = require('./db/mongo-connection-atlas')
const app = express()
const port = 3000

getConnection();

app.use(express.json())

app.use('/auth', require('./routers/autentication'));
app.use('/usuario', require('./routers/usuario'));
app.use('/marca',require('./routers/marca'));
app.use('/tipo-equipo',require('./routers/TipoEquipo'));
app.use('/estado-equipo',require('./routers/EstadoEquipo'));
app.use('/inventario',require('./routers/inventario'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})