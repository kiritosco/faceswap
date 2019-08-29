import os from 'os';
import moment from 'moment';

class Logger {
    constructor() {
        this.MACHINE_INFO = `(${os.userInfo().username}@${os.hostname})`;
        this.MOMENT_FORMAT = 'DD/MM/YYYY HH:mm:ss';
    }

    getMomentDate = () => {
        return moment().format(this.MOMENT_FORMAT)
    };

    info = (msg) => {
        console.log(`\x1b[35m[${this.getMomentDate()} ${this.MACHINE_INFO}]\x1b[34m[INFO]:\x1b[0m ${msg}`)
    };

    warn = (msg) => {
        console.log(`\x1b[35m[${this.getMomentDate()} ${this.MACHINE_INFO}]\x1b[33m[WARN]:\x1b[0m ${msg}`)
    };

    error = (msg) => {
        console.error(`\x1b[35m[${this.getMomentDate()} ${this.MACHINE_INFO}] \x1b[31m[ERR]:\x1b[0m ${msg}`)
    };

    debug = (msg) => {
        isDev ? console.log(`\x1b[35m[${this.getMomentDate()} ${this.MACHINE_INFO}] \x1b[37m[DEBUG]:\x1b[0m ${msg}`) : null
    }
}

export default new Logger()