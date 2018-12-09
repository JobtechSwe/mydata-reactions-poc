// take a drive and extract the changes to the submitted user
module.exports = {
  map: (drive) => Promise.resolve({id: drive.driver.id, rating: drive.rating, date: drive.date}),
  reduce: (user = { gig: {} }, drive) => Promise.resolve({
    ...user,
    id: drive.id,
    gig: {
      ...user.gig,
      rating: ((user.gig && user.gig.rating || 0) * (user.gig && user.gig.drives || 0) + drive.rating) / ((user.gig && user.gig.drives || 0) + 1),
      drives: (user.gig && user.gig.drives || 0) + 1,
      lastDrive: drive.date
    }
  })
}
