import Message from './Message';

import {List as VList, AutoSizer, CellMeasurer, CellMeasurerCache } from 'react-virtualized';

const cache = new CellMeasurerCache({
  fixedWidth: true,
  minHeight: 100,
});

const makeRowRenderer = ( list ) =>
  function rowRenderer({
    key, // Unique key within array of rows
    index, // Index of row within collection
    style, // Style object to be applied to row (to position it)
    parent,
  }) {
    // console.log('makeRowRenderer:', 'key,index, parent:', key,index, parent);
    return (
      <CellMeasurer
        cache={cache}
        columnIndex={0}
        key={key}
        parent={parent}
        rowIndex={index}
      >
      {({measure, registerChild}) => (
        <div ref={registerChild} style={style}>
          <Message item={list[index]} />
        </div>
      ) }
      </CellMeasurer> 
    );
  }

const MyList = ({list}) => {
  const rowRenderer = makeRowRenderer(list)
  return (
  <div  className="list">
    <AutoSizer>
      {({height, width}) => (
        <VList
          height={height}
          width={width}
          rowCount={list.length}
          rowRenderer={rowRenderer}
          overscanRowCount={3}
          deferredMeasurementCache={cache}
          rowHeight={cache.rowHeight}
        />
      )}
    </AutoSizer>
  </div>)
}

const MessageList = ({messages:{ data }}) => {
  return <MyList list={data} />
}

export default MessageList
