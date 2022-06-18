import Faker from 'faker'

const data = {
    microLoanUrl: '/en/micro-loan',
    microLoanApplicationEndpoint: '/en/micro-loan/pre-application',
    genRandomNum: (min, max) => {
        return Faker.datatype.number({min: min, max: max})
    },
    genRandomWords: (number) => {
        return Faker.random.words(number)
    },
}

export default {...data}