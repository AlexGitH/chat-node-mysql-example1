const USE_FETCH = typeof fetch === 'function'

function jsonPost( url, data ) {
  return ( USE_FETCH ? jsonFetchPost : jsonXhrPost )( url, data );
}

async function jsonFetchGet( url, id = 0 ) {
  const idx = parseInt( id ) || 0
  try {
    const response = await fetch( `${url}/${idx}` );
    const result = await response.json();
    return result;
  } catch ( err ) {
    throw new Error( `Fail to fetch data: ${err}` );
  }
}

async function jsonFetchPost( url, data ) {
  try {
    const response = await fetch( url, {
      headers : {
        Accept         : 'application/json',
        'Content-Type' : 'application/json'
      },
      method : 'POST',
      body   : JSON.stringify( data )
    } );
    const result = await response.json();
    return result;
  } catch ( err ) {
    throw new Error( `Fail to fetch data: ${err}` );
  }
}

function jsonXhrPost( url, data ) {
  return new Promise( ( resolve, reject ) => {
    const x = new XMLHttpRequest();
    x.onerror = () => reject( new Error( 'jsonPost failed' ) )
    // x.setRequestHeader('Content-Type', 'application/json');
    x.open( 'POST', url, true );
    x.send( JSON.stringify( data ) )

    x.onreadystatechange = () => {
      if ( x.readyState === XMLHttpRequest.DONE && x.status === 200 ) {
        resolve( JSON.parse( x.responseText ) )
      } else if ( x.status !== 200 ) {
        reject( new Error( 'status is not 200' ) )
      }
    }
  } )
}

export {
  jsonPost as default,
  jsonPost,
  jsonFetchGet,
  jsonFetchPost,
  jsonXhrPost
}
