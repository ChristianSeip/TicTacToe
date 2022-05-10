class Player {
    name;
    sign;
    isComputer;

    constructor(name, sign, isComputer) {
        this.setName(name);
        this.setSign(sign);
        this.setIsComputer(isComputer);
    }

    setName(name) {
        if(name.length > 0) {
            this.name = name;
            return true;
        }
    }

    setSign(sign) {
        this.sign = sign;
    }

    setIsComputer(status) {
        this.isComputer = status;
    }
}