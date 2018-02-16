Ext.define('chat.profile.Desktop',{
    extend: 'Ext.app.Profile',
    mainView:'chat.view.desktop.Main',
    //views xtypes defenitions
    views:{
        main:'chat.view.desktop.Main',
    },
    isActive: function(){
        console.log('Desktop', Ext.platformTags.desktop);
        return Ext.platformTags.desktop;
    }
});