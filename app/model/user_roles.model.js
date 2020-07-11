module.exports = (sequelize, Sequelize) => {
    const user_roles = sequelize.define('user_roles', {
        userId: {
            type: Sequelize.INTEGER,
            default: null
        },
           roleId: {
            type: Sequelize.INTEGER,
            default: null
        },
    });
    return user_roles;
}