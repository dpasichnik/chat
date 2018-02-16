Ext.define('chat.profile.Tablet',{
    extend: 'Ext.app.Profile',
    mainView:'chat.view.tablet.Main',
    //views xtypes defenitions
    views:{
        main:'chat.view.tablet.Main'
    },
    isActive: function(){
        console.log('Tablet', Ext.platformTags.tablet);
        return Ext.platformTags.tablet;
    }
});