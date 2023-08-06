const pagination = (contactsList, page, limit) => {
    const firstContact = (page - 1) * limit;
    return contactsList.splice(firstContact, firstContact + limit);
}

module.exports = pagination;