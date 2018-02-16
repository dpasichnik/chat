Ext.define('chat.profile.Phone',{
    extend: 'Ext.app.Profile',
    mainView:'chat.view.phone.Main',
    //views xtypes defenitions
    views:{
        main:'chat.view.phone.Main'
    },
    isActive: function(){
        console.log('Phone', Ext.platformTags.phone);
        return Ext.platformTags.phone;
    }
});