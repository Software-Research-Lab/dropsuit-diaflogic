//#region Dysplay info data

function displayInfoData() {
  const liblink =
    "DropSuit: https://github.com/ladooniani/DropSuit#readme\n" +
    "Copyright © 2016-" +
    getYear() +
    " Lado Oniani - DropSuit. All Rights Reserved.\n\n";
  const libName = "DropSuit NLP module library function:\n";
  const line =
    "\n———————————————————————————————————————————————————————————\n\n";
  const divider =
    "\n-----------------------------------------------------------\n";

  const functionDescription_Diaflogic =
    "\n- Diaflogic: Dialogflow logic constructor and Button Message Bubble functions -\n";
  const libraryInformation = line + liblink + libName + functionDescription_Diaflogic;

  const functionDescription_Diaflogic_Capsule = `${libraryInformation}
     Sets 'slot(object, string, array)' input, Dialogflow condition.

     capsule(object)
     object: .json loader output object return CSS design classes.
     
     Output:
     CSS design classes, button names, and button condition update function.
     ${divider}`;

  const functionDescription_Diaflogic_Slot = `${libraryInformation}
     Sets capsule CSS HTML design values, creates names and provides HTML button functions.
     
     slot(object, string, array)
     Input:
       object: Output of the capsule(object) function, which includes CSS design classes, button names, and button condition update function.
       string: Array of button names.
       array: Array of button names.
     
     Output:
       Agent Dialogflow Message HTML bubble and buttons.
     ${divider}`;

  const functionDescription_Diaflogic_Agent = `${libraryInformation}
      Checks if user or function input request contains call of agent name.

      agent(string, null, array)      
      Input:
        string: Input text.
        null: Default agent name.
        array: Agents names array.
    
      Output:
        Agent name assignment.
  ${divider}`;

  const functionDescription_Diaflogic_Bubble = `${libraryInformation}
      Creates HTML output bubble message using CSS preset design data.

      bubble(object, string)
      object: capsule(object) function CSS design classes, button names, 
      and button condition update function object return.
      string: Dialogflow Message.
  
      Output:
        Dialogflow Message bubble.
  ${divider}`;

  const functionDescription_Diaflogic_flow = `${libraryInformation}
      Handles undefined conditions of Dialogflow results, including out-of-thread value, 
      and configures text message HTML bubble combination with buttons.

      flow(string, object, object, string, object)
      string: Separate 'out of Dialogflow Message' nsent(null/string, integer, integer, integer).
      object: Default message design content.
      object: 'No answer' condition message design content.
      string: Agent Dialogflow Message.
      object: Agent Dialogflow Message HTML bubble and buttons.
  
      Output:
        Agent Dialogflow Message HTML bubble and buttons.
${divider}`;

  const displayInfoData = {
    descDfl_Capsule: functionDescription_Diaflogic_Capsule,
    descDfl_Slot: functionDescription_Diaflogic_Slot,
    descDfl_Agent: functionDescription_Diaflogic_Agent,
    descDfl_Bubble: functionDescription_Diaflogic_Bubble,
    descDfl_flow: functionDescription_Diaflogic_flow,
    line: line,
  };

  return displayInfoData;
}

function getYear() {
  return new Date().getFullYear();
}

//#endregion

//#region Modules

module.exports = {
  displayInfoData,
};

//#endregion
