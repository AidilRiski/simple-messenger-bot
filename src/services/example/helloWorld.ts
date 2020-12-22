import TestModel from '../../models/testModel';

const helloWorld = () => {
    return new TestModel('Hello World!');
};

export {
    helloWorld,
};
