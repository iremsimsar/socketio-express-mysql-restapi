module.exports = (sequelize, Sequelize) => {
    const user_roles = sequelize.define('post', {
        userId: {
            type: Sequelize.INTEGER,
            default: null
        },
        from_user_id:{
            type:Sequelize.INTEGER(11),

        },
        roleId: {
            type: Sequelize.INTEGER,
            default: null
        },
        message:{
            type:Sequelize.TEXT,
            defaullt:null
        }
    });

    return user_roles;
}