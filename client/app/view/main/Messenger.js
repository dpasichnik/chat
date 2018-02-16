/**
 * This class is the common messenger view for the application. If you want it to look different for each profile
 * then create same view in corresponding profile dirrectory and add view to profile list
 */
Ext.define('chat.view.main.Messenger', {
    extend: 'Ext.panel.Panel',
    xtype: 'app-messenger',
    controller:'messenger',
    viewModel: {
        "type": "messenger"
    },
    height:500,
    width:350,
    cls:'messenger',
    border:true,
    layout:{
        type:'vbox',
    },
    items:[{
        flex:1,
        scrollable: true,
        overflow: 'scroller',
        layout: {
            type: 'vbox',
            pack: 'bottom'
        },
        items: [{
            xtype: 'dataview',
            bind:{
                store: '{messages}'
            },
            itemTpl: '<div class="msg-wrap {[(values.username == chat.getApplication().nickname)?\'my-msg\':\'\']}"><b><tpl if="username == chat.getApplication().nickname">Я:<tpl else>:{username}</tpl></b><div class="msg">{msg}</div></div>',
            listeners:{
                refresh: 'syncScroll'
            }
        }]
    },{
        border:true,
        margin:5,
        xtype:'textareafield',
        placeholder:'Введите сообщение...',
        height:30,
        maxHeight:100,
        listeners: {
            change: 'onTextChange',
            keypress: 'onKeyPress'
        }
    }],
    listeners: {
        painted: 'onRender'
    }
});