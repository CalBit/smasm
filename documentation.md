# Syntax
## Comments:
```
// This is a comment
or
# This is a comment
```

## Commands:
```
If it returns a value:
  varName = commandName arg1 arg2 ...
If it does not return a value:
  commandName arg1 arg2 ...
```
Command names are NOT case sensitive. This means that
myCommand is the same as MyCommand which is the same as
mYcOmManD

You can define strings with an opening and closing ""

You are free to include () and , however you would like when
typing a command. These symbols are simply ignored

Because of the above rule, and because spaces are ignored,
The following symbols are not allowed in strings: "(), ".
While that might seem limiting, you can still include them
by escaping them. Here is a list of all the custom escape
characters:
  (       = \[
  )       = \]
  ,       = \c
  \       = \\
  space   = \s
  tab     = \t
  newline = \n
It may not be ideal but since strings are rarely used in
Mindustry microcontrollers, it doesn't matter too much.

It is recommended that you name your variables only using
these characters: a-z, A-Z, 0-9, and _

Also, you can prepend a $ to a variable name to stop the
converter from warning you that the variable is not defined.
A common use case for this is when referencing blocks connected
to the microcontroller e.g. $display1. Any symbol that is not
a-z, A-Z, 0-9, or _ are also ignored

## Literals:
```
`masm code here...
```
Literals let you insert raw MASM code into your program


# List of commands
| Returns | Command             | Arguments                               | Description                                                                      |
| ------- | -------             | ---------                               | -----------                                                                      |
| yes     | read                | cell, index                             | Reads a memory cell and returns the value at the memory cell                     |
| no      | write               | cell, index, number                     | Writes to a memory cell                                                          |
| no      | clearScreen         | r g b                                   | Clears the display with the given color in rgb                                   |
| no      | setColor            | r g b a                                 | Sets the drawing color as an rgba value                                          |
| no      | setLineWidth        | width                                   | Sets the line width when drawing                                                 |
| no      | drawLine            | x, y, x2, y2                            | Draws a line on the screen                                                       |
| no      | drawRect            | x, y, width, height                     | Draws a filled rectangle on the screen                                           |
| no      | drawRectOutline     | x, y, width, height                     | Draws a hollow rectangle on the screen                                           |
| no      | drawPoly            | x, y, sides, radius, rotation           | Draws a filled polygon on the screen                                             |
| no      | drawPolyOutline     | x, y, sides, radius, rotation           | Draws a hollow polygon on the screen                                             |
| no      | drawTriangle        | x, y, x2, y2, x3, y3                    | Draws a triangle on the screen                                                   |
| no      | drawImage           | x, y, image, size, rotation             | Draws an image on the screen (use @imageName for image argument)                 |
| no      | drawFlush           | display                                 | Flushes the cached draw instructions to a display                                |
| no      | print               | output                                  | Adds text to the output buffer                                                   |
| no      | printFlush          | message                                 | Flushes the cached text to the message                                           |
| yes     | getLink             | index                                   | Returns a building by index that is linked to the microcontroller                |
| no      | buildingEnabled     | building, enabled                       | Enables or disables a building                                                   |
| no      | turretShoot         | turret, x, y, shootEnabled              | Tells a turret where to shoot and if to shoot                                    |
| no      | turretShootPredict  | turret, unit, shootEnabled              | Tells a turret what to shoot at while predicting it's movements. Also tells the turret whether to shoot or not |
| no      | buildingConfigure   | building, configure                     | Configures a building                                                            |
| no      | illuminatorColor    | illuminator, r, g, b                    | Sets the color of an illuminator                                                 |
| yes     | sensor              | thing, property                         | Detects properties about things and returns the result                           |
| no      | var                 | varName, type, value                    | Sets a variable (type can be: =, +=, -=, *=, or /=)                              |
| no      | init                | varName, value                          | Sets a variable only if it is not already set                                    |
| yes     | add                 | a, b                                    | Adds two values and returns the result                                           |
| yes     | sub                 | a, b                                    | Subtracts two values and returns the result                                      |
| yes     | mul                 | a, b                                    | Multiplies two values and returns the result                                     |
| yes     | div                 | a, b                                    | Divides two values and returns the result                                        |
| yes     | idiv                | a, b                                    | Performs integer division on two values and returns the result                   |
| yes     | mod                 | a, b                                    | Performs the modulos operation on two values and returns the result              |
| yes     | pow                 | a, b                                    | Raises on value to the power of another and returns the result                   |
| yes     | equal               | a, b                                    | Checks if two values are equal and returns the result                            |
| yes     | notEqual            | a, b                                    | Checks if two values are not equal and reurns the result                         |
| yes     | and                 | a, b                                    | Performs logical and on two values and returns the result                        |
| yes     | lessThan            | a, b                                    | Checks if one value is less than the other and returns the result                |
| yes     | lessThanEqual       | a, b                                    | Checks if one value is less than or equal to the other and returns the result    |
| yes     | greaterThan         | a, b                                    | Checks if one value is greater than the other and returns the result             |
| yes     | greaterThanEqual    | a, b                                    | Checks if one value is greater than or equal to the other and returns the result |
| yes     | strictEqual         | a, b                                    | Checks if two values are equal and of the same type and returns the result       |
| yes     | bitShiftLeft        | a, b                                    | Performs the left bitshift operation on two values and returns the result        |
| yes     | bitShiftRight       | a, b                                    | Performs the right bitshift operation on two values and returns the result       |
| yes     | or                  | a, b                                    | Performs the logical or on two values and returns the result                     |
| yes     | bitwiseAnd          | a, b                                    | Performs a bitwise and on two values and returns the result                      |
| yes     | xor                 | a, b                                    | Performs a logical xor on two values and returns the result                      |
| yes     | not                 | a                                       | Performs a logical not on two values and returns the result                      |
| yes     | max                 | a, b                                    | Returns the greater of two values                                                |
| yes     | min                 | a, b                                    | Returns the lesser of two values                                                 |
| yes     | angle               | a, b                                    | Returns the angle of a vector in degrees                                         |
| yes     | len                 | a, b                                    | Returns the length of a vector                                                   |
| yes     | noise               | a, b                                    | Returns 2D simplex noise                                                         |
| yes     | abs                 | a                                       | Returns the absolute value of a number                                           |
| yes     | log                 | a                                       | Returns the natural logarithm of a value                                         |
| yes     | log10               | a                                       | Returns the base 10 logarithm of a value                                         |
| yes     | sin                 | a                                       | Returns the sine of a value in degrees                                           |
| yes     | cos                 | a                                       | Returns the cosine of a value in degrees                                         |
| yes     | tan                 | a                                       | Returns the tangent of a value in degrees                                        |
| yes     | floor               | a                                       | Returns a value rounded down                                                     |
| yes     | ceil                | a                                       | Returns a value rounded up                                                       |
| yes     | sqrt                | a                                       | Returns the square root of a value                                               |
| yes     | random              |                                         | Returns a random decimal number between 0 (inclusive) and 1 (exclusive)          |
| yes     | randInt             | min, max                                | Returns a random whole number between min (inclusive) and max (exclusive)        |
| yes     | randFloat           | min, max                                | Returns a random decimal number between min (inclusive) and max (exclusive)      |
| no      | exit                |                                         | Ends the program                                                                 |
| no      | unitBind            | unitType                                | Binds a unit                                                                     |
| no      | unitStop            |                                         | Stops the currently bound unit                                                   |
| no      | unitMove            | x, y                                    | Moves the currently bound unit to a position                                     |
| no      | unitApproach        | x, y, radius                            | Moves the currently bound unit to approach a position, with a radius             |
| no      | unitBoost           | enabled                                 | Enables or disables a unit's boost                                               |
| no      | unitPathfind        |                                         | Tells the currently bound unit to pathfind to the enemy base                     |
| no      | unitTarget          | x, y, shootEnabled                      | Tells the currently bound unit to target and possibly shoot a position           |
| no      | unitTargetPredict   | unit, shootEnabled                      | Tells the currently bound unit to shoot or not shoot another unit with target prediction |
| no      | unitDropItems       | where, amount                           | Tells the currently bound unit to drop item(s) into a building                   |
| no      | unitTakeItems       | from, whatItem, amount                  | Tells the currently bound unit to pick up items from a building                  |
| no      | unitDropPayload     |                                         | Tells the currently bound unit to drop everything it's holding                   |
| no      | unitTakePayload     | takeUnits                               | Tells the currently bound unit to pick up a payload at it's current position     |
| no      | unitMine            | x, y                                    | Tells the currently bound unit to mine at a position                             |
| no      | unitFlag            | flag                                    | Flags the currently bound unit                                                   |
| no      | unitBuild           | x, y, block, rotation, config           | Tells the currently bound unit to build at a position                            |
| no      | unitGetBlock        | x, y, type, building                    | Fetches a building and type at coordinates                                       |
| yes     | unitIsWithin        | x, y, radius                            | Checks if another unit is within an area and returns the result                  |
| no      | unitRadar           | target, filter, filter, order, sort     | Locates units around the currently bound unit                                    |
| yes     | unitLocateOre       | type, outX, outY                        | Tells the currently bound unit to find an ore deposit. Returns if the ore was found or not |
| yes     | unitLocateBuilding  | group, isEnemy, outX, outY, outBuilding | Tells the currently bound unit to find a building. Returns if the building was found or not. Groups include (@core, @storage, @generator, @ turret, @factory, @repair, @rally, @battery, @resupply, and @reactor) |
| yes     | unitLocateSpawn     | outX, outY, outBuilding                 | Tells the currently bound unit to find the enemy spawn. Returns if the spawn was found or not |
| yes     | unitLocateDamaged   | outX, outY, outBuilding                 | Tells the currently bound unit to find a damaged ally building. Returns if the building was found or not |
| no      | defineStack         | cell                                    | Defines what cell should be used for the stack                                   |
| no      | push                | number                                  | Pushes a number onto the stack                                                   |
| yes     | pop                 |                                         | Pops a number off the stack and returns it                                       |
| yes     | peek                |                                         | Returns the the number on the top of the stack without popping it                |
| no      | sleep               | milliseconds                            | Pauses the program for the given number of milliseconds                          |
| no      | jump                | label                                   | Jumps to a label                                                                 |
| no      | loop                | amount                                  | Starts a loop                                                                    |
| no      | endloop             |                                         | Ends a loop                                                                      |
| no      | for                 | varName, from, to, end                  | Starts a for loop                                                                |
| no      | endfor              |                                         | Ends a for loop                                                                  |
| no      | if                  |  value, operator, value                 | Starts an if statement. Valid operators include (==, !=, <, >, <=, >=)           |
| no      | else                |                                         | Starts an else statement                                                         |
| no      | endif               |                                         | Ends an if statement                                                             |
| no      | while               | value, operator, value                  | Starts a while loop. Valid operators include (==, !=, <, >, <=, >=)              |
| no      | endwhile            |                                         | Ends a while loop                                                                |
| no      | section             | name                                    | Starts a subroutine                                                              |
| no      | endsection          |                                         | Ends a subroutine                                                                |
| no      | jumpsection         | name                                    | Runs a subroutine
| no      | defineFunctionStack | cell                                    | Defines what cell should be used for the function call stack                     |
| no      | function            | name, [arg, arg, ...]                   | Starts a function                                                                |
| no      | endfunction         |                                         | Ends a function                                                                  |
| no      | return              | value                                   | Returns a value from a function and ends the function                            |
| yes     | call                | functionName, [arg, arg, ...]           | Calls a function and returns the return value                                    |

# Special Variables
The following are special variables defined by Mindustry that
you can use in your programs. If you want to see more, check
out https://mindustrygame.github.io/wiki/logic/3-variables/
| Variable | Description                                                                         |
| -------- | -----------                                                                         |
| @this    | Holds the value of the current building (the microcontroller)                       |
| @thisx   | Holds the x coordinate of the current microcontroller                               |
| @thisy   | Holds the y coordinate of the current microcontroller                               |
| @counter | Holds the current instruction index. This value can be modified as a way of jumping |
| @time    | Holds the current UNIX timestamp                                                    |

# Important Notes
ALL variables are global. This includes arguments to functions.
Because of this, it is recommended that you name your function
arguments starting with an _ so as not to conflict with normal
variables.

Functions *must* be defined before calling them. Also, you must
run the defineFunctionStack command before defining any functions.

It is recommended that you use an _ when you don't care about
the return value of a function and simply care about it's side effects
(e.g. `_ = call $myFunction`)

The microcontroller will repeat your code once finished executing.
The microcontroller will also keep variables even after already
executing one or more times

Also, be sure that your compiled MASM does not exceed 1,000 instructions.
The game will not import instructions past 1,000
