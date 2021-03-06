const express = require( 'express' )
const bodyParser = require( 'body-parser' )
const Message = require( './orm/Message' )
const { Op } = require( 'sequelize' )

const port = 3001

const app = express()
// app.use( express.static( PUBLIC ) );

const findMessages = async( idx = 0 ) => ( await Message.findAll( {
    attributes : [ 'index', 'nick', 'message', [ 'createdAt', 'timestamp' ] ],
    where      : {
      index : {
        [Op.gte] : idx
      }
    }
  } ) ).map( x => x.toJSON() )

const getNextMessageId = async() => 1 + ( await Message.max( 'index' ) )

const toTimeStamp = str => new Date( str ).getTime()

app.use( bodyParser.json() )

// // NOTE: Message disabled for removing;

app.get( '/messages', ( req, res ) => {
  res.redirect( '/messages/1' )
} )

app.get( '/messages/:index', async( req, res ) => {
  res.type( 'json' );
  const index = parseInt( req.params.index ) || 0;
  const data = await findMessages( index );
  const nextMessageId = await getNextMessageId( index, data )
  console.log( ' data ', data )
  res.send( { data: data.map( x => { x.timestamp = toTimeStamp( x.timestamp ); return x } ), nextMessageId } );
} )

app.post( '/messages', async( req, res ) => {
  try {
    const { nick, message, author } = req.body;
    const index = await getNextMessageId();
    const newMessage = { index, nick, message, author: author || 'chat' };
    await Message.create( newMessage )
    res.type( 'json' );
    res.status( 201 );
    res.send( { nextMessageId: index + 1 } );
  } catch ( e ) {
    console.log( '!!!!!!!ERROR:MESSAGES', e )
    res.status( 404 )
  }
} )

app.listen( port, () => {
  console.log( `Example app listening at http://localhost:${port}` )
} )
