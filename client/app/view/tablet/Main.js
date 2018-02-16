/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting causes an instance of this class to be created and
 * added to the Viewport container.
 */
Ext.define('chat.view.tablet.Main', {
    extend: 'Ext.container.Container',
    xtype: 'app-main',

    requires: [],

    controller: 'main',
    viewModel: 'main',

    layout:{
        type:'center',
    },
    items:[{
        xtype: 'app-messenger'
    }]
});
