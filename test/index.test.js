//#region dnkscr test

/// Add function
const dropsuit_diaflogic = require("../index.js");
/// Add json object intents.json pre-processor
const json_data = require("../jsobj.js");
/// intents.json file path
const intents = "./test/intents.json";
/// Use json object preprocessor for intents.json
let intentData = json_data.jsonIntStrct(intents);
/// Add json object design.json pre-processor
const json_des = require("../design.js");
/// design.json test file path. "assets/json/design.json"
const designJsonPath = "./test/design.json";
/// Load design
let default_design = json_des.jsonDesign(0, designJsonPath);
let agent1_design = json_des.jsonDesign(1, designJsonPath);
let agent2_design = json_des.jsonDesign(4, designJsonPath);
let noAnsMess_design = json_des.jsonDesign(2, designJsonPath);
let link_design = json_des.jsonDesign(3, designJsonPath);

let input = "Out-of-thread input request message";
// "call agent a dialog";
// "call agent b dialog";

describe("dropsuit-diaflogic", () => {
  describe("diaflogic()", () => {
    it("should return Diaflogic", () => {
      //#region Function call

      let boolset; // Agent condition name

      clientReqServerResIO(input, 0);
      function clientReqServerResIO(input, value) {
        var ansret = DialogFlow(input, value);
        return ansret;
      }

      //#endregion

      function DialogFlow(input, value) {
        //#region Constructor input

        var diaflogic = new dropsuit_diaflogic(
          input,
          value,
          intentData,
          default_design,
          true
        );

        //#endregion

        //#region Capsules

        let capsule_txDlgMess = diaflogic.capsule(null);
        let capsule_Agent1 = diaflogic.capsule(agent1_design);
        let capsule_Agent2 = diaflogic.capsule(agent2_design);
        let capsule_NoAnsMess = diaflogic.capsule(noAnsMess_design);
        let capsule_link = diaflogic.capsule(link_design);

        //#endregion

        //#region Variables

        let cond = capsule_Agent1.cond; /// The condition name is equal to all capsules
        let slotMessage; /// Slot message
        let slotBtn; /// Button names
        let btnGroup; // Buttons
        let agents = ["agent b", "agent a"]; /// Other agents

        //#endregion

        //#region Agent call

        let defAgent = diaflogic.agent(input, null, agents); /// Default agent name

        if (defAgent == "agent a") {
          boolset = diaflogic.boolset(agents, defAgent, true); /// Actual agent
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

        // console.log("\n\nInput value:", value, "Value name:", defAgent, "\n\n");

        //#endregion

        //#region Agent-A Message Dialogflow logic scenario bubble blower

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
              "https://github.com/ladooniani/DropSuit#readme>DropSuit NLP library docs",
              "https://github.com/ladooniani/dropsuit-diaflogic#readme>Diaflogic functions doc",
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

        //#endregion

        //#region Agent-B Message Dialogflow logic scenario bubble blower

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

        //#endregion

        //#region Separate dialogue answer and flow switch

        let outMessFlowConv = "Out-of-thread output response message"; //diaflogic.nsent(null, 0, 1, 0).ansRnd();

        let out = diaflogic.flow(
          outMessFlowConv,
          capsule_txDlgMess,
          capsule_NoAnsMess,
          slotMessage,
          btnGroup
        ); // let bubbleMess = cbc.bubble(capsule, outMessFlowConv);

        //#endregion

        //#region Output return

        console.log("\n\nOUTPUT:", out, "\n\n");

        return out;

        //#endregion
      }
    });
  });
});

//#endregion
