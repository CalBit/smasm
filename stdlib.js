import { defineCommand, defineVariable, warning, pushBlock, popBlock, peekBlock } from "./SMASM.js";

// Variables
let initIndex = 1;
let sleepIndex = 1;
let stackCell = '';
let functionStackCell = '';
let functions = {};

// Remapped commands
defineCommand('read', (varName, args) => `  read ${varName} ${args[0]} ${args[1]}`, 2, true);
defineCommand('write', args => `  write ${args[2]} ${args[0]} ${args[1]}`, 3, true);

defineCommand('clearScreen', args => `  draw clear ${args[0]} ${args[1]} ${args[2]}`, 3);
defineCommand('setColor', args => `  draw color ${args[0]} ${args[1]} ${args[2]} ${args[3]}`, 4);
defineCommand('setLineWidth', args => `  draw stroke ${args[0]}`, 1);
defineCommand('drawLine', args => `  draw line ${args[0]} ${args[1]} ${args[2]} ${args[3]}`, 4);
defineCommand('drawRect', args => `  draw rect ${args[0]} ${args[1]} ${args[2]} ${args[3]}`, 4);
defineCommand('drawRectOutline', args => `  draw lineRect ${args[0]} ${args[1]} ${args[2]} ${args[3]}`, 4);
defineCommand('drawPoly', args => `  draw poly ${args[0]} ${args[1]} ${args[2]} ${args[3]} ${args[4]}`, 5);
defineCommand('drawPolyOutline', args => `  draw linePoly ${args[0]} ${args[1]} ${args[2]} ${args[3]} ${args[4]}`, 5);
defineCommand('drawTriangle', args => `  draw triangle ${args[0]} ${args[1]} ${args[2]} ${args[3]} ${args[4]} ${args[5]}`, 6);
defineCommand('drawImage', args => `  draw image ${args[0]} ${args[1]} ${args[2]} ${args[3]} ${args[4]}`, 5);
defineCommand('drawFlush', args => `  drawflush ${args[0]}`, 1);

defineCommand('print', args => `  print ${args[0]}`, 1);
defineCommand('printFlush', args => `  printflush ${args[0]}`, 1);

defineCommand('getLink', (varName, args) => `  getlink ${varName} ${args[0]}`, 1, true);

defineCommand('buildingEnabled', args => `  control enabled ${args[0]} ${args[1]}`, 2);
defineCommand('turretShoot', args => `  control shoot ${args[0]} ${args[1]} ${args[2]} ${args[3]}`, 4);
defineCommand('turretShootPredict', args => `  control shootp ${args[0]} ${args[1]} ${args[2]}`, 3);
defineCommand('buildingConfigure', args => `  control configure ${args[0]} ${args[1]}`, 2);
defineCommand('illuminatorColor', args => `  control color ${args[0]} ${args[1]} ${args[2]} ${args[3]}`, 4);

defineCommand('sensor', (varName, args) => `  sensor ${varName} ${args[0]} ${args[1]}`, 2, true);

defineCommand('var', args => {
  defineVariable(args[0]);
  switch (args[1]) {
    case '=':
      return `  set ${args[0]} ${args[2]}`;
    case '+=':
      return `  op add ${args[0]} ${args[0]} ${args[2]}`;
    case '-=':
      return `  op sub ${args[0]} ${args[0]} ${args[2]}`;
    case '*=':
      return `  op mul ${args[0]} ${args[0]} ${args[2]}`;
    case '/=':
      return `  op div ${args[0]} ${args[0]} ${args[2]}`;
    default:
      warning(`The argument '${args}' is not a recognized value`);
      return `  set ${args[0]} ${args[2]}`;
  }
}, 3);
defineCommand('init', args => {
  defineVariable(args[0]);
  return `  jump __init${initIndex} notEqual ${args[0]} null
  set ${args[0]} ${args[1]}
__init${initIndex++}:`;
}, 2);

defineCommand('add', (varName, args) => `  op add ${varName} ${args[0]} ${args[1]}`, 2, true);
defineCommand('sub', (varName, args) => `  op sub ${varName} ${args[0]} ${args[1]}`, 2, true);
defineCommand('mul', (varName, args) => `  op mul ${varName} ${args[0]} ${args[1]}`, 2, true);
defineCommand('div', (varName, args) => `  op div ${varName} ${args[0]} ${args[1]}`, 2, true);
defineCommand('idiv', (varName, args) => `  op idiv ${varName} ${args[0]} ${args[1]}`, 2, true);
defineCommand('mod', (varName, args) => `  op mod ${varName} ${args[0]} ${args[1]}`, 2, true);
defineCommand('pow', (varName, args) => `  op pow ${varName} ${args[0]} ${args[1]}`, 2, true);
defineCommand('equal', (varName, args) => `  op equal ${varName} ${args[0]} ${args[1]}`, 2, true);
defineCommand('notEqual', (varName, args) => `  op notEqual ${varName} ${args[0]} ${args[1]}`, 2, true);
defineCommand('and', (varName, args) => `  op land ${varName} ${args[0]} ${args[1]}`, 2, true);
defineCommand('lessThan', (varName, args) => `  op lessThan ${varName} ${args[0]} ${args[1]}`, 2, true);
defineCommand('lessThanEqual', (varName, args) => `  op lessThanEq ${varName} ${args[0]} ${args[1]}`, 2, true);
defineCommand('greaterThan', (varName, args) => `  op greaterThan ${varName} ${args[0]} ${args[1]}`, 2, true);
defineCommand('greaterThanEqual', (varName, args) => `  op greaterThanEq ${varName} ${args[0]} ${args[1]}`, 2, true);
defineCommand('strictEqual', (varName, args) => `  op strictEqual ${varName} ${args[0]} ${args[1]}`, 2, true);
defineCommand('bitShiftLeft', (varName, args) => `  op shl ${varName} ${args[0]} ${args[1]}`, 2, true);
defineCommand('bitShiftRight', (varName, args) => `  op shr ${varName} ${args[0]} ${args[1]}`, 2, true);
defineCommand('or', (varName, args) => `  op or ${varName} ${args[0]} ${args[1]}`, 2, true);
defineCommand('bitwiseAnd', (varName, args) => `  op and ${varName} ${args[0]} ${args[1]}`, 2, true);
defineCommand('xor', (varName, args) => `  op xor ${varName} ${args[0]} ${args[1]}`, 2, true);
defineCommand('not', (varName, args) => `  op not ${varName} ${args[0]}`, 1, true);
defineCommand('max', (varName, args) => `  op max ${varName} ${args[0]} ${args[1]}`, 2, true);
defineCommand('min', (varName, args) => `  op min ${varName} ${args[0]} ${args[1]}`, 2, true);
defineCommand('angle', (varName, args) => `  op angle ${varName} ${args[0]} ${args[1]}`, 2, true);
defineCommand('len', (varName, args) => `  op len ${varName} ${args[0]} ${args[1]}`, 2, true);
defineCommand('noise', (varName, args) => `  op noise ${varName} ${args[0]} ${args[1]}`, 2, true);
defineCommand('abs', (varName, args) => `  op abs ${varName} ${args[0]}`, 1, true);
defineCommand('log', (varName, args) => `  op log ${varName} ${args[0]}`, 1, true);
defineCommand('log10', (varName, args) => `  op log10 ${varName} ${args[0]}`, 1, true);
defineCommand('sin', (varName, args) => `  op sin ${varName} ${args[0]}`, 1, true);
defineCommand('cos', (varName, args) => `  op cos ${varName} ${args[0]}`, 1, true);
defineCommand('tan', (varName, args) => `  op tan ${varName} ${args[0]}`, 1, true);
defineCommand('floor', (varName, args) => `  op floor ${varName} ${args[0]}`, 1, true);
defineCommand('ceil', (varName, args) => `  op ceil ${varName} ${args[0]}`, 1, true);
defineCommand('sqrt', (varName, args) => `  op sqrt ${varName} ${args[0]}`, 1, true);
defineCommand('random', varName => `  op rand ${varName} 1`, 0, true);
defineCommand('randInt', (varName, args) => {
  const difference = parseFloat(args[1]) - parseFloat(args[0]);
  return `  op rand ${varName} 1
  op mul ${varName} ${varName} ${difference}
  op add ${varName} ${varName} ${args[0]}
  op floor ${varName} ${varName}`;
}, 2, true);
defineCommand('randFloat', (varName, args) => {
  const difference = parseFloat(args[1]) - parseFloat(args[0]);
  return `  op rand ${varName} 1
  op mul ${varName} ${varName} ${difference}
  op add ${varName} ${varName} ${args[0]}`;
}, 2, true);

defineCommand('exit', () => `  end`);

defineCommand('unitBind', args => `  ubind ${args[0]}`, 1);
defineCommand('unitStop', () => `  ucontrol stop`);
defineCommand('unitMove', args => `  ucontrol move ${args[0]} ${args[1]}`, 2);
defineCommand('unitApproach', args => `  ucontrol approach ${args[0]} ${args[1]} ${args[2]}`, 3);
defineCommand('unitBoost', args => `  ucontrol boost ${args[0]}`, 1);
defineCommand('unitPathfind', () => `  ucontrol pathfind`);
defineCommand('unitTarget', args => `  ucontrol target ${args[0]} ${args[1]} ${args[2]}`, 3);
defineCommand('unitTargetPredict', args => `  ucontrol targetp ${args[0]} ${args[1]}`, 2);
defineCommand('unitDropItems', args => `  ucontrol itemDrop ${args[0]} ${args[1]}`, 2);
defineCommand('unitTakeItems', args => `  ucontrol itemTake ${args[0]} ${args[1]} ${args[2]}`, 3);
defineCommand('unitDropPayload', () => `  ucontrol payDrop`);
defineCommand('unitTakePayload', args => `  ucontrol payTake ${args[0]}`, 1);
defineCommand('unitMine', args => `  ucontrol mine ${args[0]} ${args[1]}`, 2);
defineCommand('unitFlag', args => `  ucontrol flag ${args[0]}`, 1);
defineCommand('unitBuild', args => `  ucontrol build ${args[0]} ${args[1]} ${args[2]} ${args[3]} ${args[4]}`, 5);
defineCommand('unitGetBlock', args => `  ucontrol getBlock ${args[0]} ${args[1]} ${args[2]} ${args[3]}`, 4);
defineCommand('unitIsWithin', (varName, args) => `  ucontrol within ${args[0]} ${args[1]} ${args[2]} ${varName}`, 3);

defineCommand('unitRadar', (varName, args) => `  uradar ${args[0]} ${args[1]} ${args[2]} ${args[4]} 0 ${args[3]} ${varName}`, 5, true);

defineCommand('unitLocateOre', (varName, args) => {
  defineVariable(args[1]);
  defineVariable(args[2]);
  return `  ulocate ore core null ${args[0]} ${args[1]} ${args[2]} ${varName}`;
}, 3, true);
defineCommand('unitLocateBuilding', (varName, args) => {
  defineVariable(args[2]);
  defineVariable(args[3]);
  defineVariable(args[4]);
  return `  ulocate building ${args[0].substring(1)} ${args[1]} null ${args[2]} ${args[3]} ${varName} ${args[4]}`;
}, 5, true);
defineCommand('unitLocateSpawn', (varName, args) => {
  defineVariable(args[0]);
  defineVariable(args[1]);
  defineVariable(args[2]);
  return `  ulocate spawn null null null ${args[0]} ${args[1]} ${varName} ${args[2]}`;
}, 3, true);
defineCommand('unitLocateDamaged', (varName, args) => {
  defineVariable(args[0]);
  defineVariable(args[1]);
  defineVariable(args[2]);
  return `  ulocate damaged null null null ${args[0]} ${args[1]} ${varName} ${args[2]}`;
}, 3, true);

// Stacks
defineCommand('defineStack', args => {
  stackCell = args[0];
  return `  set __top 0`;
}, 1);
defineCommand('push', args => {
  if (stackCell.length === 0)
    warning('There is no stack defined. Is it possible you forgot to define one?');
  return `  write ${args[0]} ${stackCell} __top
  op add __top __top 1`;
}, 1);
defineCommand('pop', varName => {
  if (stackCell.length === 0)
    warning('There is no stack defined. Is it possible you forgot to define one?');
  return `  op sub __top __top 1
  read ${varName} ${stackCell} __top`;
}, 0, true);
defineCommand('peek', varName => {
  if (stackCell.length === 0)
    warning('There is no stack defined. Is it possible you forgot to define one?');
  return `  op sub __result __top 1
  read ${varName} ${stackCell} __result`;
}, 0, true);

// Control flow
defineCommand('sleep', args => {
  return `  set __start @time
__sleep${sleepIndex}:
  op sub __result @time __start
  jump __sleep${sleepIndex++} lessThan __result ${args[0]}`;
}, 1);
defineCommand('jump', args => `  jump ${args[0]} always`, 1);
defineCommand('loop', args => {
  if (parseInt(args[0]) < 0)
    warning('Argument must be a positive integer');
  const index = pushBlock({type: 'loop', amount: args[0]});
  return `  set __i${index} 0
__block${index}:`;
}, 1);
defineCommand('endloop', () => {
  const block = popBlock();
  if (block.type !== 'loop')
    warning("No matching 'loop' command");
  return `  op add __i${block.index} __i${block.index} 1
  jump __block${block.index} lessThan __i${block.index} ${block.amount}`;
});
defineCommand('for', args => {
  const index = pushBlock({type: 'for', variable: args[0], end: args[2], step: args[3]});
  defineVariable(args[0]);
  return `  set ${args[0]} ${args[1]}
__block${index}:`;
}, 4);
defineCommand('endfor', () => {
  const block = popBlock();
  if (block.type !== 'for')
    warning("No matching 'for' command");
  return `  op add ${block.variable} ${block.variable} ${block.step}
  jump __block${block.index} notEqual ${block.variable} ${block.end}`;
});
defineCommand('if', args => {
  const index = pushBlock({type: 'if', a: args[0], op: args[1], b: args[2]});
  let op = args[1];
  switch (op) {
    case '==':
      op = 'notEqual';
      break;
    case '!=':
      op = 'equal';
      break;
    case '<':
      op = 'greaterThanEq';
      break;
    case '>':
      op = 'lessThanEq';
      break;
    case '<=':
      op = 'greaterThan';
      break;
    case '>=':
      op = 'lessThan';
      break;
    default:
      warning(`The argument '${args[1]}' is not a recognized value`);
      break;
  }
  return `  jump __block${index} ${op} ${args[0]} ${args[2]}`;
}, 3);
defineCommand('else', () => {
  const block = popBlock();
  if (block.type !== 'if')
    warning("No matching 'if' command");
  const index = pushBlock({type: 'if'});
  let op = block.op;
  switch (op) {
    case '==':
      op = 'equal';
      break;
    case '!=':
      op = 'notEqual';
      break;
    case '<':
      op = 'lessThan';
      break;
    case '>':
      op = 'greaterThan';
      break;
    case '<=':
      op = 'lessThanEq';
      break;
    case '>=':
      op = 'greaterThanEq';
      break;
    default:
      warning(`The argument '${args[1]}' is not a recognized value`);
      break;
  }
  return `__block${block.index}:
  jump __block${index} ${op} ${block.a} ${block.b}`;
});
defineCommand('endif', () => {
  const block = popBlock();
  if (block.type !== 'if')
    warning("No matching 'if' or 'else' command");
  return `__block${block.index}:`;
});
defineCommand('while', (args) => {
  const index = pushBlock({type: 'while', a: args[0], op: args[1], b: args[2]});
  if (!['==', '!=', '<', '>', '<=', '>='].includes(args[1]))
    warning(`The argument '${args[1]}' is not a recognized value`);
  return `__block${index}:`;
}, 3);
defineCommand('endwhile', () => {
  const block = popBlock();
  if (block.type !== 'while')
    warning("No matching 'while' command");
  let op = block.op;
  switch (block.op) {
    case '==':
      op = 'equal';
      break;
    case '!=':
      op = 'notEqual';
      break;
    case '<':
      op = 'lessThan';
      break;
    case '>':
      op = 'greaterThan';
      break;
    case '<=':
      op = 'lessThanEq';
      break;
    case '>=':
      op = 'greaterThanEq';
      break;
  }
  return `  jump __block${block.index} ${op} ${block.a} ${block.b}`;
});

// Subroutines
defineCommand('section', args => {
  defineVariable(args[0]);
  const index = pushBlock({type: 'section'});
  return `  jump __block${index} always
__section_${args[0]}:`;
}, 1);
defineCommand('endsection', () => {
  const block = popBlock();
  if (block.type !== 'section')
    warning("No matching 'section' command");
  return `  set @counter __sectionReturn
__block${block.index}:`;
});
defineCommand('jumpsection', args => {
  return `  op add __sectionReturn @counter 1
  jump __section_${args[0]} always`;
}, 1);

// Functions
defineCommand('defineFunctionStack', args => {
  functionStackCell = args[0];
  return `  set __call 0`;
}, 1);
defineCommand('function', args => {
  // Make sure functions are enabled
  if (functionStackCell.length === 0)
    warning('There is no function stack defined. Is it possible you forgot to define one?');

  // Make sure name is provided for function
  if (args.length < 1) {
    warning('No name provided for the function');
    args = ['untitled'];
  }
  const index = pushBlock({type: 'function', arguments: args.slice(1)});
  functions[args[0]] = peekBlock();
  for (let i = 0; i < args.length; i++)
    defineVariable(args[i]);
  return `  jump __block${index} always
__function_${args[0]}:
  set __return null`;
}, null);
defineCommand('endfunction', () => {
  const block = popBlock();
  if (block.type !== 'function')
    warning("No matching 'function' command");
  return `  op sub __call __call 1
  read @counter ${functionStackCell} __call
__block${block.index}:`;
});
defineCommand('return', args => {
  return `  set __return ${args[0]}
  op sub __call __call 1
  read @counter ${functionStackCell} __call`;
}, 1);
defineCommand('call', (varName, args) => {
  // Make sure a function name is provided
  if (args.length === 0)
    warning('No function name provided');

  // Make sure function is defined
  if (!functions.hasOwnProperty(args[0])) {
    warning(`'${args[0]}' is not a function. Is it possible you made a typo?`);
    return;
  }

  // Make sure function was passed the right number of arguments
  if (args.slice(1).length !== functions[args[0]].arguments.length)
    warning(`Incorrect number of arguments provided to function '${args[0]}'. Expected ${functions[args[0]].arguments.length} but got ${args.slice(1).length}`);

  // Generate argument set string
  let argumentList = [];
  let argumentSet = '';
  for (let i = 0; i < args.slice(1).length; i++)
    argumentList.push(`  set ${functions[args[0]].arguments[i]} ${args.slice(1)[i]}`);
  argumentSet = argumentList.join('\n');

  return `${argumentSet}
  op add __result @counter 3
  write __result ${functionStackCell} __call
  op add __call __call 1
  jump __function_${args[0]} always
  set ${varName} __return`;
}, null, true);
