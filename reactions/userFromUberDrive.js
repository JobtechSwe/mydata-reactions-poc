// take a drive and extract the changes to the submitted user
module.exports = {
  map: (drive) => ({id: drive.driver.id, rating: drive.rating}),
  reduce: function (user = { gig: {} }, drive) {
    return {
      ...user,
      id: drive.id,
      gig: {
        ...user.gig,
        rating: ((user.gig.rating || 0) * (user.gig.drives || 0) + drive.rating) / (user.gig.drives + 1),
        drives: (user.gig.drives || 0) + 1
      }
    }
  }
}