function ManageSubIndustry(executionContext){
    var formContext = executionContext.getFormContext();
    if(formContext.getAttribute("tr_industry") && formContext.getAttribute("tr_subindustry")){
        var industry = formContext.getAttribute("tr_industry").getValue();
        console.log("Industry "+ industry);
        var arrSubIndustry = formContext.getControl("tr_subindustry").getOptions();
        
        //setup Sub Industry optionsets
        var Upstream = {value : 1, text : "Upstream"};
        var Midstream = {value : 2, text : "Midstream"};
        var Downstream = {value : 3, text : "Downstream"};
        var Residential = {value : 4, text : "Residential"};
        var Commercial = {value : 5, text : "Commercial"};
        var Industrial = {value : 6, text : "Industrial"};
        var Solar = {value : 7, text : "Solar"};
        var Wind = {value : 8, text : "Wind"};
        var Battery = {value : 9, text : "Battery"};
        var Towers = {value : 10, text : "Towers"};
        var Fiber = {value : 11, text : "Fiber"};
        var DataCenters = {value : 12, text : "Data Centers"};
        var ElectricTransmission = {value : 13, text : "Electric Transmission"};
        var Road = {value : 14, text : "Road"};
        var Railroad = {value : 15, text : "Railroad"};

        if(industry == null){
            // Clear current items
            for (var i = 0; i < arrSubIndustry.length; i++) {
                formContext.getControl("tr_subindustry").removeOption(arrSubIndustry[i].value);
            }
            formContext.getControl("tr_subindustry").addOption(Upstream);
            formContext.getControl("tr_subindustry").addOption(Midstream);
            formContext.getControl("tr_subindustry").addOption(Downstream);
            formContext.getControl("tr_subindustry").addOption(Residential);
            formContext.getControl("tr_subindustry").addOption(Commercial);
            formContext.getControl("tr_subindustry").addOption(Industrial);
            formContext.getControl("tr_subindustry").addOption(Solar);
            formContext.getControl("tr_subindustry").addOption(Wind);
            formContext.getControl("tr_subindustry").addOption(Battery);
            formContext.getControl("tr_subindustry").addOption(Towers);
            formContext.getControl("tr_subindustry").addOption(Fiber);
            formContext.getControl("tr_subindustry").addOption(DataCenters);
            formContext.getControl("tr_subindustry").addOption(ElectricTransmission);
            formContext.getControl("tr_subindustry").addOption(Road);
            formContext.getControl("tr_subindustry").addOption(Railroad);
        }
        if(industry != null){
            // Clear current items
            for (var i = 0; i < arrSubIndustry.length; i++) {
                formContext.getControl("tr_subindustry").removeOption(arrSubIndustry[i].value);
            }
        }
        if(industry == 1){
            formContext.getControl("tr_subindustry").addOption(Upstream);
            formContext.getControl("tr_subindustry").addOption(Midstream);
            formContext.getControl("tr_subindustry").addOption(Downstream);
        }
        else if(industry == 2){
            formContext.getControl("tr_subindustry").addOption(Residential);
            formContext.getControl("tr_subindustry").addOption(Commercial);
            formContext.getControl("tr_subindustry").addOption(Industrial);
        }
        else if(industry == 3){
            formContext.getControl("tr_subindustry").addOption(Solar);
            formContext.getControl("tr_subindustry").addOption(Wind);
            formContext.getControl("tr_subindustry").addOption(Battery);
        }
        else if(industry == 4){
            formContext.getControl("tr_subindustry").addOption(Towers);
            formContext.getControl("tr_subindustry").addOption(Fiber);
            formContext.getControl("tr_subindustry").addOption(DataCenters);
        }
        else if(industry == 5){
            formContext.getControl("tr_subindustry").addOption(ElectricTransmission);
            formContext.getControl("tr_subindustry").addOption(Road);
            formContext.getControl("tr_subindustry").addOption(Railroad);
        }
        else if(industry == 6){
            formContext.getControl("tr_subindustry").addOption(Upstream);
            formContext.getControl("tr_subindustry").addOption(Midstream);
            formContext.getControl("tr_subindustry").addOption(Downstream);
        }
    }
    else{
        console.log("Controls not found (Industry, Sub Industry)");
    }
    
}