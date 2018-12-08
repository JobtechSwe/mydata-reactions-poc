// take a drive and extract the changes to the submitted gig
module.exports = function (gig, drive) {
  return {
    ...gig,
    rating: ((gig.rating || 0) * (gig.drives || 0) + drive.rating) / (gig.drives + 1),
    drives: (gig.drives || 0) + 1
  }
}
