import faker from 'faker'

const dataList = []
const userCount = 91

for (let i = 2; i < userCount; i++) {
  dataList.push({
    id: i,
    name: faker.name.findName(),
    isEnable: true,
    remark: faker.lorem.sentence(16),
    role: 'admin',
    date: faker.date.between(2020, 2021)
  })
}

type UserType = 'admin' | 'editor' | 'test'
interface IUser {
  admin: string
  editor: string
  test: string
}

const accessTokens: IUser = {
  admin: 'vue3-vite-ts-admin-accessToken',
  editor: 'vue3-vite-ts-editor-accessToken',
  test: 'vue3-vite-ts-test-accessToken',
}

export default [
  {
    url: '/api/publicKey',
    type: 'post',
    response() {
      return {
        code: 200,
        msg: 'success',
        data: {
          mockServer: true,
          publicKey:
            'ASMIGfMA0GCSqGSIb3DQEBAQUAA4GNACBiQKBgQDBT2vr+dhZElF73FJ6xiP181txKWUSNLPQQlidDUJhGAOZblluafIdLmnUyKE8mMHhT3R+Ib3ssZcJku6Hn72yHYj/qPkCGFv0eFo7G+GJfDIUeDyalBN0QsuiE/XzPHJBuJDfRArOiWvH0BXOv5kpeXSXMyTt5Na1jAYSiQ/wIDAQA',
        },
      }
    },
  },
  {
    url: '/api/user/login',
    method: 'post',
    response: (config: any) => {
      const { username } = config.body
      const accessToken = accessTokens[username as UserType]
      if (!accessToken) {
        return {
          code: 500,
          msg: '帐户或密码不正确。',
        }
      }
      return {
        code: 200,
        msg: 'success',
        data: { accessToken },
      }
    },
  },
  {
    url: '/api/user/list',
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
