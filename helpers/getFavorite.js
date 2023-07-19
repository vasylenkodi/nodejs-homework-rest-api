const getFavorite = (contactsList, favorite) => {
  return contactsList.filter(
    (contact) => `${contact.favorite}` === `${favorite}`
  );
};

module.exports = getFavorite;
