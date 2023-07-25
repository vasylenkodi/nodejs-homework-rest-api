const renameAvatar = (originalName, userId) => {
    const [avatarName, avatarExpansion] = originalName.split('.');
    const newName = `${avatarName}-${userId}.${avatarExpansion}`;
    return newName;
}

module.exports = renameAvatar;