class Employee {
    constructor(firstName, lastName, baseSalary, experience) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.baseSalary = baseSalary;
        this.experience = experience;
    }

    countedSalary() {
        if (this.experience > 5) {
            return this.baseSalary * 1.2 + 500;
        } else if (this.experience > 2) {
            return this.baseSalary + 200;
        } else {
            return this.baseSalary;
        }
    }

    getSalary() {
        return this.countedSalary();
    }
}

class Developer extends Employee {
    constructor(firstName, lastName, baseSalary, experience) {
        super(firstName, lastName, baseSalary, experience);
    }
}

class Designer extends Employee {
    constructor(firstName, lastName, baseSalary, experience, effCoeff) {
        super(firstName, lastName, baseSalary, experience);
        this.effCoeff = effCoeff;
    }

    getSalary() {
        return super.getSalary() * this.effCoeff;
    }
}

class Manager extends Employee {
    constructor(firstName, lastName, baseSalary, experience, team = []) {
        super(firstName, lastName, baseSalary, experience);
        this.team = team;
    }

    getSalary() {
        let baseSalary = super.getSalary();
        if (this.team.length > 10) {
            baseSalary += 300;
        } else if (this.team.length > 5) {
            baseSalary += 200;
        }

        let developerCount = this.team.filter(member => member instanceof Developer).length;
        if (developerCount > this.team.length / 2) {
            baseSalary *= 1.1;
        }

        return baseSalary;
    }
}

class Department {
    constructor(managers = []) {
        this.managers = managers;
    }

    giveSalary() {
        this.managers.forEach(manager => {
            console.log(`${manager.firstName} ${manager.lastName} отримав ${manager.getSalary()} шекеля`);
            manager.team.forEach(member => {
                console.log(`${member.firstName} ${member.lastName} отримав ${member.getSalary()} шекеля`);
            });
        });
    }
}


const dev1 = new Developer('Микита', 'Лукʼяненко', 1000, 6);
const dev2 = new Developer('Петро', 'Петрикович', 900, 3);
const dev3 = new Developer('Остап', 'Остапенко', 1100, 10);
const des1 = new Designer('Олег', 'Тригуб', 1100, 2, 0.9);
const des2 = new Designer('Олександр', 'Микитюк', 1200, 7, 0.8);
const mng = new Manager('Сергій', 'Сергійов', 1500, 10, [dev1, dev2, dev3, des1, des2]);

const department = new Department([mng]);
department.giveSalary();