import React from 'react';

function Trade({ trade }) {
  return (
    <div>
      <p>
        {trade.requestor.username} requested to trade {trade.requestedBook.title} with {trade.responder.username} for {trade.respondedBook.title}. Status: {trade.status}
      </p>
    </div>
  );
}

export default Trade;
