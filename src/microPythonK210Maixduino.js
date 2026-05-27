const {formatMessage, ArgumentType, BlockType, ProgramModeType, CommonPeripheral} = window.Scratch;

const PNPID_LIST = [
    // FTDI
    'USB\\VID_0403&PID_6010'
];

const SERIAL_CONFIG = {
    baudRate: 115200,
    dataBits: 8,
    stopBits: 1
};

const DIVECE_OPT = {
    type: 'microPython',
    fqbn: 'k210:k210',
    baud: '1500000',
    board: 'maixduino',
    slowMode: true
};

const Pins = {
    D0: '4',
    D1: '5',
    D2: '21',
    D3: '22',
    D4: '23',
    D5: '24',
    D6: '32',
    D7: '15',
    D8: '14',
    D9: '13',
    D10: '12',
    D11: '11',
    D12: '10',
    D13: '3',
    A0: 'A0',
    A1: 'A1',
    A2: 'A2',
    A3: 'A3',
    A4: 'A4',
    A5: 'A5',
    SDA: '31',
    SCL: '30',
    BOOT: '16'
};

const Level = {
    High: '1',
    Low: '0'
};

const Channels = {
    CH0: '0',
    CH1: '1',
    CH2: '2',
    CH3: '3',
    CH4: '4',
    CH5: '5',
    CH6: '6',
    CH7: '7',
    CH8: '8',
    CH9: '9',
    CH10: '10',
    CH11: '11'
};

const SerialNo = {
    Serial1: '1',
    Serial2: '2',
    Serial3: '3'
};

const Buadrate = {
    B4800: '4800',
    B9600: '9600',
    B19200: '19200',
    B38400: '38400',
    B57600: '57600',
    B76800: '76800',
    B115200: '115200'
};

const Eol = {
    Warp: 'warp',
    NoWarp: 'noWarp'
};

const Mode = {
    Input: 'PULL_NONE',
    Output: 'OUT',
    InputPullup: 'PULL_UP',
    InputPulldown: 'PULL_DOWN'
};

const InterrupMode = {
    Rising: 'IRQ_RISING',
    Falling: 'IRQ_FALLING',
    Change: 'IRQ_BOTH'
};

class MicroPythonK210Maixduino extends CommonPeripheral {
    constructor (runtime, deviceId) {
        super(runtime, deviceId, PNPID_LIST, SERIAL_CONFIG, DIVECE_OPT);
    }
}

class OpenBlockMicroPythonK210MaixduinoDevice {
    get DEVICE_ID () {
        return 'microPythonK210Maixduino';
    }

    get PINS_MENU () {
        return [
            {
                text: '0',
                value: Pins.D0
            },
            {
                text: '1',
                value: Pins.D1
            },
            {
                text: '2',
                value: Pins.D2
            },
            {
                text: '3',
                value: Pins.D3
            },
            {
                text: '4',
                value: Pins.D4
            },
            {
                text: '5',
                value: Pins.D5
            },
            {
                text: '6',
                value: Pins.D6
            },
            {
                text: '7',
                value: Pins.D7
            },
            {
                text: '8',
                value: Pins.D8
            },
            {
                text: '9',
                value: Pins.D9
            },
            {
                text: '10',
                value: Pins.D10
            },
            {
                text: '11',
                value: Pins.D11
            },
            {
                text: '12',
                value: Pins.D12
            },
            {
                text: '13',
                value: Pins.D13
            },
            {
                text: 'SDA',
                value: Pins.SDA
            },
            {
                text: 'SCL',
                value: Pins.SCL
            },
            {
                text: 'BOOT',
                value: Pins.BOOT
            }
        ];
    }

    get DEFAULT_PIN () {
        return Pins.D2;
    }

    get MODE_MENU () {
        return [
            {
                text: formatMessage({
                    id: 'microPythonK210Maixduino.modeMenu.input',
                    default: 'input',
                    description: 'label for input pin mode'
                }),
                value: Mode.Input
            },
            {
                text: formatMessage({
                    id: 'microPythonK210Maixduino.modeMenu.output',
                    default: 'output',
                    description: 'label for output pin mode'
                }),
                value: Mode.Output
            },
            {
                text: formatMessage({
                    id: 'microPythonK210Maixduino.modeMenu.inputPullup',
                    default: 'input-pullup',
                    description: 'label for input-pullup pin mode'
                }),
                value: Mode.InputPullup
            },
            {
                text: formatMessage({
                    id: 'microPythonK210Maixduino.modeMenu.inputPulldown',
                    default: 'input-pulldown',
                    description: 'label for input-pulldown pin mode'
                }),
                value: Mode.InputPulldown
            }
        ];
    }

    get LEVEL_MENU () {
        return [
            {
                text: formatMessage({
                    id: 'microPythonK210Maixduino.levelMenu.high',
                    default: 'high',
                    description: 'label for high level'
                }),
                value: Level.High
            },
            {
                text: formatMessage({
                    id: 'microPythonK210Maixduino.levelMenu.low',
                    default: 'low',
                    description: 'label for low level'
                }),
                value: Level.Low
            }
        ];
    }

    get TIMER_CHANNELS_MENU () {
        return [
            {
                text: 'CH0 (T0)',
                value: Channels.CH0
            },
            {
                text: 'CH1 (T0)',
                value: Channels.CH1
            },
            {
                text: 'CH2 (T0)',
                value: Channels.CH2
            },
            {
                text: 'CH3 (T0)',
                value: Channels.CH3
            },
            {
                text: 'CH4 (T1)',
                value: Channels.CH4
            },
            {
                text: 'CH5 (T1)',
                value: Channels.CH5
            },
            {
                text: 'CH6 (T1)',
                value: Channels.CH6
            },
            {
                text: 'CH7 (T1)',
                value: Channels.CH7
            },
            {
                text: 'CH8 (T2)',
                value: Channels.CH8
            },
            {
                text: 'CH9 (T2)',
                value: Channels.CH9
            },
            {
                text: 'CH10 (T2)',
                value: Channels.CH10
            },
            {
                text: 'CH11 (T2)',
                value: Channels.CH11
            }
        ];
    }

    get INTERRUP_MODE_MENU () {
        return [
            {
                text: formatMessage({
                    id: 'microPythonK210Maixduino.InterrupModeMenu.risingEdge',
                    default: 'rising edge',
                    description: 'label for rising edge interrup'
                }),
                value: InterrupMode.Rising
            },
            {
                text: formatMessage({
                    id: 'microPythonK210Maixduino.InterrupModeMenu.fallingEdge',
                    default: 'falling edge',
                    description: 'label for falling edge interrup'
                }),
                value: InterrupMode.Falling
            },
            {
                text: formatMessage({
                    id: 'microPythonK210Maixduino.InterrupModeMenu.changeEdge',
                    default: 'change edge',
                    description: 'label for change edge interrup'
                }),
                value: InterrupMode.Change
            }
        ];
    }

    get SERIAL_NO_MENU () {
        return [
            {
                text: '1',
                value: SerialNo.Serial1
            },
            {
                text: '2',
                value: SerialNo.Serial2
            },
            {
                text: '3',
                value: SerialNo.Serial3
            }
        ];
    }

    get DEFAULT_SERIAL_RX_PIN () {
        return Pins.D2;
    }

    get DEFAULT_SERIAL_TX_PIN () {
        return Pins.D3;
    }

    get BAUDTATE_MENU () {
        return [
            {
                text: '4800',
                value: Buadrate.B4800
            },
            {
                text: '9600',
                value: Buadrate.B9600
            },
            {
                text: '19200',
                value: Buadrate.B19200
            },
            {
                text: '38400',
                value: Buadrate.B38400
            },
            {
                text: '57600',
                value: Buadrate.B57600
            },
            {
                text: '76800',
                value: Buadrate.B76800
            },
            {
                text: '115200',
                value: Buadrate.B115200
            }
        ];
    }

    get EOL_MENU () {
        return [
            {
                text: formatMessage({
                    id: 'microPythonK210Maixduino.eolMenu.warp',
                    default: 'warp',
                    description: 'label for warp print'
                }),
                value: Eol.Warp
            },
            {
                text: formatMessage({
                    id: 'microPythonK210Maixduino.eolMenu.noWarp',
                    default: 'no-warp',
                    description: 'label for no warp print'
                }),
                value: Eol.NoWarp
            }
        ];
    }

    constructor (runtime) {
        this.runtime = runtime;
        this._peripheral = new MicroPythonK210Maixduino(this.runtime, this.DEVICE_ID);
    }

    getInfo () {
        return [
            {
                id: 'pin',
                name: formatMessage({
                    id: 'microPythonK210Maixduino.category.pins',
                    default: 'Pins',
                    description: 'The name of the K210 microPython device pin category'
                }),
                color1: '#4C97FF',
                color2: '#3373CC',
                color3: '#3373CC',

                blocks: [
                    {
                        opcode: 'setPinMode',
                        text: formatMessage({
                            id: 'microPythonK210Maixduino.pins.setPinMode',
                            default: 'set pin [PIN] mode [MODE]',
                            description: 'MicroPython K210 set pin mode'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: 'pins',
                                defaultValue: this.DEFAULT_PIN
                            },
                            MODE: {
                                type: ArgumentType.STRING,
                                menu: 'mode',
                                defaultValue: Mode.Input
                            }
                        }
                    },
                    {
                        opcode: 'setDigitalOutput',
                        text: formatMessage({
                            id: 'microPythonK210Maixduino.pins.setDigitalOutput',
                            default: 'set digital pin [PIN] out [LEVEL]',
                            description: 'MicroPython K210 set digital pin out'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: 'pins',
                                defaultValue: this.DEFAULT_PIN
                            },
                            LEVEL: {
                                type: ArgumentType.STRING,
                                menu: 'level',
                                defaultValue: Level.High
                            }
                        }
                    },
                    {
                        opcode: 'setPwmOutput',
                        text: formatMessage({
                            id: 'microPythonK210Maixduino.pins.setPwmOutput',
                            default: 'set pwm pin [PIN] use channel [CH] out [OUT]',
                            description: 'MicroPython K210 set pwm pin out'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: 'pins',
                                defaultValue: this.DEFAULT_PIN
                            },
                            OUT: {
                                type: ArgumentType.INTOTO100_NUMBER,
                                defaultValue: '0'
                            },
                            CH: {
                                type: ArgumentType.NUMBER,
                                menu: 'timerChannels',
                                defaultValue: Channels.CH0
                            }
                        }
                    },
                    '---',
                    {
                        opcode: 'readDigitalPin',
                        text: formatMessage({
                            id: 'microPythonK210Maixduino.pins.readDigitalPin',
                            default: 'read digital pin [PIN]',
                            description: 'MicroPython K210 read digital pin'
                        }),
                        blockType: BlockType.BOOLEAN,
                        arguments: {
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: 'pins',
                                defaultValue: this.DEFAULT_PIN
                            }
                        }
                    },
                    '---',
                    {
                        opcode: 'setServoOutput',
                        text: formatMessage({
                            id: 'microPythonK210Maixduino.pins.setServoOutput',
                            default: 'set servo pin [PIN] use channel [CH] out [OUT]',
                            description: 'MicroPython K210 set servo pin out'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: 'pins',
                                defaultValue: this.DEFAULT_PIN
                            },
                            OUT: {
                                type: ArgumentType.HALF_ANGLE,
                                defaultValue: '0'
                            },
                            CH: {
                                type: ArgumentType.NUMBER,
                                menu: 'timerChannels',
                                defaultValue: Channels.CH0
                            }
                        }
                    },
                    '---',
                    {
                        opcode: 'attachInterrupt',
                        text: formatMessage({
                            id: 'microPythonK210Maixduino.pins.attachInterrupt',
                            default: 'attach interrupt pin [PIN] mode [MODE] executes',
                            description: 'MicroPython K210 attach interrupt'
                        }),
                        blockType: BlockType.CONDITIONAL,
                        arguments: {
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: 'pins',
                                defaultValue: this.DEFAULT_PIN
                            },
                            MODE: {
                                type: ArgumentType.STRING,
                                menu: 'interruptMode',
                                defaultValue: InterrupMode.Rising
                            }
                        },
                        programMode: [ProgramModeType.UPLOAD]
                    },
                    // Legacy aliases, kept for backward compatibility.
                    {
                        opcode: 'k210SetPinMode',
                        text: formatMessage({
                            id: 'microPythonK210Maixduino.pins.setPinMode',
                            default: 'set pin [PIN] mode [MODE]',
                            description: 'MicroPython K210 set pin mode'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: 'pins',
                                defaultValue: this.DEFAULT_PIN
                            },
                            MODE: {
                                type: ArgumentType.STRING,
                                menu: 'mode',
                                defaultValue: Mode.Input
                            }
                        },
                        hideFromPalette: true,
                        func: 'setPinMode'
                    },
                    {
                        opcode: 'k210SetPwmOutput',
                        text: formatMessage({
                            id: 'microPythonK210Maixduino.pins.setPwmOutput',
                            default: 'set pwm pin [PIN] use channel [CH] out [OUT]',
                            description: 'MicroPython K210 set pwm pin out'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: 'pins',
                                defaultValue: this.DEFAULT_PIN
                            },
                            OUT: {
                                type: ArgumentType.INTOTO100_NUMBER,
                                defaultValue: '0'
                            },
                            CH: {
                                type: ArgumentType.NUMBER,
                                menu: 'timerChannels',
                                defaultValue: Channels.CH0
                            }
                        },
                        hideFromPalette: true,
                        func: 'setPwmOutput'
                    },
                    {
                        opcode: 'k210SetServoOutput',
                        text: formatMessage({
                            id: 'microPythonK210Maixduino.pins.setServoOutput',
                            default: 'set servo pin [PIN] use channel [CH] out [OUT]',
                            description: 'MicroPython K210 set servo pin out'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: 'pins',
                                defaultValue: this.DEFAULT_PIN
                            },
                            OUT: {
                                type: ArgumentType.HALF_ANGLE,
                                defaultValue: '0'
                            },
                            CH: {
                                type: ArgumentType.NUMBER,
                                menu: 'timerChannels',
                                defaultValue: Channels.CH0
                            }
                        },
                        hideFromPalette: true,
                        func: 'setServoOutput'
                    },
                    {
                        opcode: 'k210AttachInterrupt',
                        text: formatMessage({
                            id: 'microPythonK210Maixduino.pins.attachInterrupt',
                            default: 'attach interrupt pin [PIN] mode [MODE] executes',
                            description: 'MicroPython K210 attach interrupt'
                        }),
                        blockType: BlockType.CONDITIONAL,
                        arguments: {
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: 'pins',
                                defaultValue: this.DEFAULT_PIN
                            },
                            MODE: {
                                type: ArgumentType.STRING,
                                menu: 'interruptMode',
                                defaultValue: InterrupMode.Rising
                            }
                        },
                        programMode: [ProgramModeType.UPLOAD],
                        hideFromPalette: true,
                        func: 'attachInterrupt'
                    }
                ],
                menus: {
                    pins: {
                        items: this.PINS_MENU
                    },
                    mode: {
                        items: this.MODE_MENU
                    },
                    level: {
                        acceptReporters: true,
                        items: this.LEVEL_MENU
                    },
                    timerChannels: {
                        items: this.TIMER_CHANNELS_MENU
                    },
                    interruptMode: {
                        items: this.INTERRUP_MODE_MENU
                    }
                }
            },
            {
                id: 'serial',
                name: formatMessage({
                    id: 'microPythonK210Maixduino.category.serial',
                    default: 'Serial',
                    description: 'The name of the MicroPython K210 device serial category'
                }),
                color1: '#9966FF',
                color2: '#774DCB',
                color3: '#774DCB',

                blocks: [
                    {
                        opcode: 'serialBegin',
                        text: formatMessage({
                            id: 'microPythonK210Maixduino.serial.serialBegin',
                            default: 'serial [NO] begin baudrate [BAUD] pin RX [RX_PIN] TX [TX_PIN]',
                            description: 'MicroPython K210 multi serial begin'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            NO: {
                                type: ArgumentType.NUMBER,
                                menu: 'serialNo',
                                defaultValue: SerialNo.Serial1
                            },
                            BAUD: {
                                type: ArgumentType.STRING,
                                menu: 'baudrate',
                                defaultValue: Buadrate.B115200
                            },
                            RX_PIN: {
                                type: ArgumentType.STRING,
                                menu: 'pins',
                                defaultValue: this.DEFAULT_SERIAL_RX_PIN
                            },
                            TX_PIN: {
                                type: ArgumentType.STRING,
                                menu: 'pins',
                                defaultValue: this.DEFAULT_SERIAL_TX_PIN
                            }
                        }
                    },
                    {
                        opcode: 'multiSerialPrint',
                        text: formatMessage({
                            id: 'microPythonK210Maixduino.serial.serialPrint',
                            default: 'serial [NO] print [VALUE] [EOL]',
                            description: 'MicroPython K210 multi serial print'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            NO: {
                                type: ArgumentType.NUMBER,
                                menu: 'serialNo',
                                defaultValue: SerialNo.Serial1
                            },
                            VALUE: {
                                type: ArgumentType.STRING,
                                defaultValue: 'Hello OpenBlock'
                            },
                            EOL: {
                                type: ArgumentType.STRING,
                                menu: 'eol',
                                defaultValue: Eol.Warp
                            }
                        }
                    },
                    {
                        opcode: 'multiSerialReadALine',
                        text: formatMessage({
                            id: 'microPythonK210Maixduino.serial.serialReadALine',
                            default: 'serial [NO] read a line',
                            description: 'MicroPython K210 multi serial read a line'
                        }),
                        arguments: {
                            NO: {
                                type: ArgumentType.NUMBER,
                                menu: 'serialNo',
                                defaultValue: SerialNo.Serial1
                            }
                        },
                        blockType: BlockType.REPORTER
                    },
                    // Legacy aliases, kept for backward compatibility.
                    {
                        opcode: 'k210SerialBegin',
                        text: formatMessage({
                            id: 'microPythonK210Maixduino.serial.serialBegin',
                            default: 'serial [NO] begin baudrate [BAUD] pin RX [RX_PIN] TX [TX_PIN]',
                            description: 'MicroPython K210 multi serial begin'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            NO: {
                                type: ArgumentType.NUMBER,
                                menu: 'serialNo',
                                defaultValue: SerialNo.Serial1
                            },
                            BAUD: {
                                type: ArgumentType.STRING,
                                menu: 'baudrate',
                                defaultValue: Buadrate.B115200
                            },
                            RX_PIN: {
                                type: ArgumentType.STRING,
                                menu: 'pins',
                                defaultValue: this.DEFAULT_SERIAL_RX_PIN
                            },
                            TX_PIN: {
                                type: ArgumentType.STRING,
                                menu: 'pins',
                                defaultValue: this.DEFAULT_SERIAL_TX_PIN
                            }
                        },
                        hideFromPalette: true,
                        func: 'serialBegin'
                    }
                ],
                menus: {
                    baudrate: {
                        items: this.BAUDTATE_MENU
                    },
                    serialNo: {
                        items: this.SERIAL_NO_MENU
                    },
                    pins: {
                        items: this.PINS_MENU
                    },
                    eol: {
                        items: this.EOL_MENU
                    }
                }
            },
            {
                id: 'console',
                name: formatMessage({
                    id: 'microPythonK210Maixduino.category.console',
                    default: 'Console',
                    description: 'The name of the K210 microPython device console category'
                }),
                color1: '#FF3399',
                color2: '#CC297A',
                color3: '#CC297A',

                blocks: [
                    {
                        opcode: 'consolePrint',
                        text: formatMessage({
                            id: 'microPythonK210Maixduino.console.consolePrint',
                            default: 'print [TEXT] [EOL]',
                            description: 'MicrpPython console print'
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            TEXT: {
                                type: ArgumentType.STRING,
                                defaultValue: 'Hello OpenBlock'
                            },
                            EOL: {
                                type: ArgumentType.STRING,
                                menu: 'eol',
                                defaultValue: Eol.Warp
                            }
                        },
                        programMode: [ProgramModeType.UPLOAD]
                    },
                    {
                        opcode: 'consoleInput',
                        text: formatMessage({
                            id: 'microPythonK210Maixduino.console.consoleInput',
                            default: 'prompt [TEXT] and read input',
                            description: 'MicrpPython console input'
                        }),
                        blockType: BlockType.REPORTER,
                        arguments: {
                            TEXT: {
                                type: ArgumentType.STRING,
                                defaultValue: 'Input a number:'
                            }
                        },
                        programMode: [ProgramModeType.UPLOAD]
                    }
                ],
                menus: {
                    eol: {
                        items: this.EOL_MENU
                    }
                }
            }
        ];
    }
}

export default OpenBlockMicroPythonK210MaixduinoDevice;
