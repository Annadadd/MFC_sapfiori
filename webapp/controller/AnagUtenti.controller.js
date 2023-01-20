// sap.ui.define([
//     'sap/ui/core/message/ControlMessageProcessor',
//     'sap/ui/core/message/Message',
//     'sap/ui/core/mvc/Controller',
//     'sap/ui/core/library',
//     'sap/ui/model/json/JSONModel',
//     'sap/m/MessagePopover',
//     'sap/m/MessagePopoverItem',
//     'sap/m/MessageToast',
//     "sap/ui/core/Core",
//     "./Utils",
//     "sap/ui/model/Filter",
// 	"sap/ui/model/FilterOperator",
// 	"sap/ui/model/FilterType",
//     "sap/ui/model/Sorter",
// ], function (ControlMessageProcessor, Message, Controller, coreLibrary, JSONModel, MessagePopover, MessagePopoverItem, MessageToast, oCore, Utils, Filter, FilterOperator, FilterType, Sorter ) {
//     "use strict";

//     var MessageType = coreLibrary.MessageType;

//     var PageController = Controller.extend("tileproject.tileproject.controller.tile", {

//         onInit: function () {
//             // var oModel = new JSONModel(sap.ui.require.toUrl("tileproject/tileproject/model/Utenti.json"));
//             // this.getView().setModel(oModel);
//             // var oJSONData = {
// 			// 	busy : false,
// 			// 	order : 0
// 			// };
// 			// var oModel = new JSONModel(oJSONData);
// 			// this.getView().setModel(oModel);

//             // var oSorter = new Sorter({

//             //     path: "UtentiModel", 
//             //     descending: false, 
//             //     group: true
            
//             //   });  
            
//             //   var oList = this.byId("list");
            
//             //   oList.getBinding("items").sort(oSorter);

//             var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
//             oRouter.getRoute("RouteAnagUtenti").attachMatched(this._onObjectMatched, this);
     

//             var oMessageProcessor = new ControlMessageProcessor();
//             var oMessageManager = oCore.getMessageManager();

//             oMessageManager.registerMessageProcessor(oMessageProcessor);

//             oMessageManager.addMessages(
//                 new Message({
//                     message: "Something wrong happened",
//                     type: MessageType.Error,
//                     processor: oMessageProcessor
//                 })
//             );
//         },

     
//         onPress: function (oEvent) {

//             MessageToast.show("Pressed custom button " + oEvent.getSource().getId());
//         },
//         onSemanticButtonPress: function (oEvent) {

//             var sAction = oEvent.getSource().getMetadata().getName();
//             sAction = sAction.replace(oEvent.getSource().getMetadata().getLibraryName() + ".", "");

//             MessageToast.show("Pressed: " + sAction);
//         },
//         onSemanticSelectChange: function (oEvent, oData) {
//             var sAction = oEvent.getSource().getMetadata().getName();
//             sAction = sAction.replace(oEvent.getSource().getMetadata().getLibraryName() + ".", "");

//             var sStatusText = sAction + " by " + oEvent.getSource().getSelectedItem().getText();
//             MessageToast.show("Selected: " + sStatusText);
//         },
//         onPositionChange: function (oEvent) {
//             MessageToast.show("Positioned changed to " + oEvent.getParameter("newPosition"));
//         },
//         onMessagesButtonPress: function (oEvent) {

//             var oMessagesButton = oEvent.getSource();
//             if (!this._messagePopover) {
//                 this._messagePopover = new MessagePopover({
//                     items: {
//                         path: "message>/",
//                         template: new MessagePopoverItem({
//                             description: "{message>description}",
//                             type: "{message>type}",
//                             title: "{message>message}"
//                         })
//                     }
//                 });
//                 oMessagesButton.addDependent(this._messagePopover);
//             }
//             this._messagePopover.toggle(oMessagesButton);
//         },
//         onMultiSelectPress: function (oEvent) {
//             if (oEvent.getSource().getPressed()) {
//                 MessageToast.show("MultiSelect Pressed");
//             } else {
//                 MessageToast.show("MultiSelect Unpressed");
//             }
//         },
//          aggiungiUtente: function(){
//             // this.byId("saveBtn").setProperty( "visible", true),
//             // this.byId("refreshBtn").setProperty( "visible", true),
//             // this.byId("cognome").setValue(""),
//             // this.byId("nome").setValue(""),
//             // this.byId("ruolo").setValue(""),
//             // this.byId("email").setValue(""),
//             // this.byId("telefono").setValue(""),
//             //  this.byId("cognome").setProperty( "editable", true),
//             //  this.byId("nome").setProperty( "editable", true),
//             //  this.byId("ruolo").setProperty( "editable", true),
//             //  this.byId("email").setProperty( "editable", true),
//             //  this.byId("telefono").setProperty( "editable", true)
            
             
//          },
//         refresh: function(){
//             this.byId("cognome").setValue(""),
//             this.byId("nome").setValue(""),
//             this.byId("ruolo").setValue(""),
//             this.byId("email").setValue(""),
//             this.byId("telefono").setValue("")
//         },
//         save:function(){
            
//             this.byId("cognome").setProperty( "editable", false),
//             this.byId("nome").setProperty( "editable", false),
//             this.byId("ruolo").setProperty( "editable", false),
//             this.byId("email").setProperty( "editable", false),
//             this.byId("telefono").setProperty( "editable", false),
//             this.byId("refreshBtn").setProperty( "visible", false),
//             this.byId("saveBtn").setProperty( "visible", false),
//             this.byId("editBtn").setProperty( "visible", true)
//         },
//         edit:function(){
           
//                 this.byId("cognome").setProperty("editable", true);
//                 this.byId("nome").setProperty("editable", true);
//                 this.byId("ruolo").setProperty("editable", true);
//                 this.byId("email").setProperty("editable", true);
//                 this.byId("telefono").setProperty("editable", true);
//                 this.byId("refreshBtn").setProperty( "visible", true),
//             this.byId("saveBtn").setProperty( "visible", true),
//             this.byId("editBtn").setProperty( "visible", false)
//         },

//         onSelectionChange: function (oEvent) {
//             var oList = oEvent.getSource(),
//                 bSelected = oEvent.getParameter("selected");

//             // skip navigation when deselecting an item in multi selection mode
//             if (!(oList.getMode() === "MultiSelect" && !bSelected)) {
//                 // get the list item, either from the listItem parameter or from the event's source itself (will depend on the device-dependent mode).
//                 this._showDetail(oEvent.getParameter("listItem") || oEvent.getSource());



//             }
//         },
//         _onObjectMatched: function (oEvent) {

//             var sObjectId = oEvent.getParameter("arguments").selectedobj;
//             this.getView().bindElement({ path: "/utenti/" + sObjectId, model: "UtentiModel" });

//         },
//         _showDetail: function (oItem) {
//             var id = oItem.getBindingContext("UtentiModel").getProperty("id"); //prendo l'elemento da selezionare tramite id nella master page
//             console.log(id);
//             this.getView().byId("detail").bindElement({ path: "/utenti/" + id, model: "UtentiModel" });//lo sparo dritto nella detail page
//         },

//         //filtro searchfield
//         onSearch: function (oEvt) {
//             var sQuery = oEvt.getParameter("query"),
//                 aFilter = [new Filter("id", FilterOperator.Contains, sQuery),
//                 new Filter("nome", FilterOperator.Contains, sQuery),
//                 new Filter("cognome", FilterOperator.Contains, sQuery),
//             ],
//                 oTable = this.byId("list"),
//                 oBinding = oTable.getBinding("items"),
//                 oFilter = null;
//             if (sQuery.length != 0) {
//                 oFilter = new Filter({
//                     filters: aFilter,
//                     and: false
//                 });
//             }
//             oBinding.filter(oFilter);
//         },

//         // onSort : function () {
// 		// 	var oView = this.getView(),
// 		// 		aStates = [undefined, "asc", "desc"],
// 		// 		aStateTextIds = ["sortNone", "sortAscending", "sortDescending"],
// 		// 		sMessage,
// 		// 		iOrder = oView.getModel("UtentiModel").getProperty("/utenti");

// 		// 	iOrder = (iOrder + 1) % aStates.length;
// 		// 	var sOrder = aStates[iOrder];

// 		// 	oView.getModel("UtentiModel").setProperty("/utenti", iOrder);
// 		// 	oView.byId("list").getBinding("items").sort(sOrder && new Sorter("nome", sOrder === "desc"));

// 		// 	// sMessage = this._getText("sortMessage", [this._getText(aStateTextIds[iOrder])]);
// 		// 	// MessageToast.show(sMessage);
// 		// 	},

//         // _onRouteMatched: function (oEvent) {
// 		// 	// save the current query state
// 		// 	this._oRouterArgs = oEvent.getParameter("arguments");
// 		// 	this._oRouterArgs["?query"] = this._oRouterArgs["?query"] || {};
// 		// 	var oQueryParameter = this._oRouterArgs["?query"];

// 		// 	// search/filter via URL hash
// 		// 	this._applySearchFilter(oQueryParameter.search);

// 		// 	// sorting via URL hash
// 		// 	this._applySorter(oQueryParameter.sortField, oQueryParameter.sortDescending);
			
// 		// },
		
// 		// _initViewSettingsDialog: function () {
// 		// 	var oRouter = this.getRouter();
// 		// 	this._oVSD = new ViewSettingsDialog("vsd", {
// 		// 		confirm: function (oEvent) {
// 		// 			var oSortItem = oEvent.getParameter("sortItem");
// 		// 			this._oRouterArgs["?query"].sortField = oSortItem.getKey();
// 		// 			this._oRouterArgs["?query"].sortDescending = oEvent.getParameter("sortDescending");
// 		// 			oRouter.navTo("AnagUtenti", this._oRouterArgs, true);
// 		// 		}.bind(this) 
// 		// 	});
//         // },
       
        




//     });


//     return PageController;

// });

sap.ui.define([
    'sap/ui/core/message/ControlMessageProcessor',
    'sap/ui/core/message/Message',
    'sap/ui/core/mvc/Controller',
    'sap/ui/core/library',
    'sap/ui/model/json/JSONModel',
    'sap/m/MessagePopover',
    'sap/m/MessagePopoverItem',
    'sap/m/MessageToast',
    "sap/ui/core/Core",
    "./Utils",
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/FilterType",
    "sap/ui/core/UIComponent"
], function (ControlMessageProcessor, Message, Controller, coreLibrary, JSONModel, MessagePopover, MessagePopoverItem, MessageToast, oCore, Utils,Filter,FilterOperator,FilterType,UIComponent) {
    "use strict";

    var MessageType = coreLibrary.MessageType;

    var PageController = Controller.extend("tileproject.tileproject.controller.tile", {

        onInit: function () {
            // var oModel = new JSONModel(sap.ui.require.toUrl("tileproject/tileproject/model/Utenti.json"));
            // this.getView().setModel(oModel);
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("RouteAnagUtenti").attachMatched(this._onObjectMatched, this);

            var oMessageProcessor = new ControlMessageProcessor();
            var oMessageManager = oCore.getMessageManager();

            oMessageManager.registerMessageProcessor(oMessageProcessor);

            oMessageManager.addMessages(
                new Message({
                    message: "Something wrong happened",
                    type: MessageType.Error,
                    processor: oMessageProcessor
                })
            );

         

        },




        onPress: function (oEvent) {

            MessageToast.show("Pressed custom button " + oEvent.getSource().getId());
        },
        onSemanticButtonPress: function (oEvent) {

            var sAction = oEvent.getSource().getMetadata().getName();
            sAction = sAction.replace(oEvent.getSource().getMetadata().getLibraryName() + ".", "");

            MessageToast.show("Pressed: " + sAction);
        },
        onSemanticSelectChange: function (oEvent, oData) {
            var sAction = oEvent.getSource().getMetadata().getName();
            sAction = sAction.replace(oEvent.getSource().getMetadata().getLibraryName() + ".", "");

            var sStatusText = sAction + " by " + oEvent.getSource().getSelectedItem().getText();
            MessageToast.show("Selected: " + sStatusText);
        },
        onPositionChange: function (oEvent) {
            MessageToast.show("Positioned changed to " + oEvent.getParameter("newPosition"));
        },
        onMessagesButtonPress: function (oEvent) {

            var oMessagesButton = oEvent.getSource();
            if (!this._messagePopover) {
                this._messagePopover = new MessagePopover({
                    items: {
                        path: "message>/",
                        template: new MessagePopoverItem({
                            description: "{message>description}",
                            type: "{message>type}",
                            title: "{message>message}"
                        })
                    }
                });
                oMessagesButton.addDependent(this._messagePopover);
            }
            this._messagePopover.toggle(oMessagesButton);
        },
        onMultiSelectPress: function (oEvent) {
            if (oEvent.getSource().getPressed()) {
                MessageToast.show("MultiSelect Pressed");
            } else {
                MessageToast.show("MultiSelect Unpressed");
            }
        },
        getRouter: function () {
            return UIComponent.getRouterFor(this);

        },
        add: function() {
            this.getRouter().navTo("RouteAddUtente");
          },
       



        refresh: function () {
            this.byId("cognome").setValue(""),
                this.byId("nome").setValue(""),
                this.byId("ruolo").setValue(""),
                this.byId("email").setValue(""),
                this.byId("telefono").setValue("")
        },
        save: function () {

            this.byId("cognome").setProperty("editable", false),
                this.byId("nome").setProperty("editable", false),
                this.byId("ruolo").setProperty("editable", false),
                this.byId("email").setProperty("editable", false),
                this.byId("telefono").setProperty("editable", false),
                this.byId("refreshBtn").setProperty("visible", false),
                this.byId("saveBtn").setProperty("visible", false),
                this.byId("editBtn").setProperty("visible", true)
        },
        edit: function () {

            this.byId("cognome").setProperty("editable", true);
            this.byId("nome").setProperty("editable", true);
            this.byId("ruolo").setProperty("editable", true);
            this.byId("email").setProperty("editable", true);
            this.byId("telefono").setProperty("editable", true);
            this.byId("refreshBtn").setProperty("visible", true),
                this.byId("saveBtn").setProperty("visible", true),
                this.byId("editBtn").setProperty("visible", false)
        },

        onSelectionChange: function (oEvent) {
            var oList = oEvent.getSource(),
                bSelected = oEvent.getParameter("selected");

            // skip navigation when deselecting an item in multi selection mode
            if (!(oList.getMode() === "MultiSelect" && !bSelected)) {
                // get the list item, either from the listItem parameter or from the event's source itself (will depend on the device-dependent mode).
                this._showDetail(oEvent.getParameter("listItem") || oEvent.getSource());



            }
        },
        _onObjectMatched: function (oEvent) {

            var sObjectId = oEvent.getParameter("arguments").selectedobj;
            this.getView().bindElement({ path: "/utenti/" + sObjectId, model: "UtentiModel" });

        },
        _showDetail: function (oItem) {
            var id = oItem.getBindingContext("UtentiModel").getProperty("id"); //prendo l'elemento da selezionare tramite id nella master page
            console.log(id);
            this.getView().byId("detail").bindElement({ path: "/utenti/" + id, model: "UtentiModel" });//lo sparo dritto nella detail page
        },
        
        onSearch: function (oEvt) {
            var sQuery = oEvt.getParameter("query"),
                aFilter = [new Filter("id", FilterOperator.Contains, sQuery),
                new Filter("nome", FilterOperator.Contains, sQuery),
                new Filter("cognome", FilterOperator.Contains, sQuery),
            ],
                oTable = this.byId("list"),
                oBinding = oTable.getBinding("items"),
                oFilter = null;
            if (sQuery.length != 0) {
                oFilter = new Filter({
                    filters: aFilter,
                    and: false
                });
            }
            oBinding.filter(oFilter);
        },
        // vaiHome: function(){
        //     this.getRouter().navTo("Routetile");
        // }

    });


    return PageController;

});