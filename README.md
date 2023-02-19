[<img alt="TAI Lab." width="59px" src="https://github.com/ladooniani/tailab/blob/master/assets/tai_lab_terbinari_cbm_project_logo.png" />](https://github.com/ladooniani/dropsuit#readme)

[![npm version](https://img.shields.io/npm/v/dropsuit/diaflogic.svg?style=flat)](https://www.npmjs.com/package/dropsuit/diaflogic) [![npm](https://img.shields.io/npm/dt/dropsuit/diaflogic.svg?style=flat-square)](https://www.npmjs.com/package/dropsuit/diaflogic) [![License](https://img.shields.io/npm/l/dropsuit/diaflogic.svg)](https://www.npmjs.com/package/dropsuit/diaflogic)

# Overview of [DropSuit](https://github.com/ladooniani/dropsuit#readme) NLP and the Diaflogic Function

[DropSuit](https://github.com/ladooniani/dropsuit#readme) NLP is an open-source JavaScript and Node.js library providing various tools for natural language processing and data manipulation. The diaflogic functions set is one of its modules, used for creating and managing button messages and bubble UI in Dialogflow chatbots. It includes utility functions for building dialogical chains and simplifying the process of handling bubble message UI elements. The library is modular, user-friendly, and available under the Apache License 2.0.

## DropSuit NLP: Diaflogic - A JavaScript & Node.js Function for Dialogflow's Button Messages and Bubble UI Builder Logic

The diaflogic is a set of JavaScript and Node.js functions that is part of the DropSuit NLP library. It is designed for creating and managing button messages and bubble UI in Dialogflow chatbots. It provides a set of utility functions for building dialogical chains that include user choice condition buttons, as well as simplifying the process of creating and handling bubble message UI elements in your chatbot application. This package is designed to be modular and user-friendly, making integration into your existing chatbot application an effortless process. It's open-source and available under the Apache License 2.0.

## Diaflogic

Diaflogic is a Node.js library for building a dialogflow logic scenario. It allows you to process and manipulate the data that dialogflow uses to make decisions. With Diaflogic, you can design custom logic scenarios that meet your specific requirements.

### Installation

Add the library function by installing it via npm:

```
npm install dropsuit/diaflogic
```

### Usage

Import the library in your project:

```
const dropsuit_diaflogic = require("dropsuit/diaflogic");

```

Process [intents.json](https://github.com/ladooniani/dropsuit/blob/main/diaflogic/test/intents.json) using 'jsonIntStrct' function:

```
const json_data = require("dropsuit-diaflogic/jsobj.js");
let intentData = json_data.jsonIntStrct("assets/json/intents.json");
```

Add a preprocessor for the JSON object [design.json](https://github.com/ladooniani/dropsuit/blob/main/diaflogic/test/design.json):

```
const json_des = require("../design.js");
```

Assign the test file path or "assets/json/design.json" to 'designJsonPath':

```
const designJsonPath = "./test/design.json";
```

Load the design:

```
let default_design = json_des.jsonDesign(0, designJsonPath);
let agent1_design = json_des.jsonDesign(1, designJsonPath);
let agent2_design = json_des.jsonDesign(4, designJsonPath);
let noAnsMess_design = json_des.jsonDesign(2, designJsonPath);
let link_design = json_des.jsonDesign(3, designJsonPath);
```

Create input test:

```
let input = "Out-of-thread input request message";
// let input = "Call agent a dialog";
// let input = "Call agent b dialog";

```

Declaire boolset variable, create and call function for your 'server.js' request and response:

```
let boolset; // Agent condition name

function clientReqServerResIO(input, value) {
    var ansret = DialogFlow(input, value);
    return ansret;
}
clientReqServerResIO(input, 0);
```

## DialogFlow function scenario:

```
function DialogFlow(input, value) { ... }
```

Set boolean parameter (true/false) argument value to display console log processing results output information in terminal:

```
var diaflogic = new dropsuit_diaflogic(
    input,
    value,
    intentData,
    default_design,
    true
);
```

Use 'capsule' function to attach and specify design CSS classes for each separate agent:

```
let capsule_txDlgMess = diaflogic.capsule(null);
let capsule_Agent1 = diaflogic.capsule(agent1_design);
let capsule_Agent2 = diaflogic.capsule(agent2_design);
let capsule_NoAnsMess = diaflogic.capsule(noAnsMess_design);
let capsule_link = diaflogic.capsule(link_design);
```

Assign variables:

```
let cond = capsule_Agent1.cond; /// The condition name is equal to all capsules
let slotMessage; /// Slot message
let slotBtn; /// Button names
let btnGroup; // Buttons
let agents = ["agent b", "agent a"]; /// Other agents key words
```

Call agents:

```
/// Default agent name
let defAgent = diaflogic.agent(input, null, agents);

if (defAgent == "agent a") {
  /// Actual agent
  boolset = diaflogic.boolset(agents, defAgent, true);
  slotMessage = "You want Login or Register?";
  slotBtn = ["Login", "Register", "Links"];
  btnGroup = diaflogic.slot(capsule_Agent1, slotMessage, slotBtn);
}
if (defAgent == "agent b") {
  boolset = diaflogic.boolset(agents, defAgent, true);
  slotMessage = "What can I do for you?";
  slotBtn = ["Sitemap", "About us", "Products"];
  btnGroup = diaflogic.slot(capsule_Agent2, slotMessage, slotBtn);
}


```

Build Agent-A Message Dialogflow logic scenario:

```
if (boolset == "agent a") {
  if (cond == "login") {
    slotMessage = "Ok! Please, check Login page!";
    slotBtn = ["Login", "Exit"];
    btnGroup = diaflogic.slot(capsule_Agent1, slotMessage, slotBtn);
  }

  if (cond == "register") {
    slotMessage = "Ok! Please, check Registration page link";
    slotBtn = ["Register", "Exit"];
    btnGroup = diaflogic.slot(capsule_Agent1, slotMessage, slotBtn);
  }

  if (cond == "links") {
    slotMessage = "Check links:";
    slotBtn = [
      "https://yourlink1.com/>Link name 1",
      "https://yourlink2.com/>Link name 2",
    ];
    btnGroup = diaflogic.slot(capsule_link, slotMessage, slotBtn);
  }
  if (cond == "exit") {
    slotMessage = "Agent-A You want to exit?";
    slotBtn = ["Yes", "No"];
    btnGroup = diaflogic.slot(capsule_Agent1, slotMessage, slotBtn);
  }

  if (cond == "yes") {
    slotMessage = "Agent-A Accepted";
    btnGroup = diaflogic.slot(capsule_Agent1, slotMessage, null);
  }

  if (cond == "no") {
    slotMessage = "Agent-A Canceled";
    btnGroup = diaflogic.slot(capsule_Agent1, slotMessage, null);
  }
}

```

Build Agent-B Message Dialogflow logic scenario:

```

if (boolset == "agent b") {
  if (cond == "sitemap") {
    slotMessage = "Sitemap";
    slotBtn = ["Pages", "info", "Exit"];
    btnGroup = diaflogic.slot(capsule_Agent2, slotMessage, slotBtn);
  }
  if (cond == "exit") {
    slotMessage = "Agent-B You want to exit?";
    slotBtn = ["Yes", "No"];
    btnGroup = diaflogic.slot(capsule_Agent2, slotMessage, slotBtn);
  }
  if (cond == "about us") {
    slotMessage = "Agent-B Here is:";
    slotBtn = ["Map", "Resume"];
    btnGroup = diaflogic.slot(capsule_Agent2, slotMessage, slotBtn);
  }
  /// Agent message without button
  if (cond == "yes") {
    slotMessage = "Agent-B Accepted";
    btnGroup = diaflogic.slot(capsule_Agent2, slotMessage, null);
  }
  if (cond == "no") {
    slotMessage = "Agent-B Canceled";
    btnGroup = diaflogic.slot(capsule_Agent2, slotMessage, null);
  }
}

```

Separate dialogue answer and flow switch:

```
let outMessFlowConv = "Out-of-thread output response message";

  let out = diaflogic.flow(
    outMessFlowConv,
    capsule_txDlgMess,
    capsule_NoAnsMess,
    slotMessage,
    btnGroup
  );
```

## Diaflogic: Dialogflow logic constructor and Button Message Bubble functions

The DialogFlow function is the main function that builds the Dialogflow logic scenario. It takes two parameters, the input message and the the Dialogflow intent.

The function takes two parameters, an input message and a value, and performs the following steps:

1. Creates a new instance of the diaflogic class and assigns it to the diaflogic variable.
2. Uses the capsule function to attach and specify design CSS classes for each separate agent.
3. Assigns variables for the condition name, slot message, button names, button groups, and other agent keywords.
4. Calls the agents and builds the Agent-A Message Dialogflow logic scenario.

#### jsonIntStrct

The jsonIntStrct function is used to process the intents.json file. It takes a single parameter, the path to the intents.json file, and returns the intent data in the correct format for use with the diaflogic library.

#### jsonDesign

The jsonDesign function is used to load the design.json file. It takes two parameters, the index of the design object and the path to the design.json file, and returns the design object.

#### boolset

The boolset function is used to assign the condition name to the boolean variable.

### capsule(object)

The capsule function is used to attach and specify design CSS classes for each separate agent. It takes a single parameter, the design object, and returns a capsule object.

Sets 'slot(object, string, array)' input, Dialogflow condition.

#### Input:

Object: .json loader output object return CSS design classes.

#### Output:

CSS design classes, button names, and button condition update function.

```
Input: [ 'Out-of-thread input request message' ]
Message Dialogflow function value: (0)
 Capsule: {
  dbf: {
    funcN: 'sendButton',
    divCN: 'buttons2',
    btnCN: 'btn2',
    bublC: 'botText2'
  },
  cond: '',
  btnFlow: []
}
```

### agent(string, null, array)

The agent function is used to determine the agent that should handle the input message. It takes three parameters, the input message, the previous agent, and the list of other agent keywords, and returns the agent name.

Checks if user or function input request contains call of agent name.

#### Input:

- **string**: Input text.
- **null**: Default agent name.
- **array**: Agents names array.

#### Output:

Agent name assignment.

```
Dialogflow Message Agent: [ 'out of thread input request message agent a' ]
```

### slot(object, string, array)

The slot function is used to build a group of buttons. It takes three parameters, the capsule object, the slot message, and the button names, and returns a button group.

Sets capsule CSS HTML design values, creates names and provides HTML button functions.

#### Input:

- **object**: Output of the capsule(object) function, which includes CSS design classes, button names, and button condition update function.
- **string**: Array of button names.
- **array**: Array of button names.

#### Output:

- Agent Dialogflow Message HTML bubble and buttons.

```
Message bubble and button/s: {
  btn: `<div class='buttons2'><button class='btn2' onclick='sendButton("Login")'>Login</button><button class='btn2' onclick='sendButton("Register")'>Register</button><button class='btn2' onclick='sendButton("Links")'>Links</button></div>`,
  message: '<p class="botText2"><span>You want Login or Register?<sub>Feb 19, 2023, 2:59 AM</sub></span></p>'
}
```

### flow(string, object, object, string, object)

Handles undefined conditions of Dialogflow results, including out-of-thread value, and configures text message HTML bubble combination with buttons.

#### Input:

- **string**: Separate 'out of Dialogflow Message' nsent(null/string, integer, integer, integer).
- **object**: Default message design content.
- **object**: 'No answer' condition message design content.
- **string**: Agent Dialogflow Message.
- **object**: Agent Dialogflow Message HTML bubble and buttons.

#### Output:

Agent Dialogflow Message HTML bubble and buttons.

```
Flow Switch input: [ 'Out-of-thread output response message' ]
Bubble: [
  '<p class="botText"><span>Out-of-thread output response message</span></p>'
]

```

## Links

- npm: https://www.npmjs.com/package/dropsuit/diaflogic

## Supporting DropSuit

DropSuit is an open-source library and I am dedicated to ensuring its continued development and improvement. If you have any questions, feedback, or encounter any issues, please reach out through the [support via PayPal](https://www.paypal.com/paypalme/dropsuit?country.x=GE&locale.x=en_US), and read more about [support details](https://github.com/ladooniani/dropsuit/blob/main/Support.md).

Your support is crucial for the library's success. You can also contribute to the project by submitting bug reports, feature requests, or by providing feedback. Sharing the library with others who may find it useful and giving it a star on GitHub are also great ways to show your support. Thank you for using DropSuit!

## License

[Apache License 2.0](LICENSE.txt)