import faker from 'faker'

const dataList = []
const userCount = 100

for (let i = 2; i < userCount; i++) {
  dataList.push({
    id: i,
    name: faker.name.findName(),
    isEnable: true,
    remark: faker.lorem.sentence(20),
    role: 'admin',
    date: faker.date.between(2020, 2021)
  })
}

export default [
  {
    url: '/api/role/list',
    method: 'post',
    response: () => {
      return {
        code: 200,
        msg: 'success',
        data: dataList,
      }
    },
  },
]
