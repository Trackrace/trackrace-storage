module.exports = {
    routes: [
      { 
        method: 'POST',
        path: '/races/bulk',
        handler: 'api::race.race.bulk',
      },
      { 
        method: 'GET',
        path: '/races/:id/detail',
        handler: 'api::race.race.detail',
      },
    ]
  }
  
   
  
   