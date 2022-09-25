// Variables
let line = 0;
let index = 1;
let commands = {};
let blocks = [];
let definedVariables = [];
export let warnings = [];

// Functions
function error(line, message) {
  return [false, {line, message}];
}

export function warning(message) {
  warnings.push({line: line + 1, message});
}

export function defineCommand(name, func, argumentCount=0, returns=false) {
  commands[name.toLowerCase()] = {
    argumentCount,
    func,
    returns
  };
}

export function defineVariable(name) {
  definedVariables.push(name);
}

export function genIndex() {
  return index++;
}

export function pushBlock(obj) {
  const defaults = {line: line + 1, type: 'none', index};
  blocks.push(Object.assign(defaults, obj));
  return genIndex();
}

export function popBlock() {
  if (blocks.length === 0)
    return {type: 'none', index: 0};
  return blocks.pop();
}

export function peekBlock() {
  if (blocks.length === 0)
    return {type: 'none', index: 0};
  return blocks[blocks.length - 1];
}

export function convert(data) {
  // Split
  let program = data.split(/\r?\n/);

  // Parse
  for (let i = 0; i < program.length; i++) {
    program[i] = program[i].replace(/\(|\)|,/g, ' ');
    if (program[i].trim().length === 0) {
      program[i] = {type: 'blank'};
    } else if (/^\s*\/\/|\s*^#/.test(program[i])) {
      program[i] = {
        type: 'comment',
        content: program[i].replace(/^\s*\/\/|^\s*#/, '')
      };
    } else if (/^\s*`/.test(program[i])) {
      program[i] = {
        type: 'literal',
        content: program[i].trim().substring(1)
      };
    } else {
      program[i] = program[i].split(' ').filter(str => str.length > 0);
      if (program[i][1] === '=') {
        if (program[i].length < 3)
          return error(i + 1, 'Invalid syntax for a returning command');
        program[i] = {
          type: 'command',
          name: program[i][2]?.toLowerCase(),
          arguments: program[i].slice(3),
          returns: true,
          variable: program[i][0],
          line: i + 1
        };
      } else {
        program[i] = {
          type: 'command',
          name: program[i][0]?.toLowerCase(),
          arguments: program[i].slice(1),
          returns: false,
          variable: '',
          line: i + 1
        };
      }
      for (let arg in program[i].arguments) {
        // Create a short reference to program[i].arguments
        const args = program[i].arguments;
        if (args[arg][0] === '"') {
          if (args[arg][args[arg].length - 1] !== '"' || args[arg] === '"')
            return error(i + 1, 'Invalid string format');

          // Replace escape characters
          for (let c = 0; c < args[arg].length; c++) {
            if (args[arg][c] === '\\') {
              let char = args[arg][c + 1];
              switch (char) {
                case '[':
                  char = '(';
                  break;
                case ']':
                  char = ')';
                  break;
                case 'c':
                  char = ',';
                  break;
                case 's':
                  char = ' ';
                  break;
                case 't':
                  char = '\\t';
                  break;
                case 'n':
                  char = '\\n';
                  break;
              }
              args[arg] = args[arg].substring(0, c) + char + args[arg].substring(c + 2);
            }
          }
        }
      }
    }
  }
  program = program.filter(obj => !(obj.type === 'command' && obj.name === undefined));

  // Clear warnings
  warnings = [];

  // Convert
  let convertedProgram = [];
  convertedProgram.push('_start:');
  for (line = 0; line < program.length; line++) {
    if (program[line].type === 'blank') {
      convertedProgram.push('');
    } else if (program[line].type === 'comment') {
      convertedProgram.push(`  #${program[line].content}`);
    } else if (program[line].type === 'literal') {
      convertedProgram.push('  ' + program[line].content);
    } else {
      let args = JSON.parse(JSON.stringify(program[line].arguments));

      // Make sure command exists
      if (!commands.hasOwnProperty(program[line].name))
        return error(program[line].line, `The command '${program[line].name}' is not defined`);
      // Make sure return variable is provided
      if (commands[program[line].name].returns !== program[line].returns)
        return error(program[line].line, `The command '${program[line].name}' returns a value, but a variable is not provided`);
      // Make sure the correct number of arguments are provided
      if (commands[program[line].name].argumentCount !== null && commands[program[line].name].argumentCount !== args.length)
        return error(program[line].line, `Invalid number of arguments provided for the command '${program[line].name}'
Expected ${commands[program[line].name].argumentCount} but got ${args.length}`);
      // Make sure all the provided variables are defined
      args.forEach(value => {
        if (!/true|false|null|^".*"$|^\$|^@|^-?\d+(\.\d+)?$|^[^a-zA-Z0-9_]+$/.test(value) && !definedVariables.includes(value))
          warning(`'${value}' does not appear to be defined. Is it possible you made a typo?`);
      });
      // Remove $ before variable names
      args = args.map(value => {
        if (value[0] === '$')
          return value.substring(1);
        return value;
      });

      if (program[line].returns)
        convertedProgram.push(commands[program[line].name].func(program[line].variable, args));
      else
        convertedProgram.push(commands[program[line].name].func(args));
      definedVariables.push(program[line].variable);
    }
  }

  convertedProgram.push('  end\n');

  // Check for unmatched block commands
  if (blocks.length > 0) {
    for (let i = 0; i < blocks.length; i++)
      warning(blocks[i].line, `Unmatched block command. Is it possible you forgot an ending command?`);
  }

  return [true, convertedProgram.join('\n')];
}
