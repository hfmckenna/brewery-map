/* More readable object format for constructed URL below */

const urlParams = {
    explore: 'https://api.foursquare.com/v2/venues/explore',
    id:'YNBXQPO4SQRUYVQ0NV41N5JC5C5FRMNSM2RHUVNSAFT0BKSZ',
    secret:'35KFP2TTA0UVB5KRFD4DMGYE0YM51GDRLSHUESAVSXWH4XTB',
    city: 'liverpool',
    query: 'pub',
    limit: 10,
    /* Taken from https://stackoverflow.com/questions/3066586/get-string-in-yyyymmdd-format-from-js-date-object
    succinct and pretty readable as a method */
    todaysDate: () => {
        var date = new Date()
        var formattedDate = date.toISOString().slice(0,10).replace(/-/g,"")
        return formattedDate
    }
}

/* There are issues submitting headers, so the inelegant URL & parameters are used. Errors are still caught by the promise chain that invokes this in App.js */

export const get = () =>
  fetch(`${urlParams.explore}?near=${urlParams.city}&client_id=${urlParams.id}&client_secret=${urlParams.secret}&query=${urlParams.query}&limit=${urlParams.limit}&v=${urlParams.todaysDate()}`)
    .then(res => res.json())
    .then(data => data)