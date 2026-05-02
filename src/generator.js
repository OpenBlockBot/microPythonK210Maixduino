export default Blockly => {
    const originalInit = Blockly.Python.init;
    Blockly.Python.init = function (workspace) {
        Blockly.Python.k210GPIOIndex = Object.create(null);
        return originalInit.call(this, workspace);
    };

    Blockly.Python.k210GetAnAvailableGPIO = function (pin) {
        var MAX_GPIOHS_NUM = 26;
        var MAX_GPIO_NUM = 8;

        if (!Blockly.Python.k210GPIOIndex) {
            Blockly.Python.k210GPIOIndex = Object.create(null);
        }

        if (Blockly.Python.k210GPIOIndex[pin]) {
            return Blockly.Python.k210GPIOIndex[pin];
        }
        var usedGpio = Object.keys(Blockly.Python.k210GPIOIndex).length;
        if (usedGpio <= MAX_GPIOHS_NUM) {
            Blockly.Python.k210GPIOIndex[pin] = 'GPIOHS' + usedGpio;
            return Blockly.Python.k210GPIOIndex[pin];
        } else if (usedGpio <= (MAX_GPIO_NUM + MAX_GPIOHS_NUM)) {
            Blockly.Python.k210GPIOIndex[pin] = 'GPIO' + (usedGpio - MAX_GPIOHS_NUM - 1);
            return Blockly.Python.k210GPIOIndex[pin];
        }
        return null;
    };

    Blockly.Python.k210GetTimerAndChannel = function (ch) {
        var timer = 0;
        var channel = 0;

        if (ch >= 0 && ch < 4) {
            timer = 0;
            channel = ch;
        } else if (ch >= 4 && ch < 8) {
            timer = 1;
            channel = ch - 4;
        } else if (ch >= 8 && ch < 12) {
            timer = 2;
            channel = ch - 8;
        } else {
            timer = 'undefined';
            channel = 'undefined';
        }
        return {timer: timer, channel: channel};
    };

    Blockly.Python['microPython_pin_k210SetPinMode'] = function (block) {
        var pin = block.getFieldValue('PIN');
        var mode = block.getFieldValue('MODE') || 'IN';

        var gpio = Blockly.Python.k210GetAnAvailableGPIO(pin);

        if (!gpio) {
            return 'assert False, "No more GPIOs available!"\n';
        }

        Blockly.Python.imports_['GPIO'] = 'from Maix import GPIO';
        Blockly.Python.imports_['fm'] = 'from fpioa_manager import fm';
        Blockly.Python.globalsVariables_['pin' + pin] = 'pin' + pin;

        var code = 'fm.register(' + pin + ', fm.fpioa.' + gpio + ')\n';

        if (mode === 'OUT') {
            code += 'pin' + pin + ' = GPIO(GPIO.' + gpio + ', GPIO.' + mode + ')\n';
        } else {
            code += 'pin' + pin + ' = GPIO(GPIO.' + gpio + ', GPIO.IN, GPIO.' + mode + ')\n';
        }

        return code;
    };

    Blockly.Python['microPython_pin_menu_level'] = function (block) {
        var code = block.getFieldValue('level') || '0';
        return [code, Blockly.Python.ORDER_ATOMIC];
    };

    Blockly.Python['microPython_pin_setDigitalOutput'] = function (block) {
        var pin = block.getFieldValue('PIN') || '0';
        var level = Blockly.Python.valueToCode(block, 'LEVEL', Blockly.Python.ORDER_FUNCTION_CALL) || '1';
        return 'pin' + pin + '.value(' + level + ')\n';
    };

    Blockly.Python['microPython_pin_k210SetPwmOutput'] = function (block) {
        var pin = block.getFieldValue('PIN') || '0';
        var ch = block.getFieldValue('CH') || '0';
        var out = Blockly.Python.valueToCode(block, 'OUT', Blockly.Python.ORDER_FUNCTION_CALL) || '0';

        var timerAndChannel = Blockly.Python.k210GetTimerAndChannel(ch);

        Blockly.Python.imports_['Timer'] = 'from machine import Timer';
        Blockly.Python.imports_['PWM'] = 'from machine import PWM';

        Blockly.Python.variables_['TIMER' + timerAndChannel.timer + timerAndChannel.channel] =
            'timer' + timerAndChannel.timer + '_' + timerAndChannel.channel +
            ' = machine.Timer(machine.Timer.TIMER' + timerAndChannel.timer +
            ', machine.Timer.CHANNEL' + timerAndChannel.channel + ', mode = machine.Timer.MODE_PWM)';
        Blockly.Python.variables_['PWM' + pin] =
            'pwm' + pin + ' = machine.PWM(timer' + timerAndChannel.timer + '_' + timerAndChannel.channel +
            ', freq = 490, duty=0, pin = ' + pin + ')';

        return 'pwm' + pin + '.duty(' + out + ')\n';
    };

    Blockly.Python['microPython_pin_readDigitalPin'] = function (block) {
        var pin = block.getFieldValue('PIN');
        return ['pin' + pin + '.value()', Blockly.Python.ORDER_ATOMIC];
    };

    Blockly.Python['microPython_pin_k210SetServoOutput'] = function (block) {
        var pin = block.getFieldValue('PIN') || '0';
        var ch = block.getFieldValue('CH') || '0';
        var out = Blockly.Python.valueToCode(block, 'OUT', Blockly.Python.ORDER_FUNCTION_CALL) || '0';

        var timerAndChannel = Blockly.Python.k210GetTimerAndChannel(ch);

        Blockly.Python.imports_['Timer'] = 'from machine import Timer';
        Blockly.Python.imports_['PWM'] = 'from machine import PWM';

        Blockly.Python.variables_['TIMER' + timerAndChannel.timer] =
            'timer' + timerAndChannel.timer +
            ' = machine.Timer(machine.Timer.TIMER' + timerAndChannel.timer +
            ', machine.Timer.CHANNEL' + timerAndChannel.channel + ', mode = machine.Timer.MODE_PWM)';
        Blockly.Python.variables_['PWM' + pin] =
            'pwm' + pin + ' = machine.PWM(timer' + timerAndChannel.timer +
            ', freq = 50, duty=0, pin = ' + pin + ')';

        Blockly.Python.libraries_['K210GetServoPulse'] = 'def k210GetServoPulse(angle):\n' +
            '  SERVO_MIN_PULSE_WIDTH = 544\n' +
            '  SERVO_MAX_PULSE_WIDTH = 2400\n\n' +
            '  if(angle > 180):\n' +
            '    angle = 180\n' +
            '  elif(angle < 0):\n' +
            '    angle = 0\n' +
            '  return (SERVO_MIN_PULSE_WIDTH + (SERVO_MAX_PULSE_WIDTH - SERVO_MIN_PULSE_WIDTH) * angle / 180) / 200\n';

        return 'pwm' + pin + '.duty(k210GetServoPulse(' + out + '))\n';
    };

    Blockly.Python['microPython_pin_k210AttachInterrupt'] = function (block) {
        var pin = block.getFieldValue('PIN');
        var mode = block.getFieldValue('MODE') || 'IRQ_RISING';

        var gpio = Blockly.Python.k210GetAnAvailableGPIO(pin);
        if (!gpio || !gpio.startsWith('GPIOHS')) {
            return 'assert False, "Only GPIOHS can be used as interrupt pin!"\n';
        }

        var branch = Blockly.Python.statementToCode(block, 'SUBSTACK');
        branch = Blockly.Python.addLoopTrap(branch, block.id);

        if (branch) {
            var variablesName = [];
            for (var x in Blockly.Python.variables_) {
                variablesName.push(Blockly.Python.variables_[x].slice(0, Blockly.Python.variables_[x].indexOf('=') - 1));
            }
            if (variablesName.length !== 0) {
                branch = Blockly.Python.INDENT + 'global ' + variablesName.join(', ') + '\n' + branch;
            }
        } else {
            branch = Blockly.Python.INDENT + 'pass\n';
        }

        Blockly.Python.imports_['GPIO'] = 'from Maix import GPIO';
        Blockly.Python.libraries_['ISR' + mode + pin] =
            'def ISR_' + mode + '_' + pin + '(pin):\n' + branch;

        return 'pin' + pin + '.irq(ISR_' + mode + '_' + pin + ', GPIO.' + mode + ', GPIO.WAKEUP_NOT_SUPPORT)\n';
    };

    Blockly.Python['microPython_serial_k210SerialBegin'] = function (block) {
        var no = block.getFieldValue('NO');
        var baud = block.getFieldValue('BAUD');
        var txPin = block.getFieldValue('TX_PIN');
        var rxPin = block.getFieldValue('RX_PIN');

        Blockly.Python.imports_['UART'] = 'from machine import UART';
        Blockly.Python.imports_['fm'] = 'from fpioa_manager import fm';
        Blockly.Python.globalsVariables_['uart' + no] = 'uart' + no;

        var code = 'fm.register(' + txPin + ', fm.fpioa.UART' + no + '_TX, force = True)\n' +
            'fm.register(' + rxPin + ', fm.fpioa.UART' + no + '_RX, force = True)\n' +
            'uart' + no + ' = UART(UART.UART' + no + ', ' + baud +
            ', 8, 0, 0, timeout = 1000, read_buf_len = 4096)\n';

        return code;
    };

    Blockly.Python['microPython_serial_multiSerialPrint'] = function (block) {
        var no = block.getFieldValue('NO');
        var value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_UNARY_SIGN) || '';
        var eol = block.getFieldValue('EOL');

        var warp = '';
        if (eol === 'warp') {
            warp = ' + \'\\r\\n\'';
        }
        return 'uart' + no + '.write(str(' + value + ')' + warp + ')\n';
    };

    Blockly.Python['microPython_serial_multiSerialReadALine'] = function (block) {
        var no = block.getFieldValue('NO');
        return ['uart' + no + '.read()', Blockly.Python.ORDER_ATOMIC];
    };

    Blockly.Python['microPython_console_consolePrint'] = function (block) {
        var msg = Blockly.Python.valueToCode(block, 'TEXT', Blockly.Python.ORDER_UNARY_SIGN) || '';
        var eol = block.getFieldValue('EOL') || 'warp';

        if (eol === 'warp') {
            return 'print(' + msg + ')\n';
        }
        return 'print(' + msg + ", end = '')\n";
    };

    Blockly.Python['microPython_console_consoleInput'] = function (block) {
        var msg = Blockly.Python.valueToCode(block, 'TEXT', Blockly.Python.ORDER_FUNCTION_CALL) || '';
        var code = 'input(' + msg + ')';
        return [code, Blockly.Python.ORDER_ATOMIC];
    };

    return Blockly;
};
