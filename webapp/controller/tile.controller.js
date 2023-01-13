sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, UIComponent) {
        "use strict";

        return Controller.extend("tileproject.tileproject.controller.tile", {
            onInit: function () {

                var dataModel = this.getOwnerComponent().getModel("model/flussi.json");
                this.getView().setModel(dataModel, "flussiModel");
                console.log("finita oninit")

            },
            getRouter: function () {
                return UIComponent.getRouterFor(this);

            },
            vaiAlDettaglio: function (oEvent) {
                console.log("entrato in vai al dettaglio");
                var oSource = oEvent.getSource(),
                    oContext = oSource.getBindingContext("flussiModel"),
                    yes = oContext.getPath(),
                    cliente = oContext.getProperty("id");
                this.getRouter().navTo("Routedettaglio", {
                    selectedobj: cliente
                });

            },
            vaiADnD: function () {
                console.log("entrato in DnD");
                
                this.getRouter().navTo("RouteDnD");

            },
        });
    });
