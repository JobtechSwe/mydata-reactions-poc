// take a linkedIn update and extract the changes to the submitted user
module.exports = {
  map: (linkedIn) => Promise.resolve({
    id: linkedIn.user.id,
    update: linkedIn
  }),

  reduce: (user = {experience: [], education: []}, mapped) => Promise.resolve({
    ...user,
    id: mapped.id,
    experience: [...(user.experience || []), mapped.update.experience],
    education: [...(user.education || []), mapped.update.education]
  })
}
