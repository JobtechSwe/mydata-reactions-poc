// take a linkedIn update and extract the changes to the submitted user
module.exports = {
  map: (linkedIn) => ({
    id: linkedIn.user.id,
    update: linkedIn
  }),

  reduce: (user = {experience: [], education: []}, linkedIn) => ({
    ...user,
    id: linkedIn.id,
    experience: [...(user.experience || []), linkedIn.update.experience],
    education: [...(user.education || []), linkedIn.update.education]
  })
}
