$( document ).ready(function() {
    
    var cashArray = [100,50,20,10,5,2,1, 0.25,0.10,0.05,0.01];
    var rollsArray = [2,1,0.25,0.10,0.05, 0.01];
    var rollsArrayQty = [25,25,40,50,40,50];
    
    for( var i=0; i < cashArray.length; i++)
    {
      $("#listviewCash").append(createList(cashArray,"cashArray", i));
    }

    for( var i=0; i < rollsArray.length; i++)
    {
    $("#listviewRolls").append(createList(rollsArray,"rollsArray", i))
      
    }

    $("#calc").click(function(){
        var totalCash= 0.00, totalRolls=0.00;

        var money_float = document.getElementById("float").value;

        //cash calc
        for(var i=0; i < cashArray.length; i++){
            //get the user input for row
            var qty = document.getElementById("id_inputcashArray"+cashArray[i]).value;

            if (qty == null){qty = 0;}

            var subtotal = qty * cashArray[i];  

            totalCash += Number(setSubtotal("id_outputcashArray"+ cashArray[i], subtotal));
        }
        document.getElementById("cash_total").innerHTML= "$" +totalCash.toFixed(2);


        //rolls calc
        for(var i=0; i < rollsArray.length; i++){
            //get the user input for row
            var qty = document.getElementById("id_inputrollsArray"+rollsArray[i]).value;

            if (qty == null){qty = 0;}

            var subtotal = qty * rollsArray[i] *rollsArrayQty[i] ;  

            totalRolls += Number(setSubtotal("id_outputrollsArray"+ rollsArray[i], subtotal));
        }
        document.getElementById("rolls_total").innerHTML= "$" + totalRolls.toFixed(2);

        document.getElementById("all_total").innerHTML = "$" + (totalRolls + totalCash - parseFloat(money_float)).toFixed(2);
       
    });

    
});

function createInput( type, name, id, disabledField){
    var input = document.createElement("input");
    input.setAttribute("type" , type);
    input.setAttribute("name", name);
    input.setAttribute("id", id);

    if(disabledField){
        input.setAttribute("disabled",disabledField);
    }
    return input;
}

function setSubtotal(name, amount)
{
    var output = document.getElementById(name);
    output.value = amount.toFixed(2);
    return amount.toFixed(2);
}

function createList(arrList,listtype, index){
    // list item
    var liElement = document.createElement("li");

    //   <div class="ui-grid-b">
    var gridElement = document.createElement("div");

    // <div class=" ui-block-a"> // <div class=" ui-block-b">
    var blockElementA = document.createElement("div");
    var blockElementB = document.createElement("div");
    var blockElementC = document.createElement("div");

    //  [value] | [input] | [subtotal]
    var value = document.createElement("label");
    var valueText = document.createTextNode(arrList[index]);
    var input = createInput("number", "input"+listtype+arrList[index], "id_input"+listtype+arrList[index], false);
    var subtotal = createInput("number", "output"+listtype+arrList[index], "id_output"+listtype+arrList[index], true);
    
    gridElement.setAttribute("class","ui-grid-b");

    blockElementA.setAttribute("class", "ui-block-a");
    blockElementB.setAttribute("class", "ui-block-b");
    blockElementC.setAttribute("class", "ui-hide-label ui-block-c");


    // load label with value
    value.appendChild(valueText);
    blockElementA.appendChild(value);
    blockElementB.appendChild(input);
    blockElementC.appendChild(subtotal);

    gridElement.appendChild(blockElementA);
    gridElement.appendChild(blockElementB);
    gridElement.appendChild(blockElementC);

    liElement.appendChild(gridElement);
    return liElement;
}

